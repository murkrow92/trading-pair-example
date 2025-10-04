import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { CurrencyList } from '../types';
import { CURRENCY_LIST_A_CRYPTO, CURRENCY_LIST_B_FIAT } from '../mock/currencies';
import {
  initDb,
  clearAll,
  insertList,
  getByList,
  getPurchasableFromAandB,
  recreateTable,
} from '../db/currencyDb';
import { matchesSearch } from '../utils/search';

type Mode = 'A' | 'B' | 'ALL';

interface CurrencyState {
  mode: Mode;
  query: string;
  isSearching: boolean;
  loading: boolean;
  items: CurrencyList;
}

type Action =
  | { type: 'SET_MODE'; payload: Mode }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'CLEAR_QUERY' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CurrencyList };

const initialState: CurrencyState = {
  mode: 'ALL',
  query: '',
  isSearching: false,
  loading: false,
  items: [],
};

function reducer(state: CurrencyState, action: Action): CurrencyState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload, isSearching: action.payload.length > 0 };
    case 'CLEAR_QUERY':
      return { ...state, query: '', isSearching: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

interface CurrencyContextType {
  state: CurrencyState;
  setModeA: () => void;
  setModeB: () => void;
  setModeAll: () => void;
  setQuery: (q: string) => void;
  clearQuery: () => void;
  getFilteredList: () => CurrencyList;
  insertMockA: () => Promise<void>;
  insertMockB: () => Promise<void>;
  clearDatabase: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      await initDb();
      setInitialized(true);
      await loadForMode(state.mode);
    })();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    loadForMode(state.mode);
  }, [state.mode, initialized]);

  async function loadForMode(mode: Mode) {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let list: CurrencyList;
      if (mode === 'A') list = await getByList('A');
      else if (mode === 'B') list = await getByList('B');
      else list = await getPurchasableFromAandB();
      dispatch({ type: 'SET_ITEMS', payload: list });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  const insertMockA = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      console.log('Inserting Mock A data...');
      await recreateTable(); // Force recreate table with new schema
      await insertList('A', CURRENCY_LIST_A_CRYPTO);
      console.log('Mock A data inserted successfully');
      await loadForMode(state.mode);
    } catch (error) {
      console.error('Error inserting Mock A:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const insertMockB = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      console.log('Inserting Mock B data...');
      await insertList('B', CURRENCY_LIST_B_FIAT);
      console.log('Mock B data inserted successfully');
      await loadForMode(state.mode);
    } catch (error) {
      console.error('Error inserting Mock B:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearDatabase = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await clearAll();
      dispatch({ type: 'SET_ITEMS', payload: [] });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setModeA = () => dispatch({ type: 'SET_MODE', payload: 'A' });
  const setModeB = () => dispatch({ type: 'SET_MODE', payload: 'B' });
  const setModeAll = () => dispatch({ type: 'SET_MODE', payload: 'ALL' });

  const value: CurrencyContextType = useMemo(
    () => ({
      state,
      setModeA,
      setModeB,
      setModeAll,
      setQuery: (q: string) => dispatch({ type: 'SET_QUERY', payload: q }),
      clearQuery: () => dispatch({ type: 'CLEAR_QUERY' }),
      getFilteredList: () => state.items.filter((x) => matchesSearch(x, state.query)),
      insertMockA,
      insertMockB,
      clearDatabase,
    }),
    [state],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}

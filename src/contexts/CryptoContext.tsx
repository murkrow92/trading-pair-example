// Domain layer - State management and business logic
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CryptoCurrency, ApiResponse } from '../types';
import { cryptoService } from '../services/cryptoService';

interface CryptoState {
  cryptocurrencies: ApiResponse<CryptoCurrency[]>;
  favorites: string[];
}

type CryptoAction =
  | { type: 'FETCH_CRYPTOS_START' }
  | { type: 'FETCH_CRYPTOS_SUCCESS'; payload: CryptoCurrency[] }
  | { type: 'FETCH_CRYPTOS_ERROR'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_FAVORITES'; payload: string[] };

const initialState: CryptoState = {
  cryptocurrencies: {
    data: [],
    loading: false,
  },
  favorites: [],
};

function cryptoReducer(state: CryptoState, action: CryptoAction): CryptoState {
  switch (action.type) {
    case 'FETCH_CRYPTOS_START':
      return {
        ...state,
        cryptocurrencies: {
          ...state.cryptocurrencies,
          loading: true,
          error: undefined,
        },
      };
    case 'FETCH_CRYPTOS_SUCCESS':
      return {
        ...state,
        cryptocurrencies: {
          data: action.payload,
          loading: false,
        },
      };
    case 'FETCH_CRYPTOS_ERROR':
      return {
        ...state,
        cryptocurrencies: {
          ...state.cryptocurrencies,
          loading: false,
          error: action.payload,
        },
      };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      const newFavorites = isFavorite
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      
      // Save to AsyncStorage (you can implement this later)
      return {
        ...state,
        favorites: newFavorites,
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
}

interface CryptoContextType {
  state: CryptoState;
  fetchCryptocurrencies: () => Promise<void>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export function CryptoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cryptoReducer, initialState);

  const fetchCryptocurrencies = async () => {
    dispatch({ type: 'FETCH_CRYPTOS_START' });
    try {
      const data = await cryptoService.getTopCryptocurrencies();
      dispatch({ type: 'FETCH_CRYPTOS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_CRYPTOS_ERROR', 
        payload: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  const toggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  const isFavorite = (id: string) => {
    return state.favorites.includes(id);
  };

  useEffect(() => {
    fetchCryptocurrencies();
  }, []);

  const value: CryptoContextType = {
    state,
    fetchCryptocurrencies,
    toggleFavorite,
    isFavorite,
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
}

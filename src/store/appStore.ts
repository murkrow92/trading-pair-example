import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrencyInfo, CurrencyList } from '../types';
import { CURRENCY_LIST_A_CRYPTO, CURRENCY_LIST_B_FIAT } from '../mock/currencies';
import { initDb, clearAll, insertList, getByList, getPurchasableFromAandB, recreateTable } from '../db/currencyDb';

type Mode = 'A' | 'B' | 'ALL' | 'FAVORITES';

interface AppState {
  mode: Mode;
  query: string;
  isSearching: boolean;
  loading: boolean;
  items: CurrencyList;
  favorites: string[];
  
  showSearch: boolean;
  showApiData: boolean;
  showFavorites: boolean;
  
  setMode: (mode: Mode) => void;
  setQuery: (query: string) => void;
  clearQuery: () => void;
  setLoading: (loading: boolean) => void;
  setItems: (items: CurrencyList) => void;
  setShowSearch: (show: boolean) => void;
  setShowApiData: (show: boolean) => void;
  setShowFavorites: (show: boolean) => void;
  
  clearDatabase: () => Promise<void>;
  insertMockData: () => Promise<void>;
  loadDataForMode: (mode: Mode) => Promise<void>;
  
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getFavorites: () => CurrencyList;
  
  getFilteredList: () => CurrencyList;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      mode: 'ALL',
      query: '',
      isSearching: false,
      loading: false,
      items: [],
      favorites: [],
      showSearch: false,
      showApiData: false,
      showFavorites: false,

      setMode: (mode) => {
        set({ mode });
        get().loadDataForMode(mode);
      },

      setQuery: (query) => {
        set({ 
          query, 
          isSearching: query.length > 0 
        });
      },

      clearQuery: () => {
        set({ 
          query: '', 
          isSearching: false 
        });
      },

      setLoading: (loading) => set({ loading }),
      setItems: (items) => set({ items }),
      setShowSearch: (showSearch) => set({ showSearch }),
      setShowApiData: (showApiData) => set({ showApiData }),
      setShowFavorites: (showFavorites) => set({ showFavorites }),

      clearDatabase: async () => {
        set({ loading: true });
        try {
          await clearAll();
          set({ items: [] });
        } finally {
          set({ loading: false });
        }
      },

      insertMockData: async () => {
        set({ loading: true });
        try {
          await recreateTable();
          await insertList('A', CURRENCY_LIST_A_CRYPTO);
          await insertList('B', CURRENCY_LIST_B_FIAT);
          await get().loadDataForMode(get().mode);
        } finally {
          set({ loading: false });
        }
      },

      loadDataForMode: async (mode) => {
        set({ loading: true });
        try {
          let items: CurrencyList;
          switch (mode) {
            case 'A':
              items = await getByList('A');
              break;
            case 'B':
              items = await getByList('B');
              break;
            case 'ALL':
              items = await getPurchasableFromAandB();
              break;
            case 'FAVORITES':
              items = get().getFavorites();
              break;
            default:
              items = [];
          }
          set({ items });
        } finally {
          set({ loading: false });
        }
      },

      toggleFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter(fav => fav !== id)
            : [...state.favorites, id]
        }));
      },

      isFavorite: (id) => {
        return get().favorites.includes(id);
      },

      getFavorites: () => {
        const { items, favorites } = get();
        return items.filter(item => favorites.includes(item.id));
      },

      getFilteredList: () => {
        const { items, query } = get();
        if (!query) return items;
        
        const q = query.toLowerCase();
        return items.filter(item => {
          const name = item.name.toLowerCase();
          const symbol = item.symbol.toLowerCase();
          
          return name.startsWith(q) || 
                 name.includes(' ' + q) || 
                 symbol.startsWith(q);
        });
      },
    }),
    {
      name: 'app-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);

export const initializeApp = async () => {
  await initDb();
};

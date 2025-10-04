import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrencyInfo, CurrencyList } from '../types';

export type Mode = 'A' | 'B' | 'ALL';

interface CurrencyState {
  mode: Mode;
  query: string;
  isSearching: boolean;
  loading: boolean;
  items: CurrencyList;
  favorites: string[];
  setMode: (mode: Mode) => void;
  setQuery: (query: string) => void;
  clearQuery: () => void;
  setLoading: (loading: boolean) => void;
  setItems: (items: CurrencyList) => void;
  toggleFavorite: (currencyId: string) => void;
  isFavorite: (currencyId: string) => boolean;
  getFavorites: () => CurrencyList;
  getFilteredList: () => CurrencyList;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      mode: 'ALL',
      query: '',
      isSearching: false,
      loading: false,
      items: [],
      favorites: [],
      setMode: (mode: Mode) => set({ mode }),
      setQuery: (query: string) => set({ 
        query, 
        isSearching: query.length > 0 
      }),
      clearQuery: () => set({ 
        query: '', 
        isSearching: false 
      }),
      setLoading: (loading: boolean) => set({ loading }),
      setItems: (items: CurrencyList) => set({ items }),
      toggleFavorite: (currencyId: string) => {
        const { favorites } = get();
        const newFavorites = favorites.includes(currencyId)
          ? favorites.filter(id => id !== currencyId)
          : [...favorites, currencyId];
        set({ favorites: newFavorites });
      },
      isFavorite: (currencyId: string) => {
        const { favorites } = get();
        return favorites.includes(currencyId);
      },
      getFavorites: () => {
        const { items, favorites } = get();
        return items.filter(item => favorites.includes(item.id));
      },
      getFilteredList: () => {
        const { items, query } = get();
        if (!query) return items;
        
        const searchTerm = query.toLowerCase();
        return items.filter(item => {
          const name = item.name?.toLowerCase() || '';
          const symbol = item.symbol?.toLowerCase() || '';
          const code = item.code?.toLowerCase() || '';
          
          return name.includes(searchTerm) || 
                 symbol.includes(searchTerm) || 
                 code.includes(searchTerm);
        });
      },
    }),
    {
      name: 'currency-storage',
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

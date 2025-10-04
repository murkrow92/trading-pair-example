export interface CurrencyInfo {
  id: string;
  name: string;
  symbol: string;
  code?: string;
  imageUrl?: string;
  price?: number;
  change24h?: number;
  marketCap?: number;
}

export type CurrencyList = CurrencyInfo[];

export interface SearchQuery {
  term: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

export type RootStackParamList = {
  Demo: undefined;
};

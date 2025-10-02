// Data models and type definitions
export interface CurrencyInfo {
  id: string; // db primary key from server
  name: string; // display name of the currency
  symbol: string; // display symbol
  code?: string; // fiat currency code, ISO 4217
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

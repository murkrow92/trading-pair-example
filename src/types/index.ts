// Data models and type definitions
export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d?: number;
  image: string;
  last_updated: string;
}

export interface CryptoPriceHistory {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export type RootStackParamList = {
  Home: undefined;
  Details: { crypto: CryptoCurrency };
  Favorites: undefined;
};

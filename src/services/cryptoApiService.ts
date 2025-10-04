import axios from 'axios';
import { CurrencyInfo } from '../types';


const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';


interface CoinGeckoCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface CoinGeckoSearchCoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
}

interface CoinGeckoSearchResponse {
  coins: CoinGeckoSearchCoin[];
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<CurrencyInfo[] | CurrencyInfo>>();
const CACHE_DURATION = 5 * 60 * 1000; 


const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};


const transformCoinData = (coin: CoinGeckoCoin): CurrencyInfo => ({
  id: coin.id,
  name: coin.name,
  symbol: coin.symbol.toUpperCase(),
  imageUrl: coin.image,
  price: coin.current_price,
  change24h: coin.price_change_percentage_24h,
  marketCap: coin.market_cap,
});


export class CryptoApiService {
  private static instance: CryptoApiService;
  
  static getInstance(): CryptoApiService {
    if (!CryptoApiService.instance) {
      CryptoApiService.instance = new CryptoApiService();
    }
    return CryptoApiService.instance;
  }

  
  async getTopCryptocurrencies(limit: number = 50): Promise<CurrencyInfo[]> {
    const cacheKey = `top-crypto-${limit}`;
    const cached = cache.get(cacheKey);
    
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data as CurrencyInfo[];
    }

    try {
      const response = await axios.get(
        `${COINGECKO_API_BASE}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: limit,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
          },
        }
      );

      const transformedData = response.data.map(transformCoinData);
      
      
      cache.set(cacheKey, {
        data: transformedData,
        timestamp: Date.now(),
      });

      return transformedData;
    } catch (error) {
      console.error('Error fetching top cryptocurrencies:', error);
      throw new Error('Failed to fetch cryptocurrency data');
    }
  }

  
  async getCryptocurrencyById(id: string): Promise<CurrencyInfo | null> {
    const cacheKey = `crypto-${id}`;
    const cached = cache.get(cacheKey);
    
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data as CurrencyInfo;
    }

    try {
      const response = await axios.get(
        `${COINGECKO_API_BASE}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            ids: id,
            sparkline: false,
            price_change_percentage: '24h',
          },
        }
      );

      if (response.data.length === 0) {
        return null;
      }

      const transformedData = transformCoinData(response.data[0]);
      
      
      cache.set(cacheKey, {
        data: transformedData,
        timestamp: Date.now(),
      });

      return transformedData;
    } catch (error) {
      console.error(`Error fetching cryptocurrency ${id}:`, error);
      throw new Error(`Failed to fetch cryptocurrency ${id}`);
    }
  }

  
  async searchCryptocurrencies(query: string): Promise<CurrencyInfo[]> {
    if (!query.trim()) {
      return this.getTopCryptocurrencies(20);
    }

    const cacheKey = `search-${query}`;
    const cached = cache.get(cacheKey);
    
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data as CurrencyInfo[];
    }

    try {
      const response = await axios.get(
        `${COINGECKO_API_BASE}/search`,
        {
          params: {
            query: query.trim(),
          },
        }
      );

      const searchResponse = response.data as CoinGeckoSearchResponse;
      const coinIds = searchResponse.coins
        .slice(0, 20)
        .map((coin: CoinGeckoSearchCoin) => coin.id)
        .join(',');

      if (!coinIds) {
        return [];
      }

      const marketResponse = await axios.get(
        `${COINGECKO_API_BASE}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            ids: coinIds,
            sparkline: false,
            price_change_percentage: '24h',
          },
        }
      );

      const transformedData = marketResponse.data.map(transformCoinData);
      
      
      cache.set(cacheKey, {
        data: transformedData,
        timestamp: Date.now(),
      });

      return transformedData;
    } catch (error) {
      console.error('Error searching cryptocurrencies:', error);
      throw new Error('Failed to search cryptocurrencies');
    }
  }

  
  clearCache(): void {
    cache.clear();
  }

  
  getCacheSize(): number {
    return cache.size;
  }
}


export const cryptoApiService = CryptoApiService.getInstance();

// Data layer - API service for crypto data
import axios from 'axios';
import { CryptoCurrency, CryptoPriceHistory } from '../types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

class CryptoService {
  private api = axios.create({
    baseURL: COINGECKO_API_BASE,
    timeout: 10000,
  });

  async getTopCryptocurrencies(limit: number = 50): Promise<CryptoCurrency[]> {
    try {
      const response = await this.api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h,7d',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
      throw new Error('Failed to fetch cryptocurrency data');
    }
  }

  async getCryptoPriceHistory(
    id: string,
    days: number = 7
  ): Promise<CryptoPriceHistory> {
    try {
      const response = await this.api.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching price history:', error);
      throw new Error('Failed to fetch price history');
    }
  }

  async getCryptoDetails(id: string): Promise<CryptoCurrency> {
    try {
      const response = await this.api.get(`/coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: id,
          order: 'market_cap_desc',
          per_page: 1,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h,7d',
        },
      });
      return response.data[0];
    } catch (error) {
      console.error('Error fetching crypto details:', error);
      throw new Error('Failed to fetch cryptocurrency details');
    }
  }
}

export const cryptoService = new CryptoService();

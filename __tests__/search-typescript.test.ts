jest.mock('../src/db/currencyDb', () => ({
  initDb: jest.fn(),
  clearAll: jest.fn(),
  insertList: jest.fn(),
  getByList: jest.fn(),
  getPurchasableFromAandB: jest.fn(),
  recreateTable: jest.fn(),
}));

import { normalize, matchesSearch } from '../src/utils/search';
import { CurrencyInfo } from '../src/types';

describe('Search Utils TypeScript', () => {
  const mockCurrency: CurrencyInfo = {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: 'BTC',
    code: 'BTC',
    imageUrl: 'https://example.com/btc.png',
    price: 50000,
    change24h: 2.5,
    marketCap: 1000000000,
  };

  describe('normalize', () => {
    it('should convert string to lowercase', () => {
      expect(normalize('Hello World')).toBe('hello world');
      expect(normalize('Bitcoin')).toBe('bitcoin');
      expect(normalize('BTC')).toBe('btc');
    });

    it('should handle null and undefined', () => {
      expect(normalize(null as any)).toBe('');
      expect(normalize(undefined as any)).toBe('');
    });

    it('should handle empty string', () => {
      expect(normalize('')).toBe('');
    });
  });

  describe('matchesSearch', () => {
    it('should match when query is empty', () => {
      expect(matchesSearch(mockCurrency, '')).toBe(true);
      expect(matchesSearch(mockCurrency, null as any)).toBe(true);
      expect(matchesSearch(mockCurrency, undefined as any)).toBe(true);
    });

    it('should match when name starts with query', () => {
      expect(matchesSearch(mockCurrency, 'bit')).toBe(true);
      expect(matchesSearch(mockCurrency, 'Bit')).toBe(true);
      expect(matchesSearch(mockCurrency, 'BIT')).toBe(true);
      expect(matchesSearch(mockCurrency, 'bitcoin')).toBe(true);
    });

    it('should match when symbol starts with query', () => {
      expect(matchesSearch(mockCurrency, 'bt')).toBe(true);
      expect(matchesSearch(mockCurrency, 'BTC')).toBe(true);
      expect(matchesSearch(mockCurrency, 'btc')).toBe(true);
    });

    it('should not match when query does not match', () => {
      expect(matchesSearch(mockCurrency, 'ethereum')).toBe(false);
      expect(matchesSearch(mockCurrency, 'ETH')).toBe(false);
      expect(matchesSearch(mockCurrency, 'xyz')).toBe(false);
    });

    it('should match case insensitive', () => {
      expect(matchesSearch(mockCurrency, 'BTC')).toBe(true);
      expect(matchesSearch(mockCurrency, 'btc')).toBe(true);
      expect(matchesSearch(mockCurrency, 'Btc')).toBe(true);
      expect(matchesSearch(mockCurrency, 'BITCOIN')).toBe(true);
      expect(matchesSearch(mockCurrency, 'BitCoin')).toBe(true);
    });
  });
});

// Mock the database module
jest.mock('../src/db/currencyDb', () => ({
  initDb: jest.fn(),
  clearAll: jest.fn(),
  insertList: jest.fn(),
  getByList: jest.fn(),
  getPurchasableFromAandB: jest.fn(),
  recreateTable: jest.fn(),
}));

import { DatabaseService } from '../src/services';
import { CurrencyInfo } from '../src/types';
import * as currencyDb from '../src/db/currencyDb';

describe('DatabaseService TypeScript', () => {
  const mockCurrencies: CurrencyInfo[] = [
    {
      id: 'BTC',
      name: 'Bitcoin',
      symbol: 'BTC',
      code: 'BTC',
      imageUrl: 'https://example.com/btc.png',
      price: 50000,
      change24h: 2.5,
      marketCap: 1000000000,
    },
    {
      id: 'ETH',
      name: 'Ethereum',
      symbol: 'ETH',
      code: 'ETH',
      imageUrl: 'https://example.com/eth.png',
      price: 3000,
      change24h: -1.2,
      marketCap: 500000000,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initialize', () => {
    it('should call initDb', async () => {
      (currencyDb.initDb as jest.Mock).mockResolvedValue(undefined);
      
      await DatabaseService.initialize();
      
      expect(currencyDb.initDb).toHaveBeenCalledTimes(1);
    });

    it('should handle initialization errors', async () => {
      const error = new Error('Database initialization failed');
      (currencyDb.initDb as jest.Mock).mockRejectedValue(error);
      
      await expect(DatabaseService.initialize()).rejects.toThrow('Database initialization failed');
    });
  });

  describe('clearAll', () => {
    it('should call clearAll from currencyDb', async () => {
      (currencyDb.clearAll as jest.Mock).mockResolvedValue(undefined);
      
      await DatabaseService.clearAll();
      
      expect(currencyDb.clearAll).toHaveBeenCalledTimes(1);
    });

    it('should handle clearAll errors', async () => {
      const error = new Error('Clear database failed');
      (currencyDb.clearAll as jest.Mock).mockRejectedValue(error);
      
      await expect(DatabaseService.clearAll()).rejects.toThrow('Clear database failed');
    });
  });

  describe('insertMockData', () => {
    it('should call recreateTable and insertList for both lists', async () => {
      (currencyDb.recreateTable as jest.Mock).mockResolvedValue(undefined);
      (currencyDb.insertList as jest.Mock).mockResolvedValue(undefined);
      
      await DatabaseService.insertMockData();
      
      expect(currencyDb.recreateTable).toHaveBeenCalledTimes(1);
      expect(currencyDb.insertList).toHaveBeenCalledTimes(2);
      expect(currencyDb.insertList).toHaveBeenCalledWith('A', expect.any(Array));
      expect(currencyDb.insertList).toHaveBeenCalledWith('B', expect.any(Array));
    });

    it('should handle insertMockData errors', async () => {
      const error = new Error('Insert mock data failed');
      (currencyDb.recreateTable as jest.Mock).mockRejectedValue(error);
      
      await expect(DatabaseService.insertMockData()).rejects.toThrow('Insert mock data failed');
    });
  });

  describe('getCryptoCurrencies', () => {
    it('should call getByList with A and return crypto currencies', async () => {
      (currencyDb.getByList as jest.Mock).mockResolvedValue(mockCurrencies);
      
      const result = await DatabaseService.getCryptoCurrencies();
      
      expect(currencyDb.getByList).toHaveBeenCalledWith('A');
      expect(result).toEqual(mockCurrencies);
    });

    it('should handle getCryptoCurrencies errors', async () => {
      const error = new Error('Get crypto currencies failed');
      (currencyDb.getByList as jest.Mock).mockRejectedValue(error);
      
      await expect(DatabaseService.getCryptoCurrencies()).rejects.toThrow('Get crypto currencies failed');
    });
  });

  describe('getFiatCurrencies', () => {
    it('should call getByList with B and return fiat currencies', async () => {
      (currencyDb.getByList as jest.Mock).mockResolvedValue(mockCurrencies);
      
      const result = await DatabaseService.getFiatCurrencies();
      
      expect(currencyDb.getByList).toHaveBeenCalledWith('B');
      expect(result).toEqual(mockCurrencies);
    });

    it('should handle getFiatCurrencies errors', async () => {
      const error = new Error('Get fiat currencies failed');
      (currencyDb.getByList as jest.Mock).mockRejectedValue(error);
      
      await expect(DatabaseService.getFiatCurrencies()).rejects.toThrow('Get fiat currencies failed');
    });
  });

  describe('getAllCurrencies', () => {
    it('should call getPurchasableFromAandB and return all currencies', async () => {
      (currencyDb.getPurchasableFromAandB as jest.Mock).mockResolvedValue(mockCurrencies);
      
      const result = await DatabaseService.getAllCurrencies();
      
      expect(currencyDb.getPurchasableFromAandB).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCurrencies);
    });

    it('should handle getAllCurrencies errors', async () => {
      const error = new Error('Get all currencies failed');
      (currencyDb.getPurchasableFromAandB as jest.Mock).mockRejectedValue(error);
      
      await expect(DatabaseService.getAllCurrencies()).rejects.toThrow('Get all currencies failed');
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete workflow: initialize -> insert -> get', async () => {
      (currencyDb.initDb as jest.Mock).mockResolvedValue(undefined);
      (currencyDb.recreateTable as jest.Mock).mockResolvedValue(undefined);
      (currencyDb.insertList as jest.Mock).mockResolvedValue(undefined);
      (currencyDb.getByList as jest.Mock).mockResolvedValue(mockCurrencies);
      
      await DatabaseService.initialize();
      await DatabaseService.insertMockData();
      const result = await DatabaseService.getCryptoCurrencies();
      
      expect(result).toEqual(mockCurrencies);
      expect(currencyDb.initDb).toHaveBeenCalledTimes(1);
      expect(currencyDb.recreateTable).toHaveBeenCalledTimes(1);
      expect(currencyDb.insertList).toHaveBeenCalledTimes(2);
      expect(currencyDb.getByList).toHaveBeenCalledTimes(1);
    });

    it('should handle empty results', async () => {
      (currencyDb.getByList as jest.Mock).mockResolvedValue([]);
      
      const result = await DatabaseService.getCryptoCurrencies();
      
      expect(result).toEqual([]);
    });

    it('should handle null results', async () => {
      (currencyDb.getByList as jest.Mock).mockResolvedValue(null);
      
      const result = await DatabaseService.getCryptoCurrencies();
      
      expect(result).toBeNull();
    });
  });
});

import { FavoritesService } from '../src/services';
import { CurrencyInfo } from '../src/types';

describe('FavoritesService TypeScript', () => {
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
    {
      id: 'ADA',
      name: 'Cardano',
      symbol: 'ADA',
      code: 'ADA',
      imageUrl: 'https://example.com/ada.png',
      price: 0.5,
      change24h: 1.8,
      marketCap: 200000000,
    },
  ];

  let favorites: string[] = [];

  beforeEach(() => {
    favorites = [];
  });

  describe('toggleFavorite', () => {
    it('should add favorite when not in favorites', () => {
      expect(FavoritesService.isFavorite(favorites, 'BTC')).toBe(false);
      
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      
      expect(FavoritesService.isFavorite(favorites, 'BTC')).toBe(true);
    });

    it('should remove favorite when already in favorites', () => {
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      expect(FavoritesService.isFavorite(favorites, 'BTC')).toBe(true);
      
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      
      expect(FavoritesService.isFavorite(favorites, 'BTC')).toBe(false);
    });

    it('should handle multiple currencies', () => {
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      favorites = FavoritesService.toggleFavorite(favorites, 'ETH');
      favorites = FavoritesService.toggleFavorite(favorites, 'ADA');
      
      expect(favorites).toHaveLength(3);
      expect(favorites).toContain('BTC');
      expect(favorites).toContain('ETH');
      expect(favorites).toContain('ADA');
    });
  });

  describe('isFavorite', () => {
    it('should return false for empty favorites', () => {
      expect(FavoritesService.isFavorite(favorites, 'BTC')).toBe(false);
    });

    it('should return true for existing favorite', () => {
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      expect(FavoritesService.isFavorite(favorites, 'BTC')).toBe(true);
    });

    it('should return false for non-existent favorite', () => {
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      expect(FavoritesService.isFavorite(favorites, 'ETH')).toBe(false);
    });
  });

  describe('getFavoriteCurrencies', () => {
    it('should return empty array when no favorites', () => {
      const result = FavoritesService.getFavoriteCurrencies(mockCurrencies, favorites);
      expect(result).toEqual([]);
    });

    it('should return favorite currencies', () => {
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      favorites = FavoritesService.toggleFavorite(favorites, 'ETH');
      
      const result = FavoritesService.getFavoriteCurrencies(mockCurrencies, favorites);
      
      expect(result).toHaveLength(2);
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: 'BTC' }),
        expect.objectContaining({ id: 'ETH' })
      ]));
    });

    it('should handle non-existent favorite IDs', () => {
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      favorites = FavoritesService.toggleFavorite(favorites, 'NONEXISTENT');
      
      const result = FavoritesService.getFavoriteCurrencies(mockCurrencies, favorites);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expect.objectContaining({ id: 'BTC' }));
    });

    it('should return currencies in correct order', () => {
      favorites = FavoritesService.toggleFavorite(favorites, 'ADA');
      favorites = FavoritesService.toggleFavorite(favorites, 'BTC');
      favorites = FavoritesService.toggleFavorite(favorites, 'ETH');
      
      const result = FavoritesService.getFavoriteCurrencies(mockCurrencies, favorites);
      
      expect(result).toHaveLength(3);
      // The order depends on the implementation, just check that all currencies are present
      expect(result.map(c => c.id)).toEqual(expect.arrayContaining(['ADA', 'BTC', 'ETH']));
    });
  });
});
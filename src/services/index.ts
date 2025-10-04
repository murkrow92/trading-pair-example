import { CurrencyInfo, CurrencyList } from '../types';
import { CURRENCY_LIST_A_CRYPTO, CURRENCY_LIST_B_FIAT } from '../mock/currencies';
import { initDb, clearAll, insertList, getByList, getPurchasableFromAandB, recreateTable } from '../db/currencyDb';

export class DatabaseService {
  static async initialize(): Promise<void> {
    await initDb();
  }

  static async clearAll(): Promise<void> {
    await clearAll();
  }

  static async insertMockData(): Promise<void> {
    await recreateTable();
    await insertList('A', CURRENCY_LIST_A_CRYPTO);
    await insertList('B', CURRENCY_LIST_B_FIAT);
  }

  static async getCryptoCurrencies(): Promise<CurrencyList> {
    return await getByList('A');
  }

  static async getFiatCurrencies(): Promise<CurrencyList> {
    return await getByList('B');
  }

  static async getAllCurrencies(): Promise<CurrencyList> {
    return await getPurchasableFromAandB();
  }
}

export class SearchService {
  static normalize(input: string): string {
    return (input || '').toLowerCase();
  }

  static matchesSearch(term: string, item: CurrencyInfo): boolean {
    if (!term) return true;
    
    const q = this.normalize(term);
    const name = this.normalize(item.name);
    const symbol = this.normalize(item.symbol);
    
    return (
      name.startsWith(q) ||
      name.includes(' ' + q) ||
      symbol.startsWith(q)
    );
  }

  static filterCurrencies(currencies: CurrencyList, query: string): CurrencyList {
    if (!query) return currencies;
    
    return currencies.filter(currency => 
      this.matchesSearch(query, currency)
    );
  }
}

export class FavoritesService {
  static toggleFavorite(favorites: string[], id: string): string[] {
    return favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
  }

  static isFavorite(favorites: string[], id: string): boolean {
    return favorites.includes(id);
  }

  static getFavoriteCurrencies(currencies: CurrencyList, favorites: string[]): CurrencyList {
    return currencies.filter(currency => favorites.includes(currency.id));
  }
}

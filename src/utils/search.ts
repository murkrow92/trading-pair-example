import { CurrencyInfo } from '../types';

export function normalize(input: string): string {
  return (input || '').toLowerCase();
}


export function matchesSearch(item: CurrencyInfo, query: string): boolean {
  if (!query) return true;
  const q = normalize(query);
  const name = normalize(item.name);
  const symbol = normalize(item.symbol);
  if (name.startsWith(q)) return true;
  if (name.includes(' ' + q)) return true;
  if (symbol.startsWith(q)) return true;
  return false;
}

import { CurrencyInfo } from '../types';

export function normalize(input: string): string {
  return (input || '').toLowerCase();
}


export function matchesSearch(term: string, item: CurrencyInfo): boolean {
  if (!term) return true;
  const q = normalize(term);
  const name = normalize(item.name);
  const symbol = normalize(item.symbol);
  if (name.startsWith(q)) return true;
  if (name.includes(' ' + q)) return true;
  if (symbol.startsWith(q)) return true;
  return false;
}

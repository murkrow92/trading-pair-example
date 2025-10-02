import { matchesSearch } from '../src/utils/search';

describe('matchesSearch', () => {
  const ETH = { id: 'ETH', name: 'Ethereum', symbol: 'ETH' };
  const ETC = { id: 'ETC', name: 'Ethereum Classic', symbol: 'ETC' };
  const BTC = { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' };
  const BAT = { id: 'BAT', name: 'Basic Attention Token', symbol: 'BAT' };

  it('matches when name starts with query', () => {
    expect(matchesSearch('bit', BTC)).toBe(true);
    expect(matchesSearch('eth', ETH)).toBe(true);
    expect(matchesSearch('foo', BTC)).toBe(false);
  });

  it('matches partial name containing space + query', () => {
    expect(matchesSearch('classic', ETC)).toBe(true);
    // does not match when no preceding space
    const tronClassic = { id: 'TRC', name: 'Tronclassic', symbol: 'TRC' };
    expect(matchesSearch('classic', tronClassic)).toBe(false);
  });

  it('matches when symbol starts with query', () => {
    expect(matchesSearch('ET', ETH)).toBe(true);
    expect(matchesSearch('ET', ETC)).toBe(true);
    expect(matchesSearch('BE', BTC)).toBe(false);
  });

  it('empty query matches all', () => {
    expect(matchesSearch('', ETH)).toBe(true);
    expect(matchesSearch('', ETC)).toBe(true);
  });
});

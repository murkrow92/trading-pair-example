import { CurrencyInfo, CurrencyList } from '../types';

export const CURRENCY_LIST_A_CRYPTO: CurrencyList = [
  { 
    id: 'BTC', 
    name: 'Bitcoin', 
    symbol: 'BTC',
    imageUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    price: 43250.50,
    change24h: 2.45,
    marketCap: 850000000000
  },
  { 
    id: 'ETH', 
    name: 'Ethereum', 
    symbol: 'ETH',
    imageUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    price: 2650.30,
    change24h: -1.23,
    marketCap: 320000000000
  },
  { 
    id: 'XRP', 
    name: 'XRP', 
    symbol: 'XRP',
    imageUrl: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    price: 0.52,
    change24h: 5.67,
    marketCap: 29000000000
  },
  { 
    id: 'BCH', 
    name: 'Bitcoin Cash', 
    symbol: 'BCH',
    imageUrl: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash.png',
    price: 245.80,
    change24h: 1.89,
    marketCap: 4800000000
  },
  { 
    id: 'LTC', 
    name: 'Litecoin', 
    symbol: 'LTC',
    imageUrl: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
    price: 72.15,
    change24h: -0.45,
    marketCap: 5400000000
  },
  { 
    id: 'EOS', 
    name: 'EOS', 
    symbol: 'EOS',
    imageUrl: 'https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png',
    price: 0.89,
    change24h: 3.21,
    marketCap: 1000000000
  },
  { 
    id: 'BNB', 
    name: 'Binance Coin', 
    symbol: 'BNB',
    imageUrl: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    price: 315.20,
    change24h: 4.12,
    marketCap: 48000000000
  },
  { 
    id: 'LINK', 
    name: 'Chainlink', 
    symbol: 'LINK',
    imageUrl: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    price: 14.85,
    change24h: -2.34,
    marketCap: 8500000000
  },
  { 
    id: 'NEO', 
    name: 'NEO', 
    symbol: 'NEO',
    imageUrl: 'https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png',
    price: 12.30,
    change24h: 1.56,
    marketCap: 870000000
  },
  { 
    id: 'ETC', 
    name: 'Ethereum Classic', 
    symbol: 'ETC',
    imageUrl: 'https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png',
    price: 23.45,
    change24h: -0.89,
    marketCap: 3500000000
  },
  { 
    id: 'ONT', 
    name: 'Ontology', 
    symbol: 'ONT',
    imageUrl: 'https://assets.coingecko.com/coins/images/3447/large/ONT.png',
    price: 0.25,
    change24h: 2.78,
    marketCap: 220000000
  },
  { 
    id: 'CRO', 
    name: 'Crypto.com Chain', 
    symbol: 'CRO',
    imageUrl: 'https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png',
    price: 0.08,
    change24h: 6.45,
    marketCap: 2000000000
  },
  { 
    id: 'CUC', 
    name: 'Cucumber', 
    symbol: 'CUC',
    imageUrl: 'https://assets.coingecko.com/coins/images/1234/large/cucumber.png',
    price: 0.001,
    change24h: 15.67,
    marketCap: 1000000
  },
  { 
    id: 'USDC', 
    name: 'USD Coin', 
    symbol: 'USDC',
    imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    price: 1.00,
    change24h: 0.01,
    marketCap: 28000000000
  },
];

export const CURRENCY_LIST_B_FIAT: CurrencyList = [
  { id: 'SGD', name: 'Singapore Dollar', symbol: '$', code: 'SGD' },
  { id: 'EUR', name: 'Euro', symbol: '€', code: 'EUR' },
  { id: 'GBP', name: 'British Pound', symbol: '£', code: 'GBP' },
  { id: 'HKD', name: 'Hong Kong Dollar', symbol: '$', code: 'HKD' },
  { id: 'JPY', name: 'Japanese Yen', symbol: '¥', code: 'JPY' },
  { id: 'AUD', name: 'Australian Dollar', symbol: '$', code: 'AUD' },
  { id: 'USD', name: 'United States Dollar', symbol: '$', code: 'USD' },
];

export function combinePurchasableFromAandB(): CurrencyInfo[] {
  return [...CURRENCY_LIST_A_CRYPTO, ...CURRENCY_LIST_B_FIAT];
}
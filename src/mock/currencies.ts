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
  { 
    id: 'ADA', 
    name: 'Cardano', 
    symbol: 'ADA',
    imageUrl: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    price: 0.45,
    change24h: 3.21,
    marketCap: 16000000000
  },
  { 
    id: 'DOT', 
    name: 'Polkadot', 
    symbol: 'DOT',
    imageUrl: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    price: 6.78,
    change24h: -2.15,
    marketCap: 8500000000
  },
  { 
    id: 'SOL', 
    name: 'Solana', 
    symbol: 'SOL',
    imageUrl: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    price: 98.50,
    change24h: 7.89,
    marketCap: 42000000000
  },
  { 
    id: 'MATIC', 
    name: 'Polygon', 
    symbol: 'MATIC',
    imageUrl: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    price: 0.89,
    change24h: 4.56,
    marketCap: 8500000000
  },
  { 
    id: 'AVAX', 
    name: 'Avalanche', 
    symbol: 'AVAX',
    imageUrl: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle.png',
    price: 35.20,
    change24h: -1.78,
    marketCap: 13000000000
  },
  { 
    id: 'ATOM', 
    name: 'Cosmos', 
    symbol: 'ATOM',
    imageUrl: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png',
    price: 8.95,
    change24h: 2.34,
    marketCap: 3500000000
  },
  { 
    id: 'FTM', 
    name: 'Fantom', 
    symbol: 'FTM',
    imageUrl: 'https://assets.coingecko.com/coins/images/4001/large/Fantom_round.png',
    price: 0.42,
    change24h: 6.78,
    marketCap: 1200000000
  },
  { 
    id: 'ALGO', 
    name: 'Algorand', 
    symbol: 'ALGO',
    imageUrl: 'https://assets.coingecko.com/coins/images/4380/large/download.png',
    price: 0.18,
    change24h: -3.45,
    marketCap: 1300000000
  },
  { 
    id: 'VET', 
    name: 'VeChain', 
    symbol: 'VET',
    imageUrl: 'https://assets.coingecko.com/coins/images/1167/large/VeChain-Logo-768x725.png',
    price: 0.025,
    change24h: 5.67,
    marketCap: 1800000000
  },
  { 
    id: 'FIL', 
    name: 'Filecoin', 
    symbol: 'FIL',
    imageUrl: 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png',
    price: 4.85,
    change24h: 1.23,
    marketCap: 2300000000
  },
  { 
    id: 'TRX', 
    name: 'TRON', 
    symbol: 'TRX',
    imageUrl: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png',
    price: 0.095,
    change24h: -0.89,
    marketCap: 8500000000
  },
  { 
    id: 'ICP', 
    name: 'Internet Computer', 
    symbol: 'ICP',
    imageUrl: 'https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png',
    price: 12.45,
    change24h: 4.12,
    marketCap: 5600000000
  },
  { 
    id: 'THETA', 
    name: 'Theta Network', 
    symbol: 'THETA',
    imageUrl: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png',
    price: 1.25,
    change24h: -2.67,
    marketCap: 1200000000
  },
  { 
    id: 'AAVE', 
    name: 'Aave', 
    symbol: 'AAVE',
    imageUrl: 'https://assets.coingecko.com/coins/images/12645/large/AAVE.png',
    price: 95.60,
    change24h: 3.45,
    marketCap: 1400000000
  },
  { 
    id: 'UNI', 
    name: 'Uniswap', 
    symbol: 'UNI',
    imageUrl: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-v3.png',
    price: 6.78,
    change24h: -1.56,
    marketCap: 4100000000
  },
  { 
    id: 'SUSHI', 
    name: 'SushiSwap', 
    symbol: 'SUSHI',
    imageUrl: 'https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_with_chicken.png',
    price: 1.45,
    change24h: 7.89,
    marketCap: 280000000
  },
  { 
    id: 'COMP', 
    name: 'Compound', 
    symbol: 'COMP',
    imageUrl: 'https://assets.coingecko.com/coins/images/10775/large/COMP.png',
    price: 45.20,
    change24h: 2.34,
    marketCap: 320000000
  },
  { 
    id: 'MKR', 
    name: 'Maker', 
    symbol: 'MKR',
    imageUrl: 'https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png',
    price: 1850.75,
    change24h: -0.78,
    marketCap: 1700000000
  },
  { 
    id: 'YFI', 
    name: 'yearn.finance', 
    symbol: 'YFI',
    imageUrl: 'https://assets.coingecko.com/coins/images/11849/large/yfi-192x192.png',
    price: 8500.25,
    change24h: 4.56,
    marketCap: 280000000
  },
  { 
    id: 'DOGE', 
    name: 'Dogecoin', 
    symbol: 'DOGE',
    imageUrl: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    price: 0.085,
    change24h: 3.21,
    marketCap: 12000000000
  },
  { 
    id: 'SHIB', 
    name: 'Shiba Inu', 
    symbol: 'SHIB',
    imageUrl: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
    price: 0.0000085,
    change24h: -2.15,
    marketCap: 5000000000
  },
  { 
    id: 'MATIC', 
    name: 'Polygon', 
    symbol: 'MATIC',
    imageUrl: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    price: 0.95,
    change24h: 1.85,
    marketCap: 9000000000
  },
];

export const CURRENCY_LIST_B_FIAT: CurrencyList = [
  { 
    id: 'SGD', 
    name: 'Singapore Dollar', 
    symbol: '$', 
    code: 'SGD',
    imageUrl: 'https://flagcdn.com/w40/sg.png',
    price: 1.35,
    change24h: 0.12,
    marketCap: 0
  },
  { 
    id: 'EUR', 
    name: 'Euro', 
    symbol: '€', 
    code: 'EUR',
    imageUrl: 'https://flagcdn.com/w40/eu.png',
    price: 0.92,
    change24h: -0.08,
    marketCap: 0
  },
  { 
    id: 'GBP', 
    name: 'British Pound', 
    symbol: '£', 
    code: 'GBP',
    imageUrl: 'https://flagcdn.com/w40/gb.png',
    price: 0.79,
    change24h: 0.15,
    marketCap: 0
  },
  { 
    id: 'HKD', 
    name: 'Hong Kong Dollar', 
    symbol: '$', 
    code: 'HKD',
    imageUrl: 'https://flagcdn.com/w40/hk.png',
    price: 7.82,
    change24h: 0.03,
    marketCap: 0
  },
  { 
    id: 'JPY', 
    name: 'Japanese Yen', 
    symbol: '¥', 
    code: 'JPY',
    imageUrl: 'https://flagcdn.com/w40/jp.png',
    price: 149.25,
    change24h: -0.25,
    marketCap: 0
  },
  { 
    id: 'AUD', 
    name: 'Australian Dollar', 
    symbol: '$', 
    code: 'AUD',
    imageUrl: 'https://flagcdn.com/w40/au.png',
    price: 1.52,
    change24h: 0.18,
    marketCap: 0
  },
  { 
    id: 'USD', 
    name: 'United States Dollar', 
    symbol: '$', 
    code: 'USD',
    imageUrl: 'https://flagcdn.com/w40/us.png',
    price: 1.00,
    change24h: 0.00,
    marketCap: 0
  },
];

export function combinePurchasableFromAandB(): CurrencyInfo[] {
  return [...CURRENCY_LIST_A_CRYPTO, ...CURRENCY_LIST_B_FIAT];
}
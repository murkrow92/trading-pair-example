import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cryptoApiService } from '../services/cryptoApiService';
import { CurrencyInfo } from '../types';


export const QUERY_KEYS = {
  TOP_CRYPTOCURRENCIES: 'top-cryptocurrencies',
  CRYPTOCURRENCY_BY_ID: 'cryptocurrency-by-id',
  SEARCH_CRYPTOCURRENCIES: 'search-cryptocurrencies',
} as const;


export const useTopCryptocurrencies = (limit: number = 50) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TOP_CRYPTOCURRENCIES, limit],
    queryFn: () => cryptoApiService.getTopCryptocurrencies(limit),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};


export const useCryptocurrencyById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CRYPTOCURRENCY_BY_ID, id],
    queryFn: () => cryptoApiService.getCryptocurrencyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    retry: 3,
  });
};


export const useSearchCryptocurrencies = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_CRYPTOCURRENCIES, query],
    queryFn: () => cryptoApiService.searchCryptocurrencies(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, 
    gcTime: 5 * 60 * 1000, 
    retry: 2,
  });
};


export const usePrefetchCryptocurrency = () => {
  const queryClient = useQueryClient();

  const prefetchCryptocurrency = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.CRYPTOCURRENCY_BY_ID, id],
      queryFn: () => cryptoApiService.getCryptocurrencyById(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchTopCryptocurrencies = (limit: number = 50) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.TOP_CRYPTOCURRENCIES, limit],
      queryFn: () => cryptoApiService.getTopCryptocurrencies(limit),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    prefetchCryptocurrency,
    prefetchTopCryptocurrencies,
  };
};


export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries();
  };

  const invalidateTopCryptocurrencies = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.TOP_CRYPTOCURRENCIES],
    });
  };

  const invalidateSearch = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.SEARCH_CRYPTOCURRENCIES],
    });
  };

  return {
    invalidateAll,
    invalidateTopCryptocurrencies,
    invalidateSearch,
  };
};

// src/hooks/useSites.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesApi, crawlsApi } from '../services/api';

export function useSites() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['sites'],
    queryFn: () => sitesApi.getAll(),
    // If any site is 'crawling', poll every 2s
    refetchInterval: (query) => {
      const data = query.state.data;
      return data?.some(site => site.status === 'crawling') ? 2000 : false;
    }
  });

  const startCrawl = useMutation({
    mutationFn: (siteId) => crawlsApi.start(siteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] })
  });

  return {
    sites: query.data || [],
    isLoading: query.isLoading,
    startCrawl: startCrawl.mutate
  };
}
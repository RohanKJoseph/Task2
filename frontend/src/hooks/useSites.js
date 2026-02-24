 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesApi, crawlsApi } from '../services/api';

export function useSites() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['sites'],
    queryFn: () => sitesApi.getAll(),
   
    refetchInterval: (query) => {
      const data = query.state.data;
      return data?.some(site => site.status === 'crawling') ? 2000 : false;
    }
  });

  const startCrawl = useMutation({
    mutationFn: (siteId) => crawlsApi.start(siteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] })
  });

  const stopCrawl = useMutation({
    mutationFn: async (siteId) => {
      const history = await crawlsApi.history(siteId, { limit: 1 });
      const latest = Array.isArray(history) ? history[0] : null;
      if (!latest?.id) {
        throw new Error('No crawl history found for this site');
      }
      return crawlsApi.stop(latest.id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] })
  });

  const deleteSite = useMutation({
    mutationFn: (siteId) => sitesApi.delete(siteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] })
  });

  return {
    sites: query.data || [],
    isLoading: query.isLoading,
    startCrawl: startCrawl.mutate,
    stopCrawl: stopCrawl.mutate,
    deleteSite: deleteSite.mutate
  };
}
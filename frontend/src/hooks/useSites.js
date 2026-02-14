// src/hooks/useSites.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useSites() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3000/api/sites');
      return data.data;
    },
    // LOGIC: If any site is 'crawling', refresh every 2 seconds
    refetchInterval: (query) => {
      const data = query.state.data;
      // Logic: If any site status is currently 'crawling', poll every 2s
      return data?.some(site => site.status === 'crawling') ? 2000 : false;
    }
  });

  const startCrawl = useMutation({
    mutationFn: (siteId) => axios.post('http://localhost:3000/api/crawls/start', { siteId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] })
  });

  return { sites: query.data || [], isLoading: query.isLoading, startCrawl: startCrawl.mutate };
}
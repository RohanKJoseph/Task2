// src/hooks/useCrawls.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { crawlsApi } from '../services/api';

export function useStartCrawl() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (siteId) => crawlsApi.start(siteId),
    onSuccess: () => qc.invalidateQueries(['sites'])
  });
}

export function useStopCrawl() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (crawlId) => crawlsApi.stop(crawlId),
    onSuccess: () => {
      qc.invalidateQueries(['sites']);
      qc.invalidateQueries(['crawl']);
    }
  });
}

export function useCrawlDetails(crawlId) {
  return useQuery(['crawl', crawlId], () => crawlsApi.getById(crawlId), { enabled: !!crawlId });
}

export function useCrawlIssues(crawlId, params = {}) {
  return useQuery(['crawl', crawlId, 'issues', params], () => crawlsApi.getIssues(crawlId, params), {
    enabled: !!crawlId
  });
}

export function useCrawlIssueDetail(crawlId, issueId) {
  return useQuery(['crawl', crawlId, 'issue', issueId], () => crawlsApi.getIssue(crawlId, issueId), {
    enabled: !!crawlId && !!issueId
  });
}

export function useCrawlHistory(siteId, limit = 10) {
  return useQuery(['site', siteId, 'crawlHistory', limit], () => crawlsApi.history(siteId, { limit }), {
    enabled: !!siteId
  });
}

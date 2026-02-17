// src/hooks/useCrawls.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { crawlsApi } from '../services/api';

export function useStartCrawl() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (siteId) => crawlsApi.start(siteId),
    onSuccess: (_data, siteId) => {
      qc.invalidateQueries({ queryKey: ['sites'] });
      qc.invalidateQueries({ queryKey: ['site', siteId, 'crawlHistory'] });
    }
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

export function useFixCrawlIssues() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (crawlId) => crawlsApi.fixIssues(crawlId),
    onSuccess: (_data, crawlId) => {
      qc.invalidateQueries({ queryKey: ['sites'] });
      qc.invalidateQueries({ queryKey: ['crawl', crawlId] });
      qc.invalidateQueries({ queryKey: ['crawl', crawlId, 'issues'] });
    }
  });
}

export function useCrawlDetails(crawlId) {
  return useQuery({
    queryKey: ['crawl', crawlId],
    queryFn: () => crawlsApi.getById(crawlId),
    enabled: !!crawlId
  });
}

export function useCrawlIssues(crawlId, params = {}) {
  return useQuery({
    queryKey: ['crawl', crawlId, 'issues', params],
    queryFn: () => crawlsApi.getIssues(crawlId, params),
    enabled: !!crawlId
  });
}

export function useCrawlIssueDetail(crawlId, issueId) {
  return useQuery({
    queryKey: ['crawl', crawlId, 'issue', issueId],
    queryFn: () => crawlsApi.getIssue(crawlId, issueId),
    enabled: !!crawlId && !!issueId
  });
}

export function useCrawlHistory(siteId, limit = 10) {
  return useQuery({
    queryKey: ['site', siteId, 'crawlHistory', limit],
    queryFn: () => crawlsApi.history(siteId, { limit }),
    enabled: !!siteId
  });
}

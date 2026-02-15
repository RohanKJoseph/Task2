// src/hooks/useSite.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesApi } from '../services/api';

export function useSite(siteId) {
  return useQuery(['site', siteId], () => sitesApi.getById(siteId), { enabled: !!siteId });
}

export function useCreateSite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (siteData) => sitesApi.add(siteData),
    onSuccess: () => qc.invalidateQueries(['sites'])
  });
}

export function useUpdateSiteSettings(siteId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (settings) => sitesApi.updateSettings(siteId, settings),
    onSuccess: () => {
      qc.invalidateQueries(['sites']);
      qc.invalidateQueries(['site', siteId]);
    }
  });
}

export function useDeleteSite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (siteId) => sitesApi.delete(siteId),
    onSuccess: () => qc.invalidateQueries(['sites'])
  });
}

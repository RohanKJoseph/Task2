 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { issueTypesApi } from '../services/api';

export function useIssueTypes(params = {}) {
  return useQuery({
    queryKey: ['issueTypes', params],
    queryFn: () => issueTypesApi.getAll(params)
  });
}

export function useIssueTypesGrouped() {
  return useQuery({
    queryKey: ['issueTypes', 'grouped'],
    queryFn: () => issueTypesApi.getGrouped()
  });
}

export function useIssueTypeStatistics() {
  return useQuery({
    queryKey: ['issueTypes', 'statistics'],
    queryFn: () => issueTypesApi.getStatistics()
  });
}

export function useIssueType(issueTypeId) {
  return useQuery({
    queryKey: ['issueType', issueTypeId],
    queryFn: () => issueTypesApi.getById(issueTypeId),
    enabled: !!issueTypeId
  });
}

export function useUpdateIssueType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ issueTypeId, updates }) => issueTypesApi.update(issueTypeId, updates),
    onSuccess: () => qc.invalidateQueries(['issueTypes'])
  });
}

export function useBulkUpdateIssueTypes() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (updates) => issueTypesApi.bulkUpdate(updates),
    onSuccess: () => qc.invalidateQueries(['issueTypes'])
  });
}

export function useResetIssueType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (issueTypeId) => issueTypesApi.reset(issueTypeId),
    onSuccess: () => qc.invalidateQueries(['issueTypes'])
  });
}

// src/services/api.js
import axios from 'axios';

// base API URL (override with VITE_API_BASE if needed)
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

const unwrap = (res) => (res.data && res.data.hasOwnProperty('data')) ? res.data.data : res.data;

export const sitesApi = {
  getAll: () => apiClient.get('/sites').then(unwrap),
  getById: (siteId) => apiClient.get(`/sites/${siteId}`).then(unwrap),
  add: (siteData) => apiClient.post('/sites', siteData).then(unwrap),
  updateSettings: (siteId, settings) => apiClient.put(`/sites/${siteId}/settings`, settings).then(unwrap),
  delete: (siteId) => apiClient.delete(`/sites/${siteId}`).then(unwrap)
};

export const crawlsApi = {
  start: (siteId) => apiClient.post('/crawls/start', { siteId }).then(unwrap),
  stop: (crawlId) => apiClient.post(`/crawls/${crawlId}/stop`).then(unwrap),
  getById: (crawlId) => apiClient.get(`/crawls/${crawlId}`).then(unwrap),
  getIssues: (crawlId, params = {}) => apiClient.get(`/crawls/${crawlId}/issues`, { params }).then(unwrap),
  getIssue: (crawlId, issueId) => apiClient.get(`/crawls/${crawlId}/issues/${issueId}`).then(unwrap),
  history: (siteId, params = {}) => apiClient.get(`/crawls/history/${siteId}`, { params }).then(unwrap)
};

export const issueTypesApi = {
  getAll: (params = {}) => apiClient.get('/issue-types', { params }).then(unwrap),
  getGrouped: () => apiClient.get('/issue-types/grouped').then(unwrap),
  getStatistics: () => apiClient.get('/issue-types/statistics').then(unwrap),
  getById: (id) => apiClient.get(`/issue-types/${id}`).then(unwrap),
  update: (id, updates) => apiClient.put(`/issue-types/${id}`, updates).then(unwrap),
  bulkUpdate: (updates) => apiClient.post('/issue-types/bulk-update', { updates }).then(unwrap),
  reset: (id) => apiClient.post(`/issue-types/${id}/reset`).then(unwrap)
};

export default apiClient;
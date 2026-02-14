// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const sitesApi = {
  // GET /api/sites
  getAll: () => axios.get(`${API_URL}/sites`).then(res => res.data.data),
  
  // POST /api/sites
  add: (siteData) => axios.post(`${API_URL}/sites`, siteData).then(res => res.data.data),
  
  // POST /api/crawls/start
  startCrawl: (siteId) => axios.post(`${API_URL}/crawls/start`, { siteId }).then(res => res.data)
};
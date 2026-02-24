import {create} from 'zustand';

export const useAppStore = create((set) => ({
  selectedSiteId: null,
  selectedCrawlId: null,
  compareCrawlId: null,
  issueFilters: { severity: null, category: null, search: '' },
  ui: { showIssueSettings: false, showAddSite: false },

  setSelectedSite: (id) => set({ selectedSiteId: id }),
  setSelectedCrawl: (id) => set({ selectedCrawlId: id }),
  setCompareCrawl: (id) => set({ compareCrawlId: id }),
  setIssueFilters: (filters) => set((s) => ({ issueFilters: { ...s.issueFilters, ...filters } })),

  toggleIssueSettings: (value) => set((s) => ({ ui: { ...s.ui, showIssueSettings: typeof value === 'boolean' ? value : !s.ui.showIssueSettings } })),
  toggleAddSite: (value) => set((s) => ({ ui: { ...s.ui, showAddSite: typeof value === 'boolean' ? value : !s.ui.showAddSite } }))
}));

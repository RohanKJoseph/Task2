import { ISSUE_TYPES } from '../data/issueTypes.js';

/**
 * Issue configuration service
 */

const issueSettings = new Map();

/**
 * Get all available issue types
 */
export function getAllIssueTypes(filters = {}) {
  let issues = [...ISSUE_TYPES];

  if (filters.category) {
    issues = issues.filter(i => i.category === filters.category);
  }

  if (filters.severity) {
    issues = issues.filter(i => i.severity === filters.severity);
  }

  if (filters.enabled !== undefined) {
    issues = issues.filter(i => i.enabled === filters.enabled);
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    issues = issues.filter(i =>
      i.name.toLowerCase().includes(search) ||
      i.description.toLowerCase().includes(search)
    );
  }

  return issues.map(issue => {
    const settings = issueSettings.get(issue.id) || {};
    return {
      ...issue,
      enabled: settings.enabled !== undefined ? settings.enabled : issue.enabled,
      severity: settings.severity || issue.severity
    };
  });
}

/**
 * Get issue types grouped by category
 */
export function getIssueTypesByCategory() {
  const issues = getAllIssueTypes();
  const grouped = {};

  issues.forEach(issue => {
    if (!grouped[issue.category]) {
      grouped[issue.category] = [];
    }
    grouped[issue.category].push(issue);
  });

  return grouped;
}

/**
 * Get issue type by ID
 */
export function getIssueTypeById(issueTypeId) {
  const issue = ISSUE_TYPES.find(i => i.id === issueTypeId);
  if (!issue) {
    throw new Error('Issue type not found');
  }

  const settings = issueSettings.get(issueTypeId) || {};
  return {
    ...issue,
    enabled: settings.enabled !== undefined ? settings.enabled : issue.enabled,
    severity: settings.severity || issue.severity
  };
}

/**
 * Update issue type settings
 */
export function updateIssueType(issueTypeId, updates) {
  const issue = ISSUE_TYPES.find(i => i.id === issueTypeId);
  if (!issue) {
    throw new Error('Issue type not found');
  }

  const currentSettings = issueSettings.get(issueTypeId) || {};
  const newSettings = { ...currentSettings, ...updates };

  issueSettings.set(issueTypeId, newSettings);

  return {
    ...issue,
    ...newSettings
  };
}

/**
 * Bulk update issue types
 */
export function bulkUpdateIssueTypes(updates) {
  const results = [];

  for (const update of updates) {
    try {
      const result = updateIssueType(update.issueTypeId, update.settings);
      results.push({ success: true, issueTypeId: update.issueTypeId, data: result });
    } catch (error) {
      results.push({ success: false, issueTypeId: update.issueTypeId, error: error.message });
    }
  }

  return results;
}

/**
 * Reset issue type to default settings
 */
export function resetIssueType(issueTypeId) {
  const issue = ISSUE_TYPES.find(i => i.id === issueTypeId);
  if (!issue) {
    throw new Error('Issue type not found');
  }

  issueSettings.delete(issueTypeId);
  return issue;
}

/**
 * Get issue statistics
 */
export function getIssueStatistics() {
  const issues = getAllIssueTypes();

  const stats = {
    total: issues.length,
    enabled: issues.filter(i => i.enabled).length,
    disabled: issues.filter(i => !i.enabled).length,
    byCategory: {},
    bySeverity: {
      error: issues.filter(i => i.severity === 'error').length,
      warning: issues.filter(i => i.severity === 'warning').length,
      notice: issues.filter(i => i.severity === 'notice').length
    }
  };

  issues.forEach(issue => {
    if (!stats.byCategory[issue.category]) {
      stats.byCategory[issue.category] = 0;
    }
    stats.byCategory[issue.category]++;
  });

  return stats;
}

export default {
  getAllIssueTypes,
  getIssueTypesByCategory,
  getIssueTypeById,
  updateIssueType,
  bulkUpdateIssueTypes,
  resetIssueType,
  getIssueStatistics
};

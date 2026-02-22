import { v4 as uuidv4 } from 'uuid';
import { ISSUE_TYPES } from '../data/issueTypes.js';

/**
 * Mock crawl service that simulates site crawling
 */

export const storage = {
  sites: [],
  crawls: [],
  issues: []
};

/**
 * Generate random issues for a crawl
 */
function generateRandomIssues(siteId, crawlId, urlsCrawled) {
  const issues = [];
  const enabledIssueTypes = ISSUE_TYPES.filter(it => it.enabled);

  enabledIssueTypes.forEach(issueType => {
    const count = Math.floor(Math.random() * Math.min(50, urlsCrawled * 0.3));

    if (count > 0) {
      issues.push({
        id: uuidv4(),
        siteId,
        crawlId,
        issueTypeId: issueType.id,
        name: issueType.name,
        category: issueType.category,
        severity: issueType.severity,
        count,
        affectedUrls: generateMockUrls(count),
        changes: Math.floor(Math.random() * 10) - 5,
        added: Math.floor(Math.random() * count * 0.3),
        removed: Math.floor(Math.random() * count * 0.2),
        crawledCount: count,
        description: issueType.description,
        impact: issueType.impact,
        fixingComplexity: issueType.fixingComplexity
      });
    }
  });

  return issues;
}

/**
 * Generate mock URLs for affected pages
 */
function generateMockUrls(count) {
  const urls = [];
  const paths = [
    '/about', '/contact', '/products', '/services', '/blog',
    '/products/item-1', '/products/item-2', '/blog/post-1',
    '/category/tech', '/category/news', '/user/profile'
  ];

  for (let i = 0; i < Math.min(count, 20); i++) {
    urls.push({
      url: paths[Math.floor(Math.random() * paths.length)] + (i > 0 ? `-${i}` : ''),
      statusCode: Math.random() > 0.9 ? 404 : 200,
      foundOn: paths[Math.floor(Math.random() * paths.length)]
    });
  }

  return urls;
}

/**
 * Calculate health score based on issues
 * Score is based on issue density and distribution
 */
function calculateHealthScore(issues, urlsCrawled = 733) {
  if (!issues || issues.length === 0) {
    return 100; // Perfect score if no issues
  }
  
  // Count issues by severity
  const errorCount = issues.filter(i => i.severity === 'error').reduce((sum, i) => sum + i.count, 0);
  const warningCount = issues.filter(i => i.severity === 'warning').reduce((sum, i) => sum + i.count, 0);
  const noticeCount = issues.filter(i => i.severity === 'notice').reduce((sum, i) => sum + i.count, 0);
  
  const totalIssues = errorCount + warningCount + noticeCount;
  
  if (totalIssues === 0) {
    return 100;
  }
  
  // Calculate issue density (issues per page crawled)
  const issueDensity = totalIssues / Math.max(1, urlsCrawled);
  
  // Base score calculation
  // Score formula: 100 * e^(-density) gives us a smooth exponential decay
  // This means: no issues = 100, as density increases, score decreases exponentially
  let score = 100 * Math.exp(-issueDensity);
  
  // Add severity weighting (errors hurt more than warnings)
  const errorWeight = (errorCount / Math.max(1, totalIssues)) * 20;
  score -= errorWeight;
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Simulate crawl progress
 */
export async function simulateCrawl(siteId, crawlId) {
  const site = storage.sites.find(s => s.id === siteId);
  if (!site) return;

  const crawl = storage.crawls.find(c => c.id === crawlId);
  if (!crawl) return;

  const stages = [
    { progress: 10, status: 'crawling', message: 'Initializing crawler...' },
    { progress: 25, status: 'crawling', message: 'Discovering URLs...' },
    { progress: 50, status: 'crawling', message: 'Crawling pages...' },
    { progress: 75, status: 'crawling', message: 'Analyzing content...' },
    { progress: 90, status: 'crawling', message: 'Processing issues...' },
    { progress: 100, status: 'completed', message: 'Crawl completed' }
  ];

  for (const stage of stages) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if crawl was stopped
    const currentCrawl = storage.crawls.find(c => c.id === crawlId);
    if (!currentCrawl || currentCrawl.status === 'stopped') {
      return;
    }

    crawl.progress = stage.progress;
    crawl.status = stage.status;
    crawl.currentMessage = stage.message;

    if (stage.status === 'completed') {
      crawl.completedAt = new Date().toISOString();
      crawl.duration = Math.round((new Date(crawl.completedAt) - new Date(crawl.startedAt)) / 1000);

      const issues = generateRandomIssues(siteId, crawlId, crawl.urlsCrawled);
      storage.issues.push(...issues);

      crawl.totalIssues = issues.length;
      crawl.errorsCount = issues.filter(i => i.severity === 'error').reduce((sum, i) => sum + i.count, 0);
      crawl.warningsCount = issues.filter(i => i.severity === 'warning').reduce((sum, i) => sum + i.count, 0);
      crawl.noticesCount = issues.filter(i => i.severity === 'notice').reduce((sum, i) => sum + i.count, 0);

      crawl.healthScore = calculateHealthScore(issues, crawl.urlsCrawled);

      site.lastCrawl = crawl.startedAt;
      site.status = 'completed';
      site.healthScore = crawl.healthScore;
      site.urlsCrawled = crawl.urlsCrawled;
      site.errorsCount = crawl.errorsCount;
      site.warningsCount = crawl.warningsCount;
      site.noticesCount = crawl.noticesCount;
    }
  }
}

/**
 * Add a new site
 */
export function addSite(siteData) {
  const site = {
    id: uuidv4(),
    name: siteData.name,
    url: siteData.url,
    createdAt: new Date().toISOString(),
    lastCrawl: null,
    status: 'not_crawled',
    healthScore: 0,
    urlsCrawled: 0,
    errorsCount: 0,
    warningsCount: 0,
    noticesCount: 0,
    settings: {
      maxPages: siteData.maxPages || 1000,
      crawlSubdomains: siteData.crawlSubdomains || false,
      respectRobotsTxt: siteData.respectRobotsTxt !== false,
      userAgent: siteData.userAgent || 'SiteAuditBot/1.0',
      maxDepth: siteData.maxDepth || 10,
      crawlSpeed: siteData.crawlSpeed || 'normal'
    }
  };

  storage.sites.push(site);
  return site;
}

/**
 * Start a new crawl
 */
export function startCrawl(siteId) {
  const site = storage.sites.find(s => s.id === siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  const crawl = {
    id: uuidv4(),
    siteId,
    startedAt: new Date().toISOString(),
    completedAt: null,
    status: 'crawling',
    progress: 0,
    currentMessage: 'Starting crawl...',
    healthScore: 0,
    urlsCrawled: Math.floor(Math.random() * 500) + 500,
    internalPages: 0,
    externalPages: 0,
    resources: 0,
    totalIssues: 0,
    errorsCount: 0,
    warningsCount: 0,
    noticesCount: 0,
    pagesWithErrors: 0,
    pagesWithoutErrors: 0,
    duration: 0
  };

  storage.crawls.push(crawl);
  site.status = 'crawling';

  simulateCrawl(siteId, crawl.id).catch(console.error);

  return crawl;
}

/**
 * Get crawl details
 */
export function getCrawlDetails(crawlId) {
  const crawl = storage.crawls.find(c => c.id === crawlId);
  if (!crawl) {
    throw new Error('Crawl not found');
  }

  const issues = storage.issues.filter(i => i.crawlId === crawlId);

  const internalPages = Math.floor(crawl.urlsCrawled * 0.85);
  const resources = Math.floor(crawl.urlsCrawled * 0.15);
  const pagesWithErrors = issues
    .filter(i => i.severity === 'error')
    .reduce((sum, i) => sum + i.count, 0);

  return {
    ...crawl,
    internalPages,
    resources,
    pagesWithErrors,
    pagesWithoutErrors: internalPages - pagesWithErrors,
    issues: issues.map(issue => ({
      id: issue.id,
      issueTypeId: issue.issueTypeId,
      name: issue.name,
      category: issue.category,
      severity: issue.severity,
      count: issue.count,
      changes: issue.changes,
      added: issue.added,
      removed: issue.removed
    }))
  };
}

/**
 * Get crawl history for a site
 */
export function getCrawlHistory(siteId, limit = 10) {
  return storage.crawls
    .filter(c => c.siteId === siteId)
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
    .slice(0, limit)
    .map(crawl => ({
      id: crawl.id,
      startedAt: crawl.startedAt,
      completedAt: crawl.completedAt,
      status: crawl.status,
      healthScore: crawl.healthScore,
      urlsCrawled: crawl.urlsCrawled,
      totalIssues: crawl.totalIssues,
      errorsCount: crawl.errorsCount,
      warningsCount: crawl.warningsCount,
      noticesCount: crawl.noticesCount,
      duration: crawl.duration
    }));
}

/**
 * Get all sites
 */
export function getAllSites() {
  return storage.sites.map(site => ({
    id: site.id,
    name: site.name,
    url: site.url,
    createdAt: site.createdAt,
    lastCrawl: site.lastCrawl,
    status: site.status,
    healthScore: site.healthScore,
    urlsCrawled: site.urlsCrawled,
    errorsCount: site.errorsCount,
    warningsCount: site.warningsCount,
    noticesCount: site.noticesCount
  }));
}

/**
 * Get site by ID
 */
export function getSiteById(siteId) {
  const site = storage.sites.find(s => s.id === siteId);
  if (!site) {
    throw new Error('Site not found');
  }
  return site;
}

/**
 * Delete site
 */
export function deleteSite(siteId) {
  const index = storage.sites.findIndex(s => s.id === siteId);
  if (index === -1) {
    throw new Error('Site not found');
  }

  storage.crawls = storage.crawls.filter(c => c.siteId !== siteId);
  storage.issues = storage.issues.filter(i => i.siteId !== siteId);

  storage.sites.splice(index, 1);
  return { success: true };
}

/**
 * Update site settings
 */
export function updateSiteSettings(siteId, settings) {
  const site = storage.sites.find(s => s.id === siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  site.settings = { ...site.settings, ...settings };
  return site;
}

/**
 * Stop crawl
 */
export function stopCrawl(crawlId) {
  const crawl = storage.crawls.find(c => c.id === crawlId);
  if (!crawl) {
    throw new Error('Crawl not found');
  }

  if (crawl.status === 'crawling') {
    crawl.status = 'stopped';
    crawl.completedAt = new Date().toISOString();
    crawl.currentMessage = 'Crawl stopped by user';

    const site = storage.sites.find(s => s.id === crawl.siteId);
    if (site) {
      site.status = 'stopped';
    }
  }

  return crawl;
}

/**
 * Fix all issues for a crawl (AI simulation)
 */
export function fixCrawlIssues(crawlId) {
  const crawl = storage.crawls.find(c => c.id === crawlId);
  if (!crawl) {
    throw new Error('Crawl not found');
  }

  storage.issues = storage.issues.filter(i => i.crawlId !== crawlId);

  crawl.totalIssues = 0;
  crawl.errorsCount = 0;
  crawl.warningsCount = 0;
  crawl.noticesCount = 0;
  crawl.pagesWithErrors = 0;
  crawl.pagesWithoutErrors = crawl.internalPages || crawl.urlsCrawled;
  crawl.healthScore = 100;

  const site = storage.sites.find(s => s.id === crawl.siteId);
  if (site) {
    site.healthScore = crawl.healthScore;
    site.errorsCount = 0;
    site.warningsCount = 0;
    site.noticesCount = 0;
  }

  return crawl;
}

/**
 * Get issues for a crawl with filtering
 */
export function getIssuesForCrawl(crawlId, filters = {}) {
  let issues = storage.issues.filter(i => i.crawlId === crawlId);

  if (filters.severity) {
    issues = issues.filter(i => i.severity === filters.severity);
  }

  if (filters.category) {
    issues = issues.filter(i => i.category === filters.category);
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    issues = issues.filter(i =>
      i.name.toLowerCase().includes(search) ||
      i.description.toLowerCase().includes(search)
    );
  }

  const sortBy = filters.sortBy || 'count';
  const sortOrder = filters.sortOrder || 'desc';

  issues.sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'count') {
      comparison = a.count - b.count;
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'severity') {
      const severityOrder = { error: 3, warning: 2, notice: 1 };
      comparison = severityOrder[a.severity] - severityOrder[b.severity];
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    issues: issues.slice(start, end),
    total: issues.length,
    page,
    limit,
    totalPages: Math.ceil(issues.length / limit)
  };
}

/**
 * Get detailed issue information
 */
export function getIssueDetails(issueId) {
  const issue = storage.issues.find(i => i.id === issueId);
  if (!issue) {
    throw new Error('Issue not found');
  }

  return issue;
}

// At the bottom of crawlService.js
// addSite({ name: "CodeDesign Webs", url: "https://codedesign.ai" });
// addSite({ name: "Rohan's Portfolio", url: "https://rohan.dev" });
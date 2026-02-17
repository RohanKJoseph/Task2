import express from 'express';
import * as crawlService from '../services/crawlService.js';

const router = express.Router();

/**
 * POST /api/crawls/start
 * Start a new crawl for a site
 */
router.post('/start', (req, res) => {
  try {
    const { siteId } = req.body;
    
    if (!siteId) {
      return res.status(400).json({
        success: false,
        error: 'Site ID is required'
      });
    }
    
    const crawl = crawlService.startCrawl(siteId);
    
    res.status(201).json({
      success: true,
      data: crawl,
      message: 'Crawl started successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/crawls/:crawlId/stop
 * Stop a running crawl
 */
router.post('/:crawlId/stop', (req, res) => {
  try {
    const { crawlId } = req.params;
    const crawl = crawlService.stopCrawl(crawlId);
    
    res.json({
      success: true,
      data: crawl,
      message: 'Crawl stopped successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/crawls/:crawlId/fix-ai
 * Simulate fixing all issues using AI
 */
router.post('/:crawlId/fix-ai', (req, res) => {
  try {
    const { crawlId } = req.params;
    const result = crawlService.fixCrawlIssues(crawlId);

    res.json({
      success: true,
      data: result,
      message: 'Issues fixed successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/crawls/:crawlId
 * Get crawl details with issues
 */
router.get('/:crawlId', (req, res) => {
  try {
    const { crawlId } = req.params;
    const crawl = crawlService.getCrawlDetails(crawlId);
    
    res.json({
      success: true,
      data: crawl
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/crawls/:crawlId/issues
 * Get issues for a specific crawl with filtering and pagination
 */
router.get('/:crawlId/issues', (req, res) => {
  try {
    const { crawlId } = req.params;
    const { severity, category, search, sortBy, sortOrder, page, limit } = req.query;
    
    const result = crawlService.getIssuesForCrawl(crawlId, {
      severity,
      category,
      search,
      sortBy,
      sortOrder,
      page,
      limit
    });
    
    res.json({
      success: true,
      data: result.issues,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/crawls/:crawlId/issues/:issueId
 * Get detailed information about a specific issue
 */
router.get('/:crawlId/issues/:issueId', (req, res) => {
  try {
    const { issueId } = req.params;
    const issue = crawlService.getIssueDetails(issueId);
    
    res.json({
      success: true,
      data: issue
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/crawls/history/:siteId
 * Get crawl history for a site
 */
router.get('/history/:siteId', (req, res) => {
  try {
    const { siteId } = req.params;
    const { limit } = req.query;
    
    const history = crawlService.getCrawlHistory(siteId, limit ? parseInt(limit) : 10);
    
    res.json({
      success: true,
      data: history,
      total: history.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

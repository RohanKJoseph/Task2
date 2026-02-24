import express from 'express';
import * as crawlService from '../services/crawlService.js';

const router = express.Router();

/**
 * POST /api/sites
 * Add a new site
 */
router.post('/', (req, res) => {
  try {
    const { name, url, maxPages, crawlSubdomains, respectRobotsTxt, userAgent, maxDepth, crawlSpeed } = req.body;

    if (!name || !url) {
      return res.status(400).json({
        success: false,
        error: 'Name and URL are required'
      });
    }

    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      });
    }

    const site = crawlService.addSite({
      name,
      url,
      maxPages,
      crawlSubdomains,
      respectRobotsTxt,
      userAgent,
      maxDepth,
      crawlSpeed
    });

    res.status(201).json({
      success: true,
      data: site
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/sites
 * Get all sites
 */
router.get('/', (req, res) => {
  try {
    const sites = crawlService.getAllSites();

    res.json({
      success: true,
      data: sites,
      total: sites.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/sites/:siteId
 * Get site details
 */
router.get('/:siteId', (req, res) => {
  try {
    const { siteId } = req.params;
    const site = crawlService.getSiteById(siteId);

    res.json({
      success: true,
      data: site
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/sites/:siteId/settings
 * Update site settings
 */
router.put('/:siteId/settings', (req, res) => {
  try {
    const { siteId } = req.params;
    const settings = req.body;

    const site = crawlService.updateSiteSettings(siteId, settings);

    res.json({
      success: true,
      data: site
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/sites/:siteId
 * Delete a site
 */
router.delete('/:siteId', (req, res) => {
  try {
    const { siteId } = req.params;
    crawlService.deleteSite(siteId);

    res.json({
      success: true,
      message: 'Site deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

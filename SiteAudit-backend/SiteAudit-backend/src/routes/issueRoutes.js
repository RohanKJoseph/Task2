import express from 'express';
import * as issueService from '../services/issueService.js';

const router = express.Router();

/**
 * GET /api/issue-types
 * Get all available issue types with optional filtering
 */
router.get('/', (req, res) => {
  try {
    const { category, severity, enabled, search } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (severity) filters.severity = severity;
    if (enabled !== undefined) filters.enabled = enabled === 'true';
    if (search) filters.search = search;

    const issues = issueService.getAllIssueTypes(filters);

    res.json({
      success: true,
      data: issues,
      total: issues.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/issue-types/grouped
 * Get issue types grouped by category
 */
router.get('/grouped', (req, res) => {
  try {
    const grouped = issueService.getIssueTypesByCategory();

    res.json({
      success: true,
      data: grouped
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/issue-types/statistics
 * Get issue type statistics
 */
router.get('/statistics', (req, res) => {
  try {
    const stats = issueService.getIssueStatistics();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/issue-types/:issueTypeId
 * Get specific issue type details
 */
router.get('/:issueTypeId', (req, res) => {
  try {
    const { issueTypeId } = req.params;
    const issue = issueService.getIssueTypeById(issueTypeId);

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
 * PUT /api/issue-types/:issueTypeId
 * Update issue type settings (enable/disable, change severity)
 */
router.put('/:issueTypeId', (req, res) => {
  try {
    const { issueTypeId } = req.params;
    const updates = req.body;

    if (updates.enabled !== undefined && typeof updates.enabled !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'enabled must be a boolean'
      });
    }

    if (updates.severity && !['error', 'warning', 'notice'].includes(updates.severity)) {
      return res.status(400).json({
        success: false,
        error: 'severity must be one of: error, warning, notice'
      });
    }

    const issue = issueService.updateIssueType(issueTypeId, updates);

    res.json({
      success: true,
      data: issue,
      message: 'Issue type updated successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/issue-types/bulk-update
 * Bulk update multiple issue types
 */
router.post('/bulk-update', (req, res) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        error: 'updates must be an array'
      });
    }

    const results = issueService.bulkUpdateIssueTypes(updates);

    res.json({
      success: true,
      data: results,
      message: `Updated ${results.filter(r => r.success).length} of ${results.length} issue types`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/issue-types/:issueTypeId/reset
 * Reset issue type to default settings
 */
router.post('/:issueTypeId/reset', (req, res) => {
  try {
    const { issueTypeId } = req.params;
    const issue = issueService.resetIssueType(issueTypeId);

    res.json({
      success: true,
      data: issue,
      message: 'Issue type reset to defaults'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

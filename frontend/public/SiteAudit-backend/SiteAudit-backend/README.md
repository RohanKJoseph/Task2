# Site Audit Backend

A mock backend server for the site audit system.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Server

Start the server in development mode:
```bash
npm run dev
```

Or start the server in production mode:
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Sites

#### List Sites
```
GET /api/sites
```
Returns a list of all sites.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Site",
      "url": "https://example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "lastCrawl": "2024-01-20T14:22:00.000Z",
      "status": "completed",
      "healthScore": 85,
      "urlsCrawled": 523,
      "errorsCount": 12,
      "warningsCount": 45,
      "noticesCount": 78
    }
  ],
  "total": 1
}
```

#### Add Site
```
POST /api/sites
```
Add a new site to monitor.

**Request Body:**
```json
{
  "name": "Example Site",
  "url": "https://example.com",
  "maxPages": 1000,
  "crawlSubdomains": false,
  "respectRobotsTxt": true,
  "userAgent": "SiteAuditBot/1.0",
  "maxDepth": 10,
  "crawlSpeed": "normal"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Example Site",
    "url": "https://example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "lastCrawl": null,
    "status": "not_crawled",
    "healthScore": 0,
    "urlsCrawled": 0,
    "errorsCount": 0,
    "warningsCount": 0,
    "noticesCount": 0,
    "settings": {
      "maxPages": 1000,
      "crawlSubdomains": false,
      "respectRobotsTxt": true,
      "userAgent": "SiteAuditBot/1.0",
      "maxDepth": 10,
      "crawlSpeed": "normal"
    }
  }
}
```

#### Delete Site
```
DELETE /api/sites/:siteId
```
Delete a site by its ID.

**Parameters:**
- `siteId` - The ID of the site to delete

**Response:**
```json
{
  "success": true,
  "message": "Site deleted successfully"
}
```

### Crawls

#### Start Crawl
```
POST /api/crawls/start
```
Start a new crawl for a site.

**Request Body:**
```json
{
  "siteId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "siteId": "550e8400-e29b-41d4-a716-446655440000",
    "startedAt": "2024-01-20T14:22:00.000Z",
    "completedAt": null,
    "status": "crawling",
    "progress": 0,
    "currentMessage": "Starting crawl...",
    "healthScore": 0,
    "urlsCrawled": 523,
    "internalPages": 0,
    "externalPages": 0,
    "resources": 0,
    "totalIssues": 0,
    "errorsCount": 0,
    "warningsCount": 0,
    "noticesCount": 0,
    "pagesWithErrors": 0,
    "pagesWithoutErrors": 0,
    "duration": 0
  },
  "message": "Crawl started successfully"
}
```

#### Get Crawl Details
```
GET /api/crawls/:crawlId
```
Get details of a specific crawl.

**Parameters:**
- `crawlId` - The ID of the crawl

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "siteId": "550e8400-e29b-41d4-a716-446655440000",
    "startedAt": "2024-01-20T14:22:00.000Z",
    "completedAt": "2024-01-20T14:24:35.000Z",
    "status": "completed",
    "progress": 100,
    "currentMessage": "Crawl completed",
    "healthScore": 85,
    "urlsCrawled": 523,
    "internalPages": 444,
    "resources": 79,
    "totalIssues": 35,
    "errorsCount": 12,
    "warningsCount": 45,
    "noticesCount": 78,
    "pagesWithErrors": 12,
    "pagesWithoutErrors": 432,
    "duration": 155,
    "issues": [
      {
        "id": "770e8400-e29b-41d4-a716-446655440002",
        "issueTypeId": "missing_title",
        "name": "Title tag missing or empty",
        "category": "Titles",
        "severity": "error",
        "count": 5,
        "changes": 2,
        "added": 1,
        "removed": 0
      }
    ]
  }
}
```

#### Get Crawl Issues
```
GET /api/crawls/:crawlId/issues
```
Get all issues found during a crawl with optional filtering.

**Parameters:**
- `crawlId` - The ID of the crawl

**Query Parameters (optional):**
- `severity` - Filter by severity (error, warning, notice)
- `category` - Filter by category
- `search` - Search in issue name or description
- `sortBy` - Sort by field (count, name, severity)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "siteId": "550e8400-e29b-41d4-a716-446655440000",
      "crawlId": "660e8400-e29b-41d4-a716-446655440001",
      "issueTypeId": "missing_title",
      "name": "Title tag missing or empty",
      "category": "Titles",
      "severity": "error",
      "count": 5,
      "affectedUrls": [
        {
          "url": "/about",
          "statusCode": 200,
          "foundOn": "/contact"
        },
        {
          "url": "/products",
          "statusCode": 200,
          "foundOn": "/blog"
        }
      ],
      "changes": 2,
      "added": 1,
      "removed": 0,
      "crawledCount": 5,
      "description": "Page has no title tag or the title tag is empty. Title tags are critical for SEO.",
      "impact": "high",
      "fixingComplexity": "low"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 35,
    "totalPages": 2
  }
}
```

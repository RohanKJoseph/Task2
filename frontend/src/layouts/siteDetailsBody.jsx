import { Fragment, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Download, MoreVertical } from 'lucide-react'
import { Heading } from '../component/catalyst-ui/heading'
import { Badge } from '../component/catalyst-ui/badge'
import { HealthScoreCircle } from '../component/catalyst-ui/healthScoreCircle'
import { Button } from '../component/catalyst-ui/button'
import { Select } from '../component/catalyst-ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../component/catalyst-ui/table'
import { useSite } from '../hooks/useSite'
import { useCrawlDetails, useCrawlHistory, useCrawlIssues, useFixCrawlIssues, useStartCrawl } from '../hooks/useCrawls'
import { useAppStore } from '../stores/useAppStore'

const formatNumber = (value) => new Intl.NumberFormat().format(value || 0)
const formatCrawlLabel = (crawl) => {
  if (!crawl) return 'No crawls'
  const time = crawl.startedAt ? new Date(crawl.startedAt).toLocaleString() : 'Unknown time'
  return `${time} (${crawl.status})`
}

const SECTION_CONFIG = {
  critical: {
    label: 'Critical Health',
    text: 'text-red-700',
    bg: 'bg-red-50',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4a1 1 0 112 0v5a1 1 0 11-2 0V6zm1 9a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 15z" clipRule="evenodd" />
      </svg>
    )
  },
  seo: {
    label: 'SEO Essentials',
    text: 'text-orange-700',
    bg: 'bg-orange-50',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 9H9a1 1 0 01-1-1V6a1 1 0 112 0v3h4a1 1 0 110 2z" />
      </svg>
    )
  },
  content: {
    label: 'Content & Structure',
    text: 'text-indigo-700',
    bg: 'bg-indigo-50',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707l-3.414-3.414A1 1 0 0012.586 3H4zm8 1.5V7h2.5L12 4.5z" />
      </svg>
    )
  },
  performance: {
    label: 'Performance & User Experience',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm3.53 6.53a.75.75 0 01-.02 1.06l-2.5 2.4a1.75 1.75 0 11-1.06-1.06l2.4-2.5a.75.75 0 011.06-.02z" />
      </svg>
    )
  }
}

const SECTION_CATEGORY_MAP = {
  critical: ['HTTP Status Codes', 'Security & HTTPS', 'Indexability', 'Redirects'],
  seo: ['Titles', 'Meta Descriptions', 'Canonical Tags', 'Structured Data', 'Sitemaps', 'Robots.txt', 'Localization (Hreflang)', 'Social Tags'],
  content: ['Headings (H1-H6)', 'Content', 'Images', 'Links'],
  performance: ['Performance', 'Core Web Vitals', 'Mobile Usability']
}

const getIssueSectionKey = (issue) => {
  const category = issue?.category || ''
  const entry = Object.entries(SECTION_CATEGORY_MAP).find(([, categories]) => categories.includes(category))
  return entry ? entry[0] : 'seo'
}

const SECTION_ORDER = ['critical', 'seo', 'content', 'performance']

export default function SiteDetailsBody() {
  const navigate = useNavigate()
  const { siteId: paramSiteId } = useParams()
  const selectedSiteId = useAppStore((s) => s.selectedSiteId)
  const setSelectedSite = useAppStore((s) => s.setSelectedSite)
  const selectedCrawlId = useAppStore((s) => s.selectedCrawlId)
  const setSelectedCrawl = useAppStore((s) => s.setSelectedCrawl)
  const compareCrawlId = useAppStore((s) => s.compareCrawlId)
  const setCompareCrawl = useAppStore((s) => s.setCompareCrawl)

  // Local state for table controls
  const [activeToggle, setActiveToggle] = useState('actual')
  const [statusFilter, setStatusFilter] = useState('all')
  const [openMenuId, setOpenMenuId] = useState(null)

  const siteId = paramSiteId || selectedSiteId

  useEffect(() => {
    if (paramSiteId && paramSiteId !== selectedSiteId) {
      setSelectedSite(paramSiteId)
    }
  }, [paramSiteId, selectedSiteId, setSelectedSite])

  const { data: site, isLoading: siteLoading, error: siteError } = useSite(siteId)
  const { data: crawlHistory = [], isLoading: historyLoading } = useCrawlHistory(siteId, 10)
  const latestCrawl = crawlHistory[0]

  useEffect(() => {
    if (!crawlHistory.length) return
    const hasSelection = selectedCrawlId && crawlHistory.some((crawl) => crawl.id === selectedCrawlId)
    if (!hasSelection) {
      setSelectedCrawl(crawlHistory[0].id)
    }
  }, [crawlHistory, selectedCrawlId, setSelectedCrawl])

  useEffect(() => {
    if (compareCrawlId && compareCrawlId === selectedCrawlId) {
      setCompareCrawl(null)
    }
  }, [compareCrawlId, selectedCrawlId, setCompareCrawl])

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && !event.target.closest('.relative')) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openMenuId])

  const activeCrawlId = selectedCrawlId || latestCrawl?.id

  const { data: crawlDetails, isLoading: crawlLoading } = useCrawlDetails(activeCrawlId)
  const { data: compareCrawlDetails } = useCrawlDetails(compareCrawlId)
  const { data: issues = [], isLoading: issuesLoading } = useCrawlIssues(activeCrawlId, {
    limit: 200,
    sortBy: 'count',
    sortOrder: 'desc'
  })

  const { mutate: startCrawl, isLoading: startCrawlLoading } = useStartCrawl()
  const { mutate: fixCrawlIssues, isLoading: fixCrawlLoading } = useFixCrawlIssues()

  const severityTotals = useMemo(() => {
    if (crawlDetails) {
      return {
        error: crawlDetails.errorsCount || 0,
        warning: crawlDetails.warningsCount || 0,
        notice: crawlDetails.noticesCount || 0
      }
    }

    return issues.reduce(
      (acc, issue) => {
        acc[issue.severity] += issue.count || 0
        return acc
      },
      { error: 0, warning: 0, notice: 0 }
    )
  }, [crawlDetails, issues])

  const groupedIssues = useMemo(() => {
    const grouped = SECTION_ORDER.reduce((acc, key) => {
      acc[key] = []
      return acc
    }, {})

    issues.forEach((issue) => {
      const key = getIssueSectionKey(issue)
      grouped[key].push(issue)
    })

    return SECTION_ORDER
      .map((key) => ({ key, section: SECTION_CONFIG[key], items: grouped[key] }))
      .filter((group) => group.items.length)
  }, [issues])

  // Calculate counts for toggles
  const actualCount = useMemo(() => {
    return issues.reduce((sum, issue) => sum + (issue.crawledCount ?? issue.count ?? 0), 0)
  }, [issues])

  const newCount = useMemo(() => {
    return issues.reduce((sum, issue) => sum + (issue.new ?? 0), 0)
  }, [issues])

  const handleExportIssues = () => {
    // Export functionality placeholder
    console.log('Exporting all issues...')
  }

  if (!siteId) {
    return <div className="p-24">Select a site to view details.</div>
  }

  if (siteLoading || historyLoading || crawlLoading) {
    return <div className="p-24">Loading site details...</div>
  }

  if (siteError) {
    return (
      <div className="p-24">
        <div className="text-lg font-semibold text-zinc-950">Site not found</div>
        <div className="mt-2 text-sm text-zinc-500">
          This site ID does not exist on the server. The backend data resets when the server restarts.
        </div>
        <Button className="mt-4" color="dark" onClick={() => navigate('/all-sites')}>
          Go back to sites
        </Button>
      </div>
    )
  }

  const healthScore = crawlDetails?.healthScore ?? site?.healthScore ?? 0
  const urlsCrawled = crawlDetails?.urlsCrawled ?? site?.urlsCrawled ?? 0
  const pagesWithErrors = crawlDetails?.pagesWithErrors ?? site?.errorsCount ?? 0
  const crawlStatus = latestCrawl?.status || site?.status || 'not_crawled'
  const crawlDate = latestCrawl?.startedAt ? new Date(latestCrawl.startedAt).toLocaleString() : '-'
  const compareLabel = compareCrawlDetails ? formatCrawlLabel(compareCrawlDetails) : 'None'

  // Extract additional data for enhanced stats
  const internalPages = crawlDetails?.internalPages ?? Math.floor(urlsCrawled * 0.85)
  const resources = crawlDetails?.resources ?? Math.floor(urlsCrawled * 0.15)
  const pagesWithoutErrors = crawlDetails?.pagesWithoutErrors ?? (internalPages - pagesWithErrors)
  
  // Calculate health score change
  const previousHealthScore = compareCrawlDetails?.healthScore ?? crawlHistory[1]?.healthScore ?? healthScore
  const healthScoreChange = healthScore - previousHealthScore
  
  // Determine health status
  const getHealthStatus = (score) => {
    if (score >= 80) return { label: 'Good', color: 'text-green-600' }
    if (score >= 50) return { label: 'Moderate', color: 'text-yellow-600' }
    return { label: 'Poor', color: 'text-red-600' }
  }
  const healthStatus = getHealthStatus(healthScore)

  return (
    <div className="p-24 w-full">
      <div className="mb-8 rounded-xl border border-zinc-950/10 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-zinc-500">Current site</div>
            <div className="text-lg font-semibold text-zinc-950">{site?.name || 'Site'}</div>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-55">
              <div className="mb-1 text-xs text-zinc-500">Crawl time</div>
              <Select
                value={activeCrawlId || ''}
                onChange={(event) => setSelectedCrawl(event.target.value || null)}
              >
                {!crawlHistory.length && <option value="">No crawls yet</option>}
                {crawlHistory.map((crawl) => (
                  <option key={crawl.id} value={crawl.id}>
                    {formatCrawlLabel(crawl)}
                  </option>
                ))}
              </Select>
            </div>
            <div className="min-w-55">
              <div className="mb-1 text-xs text-zinc-500">Compare with</div>
              <Select
                value={compareCrawlId || ''}
                onChange={(event) => setCompareCrawl(event.target.value || null)}
              >
                <option value="">None</option>
                {crawlHistory
                  .filter((crawl) => crawl.id !== activeCrawlId)
                  .map((crawl) => (
                    <option key={crawl.id} value={crawl.id}>
                      {formatCrawlLabel(crawl)}
                    </option>
                  ))}
              </Select>
            </div>
            <Button
              color="dark"
              onClick={() => {
                if (!activeCrawlId) return
                fixCrawlIssues(activeCrawlId)
              }}
              disabled={!activeCrawlId || fixCrawlLoading}
            >
              Fix all errors using AI
            </Button>
            <Button
              color="dark"
              onClick={() => {
                if (!site?.id) return
                startCrawl(site.id)
              }}
              disabled={!site?.id || startCrawlLoading}
            >
              Crawl Now
            </Button>
          </div>
        </div>
        <div className="mt-3 text-xs text-zinc-500">Compare selection: {compareLabel}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <Heading level={1} className="text-2xl font-bold text-zinc-950">
            {site?.name || 'Site details'}
          </Heading>
          <div className="mt-2 text-sm text-zinc-500">
            {site?.url || 'No URL available'}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge color={crawlStatus === 'completed' ? 'green' : 'zinc'}>{crawlStatus}</Badge>
          <div className="text-xs text-zinc-500">Last crawl: {crawlDate}</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Health Score Card */}
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
          <div className="text-xs text-zinc-500">Health score</div>
          <div className="mt-3 flex items-center gap-4">
            <HealthScoreCircle score={Number.isFinite(healthScore) ? healthScore : 0} />
            <div className="flex flex-col">
              <div className="text-2xl font-semibold text-zinc-950">{formatNumber(healthScore)}%</div>
              <div className={`text-xs font-medium ${healthStatus.color}`}>{healthStatus.label}</div>
            </div>
          </div>
          {healthScoreChange !== 0 && (
            <div className={`mt-3 flex items-center gap-1 text-sm ${
              healthScoreChange > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="font-medium">
                {healthScoreChange > 0 ? '+' : ''}{healthScoreChange.toFixed(1)}%
              </span>
              <span className="text-xs text-zinc-500">vs previous</span>
            </div>
          )}
        </div>

        {/* URLs Crawled Card */}
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
          <div className="text-xs text-zinc-500">URLs crawled</div>
          <div className="mt-3 text-2xl font-semibold text-zinc-950">{formatNumber(urlsCrawled)}</div>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-zinc-600">
              <span>Internal:</span>
              <span className="font-medium">{formatNumber(internalPages)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Resources:</span>
              <span className="font-medium">{formatNumber(resources)}</span>
            </div>
          </div>
        </div>

        {/* Pages Errors Card */}
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
          <div className="text-xs text-zinc-500">Pages errors</div>
          <div className="mt-3 text-2xl font-semibold text-zinc-950">{formatNumber(pagesWithErrors)}</div>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-zinc-600">
              <span>With errors:</span>
              <span className="font-medium text-red-600">{formatNumber(pagesWithErrors)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Without errors:</span>
              <span className="font-medium text-green-600">{formatNumber(pagesWithoutErrors)}</span>
            </div>
          </div>
        </div>

        {/* Issues Distribution Card */}
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
          <div className="text-xs text-zinc-500">Issues distribution</div>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <div className="rounded-full bg-red-50 px-3 py-1 text-red-700">
              Errors: {formatNumber(severityTotals.error)}
            </div>
            <div className="rounded-full bg-yellow-50 px-3 py-1 text-yellow-700">
              Warnings: {formatNumber(severityTotals.warning)}
            </div>
            <div className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              Notices: {formatNumber(severityTotals.notice)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Heading level={2} className="text-lg font-semibold text-zinc-950">
          Issues detail
        </Heading>
        
        {/* Table Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Toggle Buttons */}
            <button
              onClick={() => setActiveToggle('actual')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeToggle === 'actual'
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Actual ({formatNumber(actualCount)})
            </button>
            <button
              onClick={() => setActiveToggle('new')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeToggle === 'new'
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              New ({formatNumber(newCount)})
            </button>

            {/* Filter Dropdown */}
            <Select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="min-w-40"
            >
              <option value="all">All Issues</option>
              <option value="important">Important</option>
              <option value="paused">Paused</option>
              <option value="delayed">Delayed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </div>

          {/* Export Button */}
          <Button
            color="dark"
            onClick={handleExportIssues}
            className="flex items-center gap-2"
          >
            <Download className="size-4" />
            Export All Issues
          </Button>
        </div>

        {issuesLoading ? (
          <div className="mt-4 text-sm text-zinc-500">Loading issues...</div>
        ) : issues.length === 0 ? (
          <div className="mt-4 text-sm text-zinc-500">No issues found for this crawl.</div>
        ) : (
          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableHeader>Issues</TableHeader>
                <TableHeader>Crawled</TableHeader>
                <TableHeader>Changes</TableHeader>
                <TableHeader>Added</TableHeader>
                <TableHeader>New</TableHeader>
                <TableHeader>Removed</TableHeader>
                <TableHeader className="w-16">Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedIssues.map((group) => (
                <Fragment key={`${group.key}-group`}>
                  <TableRow key={`${group.key}-header`}>
                    <TableCell colSpan={7} className={`${group.section.bg} text-xs font-semibold uppercase tracking-wide ${group.section.text}`}>
                      {group.section.label}
                    </TableCell>
                  </TableRow>
                  {group.items.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium text-zinc-950">{issue.name}</TableCell>
                      <TableCell className="text-zinc-600">
                        {formatNumber(issue.crawledCount ?? issue.count ?? 0)}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {formatNumber(issue.changes ?? 0)}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {formatNumber(issue.added ?? 0)}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {formatNumber(issue.new ?? 0)}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {formatNumber(issue.removed ?? 0)}
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === issue.id ? null : issue.id)}
                            className="rounded p-1 hover:bg-zinc-100 transition-colors"
                          >
                            <MoreVertical className="size-4 text-zinc-600" />
                          </button>
                          
                          {/* Dropdown Menu */}
                          {openMenuId === issue.id && (
                            <div className="absolute right-0 z-10 mt-1 w-48 rounded-lg border border-zinc-200 bg-white shadow-lg">
                              <div className="py-1">
                                <button className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50">
                                  Account
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50">
                                  Notification
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50">
                                  Billing
                                </button>
                                
                                {/* Submenu for My Events */}
                                <div className="border-t border-zinc-200">
                                  <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase">
                                    My Events
                                  </div>
                                  <button className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 pl-6">
                                    Upcoming Events
                                  </button>
                                  <button className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 pl-6">
                                    Past Events
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

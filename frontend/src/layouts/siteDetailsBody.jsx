import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
    label: 'Critical health section',
    text: 'text-red-700',
    bg: 'bg-red-50',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4a1 1 0 112 0v5a1 1 0 11-2 0V6zm1 9a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 15z" clipRule="evenodd" />
      </svg>
    )
  },
  seo: {
    label: 'SEO essential',
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 9H9a1 1 0 01-1-1V6a1 1 0 112 0v3h4a1 1 0 110 2z" />
      </svg>
    )
  },
  content: {
    label: 'Content and structure',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707l-3.414-3.414A1 1 0 0012.586 3H4zm8 1.5V7h2.5L12 4.5z" />
      </svg>
    )
  },
  performance: {
    label: 'Performance and user experience',
    text: 'text-green-700',
    bg: 'bg-green-50',
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

const getIssueSection = (issue) => {
  const category = issue?.category || ''
  const entry = Object.entries(SECTION_CATEGORY_MAP).find(([, categories]) => categories.includes(category))
  const key = entry ? entry[0] : 'seo'
  return SECTION_CONFIG[key]
}

export default function SiteDetailsBody() {
  const navigate = useNavigate()
  const { siteId: paramSiteId } = useParams()
  const selectedSiteId = useAppStore((s) => s.selectedSiteId)
  const setSelectedSite = useAppStore((s) => s.setSelectedSite)
  const selectedCrawlId = useAppStore((s) => s.selectedCrawlId)
  const setSelectedCrawl = useAppStore((s) => s.setSelectedCrawl)
  const compareCrawlId = useAppStore((s) => s.compareCrawlId)
  const setCompareCrawl = useAppStore((s) => s.setCompareCrawl)

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

  return (
    <div className="p-24 w-full">
      <div className="mb-8 rounded-xl border border-zinc-950/10 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-zinc-500">Current site</div>
            <div className="text-lg font-semibold text-zinc-950">{site?.name || 'Site'}</div>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[220px]">
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
            <div className="min-w-[220px]">
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
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
          <div className="text-xs text-zinc-500">Health score</div>
          <div className="mt-3 flex items-center gap-4">
            <HealthScoreCircle score={Number.isFinite(healthScore) ? healthScore : 0} />
            <div className="text-2xl font-semibold text-zinc-950">{formatNumber(healthScore)}%</div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
          <div className="text-xs text-zinc-500">URLs crawled</div>
          <div className="mt-3 text-2xl font-semibold text-zinc-950">{formatNumber(urlsCrawled)}</div>
        </div>
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
          <div className="text-xs text-zinc-500">Pages error</div>
          <div className="mt-3 text-2xl font-semibold text-zinc-950">{formatNumber(pagesWithErrors)}</div>
        </div>
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
        {issuesLoading ? (
          <div className="mt-4 text-sm text-zinc-500">Loading issues...</div>
        ) : issues.length === 0 ? (
          <div className="mt-4 text-sm text-zinc-500">No issues found for this crawl.</div>
        ) : (
          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableHeader>Section</TableHeader>
                <TableHeader>Issue</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Severity</TableHeader>
                <TableHeader>Affected URLs</TableHeader>
                <TableHeader>Count</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>
                    {(() => {
                      const section = getIssueSection(issue)
                      return (
                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${section.bg} ${section.text}`}>
                          {section.icon}
                          <span>{section.label}</span>
                        </div>
                      )
                    })()}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-950">{issue.name}</TableCell>
                  <TableCell className="text-zinc-500">{issue.category}</TableCell>
                  <TableCell>
                    <Badge
                      color={
                        issue.severity === 'error'
                          ? 'red'
                          : issue.severity === 'warning'
                            ? 'yellow'
                            : 'blue'
                      }
                    >
                      {issue.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {formatNumber(issue.affectedUrls?.length)}
                  </TableCell>
                  <TableCell className="text-zinc-950">{formatNumber(issue.count)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

import { Fragment, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Download, MoreHorizontal, MoreVertical } from 'lucide-react'
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
 
import { FaArrowDown, FaArrowUp, FaChevronRight, FaPlay } from 'react-icons/fa'
import { BsArrowRepeat } from 'react-icons/bs'
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from '../component/catalyst-ui/dropdown'
import { ExclamationCircleIcon, ExclamationTriangleIcon, ChevronUpDownIcon} from '@heroicons/react/24/solid'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import CustomPagination from '../component/catalyst-ui/CustomPagination'

const formatNumber = (value) => new Intl.NumberFormat().format(value || 0)
const formatCrawlLabel = (crawl) => {
  if (!crawl) return 'No crawls'
  const time = crawl.startedAt ? new Date(crawl.startedAt).toLocaleString() : 'Unknown time'
  return `${time}`
}

const SECTION_CONFIG = {
  critical: {
    label: 'Critical Health',
    text: 'text-zinc-950',
    bg: 'bg-[#A1A1AA]',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4a1 1 0 112 0v5a1 1 0 11-2 0V6zm1 9a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 15z" clipRule="evenodd" />
      </svg>
    )
  },
  seo: {
    label: 'SEO Essentials',
    text: 'text-zinc-950',
    bg: 'bg-[#A1A1AA]',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 9H9a1 1 0 01-1-1V6a1 1 0 112 0v3h4a1 1 0 110 2z" />
      </svg>
    )
  },
  content: {
    label: 'Content & Structure',
    text: 'text-zinc-950',
    bg: 'bg-[#A1A1AA]',
    icon: (
      <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707l-3.414-3.414A1 1 0 0012.586 3H4zm8 1.5V7h2.5L12 4.5z" />
      </svg>
    )
  },
  performance: {
    label: 'Performance & User Experience',
    text: 'text-zinc-950',
    bg: 'bg-[#A1A1AA]',
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
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

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

  // Flatten all issues for pagination
  const flatIssues = useMemo(() => {
    return groupedIssues.flatMap((group) =>
      group.items.map((item) => ({ ...item, _sectionKey: group.key }))
    )
  }, [groupedIssues])

  const totalItems = flatIssues.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  // Reset to page 1 when issues change
  useEffect(() => {
    setCurrentPage(1)
  }, [issues.length, pageSize])

  // Paginated & re-grouped issues
  const paginatedGroupedIssues = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const pageItems = flatIssues.slice(start, start + pageSize)

    const grouped = {}
    pageItems.forEach((item) => {
      const key = item._sectionKey
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(item)
    })

    return SECTION_ORDER
      .filter((key) => grouped[key]?.length)
      .map((key) => ({ key, section: SECTION_CONFIG[key], items: grouped[key] }))
  }, [flatIssues, currentPage, pageSize])

  // Calculate counts for current page only
  const pageItems = useMemo(() => {
    return paginatedGroupedIssues.flatMap((group) => group.items)
  }, [paginatedGroupedIssues])

  const actualCount = useMemo(() => {
    return pageItems.reduce((sum, issue) => sum + (issue.crawledCount ?? issue.count ?? 0), 0)
  }, [pageItems])

  const newCount = useMemo(() => {
    return pageItems.reduce((sum, issue) => sum + (issue.new ?? 0), 0)
  }, [pageItems])

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
    if (score >= 80) return { label: 'Good', textClass: 'text-green-600', badgeColor: 'green' }
    if (score >= 50) return { label: 'Moderate', textClass: 'text-yellow-600', badgeColor: 'yellow' }
    return { label: 'Poor', textClass: 'text-red-600', badgeColor: 'red' }
  }
  const healthStatus = getHealthStatus(healthScore)
  const previousCrawlDetails = compareCrawlDetails ?? crawlHistory[1]

  const getPercentChange = (current, previous) => {
    const currentValue = Number(current) || 0
    const previousValue = Number(previous) || 0
    if (previousValue === 0) {
      return currentValue === 0 ? 0 : 100
    }
    return ((currentValue - previousValue) / previousValue) * 100
  }

  const healthScoreChangePercent = getPercentChange(
    healthScore,
    previousCrawlDetails?.healthScore
  )
  const urlsCrawledChangePercent = getPercentChange(
    urlsCrawled,
    previousCrawlDetails?.urlsCrawled
  )
  const pagesWithErrorsChangePercent = getPercentChange(
    pagesWithErrors,
    previousCrawlDetails?.pagesWithErrors
  )
  const totalIssuesCurrent = severityTotals.error + severityTotals.warning + severityTotals.notice
  const totalIssuesPrevious =
    (previousCrawlDetails?.errorsCount || 0) +
    (previousCrawlDetails?.warningsCount || 0) +
    (previousCrawlDetails?.noticesCount || 0)
  const totalIssuesChangePercent = getPercentChange(totalIssuesCurrent, totalIssuesPrevious)

  return (
    <div className="w-full">
     
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GlobeAltIcon className='text-zinc-500 !h-5 !w-5 !stroke-[2.5] cursor-pointer hover:text-zinc-700' onClick={() => navigate('/')} />
            <FaChevronRight className='text-zinc-500' />
            <div className="text-lg font-semibold text-zinc-950">{site?.name || 'Site'}</div>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <Dropdown>
                <DropdownButton
                  outline
                  className="w-[189px] h-[36px] gap-3 px-3.5 py-2 text-sm font-medium rounded-lg border !border-[#E4E4E7] !text-black !bg-white flex items-center justify-between"
                >
                  <span className="truncate">
                    {activeCrawlId
                      ? formatCrawlLabel(crawlHistory.find((c) => c.id === activeCrawlId))
                      : 'No crawls yet'}
                  </span>
                  <ChevronUpDownIcon className="size-4 shrink-0 text-zinc-500" />
                </DropdownButton>
                <DropdownMenu anchor="bottom start" className="w-[280px]">
                  {!crawlHistory.length && (
                    <DropdownItem disabled>
                      No crawls yet
                    </DropdownItem>
                  )}
                  {crawlHistory.map((crawl) => (
                    <DropdownItem
                      key={crawl.id}
                      onClick={() => setSelectedCrawl(crawl.id)}
                    >
                      {formatCrawlLabel(crawl)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <Dropdown>
                <DropdownButton
                  outline
                  className="w-[189px] h-[36px] !flex !justify-between gap-3 px-3.5 py-2 text-sm font-medium rounded-lg border !border-[#E4E4E7] !text-black !bg-white flex items-center justify-between"
                >
                  <span className="truncate">
                    {compareCrawlId
                      ? formatCrawlLabel(crawlHistory.find((c) => c.id === compareCrawlId))
                      : 'Compare With'}
                  </span>
                  <ChevronUpDownIcon className="size-4 shrink-0 text-zinc-500" />
                </DropdownButton>
                <DropdownMenu anchor="bottom start" className="w-[280px]">
                  <DropdownItem onClick={() => setCompareCrawl(null)}>
                    Compare With
                  </DropdownItem>
                  {crawlHistory
                    .filter((crawl) => crawl.id !== activeCrawlId)
                    .map((crawl) => (
                      <DropdownItem
                        key={crawl.id}
                        onClick={() => setCompareCrawl(crawl.id)}
                      >
                        {formatCrawlLabel(crawl)}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <Button
              color="blue"
              onClick={() => {
                if (!activeCrawlId) return
                fixCrawlIssues(activeCrawlId)
              }}
              disabled={!activeCrawlId || fixCrawlLoading}
              className="!w-[180px] !h-[36px] !rounded-[7px] !text-sm !font-medium !bg-[#5C33FF] !flex !justify-center !items-center"
            >
              Fix all errors using AI
            </Button>
            <Button
              className="flex items-center gap-2 border !border-[#E4E4E7] !text-white w-[124px] h-[36px] text-sm font-medium !bg-black !h-[36px] !rounded-[7px] !px-3 !py-2"
              color="dark"
              
              onClick={() => {
                if (!site?.id) return
                startCrawl(site.id)
              }}
              disabled={!site?.id || startCrawlLoading}
            >
              <FaPlay size={14} />
              Crawl now
            </Button>
          </div>
        </div>


      <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {/* Health Score Card */}
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 h-168px w-273px ">
        <div className="flex items-center justify-between">
          <div className="text-14px font-semibold text-#202020">Health score</div>
          <Badge color={healthStatus.badgeColor} className="mt-1 flex items-center gap-1">
            {healthScoreChangePercent >= 0 ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
            {Math.abs(Math.round(healthScoreChangePercent))}%
          </Badge>
        </div>
          <div className="mt-3 flex !items-center justify-center">
            <HealthScoreCircle className="!w-100 !h-100" score={Number.isFinite(healthScore) ? healthScore : 0} size={190} strokeWidth={10} />
            
          </div>
        </div>

        {/* URLs Crawled Card */}
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
        <div className="flex items-center justify-between">
           <div className="text-14px font-semibold text-#202020">URLs crawled</div>
          <Badge color="zinc" className="mt-1 flex items-center gap-1 !bg-[#F4F4F5]">
            {urlsCrawledChangePercent >= 0 ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
            {Math.abs(Math.round(urlsCrawledChangePercent))}%
          </Badge>
        </div>
         
          <div className="mt-3 text-4xl font-semibold text-zinc-950">{formatNumber(urlsCrawled)}</div>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-zinc-500 border-b border-zinc-200 pb-1">
              <span>Internal page</span>
              <span className="font-medium text-zinc-950">{formatNumber(internalPages)}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Resources</span>
              <span className="font-medium text-zinc-950">{formatNumber(resources)}</span>
            </div>
          </div>
        </div>

        {/* Pages Errors Card */}
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="text-14px font-semibold text-#202020">Pages errors</div>
          <Badge color="red" className="mt-1 flex items-center gap-1">
            {pagesWithErrorsChangePercent >= 0 ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
            {Math.abs(Math.round(pagesWithErrorsChangePercent))}%
          </Badge>
        </div>
          <div className="mt-3 text-4xl font-semibold text-zinc-950">{formatNumber(pagesWithErrors)}</div>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-zinc-500 border-b border-zinc-200 pb-1">
              <span>With errors:</span>
              <span className="font-medium text-zinc-950">{formatNumber(pagesWithErrors)}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Without errors:</span>
              <span className="font-medium text-zinc-950">{formatNumber(pagesWithoutErrors)}</span>
            </div>
          </div>
        </div>

        {/* Issues Distribution Card */}
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="text-14px font-semibold text-#202020">Issues distribution</div>
             
          </div>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <div className="  flex items-center justify-between px-2 py-1  text-zinc-500 border-b border-zinc-200 ">
              <div className='flex items-center'><ExclamationCircleIcon className="text-red-500 h-4.5 w-4.5 mr-1" /> Errors:</div> <span className="font-medium text-zinc-950">{formatNumber(severityTotals.error)}</span>
            </div>
            <div className="  flex items-center justify-between px-2 py-1  text-zinc-500 border-b border-zinc-200  ">
             <div className='flex items-center'><ExclamationTriangleIcon className="text-yellow-500 h-4.5 w-4.5 mr-1" /> Warnings:</div> <span className="font-medium text-zinc-950">{formatNumber(severityTotals.warning)}</span>
            </div>
            <div className="  flex items-center justify-between px-2 py-1  text-zinc-500">
             <div className='flex items-center'><ExclamationTriangleIcon className="text-blue-500 h-4.5 w-4.5 mr-1" /> Notices: </div><span className="font-medium text-zinc-950">{formatNumber(severityTotals.notice)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        
        {/* Table Controls */}
        <div className=" flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Toggle Buttons as Labels */}
            <label
              onClick={() => setActiveToggle('actual')}
              className={`w-[200px] h-[48px] min-w-[56px] flex !font-sm !text-black
  items-center
  justify-center
  gap-0
  px-
  pt-2
  pb-[14px]
  rounded-none
  border-b-2
  cursor-pointer
  text-sm
  font-semibold
  transition-all
  duration-300
  ease-in-out
  ${activeToggle === 'actual'
    ? 'border-b-[#09090B] text-[#09090B]'
    : 'border-b-[#E4E4E7] text-[#A1A1AA]'}
`}
            >
              Actual
              <Badge color="zinc" className="">{formatNumber(actualCount)}</Badge>
            </label>
            <label
              onClick={() => setActiveToggle('new')}
              className={`!w-[104px] !h-[48px] !min-w-[56px] !gap-1 !opacity-100 !pt-2 !pr-4 !pb-[14px] !pl-4 !rounded-none !border-b-2 !flex !items-center !justify-center !cursor-pointer !text-sm !font-medium !transition-all !duration-300 !ease-in-out
  ${activeToggle === 'new'
    ? '!border-b-[#09090B] !text-[#09090B] '
    : '!border-b-[#E4E4E7] !text-[#A1A1AA] '}
`}
            >
              New
              <Badge color="zinc" className="!ml-1">{formatNumber(newCount)}</Badge>
            </label>

            {/* Filter Dropdown */}
             
            <Select
  value={statusFilter}
  onChange={(event) => setStatusFilter(event.target.value)}
  className="w-[160px] !text-black "
  selectClassName="h-[36px] w-full !text-black px-4 py-2 rounded-lg border  !border-[#E4E4E7]   "
>
              <option value="all">All Issues</option>
               <option value="important">Important</option>
               <option value="paused">Paused</option>
               <option value="delayed">Delayed</option>
               <option value="cancelled">Cancelled</option>
                </Select>
          </div>

 
                
                <Button
                outline
                onClick={handleExportIssues}
                className="flex items-center !text-black border !border-[#e4e4e7]"
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
                <>
                <Table dense grid className="">
                <TableHead >
                  <TableRow className="!bg-[#FAFAFA] text-zinc-950 text-left text-sm font-semibold border border-[#e4e4e7]">
                  <TableHeader className='border border-[#e4e4e7] text-sm font-semibold'>Issues</TableHeader> 
                  <TableHeader className='border border-[#e4e4e7] text-sm !font-semibold'>Crawled</TableHeader>
                  <TableHeader className='border border-[#e4e4e7] text-sm font-semibold'>Changes</TableHeader>
                  <TableHeader className='border border-[#e4e4e7] text-sm font-semibold'>Added</TableHeader>
                  <TableHeader className='border border-[#e4e4e7] text-sm font-semibold'>New</TableHeader>
                  <TableHeader className='border border-[#e4e4e7] text-sm font-semibold'>Removed</TableHeader>
                  {/* <TableHeader className="w-16">Actions</TableHeader> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedGroupedIssues.map((group) => (
                <Fragment key={`${group.key}-group`}>
                  <TableRow key={`${group.key}-header`}>
                    <TableCell colSpan={7} className={`${group.section.bg} text-xs font-semibold uppercase tracking-wide ${group.section.text} !border !border-[#E4E4E7]`}>
                      {group.section.label}
                    </TableCell>
                  </TableRow>
                  {group.items.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium text-zinc-950 !border !border-[#E4E4E7] !pl-[5px]">
                        <div className="flex items-center gap-2 pl-5">
                          {issue.severity === 'error' && <ExclamationCircleIcon  className="text-red-600  w-5 h-5" />}
                          {issue.severity === 'warning' && <ExclamationTriangleIcon  className="text-yellow-600  w-5 h-5" />}
                          {issue.severity === 'notice' && <ExclamationTriangleIcon  className="text-blue-600  w-5 h-5" />}
                          <span>{issue.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="border !border-[#E4E4E7] text-zinc-600">
                        {formatNumber(issue.crawledCount ?? issue.count ?? 0)}
                      </TableCell>
                      <TableCell className="border !border-[#E4E4E7] text-zinc-600">
                        {formatNumber(issue.changes ?? 0)}
                      </TableCell>
                      <TableCell className="border !border-[#E4E4E7] text-zinc-600">
                        {formatNumber(issue.added ?? 0)}
                      </TableCell>
                      <TableCell className="border !border-[#E4E4E7] text-zinc-600">
                        {formatNumber(issue.new ?? 0)}
                      </TableCell>
                      <TableCell className="border !border-[#E4E4E7] text-zinc-600">
                        {formatNumber(issue.removed ?? 0)}
                      </TableCell>
                      <TableCell className="border !border-[#E4E4E7]">
                        <div className="relative">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === issue.id ? null : issue.id)}
                            className="rounded p-1 hover:bg-zinc-100 transition-colors"
                          >
                            <MoreHorizontal className="size-4 text-zinc-600" />
                          </button>
                          
                        
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
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            className="mt-4 px-2"
          />
        </>
        )}
      </div>
    </div>
  )
}

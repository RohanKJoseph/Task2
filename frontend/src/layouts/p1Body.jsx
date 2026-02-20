import { Heading } from '../component/catalyst-ui/heading'
import { Input } from '../component/catalyst-ui/input'
import { Button } from '../component/catalyst-ui/button'
import { Badge } from '../component/catalyst-ui/badge'
import { HealthScoreCircle } from '../component/catalyst-ui/healthScoreCircle'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../component/catalyst-ui/table'
import { useNavigate } from 'react-router-dom'
import { useSites } from '../hooks/useSites'
import { useAppStore } from '../stores/useAppStore'
import AddSiteDialog from './AddSiteDialog'
import IssueSettingsDialog from './IssueSettingsDialog'

function formatLastCrawlDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

function getStatusLabel(status) {
  if (status === 'completed') return 'Completed';
  if (status === 'not_crawled') return 'Not Crawled';
  if (status === 'failed') return 'Failed';
  if (status === 'crawling') return 'Crawling';
  return status;
}

export default function SitesBody() {
  // FIX 1: Hook must be called INSIDE the component function
  const { sites, isLoading, startCrawl } = useSites();
  const navigate = useNavigate()
  const toggleIssueSettings = useAppStore((s) => s.toggleIssueSettings)
  const toggleAddSite = useAppStore((s) => s.toggleAddSite)
  const setSelectedSite = useAppStore((s) => s.setSelectedSite)

  const handleOpenSite = (siteId) => {
    setSelectedSite(siteId)
    navigate(`/sites/${siteId}`)
  }

  // Handle loading state to prevent "sites is undefined" errors
  if (isLoading) return <div className="p-24">Loading sites...</div>

  return (
    <div className="p-24 w-full max-w-none">
      {/* --- Header Section --- */}
      <div className="flex items-end justify-between">
        <div className="flex-1 max-w-lg">
          <Heading level={1} className="text-2xl font-bold text-zinc-950">Sites</Heading>
          <div className="mt-4 flex items-center gap-2">
            <div className="relative w-full">
               <svg data-slot="icon" className="absolute left-3 top-1/2 -translate-y-1/2 size-4 fill-zinc-400" viewBox="0 0 16 16"><path d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-.944 4.556a5.5 5.5 0 1 0-1.06-1.06l3.52 3.52a.75.75 0 1 0 1.06-1.06l-3.52-3.52Z" /></svg>
               <Input placeholder="Search Sites" className="pl-10" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button color="dark" onClick={() => toggleIssueSettings(true)}>Issue Settings</Button>
          <Button color="dark" onClick={() => toggleAddSite(true)}>Add New Site</Button>
        </div>
      </div>

      {/* --- Table Section --- */}
      <Table className="mt-8">
        <TableHead>
          <TableRow>
            <TableHeader>Site</TableHeader>
            <TableHeader>Last crawl</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Health score</TableHeader>
            <TableHeader>URL Crawled</TableHeader>
            <TableHeader>URLs having errors</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {sites.map(site => (
            <TableRow key={site.id}>
              {/* FIX 2: Ensure TableCell count matches TableHeader count */}
              <TableCell className="font-medium">
                <div className='text-stone-800'>{site.name}</div>
                {/* <div className="text-xs text-zinc-500">{site.url}</div> */}
                <button
                  type="button"
                  onClick={() => handleOpenSite(site.id)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  open
                </button>
              </TableCell>
              <TableCell className="text-zinc-500">
                {formatLastCrawlDate(site.lastCrawl)}
              </TableCell>
              <TableCell>
                <Badge color={
                  site.status === 'completed' ? 'green' : 
                  site.status === 'failed' ? 'red' : 
                  site.status === 'crawling' ? 'blue' : 
                  'zinc'
                }>
                  {getStatusLabel(site.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <HealthScoreCircle score={site.healthScore ?? 0} />
              </TableCell>

              <TableCell className="text-zinc-500"> 
                {site.urlsCrawled == null
                  ? '-'
                  : typeof site.urlsCrawled === 'number'
                    ? new Intl.NumberFormat().format(site.urlsCrawled)
                    : (site.urlsCrawled.total || site.urlsCrawled.internal || site.urlsCrawled.resources)
                      ? `${new Intl.NumberFormat().format(site.urlsCrawled.total ?? 0)} \u00A0` +
                        `(internal: ${site.urlsCrawled.internal ?? 0}, resources: ${site.urlsCrawled.resources ?? 0})`
                      : String(site.urlsCrawled)
                }
          
                   </TableCell>

              <TableCell className="text-red-600 font-bold">{site.errorsCount}</TableCell>
              <TableCell className="text-right">
                {site.status === 'crawling' ? (
                  <Button color="dark" onClick={() => {/* stop crawl logic */}}>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5.28 4.22a.75.75 0 00-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 101.06 1.06L8 9.06l2.72 2.72a.75.75 0 101.06-1.06L9.06 8l2.72-2.72a.75.75 0 00-1.06-1.06L8 6.94 5.28 4.22z" />
                    </svg>
                    Stop Crawling
                  </Button>
                ) : site.status === 'failed' ? (
                  <Button color="dark" onClick={() => startCrawl(site.id)}>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    <span className="text-red-600">Try Crawling Again</span>
                  </Button>
                ) : (
                  <Button color="dark" onClick={() => startCrawl(site.id)}>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3 2.5A.5.5 0 013.5 2h9a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-11zm1 .5v10h8V3H4z"/>
                      <path d="M6 5.5a.5.5 0 01.757-.429l4 2.5a.5.5 0 010 .858l-4 2.5A.5.5 0 016 10.5v-5z"/>
                    </svg>
                    Crawl now
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddSiteDialog />
      <IssueSettingsDialog />
    </div>
  )
}
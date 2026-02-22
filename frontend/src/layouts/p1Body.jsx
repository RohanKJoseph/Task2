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
import { IoMdAdd } from 'react-icons/io'
import { FaPlay } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'
import { IoCloseCircle } from 'react-icons/io5'
import { BsArrowRepeat } from 'react-icons/bs'

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
  const { sites, isLoading, startCrawl, stopCrawl } = useSites();
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
    <div className="w-full max-w-none pl-8 pr-6 bg-white">
      {/* --- Header Section --- */}
      <div className="flex items-end justify-between bg-white">
        <div className="flex-1 max-w-lg">
          <h2 className="text-2xl font-bold text-zinc-950">Sites</h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="relative w-full">
              <img src="/SVG.png" alt="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
              <Input 
                placeholder="Search Sites" 
                style={{
                  paddingLeft: '2.5rem',
                  height: '36px',
                  width: '450px',
                  border: '1px solid #09090B1A',
                  borderRadius: '7px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="p-2 flex items-center gap-2" color="white" style={{
            border: '1px solid #09090B1A',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            width: '144px',
            height: '36px',
            borderRadius: '7px'
          }} onClick={() => toggleIssueSettings(true)}>
            <MdSettings className="text-gray-500" />
            Issue Settings
          </Button>
          <Button color="dark" style={{
            width: '144px',
            height: '36px',
            borderRadius: '7px'
          }} onClick={() => toggleAddSite(true)}>
            <IoMdAdd /> Add New Site
          </Button>
        </div>
      </div>

      {/* --- Table Section --- */}
      <Table className="mt-8 bg-white">
        <TableHead style={{ paddingLeft: '1rem', paddingRight: '1rem',color: '#71717B' }}>
          <TableRow style={{ height: '40.5px' }}>
            <TableHeader style={{ width: '290px' }}>Site</TableHeader>
            <TableHeader style={{ width: '130px' }}>Last crawl</TableHeader>
            <TableHeader style={{ width: '130px' }}>Status</TableHeader>
            <TableHeader style={{ width: '130px' }}>Health score</TableHeader>
            <TableHeader style={{ width: '130px' }}>URL Crawled</TableHeader>
            <TableHeader style={{ width: '130px' }}>URLs having errors</TableHeader>
            <TableHeader style={{ width: '130px' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {sites.map(site => (
            <TableRow key={site.id} style={{ borderTop: '2px solid #E4E4E7', borderBottom: '2px solid #E4E4E7', height: '80px' }}>
              {/* FIX 2: Ensure Ta  bleCell count matches TableHeader count */}
              <TableCell className="font-medium">
                <div className='flex items-center gap-2'>
                  <img src="/p1img.png" alt="site-icon" style={{ width: '72px', height: '48px', borderRadius: '4px', border: '1px solid #E4E4E7' }} />
                  <div>
                    <div
                      className='text-stone-800'
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '24px',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                      }}
                    >
                      {site.name}
                    </div>
                    {/* <div className="text-xs text-zinc-500">{site.url}</div> */}
                    <button
                      type="button"
                      onClick={() => handleOpenSite(site.id)}
                      style={{

                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '24px',
                        letterSpacing: '0%',
                        verticalAlign: 'middle',
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'solid',
                        textDecorationOffset: '0px',
                        textDecorationThickness: '0px',
                        textDecorationSkipInk: 'auto',
                        color: '#000',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        marginTop: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
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

              <TableCell
                className="text-zinc-500"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  verticalAlign: 'middle'
                }}
              > 
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

              <TableCell className="text-red-600 font-medium ">{site.errorsCount}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {site.status === 'crawling' ? (
                    <Button className="flex items-center gap-2" color="white" style={{
            border: '1px solid #09090B1A',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            width: '140px',
            height: '36px',
            borderRadius: '7px',
            padding: '8px 12px'
          }} onClick={() => stopCrawl(site.id)}>
                      <IoCloseCircle size={16} />
                      Stop Crawling
                    </Button>
                  ) : site.status === 'failed' ? (
                    <Button className="flex items-center gap-2" color="white" style={{
            border: '1px solid #09090B1A',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            width: '160px',
            height: '36px',
            borderRadius: '7px',
            padding: '8px 12px'
          }} onClick={() => startCrawl(site.id)}>
                      <BsArrowRepeat size={16} className="text-red-600" />
                      <span className="text-red-600">Try Crawling Again</span>
                    </Button>
                  ) : (
                    <Button className="flex items-center gap-2" color="white" style={{
            border: '1px solid #09090B1A',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            width: '116px',
            height: '36px',
            borderRadius: '7px',
            padding: '8px 12px'
          }} onClick={() => startCrawl(site.id)}>
                      <FaPlay size={14} />
                      Crawl now
                    </Button>
                  )}
                  <button
                    type="button"
                    aria-label="Row options"
                    style={{
                      width: '36px',
                      height: '36px',
                      padding: '10px',
                      borderRadius: '8px',
                      opacity: 1,
                      background: 'transparent',
                      border: '1px solid transparent',
                      color: '#71717B',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor" aria-hidden="true">
                      <circle cx="2" cy="2" r="2" />
                      <circle cx="2" cy="8" r="2" />
                      <circle cx="2" cy="14" r="2" />
                    </svg>
                  </button>
                </div>
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
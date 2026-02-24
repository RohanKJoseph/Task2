import { useState } from 'react'
import { Loader } from '../component/catalyst-ui/Loader'
import { Heading } from '../component/catalyst-ui/heading'
import { Input, InputGroup } from '../component/catalyst-ui/input'
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
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from '../component/catalyst-ui/dropdown'
 
import { EllipsisVerticalIcon, GlobeAltIcon } from '@heroicons/react/24/solid'

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
  const [searchQuery, setSearchQuery] = useState('')
  const { sites, isLoading, startCrawl, stopCrawl, deleteSite } = useSites();
  const navigate = useNavigate()
  const toggleIssueSettings = useAppStore((s) => s.toggleIssueSettings)
  const toggleAddSite = useAppStore((s) => s.toggleAddSite)
  const setSelectedSite = useAppStore((s) => s.setSelectedSite)

  const filteredSites = sites?.filter((site) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      site.name?.toLowerCase().includes(q) ||
      site.url?.toLowerCase().includes(q)
    )
  }) ?? []

  const handleOpenSite = (siteId) => {
    setSelectedSite(siteId)
    navigate(`/sites/${siteId}`)
  }

 
  if (isLoading) return <Loader text="Loading sites..." subtext="Fetching your sites" />

  return (
    <div className="w-full max-w-none sm:px-4  ">
 
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between   gap-2">
        <div className="">
          <h2 className="text-2xl font-bold text-zinc-950">Sites</h2>
          <div className="mt-4 flex items-center gap-3">
            <InputGroup className="!w-full">
              <img
                src="/SVG.png"
                alt="Search"
                data-slot="icon"
                className="opacity-50"
              />
              <Input
                placeholder="Search Sites"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="!border !text-black rounded-md !border-[#e4e4e7] shadow-[0_1px_2px_0_#0000000] !w-[300px] sm:!w-[432px]"
              />
            </InputGroup>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button className="!p-2 !flex !items-center !gap-2 !border !border-[#09090B1A] !shadow-sm !w-[144px] !h-[36px] !rounded-[7px] whitespace-nowrap" color="white" onClick={() => toggleIssueSettings(true)}>
            <MdSettings className="text-gray-500 scale-150 sm:scale-100" />
            Issue Settings
          </Button>
          <Button color="dark" className="!w-[144px] !h-[36px] !rounded-[7px] !flex !items-center !gap-2 whitespace-nowrap" onClick={() => toggleAddSite(true)}>
            <IoMdAdd className='!scale-200 sm:!scale-100' /> Add New Site
          </Button>
        </div>
      </div>
 
      {filteredSites.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-5">
            <GlobeAltIcon className="h-8 w-8 text-zinc-400" />
          </div>
          {searchQuery.trim() ? (
            <>
              <h3 className="text-lg font-semibold text-zinc-950">No sites found</h3>
              <p className="mt-1 text-sm text-zinc-500 max-w-sm">
                No sites match "<span className="font-medium text-zinc-700">{searchQuery}</span>". Try a different search term.
              </p>
              <Button
                outline
                className="mt-5 !border-zinc-300 !text-zinc-700"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-zinc-950">No sites yet</h3>
              <p className="mt-1 text-sm text-zinc-500 max-w-sm">
                Get started by adding your first website to crawl and monitor its health.
              </p>
              <Button
                color="dark"
                className="mt-5 !flex !items-center !gap-2"
                onClick={() => toggleAddSite(true)}
              >
                <IoMdAdd /> Add your first site
              </Button>
            </>
          )}
        </div>
      ) : (
      <Table dense className="mt-4 ">
        <TableHead className="!px-4 !text-[#71717B]">
          <TableRow className="!h-[40.5px]">
            <TableHeader className="!w-[290px]">Site</TableHeader>
            <TableHeader className="!w-[130px]">Last crawl</TableHeader>
            <TableHeader className="!w-[130px]">Status</TableHeader>
            <TableHeader className="!w-[130px]">Health score</TableHeader>
            <TableHeader className="!w-[130px]">URL Crawled</TableHeader>
            <TableHeader className="!w-[130px]">URLs having errors</TableHeader>
            <TableHeader className="!w-[130px]" />
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSites.map(site => (
            <TableRow key={site.id} className="!border-y-2 !border-[#E4E4E7]">
          
              <TableCell className="font-medium !w-[290px]" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                <div className='flex items-center gap-2 w-[100px] sm:w-[290px]'>
                  <img src="/p1img.png" alt="site-icon" className="!w-[56px] !h-[36px] !rounded !border !border-[#E4E4E7]" />
                  <div>
                    <div
                      className='!text-stone-800 !font-[Inter,sans-serif] !font-normal !text-sm !leading-6 !tracking-normal !align-middle'
                    >
                      {site.name}
                    </div>
                  
                    <button
                      type="button"
                      onClick={() => handleOpenSite(site.id)}
                      className="!font-medium !text-sm !leading-6 !tracking-normal !align-middle !underline !text-black !bg-transparent !border-none !p-0 !mt-1 !cursor-pointer"
                    >
                      Open
                    </button>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-zinc-500" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                {formatLastCrawlDate(site.lastCrawl)}
              </TableCell>
              <TableCell>
                <Badge color={
                  site.status === 'completed' ? 'lime' : 
                  site.status === 'failed' ? 'red' : 
                  site.status === 'crawling' ? 'amber' : 
                  'zinc'
                }>
                  {getStatusLabel(site.status)}
                </Badge>
              </TableCell>
              <TableCell className='!scale-70 -ml-6 !flex !items-center' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                <HealthScoreCircle score={site.healthScore ?? 0} />
              </TableCell>

              <TableCell
                className="!text-zinc-500 !font-[Inter,sans-serif] !font-normal !text-sm !leading-6 !tracking-normal !align-middle"
                style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
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

              <TableCell className="text-red-600 font-medium" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>{site.errorsCount}</TableCell>
              <TableCell className="text-right" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                <div className="flex items-center justify-end gap-2">
                  {site.status === 'crawling' ? (
                    <Button className="!flex !items-center !gap-2 !border !border-[#09090B1A] !shadow-sm !w-[140px] !h-[36px] !rounded-[7px] !px-3 !py-2" color="white" onClick={() => stopCrawl(site.id)}>
                      <IoCloseCircle size={16} />
                      Stop Crawling
                    </Button>
                  ) : site.status === 'failed' ? (
                    <Button className="!flex !items-center !gap-2 !border !border-[#09090B1A] !shadow-sm !w-[160px] !h-[36px] !rounded-[7px] !px-3 !py-2" color="white" onClick={() => startCrawl(site.id)}>
                      <BsArrowRepeat size={16} className="text-red-600" />
                      <span className="text-red-600">Try Crawling Again</span>
                    </Button>
                  ) : (
                    <Button className="!flex !items-center !gap-2 !border !border-[#09090B1A] !shadow-sm !w-[116px] !h-[36px] !rounded-[7px] !px-3 !py-2" color="white" onClick={() => startCrawl(site.id)}>
                      <FaPlay size={14} />
                      Crawl now
                    </Button>
                  )}
                  <Dropdown>
                    <DropdownButton
                      as="button"
                      aria-label="Row options"
                      className="!w-[36px] !h-[36px] !p-2.5 !rounded-lg !bg-transparent !border !border-transparent !text-[#71717B] !inline-flex !items-center !justify-center"
                    >
                      <EllipsisVerticalIcon className="!h-6 !w-6 !stroke-[2.5] !cursor-pointer hover:!text-zinc-900 transition-colors scale-150" />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end" className="!w-[160px] !bg-white !border !border-[#E4E4E7] !shadow-lg rounded-lg ">
                      <DropdownItem onClick={() => handleOpenSite(site.id)} className="!text-sm !font-medium !text-zinc-700 hover:!bg-gray-100  !cursor-pointer">
                        Open
                      </DropdownItem>
                      <DropdownItem onClick={() => deleteSite(site.id)} className="!text-sm !font-medium !text-red-600 hover:!bg-red-100/50  !cursor-pointer">
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}

      <AddSiteDialog />
      <IssueSettingsDialog />
    </div>
  )
}

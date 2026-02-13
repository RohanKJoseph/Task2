import { Heading } from '../component/catalyst-ui/heading'
import { Input } from '../component/catalyst-ui/input'
import { Button } from '../component/catalyst-ui/button'
import { Badge } from '../component/catalyst-ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../component/catalyst-ui/table'

const sites = [
  { id: 1, name: 'CodeDesign webs', url: 'Open', lastCrawl: 'Sep 22, 2025', status: 'Completed', score: 51, crawled: '1,238', errors: 619, action: 'Crawl now' },
  { id: 2, name: 'CodeDesign webs', url: 'Open', lastCrawl: 'Sep 22, 2025', status: 'Completed', score: 51, crawled: '1,238', errors: 320, action: 'Crawl now' },
  { id: 3, name: 'CodeDesign webs', url: 'Open', lastCrawl: 'Sep 22, 2025', status: 'Completed', score: 100, crawled: '1,238', errors: 0, action: 'Crawl now' },
  { id: 4, name: 'CodeDesign webs', url: 'Open', lastCrawl: '-', status: 'Not Crawled', score: 0, crawled: '-', errors: '-', action: 'Stop Crawling' },
  { id: 5, name: 'CodeDesign webs', url: 'Open', lastCrawl: '-', status: 'Failed', score: 0, crawled: '-', errors: '-', action: 'Try crawling again' },
]

export default function SitesBody() {
  return (
    <div className="p-24  w-screen">
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
          <Button outline>
            <svg data-slot="icon" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /></svg>
            Issue Settings
          </Button>
          <Button color="dark">
            <svg data-slot="icon" viewBox="0 0 16 16"><path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" /></svg>
            Add New Site
          </Button>
        </div>
      </div>

      {/* --- Table Section --- */}
      <Table className="[--gutter:--spacing(6)]">
        <TableHead>
          <TableRow>
            <TableHeader>Site</TableHeader>
            <TableHeader>Last crawl</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Health score</TableHeader>
            <TableHeader>URL Crawled</TableHeader>
            <TableHeader>URLs having errors</TableHeader>
            <TableHeader><span className="sr-only">Actions</span></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sites.map((site) => (
            <TableRow key={site.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 rounded border border-zinc-200 bg-zinc-50" /> {/* Site Preview Placeholder */}
                  <div>
                    <div className="text-zinc-950">{site.name}</div>
                    <a href="#" className="text-sm text-zinc-500 underline hover:text-zinc-700">{site.url}</a>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-zinc-500">{site.lastCrawl}</TableCell>
              <TableCell>
                <Badge color={site.status === 'Completed' ? 'green' : site.status === 'Failed' ? 'red' : 'zinc'}>
                  {site.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {/* Health Score Circle - Simplified */}
                  <div className={`size-8 rounded-full border-4 flex items-center justify-center text-[10px] font-bold ${site.score > 80 ? 'border-orange-500' : 'border-zinc-200'}`}>
                    {site.score}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-zinc-600 font-medium">{site.crawled}</TableCell>
              <TableCell className={site.errors > 0 ? 'text-red-600 font-semibold' : 'text-zinc-600'}>
                {site.errors}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                   <Button outline dense>
                      {site.action === 'Crawl now' && <svg data-slot="icon" viewBox="0 0 16 16" className="fill-zinc-950"><path d="M4.5 3.5l7 4.5-7 4.5v-9z" /></svg>}
                      {site.action === 'Stop Crawling' && <svg data-slot="icon" viewBox="0 0 16 16" className="fill-zinc-950"><path d="M4 4h8v8H4z" /></svg>}
                      {site.action === 'Try crawling again' && <svg data-slot="icon" viewBox="0 0 16 16" className="fill-zinc-950"><path d="M8 2.5a5.5 5.5 0 1 0 5.5 5.5.75.75 0 0 1 1.5 0 7 7 0 1 1-7-7V1L11 3 8 5V2.5z" /></svg>}
                      {site.action}
                   </Button>
                   <button className="p-1 text-zinc-400 hover:text-zinc-600">
                     <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                   </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

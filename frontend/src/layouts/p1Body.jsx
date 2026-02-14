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
import { useSites } from '../hooks/useSites'

export default function SitesBody() {
  // FIX 1: Hook must be called INSIDE the component function
  const { sites, isLoading, startCrawl } = useSites();

  // Handle loading state to prevent "sites is undefined" errors
  if (isLoading) return <div className="p-24">Loading sites...</div>

  return (
    <div className="p-24 w-screen">
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
          <Button color="dark">Issue Settings</Button>
          <Button color="dark">Add New Site</Button>
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
                <div>{site.name}</div>
                <div className="text-xs text-zinc-500">{site.url}</div>
              </TableCell>
              <TableCell className="text-zinc-500">
                {site.lastCrawl ? new Date(site.lastCrawl).toLocaleDateString() : '-'}
              </TableCell>
              <TableCell>
                <Badge color={site.status === 'completed' ? 'green' : 'zinc'}>
                  {site.status}
                </Badge>
              </TableCell>
              <TableCell>
                <HealthScoreCircle score={site.healthScore} />
              </TableCell>
              <TableCell>{site.urlsCrawled}</TableCell>
              <TableCell className="text-red-600 font-bold">{site.errorsCount}</TableCell>
              <TableCell className="text-right">
                <Button outline onClick={() => startCrawl(site.id)}>
                  Crawl now
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
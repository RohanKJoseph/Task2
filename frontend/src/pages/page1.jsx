// pages/SitesOverview.jsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../component/catalyst-ui/table'
import { Heading } from '../component/catalyst-ui/heading'
import { Input } from '../component/catalyst-ui/input'
import { Button } from '../component/catalyst-ui/button'
import { Badge } from '../component/catalyst-ui/badge'
import { AppSidebar } from '../layouts/sideBar'
import { TopNavbar } from '../layouts/navBar'
import { DashboardLayout } from '../layouts/dashBoard'

 

const sitesData = [
  { name: 'CodeDesign webs', lastCrawl: 'Sep 22, 2025', status: 'Completed', score: 51, crawled: 1238, errors: 619 },
  // ... more data
]

export default function SitesOverview() {
  return (
    <>
       <DashboardLayout>
        <div className="flex items-center justify-between mb-6">
          <Heading size="lg">SEO Audit</Heading>
          <div className="flex items-center space-x-4">
            <Input placeholder="Search sites..." />
            <Button variant="primary">Add New Site</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>          
              <TableHead>Site Name</TableHead>
              <TableHead>Last Crawl</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SEO Score</TableHead>
              <TableHead>Crawled URLs</TableHead>

              <TableHead>Errors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sitesData.map((site, index) => (
              <TableRow key={index}>
                <TableCell>{site.name}</TableCell>
                <TableCell>{site.lastCrawl}</TableCell>
                <TableCell>
                  <Badge variant={site.status === 'Completed' ? 'success' : 'default'}>
                    {site.status}
                  </Badge>
                </TableCell>
                <TableCell>{site.score}</TableCell>
                <TableCell>{site.crawled}</TableCell>
                <TableCell>{site.errors}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardLayout>
    </>
  )
}
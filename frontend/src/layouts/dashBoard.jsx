import { AppSidebar } from './sideBar'
import { TopNavbar } from './navBar'
import SitesBody from './p1Body'
 

export function DashboardLayout({ children }) {
  return (
    <div>

      <main className="  h-screen w-full overflow-hidden bg-white">
        <div className="  ">
          <TopNavbar />  
        </div>
        <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
        <div className="w-64 shrink-0 border-r border-zinc-950/5">
          <AppSidebar />
        </div>
          <SitesBody />
        </div>
      </main>
    </div>
  )
}
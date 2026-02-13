// src/layouts/DashboardLayout.jsx
import { AppSidebar } from './sideBar'
import { TopNavbar } from './navBar'
import SitesBody from './p1Body'
 

export function DashboardLayout({ children }) {
  return (
    <div>
      <TopNavbar  />
      <main className="flex h-screen w-full overflow-hidden bg-white">
        <div className="w-64 shrink-0 border-r border-zinc-950/5">
          <AppSidebar />
        </div>
          <SitesBody />
          
         
      </main>
    </div>
  )
}
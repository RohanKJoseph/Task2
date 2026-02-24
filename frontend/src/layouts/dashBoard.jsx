import { useState } from 'react'
import { AppSidebar } from './sideBar'
import { TopNavbar } from './navBar'
import SitesBody from './p1Body'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <main className="h-screen w-full overflow-hidden bg-white">
        <div>
          <TopNavbar onHamburgerClick={() => setSidebarOpen(true)} />
        </div>
        <div className="flex h-[calc(100vh-61px)] w-full overflow-hidden">
  
          <div className="hidden lg:block w-64 shrink-0 border-r border-zinc-950/5">
            <AppSidebar />
          </div>

    
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
         
              <div
                className="fixed inset-0 bg-black/30 transition-opacity"
                onClick={() => setSidebarOpen(false)}
              />
        
              <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200">
                  <span className="text-sm font-semibold text-zinc-900">Menu</span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-md hover:bg-zinc-100 cursor-pointer"
                  >
                    <XMarkIcon className="h-5 w-5 text-zinc-500" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <AppSidebar onNavigate={() => setSidebarOpen(false)} />
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto bg-zinc-50 p-6">
            {children || <SitesBody />}
          </div>
        </div>
      </main>
    </div>
  )
}
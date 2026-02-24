import { useLocation, useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarBody,
  SidebarSection,
  SidebarItem,
  SidebarLabel,
  SidebarSpacer,
} from '../component/catalyst-ui/sidebar'
import {
  HomeIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
  MagnifyingGlassCircleIcon,
  ChartBarIcon,
  UsersIcon,
  ShoppingBagIcon,
  NewspaperIcon
} from '@heroicons/react/20/solid'
import { AICreditsCard } from '../component/catalyst-ui/AICreditsCard'

export function AppSidebar({ onNavigate }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  const handleItemClick = () => {
    if (onNavigate) onNavigate()
  }

  return (
    <Sidebar className="h-full border-r border-zinc-950/5">
      <SidebarBody>
        <SidebarSection>
          {/* Dashboard / All Sites */}
          <SidebarItem
            className="data-[current=true]:bg-[#F4F4F5] data-[current=true]:text-[#09090B]"
            to="/all-sites"
            current={location.pathname === '/all-sites' || location.pathname === '/'}
            showIndicator
            onClick={handleItemClick}
          >
            <HomeIcon data-slot="icon" className='!fill-black' />
            <SidebarLabel>All Sites</SidebarLabel>
          </SidebarItem>

          <SidebarItem
            to="/all-sites"
            current={isActive('/social-media')}
            showIndicator
            onClick={handleItemClick}
            className="group"
          >
            <NewspaperIcon data-slot="icon" className='!fill-black' />
            <SidebarLabel className="!text-black" >Social Media</SidebarLabel>
          </SidebarItem>

          {/* SEO Audit */}
          <SidebarItem
            to="/all-sites"
            current={isActive('/seo-audit')}
            showIndicator
            onClick={handleItemClick}
            className="group"
          >
            <MagnifyingGlassCircleIcon data-slot="icon" className='!fill-black' />
            <SidebarLabel className="!text-black">SEO Audit</SidebarLabel>
          </SidebarItem>

          {/* Team */}
          <SidebarItem
            to="/all-sites"
            current={isActive('/teams')}
            showIndicator
            onClick={handleItemClick}
            className="group"
          >
            <UsersIcon data-slot="icon" className='!fill-black' />
            <SidebarLabel className="!text-black">Team</SidebarLabel>
          </SidebarItem>

          {/* Domains */}
          <SidebarItem
            to="/all-sites"
            current={isActive('/domains')}
            showIndicator
            onClick={handleItemClick}
            className="group"
          >
            <GlobeAltIcon data-slot="icon" className='!fill-black' />
            <SidebarLabel className="!text-black">Domains</SidebarLabel>
          </SidebarItem>

          {/* Usage */}
          <SidebarItem
            to="/all-sites"
            current={isActive('/usage')}
            showIndicator
            onClick={handleItemClick}
            className="group"
          >
            <ChartBarIcon data-slot="icon" className='!fill-black' />
            <SidebarLabel className="!text-black">Usage</SidebarLabel>
          </SidebarItem>

          {/* Store */}
          <SidebarItem
            to="/all-sites"
            current={isActive('/store')}
            showIndicator
            onClick={handleItemClick}
            className="group"
          >
            <ShoppingBagIcon data-slot="icon" className='!fill-black' />
            <SidebarLabel className="!text-black">Billing & Subscription</SidebarLabel>
          </SidebarItem>

          {/* Settings */}
          <SidebarItem
            to="/all-sites"
            current={isActive('/settings')}
            showIndicator
            onClick={handleItemClick}
            className="group"
          >
            <Cog6ToothIcon data-slot="icon" className='!fill-black' />
            <SidebarLabel className="!text-black">Settings</SidebarLabel>
          </SidebarItem>
        </SidebarSection>

        <SidebarSpacer />

        {/* AI Credits Card - Fixed at bottom */}
        <div className="flex-shrink-0">
          <AICreditsCard />
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
import { useLocation, useNavigate } from 'react-router-dom'
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from '../component/catalyst-ui/dropdown'
import {
  UserCircleIcon,
  QuestionMarkCircleIcon,
  MegaphoneIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/20/solid'
import { Avatar, AvatarButton } from '../component/catalyst-ui/avatar'
import { Bars3Icon } from '@heroicons/react/24/outline'

export function TopNavbar({ onHamburgerClick }) {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { to: '/all-sites', label: 'All Sites' },
    { to: '/', label: 'AI Website Builder' },
    { to: '/', label: 'Templates' },
    {to: '/', label: 'Expert Help'},
    { to: '/', label: 'Learn'  },
    {to:"", label: 'Admin'}
  ]

  const isActive = (path) => {
    if (path.startsWith('http')) return false
    return location.pathname === path
  }

  return (
    <div className="h-[61px] bg-[#27272A] flex items-center w-full text-white">
      {/* Brand Logo */}
      <button
        type="button"
        onClick={() => {
          if (location.pathname !== '/all-sites') navigate('/all-sites')
        }}
        className="h-full w-14 flex items-center justify-center border-r border-[#3F3F46] cursor-pointer bg-transparent"
      >
        <img src="/CodeDesign-brand-lcon.svg" alt="Logo" className="h-9 w-auto" />
      </button>

      {/* Hamburger menu - mobile only */}
      <button
        type="button"
        onClick={onHamburgerClick}
        className="lg:hidden h-full w-12 flex items-center justify-center cursor-pointer bg-transparent border-none"
      >
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>

      {/* Nav Links - hidden on mobile */}
      <div className="hidden lg:flex items-center gap-3 px-4">
        {navItems.map((item) => (
          <div key={item.to} className="relative">
            {item.external ? (
              <button
                onClick={() => window.open(item.to, '_blank', 'noopener,noreferrer')}
                className="relative flex items-center gap-3 rounded-lg p-2 text-sm font-medium cursor-pointer bg-transparent border-none"
              >
                <span className="text-sm font-medium text-[#A1A1AA] truncate hover:text-white transition-colors">
                  {item.label}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate(item.to)}
                className="relative flex items-center gap-3 rounded-lg p-2 text-sm font-medium cursor-pointer bg-transparent border-none"
              >
                <span className={`text-sm font-medium truncate transition-colors ${isActive(item.to) ? 'text-white' : 'text-[#A1A1AA] hover:text-white'}`}>
                  {item.label}
                </span>
              </button>
            )}
            {isActive(item.to) && (
              <div className="absolute w-[40px] -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-white rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Side */}
      <div className="flex items-center gap-3 pr-4">
        {/* Plan Badge - hidden on mobile */}
        <button
          className="hidden lg:flex items-center justify-center gap-2 rounded-lg border border-[#3F3F46] bg-[#18181B] shadow-sm cursor-pointer hover:bg-[#27272A] transition-colors px-2.5 py-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.625 0.625L9.29167 4.625L12.625 1.95833L11.2917 8.625H1.95833L0.625 1.95833L3.95833 4.625L6.625 0.625Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-semibold leading-5 text-[#A1A1AA]">
            Agency plan (200 AI credit/mo)
          </span>
        </button> 

        {/* Desktop: Avatar only (no dropdown) */}
        <div className="hidden lg:block">
          <Avatar initials="P" className="size-8 bg-zinc-600 text-white cursor-pointer" />
        </div>

        {/* Mobile: Avatar with dropdown containing all nav items */}
        <div className="lg:hidden">
          <Dropdown>
            <DropdownButton as="button" className="!p-0 !border-none !bg-transparent !rounded-full cursor-pointer">
              <Avatar initials="P" className="size-8 bg-zinc-600 text-white" />
            </DropdownButton>
            <DropdownMenu anchor="bottom end" className="!p-0 !rounded-xl !overflow-hidden !w-[220px] !flex !flex-col !bg-white !border !border-[#E4E4E7] !shadow-lg">
              {/* Nav items for mobile */}
              <div className="py-2 px-1 border-b border-[#E4E4E7]">
                {navItems.map((item) => (
                  <DropdownItem
                    key={item.label}
                    className="!cursor-pointer"
                    onClick={() => navigate(item.to)}
                  >
                    <span className={`text-sm font-medium ${isActive(item.to) ? 'text-[#09090B]' : 'text-[#71717A]'}`}>
                      {item.label}
                    </span>
                  </DropdownItem>
                ))}
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
         
     
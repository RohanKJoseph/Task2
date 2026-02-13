import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '../component/catalyst-ui/navbar'
import { Avatar } from '../component/catalyst-ui/avatar' // Assuming you have the Avatar component

export function TopNavbar() {
  return (
    <Navbar className="bg-zinc-900 px-4 py-2 border-b border-white/5">
      {/* 1. Brand / Logo Slot (Optional, but good for structure) */}
      <NavbarSection>
        {/* Placeholder for the logo seen in top left */}
        <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10">
          <svg className="size-5 fill-white" viewBox="0 0 20 20">
             <path d="M10 2L2 7l8 5 8-5-8-5zM2 13l8 5 8-5-8-3-8 3z" />
          </svg>
        </div>
      </NavbarSection>

      {/* 2. Left Side Links */}
      <NavbarSection className="ml-4">
        <NavbarItem href="/all-sites" current className="text-white">
          <NavbarLabel>All Sites</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/ai-builder" className="text-zinc-400 hover:text-white">
          <NavbarLabel>AI Website Builder</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/templates" className="text-zinc-400 hover:text-white">
          <NavbarLabel>Templates</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/expert-help" className="text-zinc-400 hover:text-white">
          <NavbarLabel>Expert Help</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/learn" className="text-zinc-400 hover:text-white">
          <NavbarLabel>Learn</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/admin" className="text-zinc-400 hover:text-white">
          <NavbarLabel>Admin</NavbarLabel>
        </NavbarItem>
      </NavbarSection>

      {/* 3. Spacer to push remaining items to the right */}
      <NavbarSpacer />

      {/* 4. Right Side Actions */}
      <NavbarSection>
        {/* Agency Plan Button - Styled with a ring to match the image */}
        <NavbarItem href="/billing" className="rounded-full px-4 py-1.5 text-white ring-1 ring-white/20 hover:bg-white/5">
          <svg data-slot="icon" className="fill-white" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1z" />
          </svg>
          <NavbarLabel>Agency plan (200 AI credit/mo)</NavbarLabel>
        </NavbarItem>

        {/* Upgrade Now Button - High contrast as seen in image */}
        <button className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-zinc-700">
          Upgrade now
        </button>

        {/* Notification and Profile */}
        <NavbarItem href="/notifications" className="text-zinc-400">
          <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </NavbarItem>

        <NavbarItem href="/profile">
          <Avatar src="/path-to-your-avatar.jpg" className="size-8 rounded-full border border-white/10" />
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  )
}
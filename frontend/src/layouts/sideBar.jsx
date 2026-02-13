import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarHeading,
  SidebarSpacer,
} from '../component/catalyst-ui/sidebar' // Adjust path as needed

export function AppSidebar() {
  return (  
    <Sidebar>
      {/* 1. Top Section - General Navigation */}
      <SidebarHeader>
        <SidebarSection>
          <SidebarItem href="/all-sites">
            {/* Using a simple SVG for the home icon */}
            <svg data-slot="icon" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <SidebarLabel>All Sites</SidebarLabel>
          </SidebarItem>
          
          <SidebarItem href="/social">
            <svg data-slot="icon" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" /></svg>
            <SidebarLabel>Social Media</SidebarLabel>
            {/* Down chevron for the dropdown look in the image */}
            <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>

      {/* 2. Middle Section - SEO Audit (Active) */}
      <SidebarBody>
        <SidebarSection>
          <SidebarItem href="/seo-audit" current>
            <svg data-slot="icon" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            <SidebarLabel>SEO Audit</SidebarLabel>
          </SidebarItem>
          
          <SidebarItem href="/team">
            <svg data-slot="icon" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
            <SidebarLabel>Team</SidebarLabel>
          </SidebarItem>

          <SidebarItem href="/domains">
            <svg data-slot="icon" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.15-.766 3.556h3.936c-.093-1.407-.377-2.649-.766-3.556-.24-.56-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-1.946 2H8.029c.093 1.407.377 2.649.766 3.556.24.56.499.948.737 1.182.233.23.389.262.468.262s.235-.032.469-.262c.238-.234.498-.623.737-1.182.389-.907.674-2.15.767-3.556zm1.946 0h1.946a6.004 6.004 0 01-2.754 4.118c.454-1.147.748-2.572.837-4.118zM6.029 11H4.083a6.004 6.004 0 002.754 4.118c-.454-1.147-.748-2.572-.837-4.118z" clipRule="evenodd" /></svg>
            <SidebarLabel>Domains</SidebarLabel>
            <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>

      {/* 3. Footer Section - Credits Card & Workspace */}
      <SidebarFooter>
        {/* The Custom AI Credits Card */}
        <div className="mb-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-zinc-950">AI Credits</span>
            <span className="text-zinc-500">78% used</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100">
            <div className="h-full w-[78%] rounded-full bg-indigo-600" />
          </div>
          <button className="mt-4 w-full rounded-lg bg-zinc-950 py-2 text-xs font-semibold text-white hover:bg-zinc-800">
            Add more AI credits
          </button>
        </div>

        <SidebarSection>
          <SidebarItem href="/workspace">
            <div data-slot="avatar" className="flex items-center justify-center rounded bg-zinc-950 text-[10px] font-bold text-white">W</div>
            <SidebarLabel>{'{workspace 1}'}</SidebarLabel>
            <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </SidebarItem>
        </SidebarSection>
      </SidebarFooter>
    </Sidebar>
  )
}
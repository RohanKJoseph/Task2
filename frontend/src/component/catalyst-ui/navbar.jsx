export function Navbar({ className, ...props }) {
  return (
    <nav {...props}>
      <img src="/image 2.png" alt="navbar" style={{ width: '100%', height: 'auto' }} />
    </nav>
  )
}

export function NavbarDivider({ className, ...props }) {
  return null
}

export function NavbarSection({ className, ...props }) {
  return null
}

export function NavbarSpacer({ className, ...props }) {
  return null
}

export const NavbarItem = () => null

export function NavbarLabel({ className, ...props }) {
  return <span {...props} className={clsx(className, 'truncate')} />
}

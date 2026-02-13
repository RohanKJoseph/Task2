import * as Headless from '@headlessui/react'
import clsx from 'clsx'

import { Button } from './button'
import { Link } from './link'

export function Dropdown(props) {
  return <Headless.Menu {...props} />
}

export function DropdownButton({ as = Button, ...props }) {
  return <Headless.MenuButton as={as} {...props} />
}

export function DropdownMenu({ anchor = 'bottom', className, ...props }) {
  return (
    <Headless.MenuItems
      {...props}
      transition
      anchor={anchor}
      className={clsx(
        className,
        // Anchor positioning
        '[--anchor-gap:--spacing(2)] [--anchor-padding:--spacing(1)] data-[anchor~=end]:[--anchor-offset:6px] data-[anchor~=start]:[--anchor-offset:-6px] sm:data-[anchor~=end]:[--anchor-offset:4px] sm:data-[anchor~=start]:[--anchor-offset:-4px]',
        // Base styles
        'isolate w-max rounded-xl p-1',
        // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
        'outline outline-transparent focus:outline-hidden',
        // Handle scrolling when menu won't fit in viewport
        'overflow-y-auto',
        // Popover background
        'bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75',
        // Shadows
        'shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset',
        // Define grid at the menu level if subgrid is supported
        'supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]',
        // Transitions
        'transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0'
      )}
    />
  )
}

// Helper function to check if children contains "delete" (case-insensitive)
function containsDelete(children) {
  if (!children) return false
  if (typeof children === 'string')
    return children.toLowerCase().includes('delete')
  if (Array.isArray(children))
    return children.some(child => containsDelete(child))
  if (typeof children === 'object' && children.props)
    return containsDelete(children.props.children)
  return String(children).toLowerCase().includes('delete')
}

export function DropdownItem({ className, children, ...props }) {
  const isDelete = containsDelete(children)

  let classes = clsx(
    className,
    // Base styles
    'group cursor-pointer rounded-lg font-medium px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5',
    // Text styles - conditional based on delete
    isDelete
      ? 'text-left text-base/6 text-[#B91C1C] sm:text-sm/6 dark:text-red-400 forced-colors:text-[CanvasText]'
      : 'text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]',
    // Delete item hover and focus styles
    isDelete &&
      'hover:bg-[#B91C1C]/10 dark:hover:bg-red-950/20 hover:text-[#ffffff] dark:hover:text-red-400 data-focus:bg-[#B91C1C]/10 dark:data-focus:bg-red-950/20 data-focus:text-[#ba0707] dark:data-focus:text-red-400',
    // Focus
    'data-focus:bg-zinc-950/5 data-focus:text-zinc-950 dark:data-focus:bg-white/10 dark:data-focus:text-white',
    // Disabled state
    'data-disabled:opacity-50',
    // Forced colors mode
    'forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText] forced-colors:data-focus:*:data-[slot=icon]:text-[HighlightText]',
    // Use subgrid when available but fallback to an explicit grid layout if not
    'col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid',
    // Icons
    '*:data-[slot=icon]:col-start-1 *:data-[slot=icon]:row-start-1 *:data-[slot=icon]:mr-2.5 *:data-[slot=icon]:-ml-0.5 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:mr-2 sm:*:data-[slot=icon]:size-4',
    '*:data-[slot=icon]:text-zinc-500 data-focus:*:data-[slot=icon]:text-white dark:*:data-[slot=icon]:text-zinc-400 dark:data-focus:*:data-[slot=icon]:text-white',
    // Delete item icon color
    isDelete &&
      '*:data-[slot=icon]:text-[#B91C1C] dark:*:data-[slot=icon]:text-red-400',
    // Avatar
    '*:data-[slot=avatar]:mr-2.5 *:data-[slot=avatar]:-ml-1 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:mr-2 sm:*:data-[slot=avatar]:size-5'
  )

  const menuItem =
    'href' in props || 'to' in props ? (
      <Headless.MenuItem as={Link} {...props} className={classes}>
        {children}
      </Headless.MenuItem>
    ) : (
      <Headless.MenuItem
        as="button"
        type="button"
        {...props}
        className={classes}
      >
        {children}
      </Headless.MenuItem>
    )

  if (isDelete) {
    return (
      <>
        <div className="col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 sm:mx-2 dark:bg-zinc-700" />
        {menuItem}
      </>
    )
  }

  return menuItem
}

export function DropdownHeader({ className, ...props }) {
  return (
    <div
      {...props}
      className={clsx(className, 'col-span-5 px-3.5 pt-2.5 pb-1 sm:px-3')}
    />
  )
}

export function DropdownSection({ className, ...props }) {
  return (
    <Headless.MenuSection
      {...props}
      className={clsx(
        className,
        // Define grid at the section level instead of the item level if subgrid is supported
        'col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]'
      )}
    />
  )
}

export function DropdownHeading({ className, ...props }) {
  return (
    <Headless.MenuHeading
      {...props}
      className={clsx(
        className,
        'col-span-full grid grid-cols-[1fr_auto] gap-x-12 px-3.5 pt-2 pb-1 text-sm/5 font-medium text-zinc-500 sm:px-3 sm:text-xs/5 dark:text-zinc-400'
      )}
    />
  )
}

export function DropdownDivider({ className, ...props }) {
  return (
    <Headless.MenuSeparator
      {...props}
      className={clsx(
        className,
        'col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 sm:mx-3 dark:bg-white/10 forced-colors:bg-[CanvasText]'
      )}
    />
  )
}

export function DropdownLabel({ className, ...props }) {
  return (
    <Headless.Label
      {...props}
      data-slot="label"
      className={clsx(className, 'col-start-2 row-start-1')}
      {...props}
    />
  )
}

export function DropdownDescription({ className, ...props }) {
  return (
    <Headless.Description
      data-slot="description"
      {...props}
      className={clsx(
        className,
        'col-span-2 col-start-2 row-start-2 text-sm/5 text-zinc-500 group-data-focus:text-white sm:text-xs/5 dark:text-zinc-400 forced-colors:group-data-focus:text-[HighlightText]'
      )}
    />
  )
}

export function DropdownShortcut({ keys, className, ...props }) {
  return (
    <Headless.Description
      as="kbd"
      {...props}
      className={clsx(
        className,
        'col-start-5 row-start-1 flex justify-self-end'
      )}
    >
      {(Array.isArray(keys) ? keys : keys.split('')).map((char, index) => (
        <kbd
          key={index}
          className={clsx([
            'min-w-[2ch] text-center font-sans text-zinc-400 capitalize group-data-focus:text-white forced-colors:group-data-focus:text-[HighlightText]',
            // Make sure key names that are longer than one character (like "Tab") have extra space
            index > 0 && char.length > 1 && 'pl-1',
          ])}
        >
          {char}
        </kbd>
      ))}
    </Headless.Description>
  )
}

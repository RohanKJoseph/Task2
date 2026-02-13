import clsx from 'clsx'
import { forwardRef } from 'react'

export const Card = forwardRef(function Card(
  { className, padding = true, children, ...props },
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        className,
        'group relative rounded-lg bg-white ',
        padding && 'p-6'
      )}
    >
      {children}
    </div>
  )
})




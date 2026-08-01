import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full border border-rule-strong bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-mute',
          'shadow-[inset_0_1px_2px_rgba(20,22,29,0.05)]',
          'transition-colors',
          'focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }

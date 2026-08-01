import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[100px] w-full border border-rule-strong bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-mute leading-relaxed',
          'shadow-[inset_0_1px_2px_rgba(20,22,29,0.05)]',
          'transition-colors',
          'focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CreatorState } from './types'

/**
 * Renders the uploaded photo with crop transform, or an elegant
 * empty state when no image has been provided yet.
 */
export function PhotoLayer({
  state,
  className,
}: {
  state: Pick<CreatorState, 'imageSrc' | 'zoom' | 'offsetX' | 'offsetY'>
  className?: string
}) {
  const [isPortrait, setIsPortrait] = useState(true)

  if (!state.imageSrc) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted',
          className,
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-1/3 text-muted-foreground/40"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden
        >
          <circle cx="12" cy="8.5" r="4" />
          <path d="M4 20.5a8 8 0 0 1 16 0" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={state.imageSrc || '/placeholder.svg'}
      alt="Your uploaded portrait"
      crossOrigin="anonymous"
      className={cn('absolute max-w-none', className)}
      onLoad={(e) => setIsPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
      style={{
        minWidth: '100%',
        minHeight: '100%',
        width: isPortrait ? '100%' : 'auto',
        height: isPortrait ? 'auto' : '100%',
        left: `calc(50% + ${state.offsetX}%)`,
        top: `calc(50% + ${state.offsetY}%)`,
        transform: `translate(-50%, -50%) scale(${state.zoom})`,
      }}
    />
  )
}

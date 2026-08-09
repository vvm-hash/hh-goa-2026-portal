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
      className={cn('h-full w-full object-cover', className)}
      style={{
        transform: `translate(${state.offsetX}%, ${state.offsetY}%) scale(${state.zoom})`,
      }}
    />
  )
}

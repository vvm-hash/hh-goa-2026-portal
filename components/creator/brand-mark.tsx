// components/creator/brand-mark.tsx
import { cn } from '@/lib/utils'

/**
 * Official HH Goa 2026 brand mark.
 *
 * Uses a plain <img> instead of next/image on purpose: next/image rewrites
 * the src to a /_next/image?... optimizer URL and can defer loading behind
 * its own blur-up/srcset machinery, which is one more layer that can fail
 * silently inside an offscreen export host. A plain <img> is exactly what
 * export-assets.tsx's waitForImages() already knows how to wait on.
 */
export function BrandMark({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <img
        src="/hhgoalogo.jpg"
        alt="HH Goa Logo"
        width={44}
        height={44}
        className="size-11 rounded-lg border border-[#232D35] object-cover"
      />

      {showWordmark && (
        <div className="leading-tight">
          <span className="block text-sm font-semibold tracking-tight text-[#F0F6FC]">
            HH Goa 2026
          </span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#6E7681]">
            Builder Portal
          </span>
        </div>
      )}
    </div>
  )
}
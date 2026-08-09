'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function SuccessModal({
  open,
  onClose,
  onRestart,
}: {
  open: boolean
  onClose: () => void
  onRestart: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-title"
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ animation: 'hh-rise 0.3s ease both' }}
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-8 text-center shadow-2xl shadow-black/60"
        style={{ animation: 'hh-rise 0.45s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        {/* glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: 'var(--brand)' }}
        />

        <div className="relative">
          <div
            className="mx-auto grid size-14 place-items-center rounded-2xl"
            style={{ background: 'var(--brand)', color: 'var(--brand-foreground)' }}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden
            >
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2
            id="export-title"
            className="mt-6 text-2xl font-semibold tracking-tight"
          >
            You&apos;re on the list
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-pretty leading-relaxed text-muted-foreground">
            Your profile frame and Builder ID Card have been exported in full
            resolution.
          </p>

          <div className="mt-7 space-y-2.5">
            <Button size="lg" className="h-11 w-full rounded-full text-[15px]">
              Download both assets
            </Button>
            <div className="grid grid-cols-2 gap-2.5">
              <Button variant="outline" size="lg" className="h-11 rounded-full">
                Profile Frame
              </Button>
              <Button variant="outline" size="lg" className="h-11 rounded-full">
                ID Card
              </Button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-5 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={onRestart}
              className="transition-colors hover:text-foreground"
            >
              Start over
            </button>
            <span className="h-3 w-px bg-border" />
            <button
              type="button"
              onClick={onClose}
              className="transition-colors hover:text-foreground"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

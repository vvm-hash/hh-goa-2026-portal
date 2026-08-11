// components/creator/success-modal.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  exportBothAssets,
  exportBuilderId,
  exportProfileFrame,
  shareOnX,
} from './export-assets'
import { type CreatorState } from './types'

type ExportKey = 'both' | 'frame' | 'card' | null

export function SuccessModal({
  open,
  state,
  onClose,
  onRestart,
  profileFrameRef,
  builderCardRef,
  shareLinkStatus,
  shareLinkError,
  onRetry,
}: {
  open: boolean
  state: CreatorState
  onClose: () => void
  onRestart: () => void
  profileFrameRef: React.RefObject<HTMLDivElement | null>
  builderCardRef: React.RefObject<HTMLDivElement | null>
  shareLinkStatus?: 'idle' | 'uploading' | 'success' | 'error'
  shareLinkError?: string | null
  onRetry?: () => void
}) {
  const [pending, setPending] = useState<ExportKey>(null)
  const [error, setError] = useState<string | null>(null)

  const getEls = (): [HTMLElement, HTMLElement] | null => {
    const frameEl = profileFrameRef.current
    const cardEl = builderCardRef.current
    if (!frameEl || !cardEl) {
      console.error('[export] Preview refs not attached. Is the preview screen mounted?')
      return null
    }
    return [frameEl, cardEl]
  }

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

  useEffect(() => {
    if (!open) {
      setPending(null)
      setError(null)
    }
  }, [open, state])

  if (!open) return null

  const runExport = async (key: Exclude<ExportKey, null>, task: () => Promise<void>) => {
    setError(null)
    setPending(key)
    try {
      await task()
    } catch (err) {
      console.error(err)
      setError('Export failed. Please try again.')
    } finally {
      setPending(null)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-title"
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-[#111111]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-md border-2 border-[#111111] bg-[#F7F3E8] p-8 shadow-[6px_6px_0px_#111111]">

        {/* top accent bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[#0B6E3D]" />

        {/* system label */}
        <div className="mb-5 flex items-center justify-between">
          <span className="sticker-tag bg-[#0B6E3D] text-[#F7F3E8]">
            <span className="size-1.5 rounded-full bg-[#FFE600]" />
            EXPORT READY
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-7 place-items-center border-2 border-[#111111] bg-white text-[#111111] text-xs hover:bg-[#E8E3D4]"
          >
            ✕
          </button>
        </div>

        {/* success icon */}
        <div className="flex items-start gap-4">
          <div className="grid size-14 shrink-0 place-items-center border-2 border-[#111111] bg-[#0B6E3D] shadow-[3px_3px_0px_#111111]">
            <svg viewBox="0 0 24 24" className="size-7 text-[#F7F3E8]" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2 id="export-title" className="text-xl font-black tracking-tight text-[#111111]">
              You&apos;re on the list
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[#5A5A4A]">
              Your profile frame and Builder ID are ready to download.
            </p>
          </div>
        </div>

        {/* download buttons */}
        <div className="mt-7 space-y-2.5">
          <Button
            size="lg"
            className="w-full"
            disabled={pending !== null}
            onClick={() => {
              const els = getEls()
              if (!els) return
              void runExport('both', () => exportBothAssets(state, els[0], els[1]))
            }}
            style={{
              background: '#FF0A7A',
              borderColor: '#111111',
              color: 'white',
              boxShadow: pending ? 'none' : '4px 4px 0px #111111',
            }}
          >
            {pending === 'both' ? 'Preparing downloads…' : '↓ Download both assets'}
          </Button>

          <div className="grid grid-cols-2 gap-2.5">
            <Button
              variant="outline"
              size="lg"
              className="h-11 text-xs"
              disabled={pending !== null}
              onClick={() => {
                const els = getEls()
                if (!els) return
                void runExport('frame', () => exportProfileFrame(state, els[0]))
              }}
            >
              {pending === 'frame' ? 'Exporting…' : '↓ Profile Frame'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 text-xs"
              disabled={pending !== null}
              onClick={() => {
                const els = getEls()
                if (!els) return
                void runExport('card', () => exportBuilderId(state, els[1]))
              }}
            >
              {pending === 'card' ? 'Exporting…' : '↓ ID Card'}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="lg"
            className="h-11 w-full border-2 border-[#111111]/20 text-[#5A5A4A] hover:border-[#111111]/40 hover:text-[#111111]"
            disabled={shareLinkStatus === 'uploading' || shareLinkStatus === 'error'}
            onClick={() => shareOnX(state.builderId || '7140-620')}
          >
            {shareLinkStatus === 'uploading' ? 'Creating share link... ⏳' : 'Share on X ↗'}
          </Button>
        </div>

        {error && (
          <p className="mt-3 border-2 border-[#D93025] bg-[#D93025]/10 px-3 py-2 text-sm text-[#D93025]">
            {error}
          </p>
        )}
        
        {shareLinkStatus === 'error' && shareLinkError && (
          <div className="mt-3 flex flex-col gap-2 border-2 border-[#D93025] bg-[#D93025]/10 px-3 py-2">
            <p className="text-sm text-[#D93025]">{shareLinkError}</p>
            <Button
              variant="outline"
              size="sm"
              className="border-[#D93025] text-[#D93025] hover:bg-[#D93025] hover:text-white"
              onClick={onRetry}
            >
              Retry Share Link
            </Button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-5 border-t-2 border-[#111111]/15 pt-5 font-mono text-[9px] tracking-[0.18em] text-[#5A5A4A] uppercase">
          <button type="button" onClick={onRestart} className="transition-colors hover:text-[#111111]">
            Start over
          </button>
          <span className="h-3 w-px bg-[#111111]/20" />
          <button type="button" onClick={onClose} className="transition-colors hover:text-[#111111]">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
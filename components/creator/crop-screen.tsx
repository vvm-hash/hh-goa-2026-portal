'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import type { CreatorState } from './types'

export function CropScreen({
  state,
  update,
  onBack,
  onNext,
}: {
  state: CreatorState
  update: (patch: Partial<CreatorState>) => void
  onBack: () => void
  onNext: () => void
}) {
  const drag = useRef<{
    active: boolean
    startX: number
    startY: number
    baseX: number
    baseY: number
  }>({ active: false, startX: 0, startY: 0, baseX: 0, baseY: 0 })

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      baseX: state.offsetX,
      baseY: state.offsetY,
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = ((e.clientX - drag.current.startX) / rect.width) * 100
    const dy = ((e.clientY - drag.current.startY) / rect.height) * 100
    const clamp = (v: number) => Math.max(-40, Math.min(40, v))
    update({
      offsetX: clamp(drag.current.baseX + dx),
      offsetY: clamp(drag.current.baseY + dy),
    })
  }

  function onPointerUp() {
    drag.current.active = false
  }

  return (
    <section className="mx-auto max-w-xl px-5 py-12 sm:px-8 sm:py-16">
      {/* step header */}
      <div className="animate-rise">
        <div className="mb-1 flex items-center gap-2">
          <span className="sticker-tag bg-[#FFE600] text-[#111111]">02 / CROP</span>
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-4xl">
          Frame your shot
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#5A5A4A]">
          Drag to reposition and zoom to fit. We&apos;ll keep this crop across both assets.
        </p>
      </div>

      <div className="animate-rise [animation-delay:80ms] mt-8">
        {/* crop area */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="relative mx-auto aspect-square w-full max-w-sm cursor-grab touch-none overflow-hidden border-2 border-[#111111] bg-[#E8E3D4] shadow-[4px_4px_0px_#111111] active:cursor-grabbing"
        >
          {state.imageSrc ? (
            <img
              src={state.imageSrc}
              alt="Adjust your crop"
              draggable={false}
              className="h-full w-full select-none object-cover"
              style={{
                transform: `translate(${state.offsetX}%, ${state.offsetY}%) scale(${state.zoom})`,
              }}
            />
          ) : (
            <div className="grid h-full place-items-center font-mono text-xs tracking-widest text-[#5A5A4A] uppercase">
              No photo selected
            </div>
          )}

          {/* grid guides */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-[#0B6E3D]/20" />
              ))}
            </div>
          </div>

          {/* corner markers */}
          {['left-2 top-2 border-l-2 border-t-2', 'right-2 top-2 border-r-2 border-t-2', 'left-2 bottom-2 border-l-2 border-b-2', 'right-2 bottom-2 border-r-2 border-b-2'].map((pos) => (
            <span key={pos} aria-hidden className={`absolute size-4 border-[#0B6E3D] ${pos}`} />
          ))}
        </div>

        {/* zoom control */}
        <div className="mx-auto mt-6 max-w-sm border-2 border-[#111111] bg-white px-5 py-4 shadow-[3px_3px_0px_#111111]">
          <div className="flex items-center gap-4">
            <span className="w-10 shrink-0 font-mono text-[9px] font-bold tracking-[0.18em] text-[#5A5A4A] uppercase">
              ZOOM
            </span>
            <input
              type="range"
              min={1}
              max={2.5}
              step={0.01}
              value={state.zoom}
              onChange={(e) => update({ zoom: Number(e.target.value) })}
              aria-label="Zoom"
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => update({ zoom: 1, offsetX: 0, offsetY: 0 })}
              className="shrink-0 border border-[#111111] bg-[#F7F3E8] px-2 py-0.5 font-mono text-[9px] tracking-widest text-[#5A5A4A] uppercase transition-colors hover:bg-[#E8E3D4] hover:text-[#111111]"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      <div className="animate-rise [animation-delay:140ms] mt-8 flex items-center justify-center gap-3">
        <Button variant="outline" size="lg" onClick={onBack} className="px-6">
          ← Back
        </Button>
        <Button size="lg" onClick={onNext} className="px-8">
          Continue →
        </Button>
      </div>
    </section>
  )
}

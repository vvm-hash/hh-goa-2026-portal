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
    <section className="mx-auto max-w-xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="animate-rise text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          STEP 02
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Frame your shot
        </h1>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          Drag to reposition and zoom to fit. We&apos;ll keep this crop across
          both assets.
        </p>
      </div>

      <div className="animate-rise [animation-delay:80ms] mt-9">
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="relative mx-auto aspect-square w-full max-w-sm cursor-grab touch-none overflow-hidden rounded-[1.75rem] border border-border/60 bg-secondary active:cursor-grabbing"
        >
          {state.imageSrc ? (
            <img
              src={state.imageSrc || '/placeholder.svg'}
              alt="Adjust your crop"
              draggable={false}
              className="h-full w-full select-none object-cover"
              style={{
                transform: `translate(${state.offsetX}%, ${state.offsetY}%) scale(${state.zoom})`,
              }}
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">
              No photo selected
            </div>
          )}

          {/* grid guides */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/10" />
              ))}
            </div>
            <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
          </div>
        </div>

        {/* zoom control */}
        <div className="mx-auto mt-6 flex max-w-sm items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
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
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--brand)] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
          />
          <button
            type="button"
            onClick={() => update({ zoom: 1, offsetX: 0, offsetY: 0 })}
            className="shrink-0 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="animate-rise [animation-delay:140ms] mt-9 flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="h-12 rounded-full px-6"
        >
          Back
        </Button>
        <Button size="lg" onClick={onNext} className="h-12 rounded-full px-8 text-[15px]">
          Continue
        </Button>
      </div>
    </section>
  )
}

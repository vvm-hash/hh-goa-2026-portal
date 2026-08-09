// components/creator/preview-screen.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { BuilderCard } from './builder-card'
import { ProfileFrame } from './profile-frame'
import type { CreatorState } from './types'

export function PreviewScreen({
  state,
  onBack,
  onExport,
  profileFrameRef,
  builderCardRef,
}: {
  state: CreatorState
  onBack: () => void
  onExport: () => void
  profileFrameRef?: React.RefObject<HTMLDivElement | null>
  builderCardRef?: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      {/* step header */}
      <div className="animate-rise">
        <span className="sticker-tag bg-[#0B6E3D] text-[#F7F3E8]">04 / PREVIEW</span>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-4xl">
          Looking sharp, {state.name.split(' ')[0]}
        </h1>
        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#5A5A4A]">
          Your HH Goa 2026 assets are ready to export in full resolution.
        </p>
      </div>

      <div className="animate-rise [animation-delay:80ms] mt-12 grid items-start justify-items-center gap-14 sm:grid-cols-[minmax(0,20rem)_minmax(0,26rem)] sm:gap-10 lg:gap-20">
        {/* profile frame */}
        <figure className="mx-auto w-full max-w-[300px]">
          <div className="w-[300px] h-[300px] overflow-hidden relative border-2 border-[#111111] bg-white shadow-[4px_4px_0px_#111111]">
            <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 600, height: 600 }}>
              <div ref={profileFrameRef} style={{ width: 600, height: 600 }}>
                <ProfileFrame state={state} />
              </div>
            </div>
          </div>
          <figcaption className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#111111] uppercase">
              Profile Frame
            </span>
            <span className="border border-[#111111]/30 bg-[#F7F3E8] px-2 py-0.5 font-mono text-[8px] tracking-widest text-[#5A5A4A]">
              2048×2048
            </span>
          </figcaption>
        </figure>

        {/* builder id */}
        <figure className="mx-auto w-full max-w-[400px] flex flex-col items-center">
          <div className="w-[270px] h-[480px] sm:w-[378px] sm:h-[672px] overflow-hidden relative border-4 border-[#111111] bg-white shadow-[8px_8px_0px_#0B6E3D]">
            <div className="origin-top-left scale-[0.25] sm:scale-[0.35] w-[1080px] h-[1920px]">
              <div ref={builderCardRef} style={{ width: 1080, height: 1920 }}>
                <BuilderCard state={state} />
              </div>
            </div>
          </div>
          <figcaption className="mt-3 flex items-center justify-between w-[270px] sm:w-[378px]">
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#111111] uppercase">
              Builder ID Card
            </span>
            <span className="border border-[#111111]/30 bg-[#F7F3E8] px-2 py-0.5 font-mono text-[8px] tracking-widest text-[#5A5A4A]">
              1080×1920
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="animate-rise [animation-delay:140ms] mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="w-full px-6 sm:w-auto"
        >
          ← Keep editing
        </Button>
        <Button
          size="lg"
          onClick={onExport}
          className="w-full px-10 sm:w-auto"
          style={{
            background: '#FF0A7A',
            borderColor: '#111111',
            color: 'white',
            boxShadow: '4px 4px 0px #111111',
          }}
        >
          Export assets →
        </Button>
      </div>
    </section>
  )
}
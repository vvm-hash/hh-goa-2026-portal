'use client'

import { Button } from '@/components/ui/button'
import { BuilderCard } from './builder-card'
import { ProfileFrame } from './profile-frame'
import { DEFAULT_STATE } from './types'

export function Landing({ onStart }: { onStart: () => void }) {
  const demo = {
    ...DEFAULT_STATE,
    name: 'Aarav Menon',
    role: 'Founder, Studio Tide',
    location: 'Goa, India',
    teamName: 'Studio Tide',
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      {/* ── nav ── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b-2 border-[#111111] px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          {/* green badge */}
          <div className="flex items-center gap-1.5 border-2 border-[#111111] bg-[#0B6E3D] px-3 py-1.5 shadow-[2px_2px_0px_#111111]">
            <span className="size-1.5 rounded-full bg-[#FFE600]" />
            <span className="font-mono text-[9px] font-bold tracking-[0.22em] text-[#F7F3E8] uppercase">
              HACKERHOUSE GOA
            </span>
          </div>
          <span className="hidden font-mono text-[9px] tracking-[0.18em] text-[#5A5A4A] sm:block">
            / 2026
          </span>
        </div>
        <Button size="sm" onClick={onStart} className="text-xs">
          Create yours →
        </Button>
      </header>

      {/* ── hero ── */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-16">

          {/* text column */}
          <div className="animate-rise max-w-xl">
            {/* system label */}
            <div className="mb-5 flex items-center gap-2">
              <span className="sticker-tag bg-[#FF0A7A] text-white border-[#111111]">
                <span className="size-1.5 rounded-full bg-[#FFE600]" />
                OFFICIAL IDENTITY CREATOR
              </span>
            </div>

            {/* headline */}
            <h1 className="text-[3.5rem] font-black leading-[0.9] tracking-tight text-[#111111] sm:text-[5rem] lg:text-[6.5rem]">
              BUILD
              <br />
              <span
                className="relative inline-block"
                style={{ WebkitTextStroke: '3px #0B6E3D', color: 'transparent' }}
              >
                IN GOA
              </span>
            </h1>

            {/* divider line with dot */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-[#FF0A7A]" />
              <span className="font-mono text-[10px] tracking-[0.22em] text-[#5A5A4A]">
                SUN / SEA / BUILD
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#5A5A4A]">
              Upload one selfie and generate your official Builder ID and Profile Frame for HH Goa 2026.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={onStart}>
                Start Creating →
              </Button>
            </div>

            {/* stats row */}
            <div className="mt-10 grid grid-cols-3 gap-0 border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
              {[
                ['2', 'Assets'],
                ['<10s', 'To export'],
                ['4K', 'Resolution'],
              ].map(([n, l], i) => (
                <div
                  key={l}
                  className={`px-4 py-3 ${i < 2 ? 'border-r-2 border-[#111111]' : ''}`}
                >
                  <dt className="font-mono text-xl font-black tracking-tight text-[#0B6E3D]">{n}</dt>
                  <dd className="mt-0.5 font-mono text-[9px] tracking-[0.14em] text-[#5A5A4A] uppercase">{l}</dd>
                </div>
              ))}
            </div>
          </div>

          {/* preview column */}
          <div className="animate-rise [animation-delay:120ms] hidden lg:flex lg:items-start lg:gap-5 lg:pt-4">
            <figure className="w-[180px] shrink-0">
              <div className="w-[180px] h-[180px] border-2 border-[#111111] bg-white shadow-[4px_4px_0px_#111111] overflow-hidden relative">
                <div style={{ transform: 'scale(0.3)', transformOrigin: 'top left', width: 600, height: 600 }}>
                  <ProfileFrame state={demo} />
                </div>
              </div>
              <figcaption className="mt-2 font-mono text-[9px] tracking-[0.12em] text-[#5A5A4A] uppercase text-center">
                Profile Frame
              </figcaption>
            </figure>
            <figure className="w-[216px] shrink-0">
              <div className="w-[216px] h-[384px] border-2 border-[#111111] bg-white shadow-[4px_4px_0px_#0B6E3D] overflow-hidden relative">
                <div style={{ transform: 'scale(0.2)', transformOrigin: 'top left', width: 1080, height: 1920 }}>
                  <BuilderCard state={demo} />
                </div>
              </div>
              <figcaption className="mt-2 font-mono text-[9px] tracking-[0.12em] text-[#5A5A4A] uppercase text-center">
                Builder ID Card
              </figcaption>
            </figure>
          </div>
        </div>

        {/* mobile previews */}
        <div
          id="features"
          className="animate-rise [animation-delay:160ms] flex flex-col items-center gap-10 border-t-2 border-[#111111] pb-16 pt-10 lg:hidden"
        >
          <figure className="w-[280px] shrink-0">
            <div className="w-[280px] h-[280px] border-2 border-[#111111] bg-white shadow-[3px_3px_0px_#111111] overflow-hidden relative">
              <div style={{ transform: 'scale(0.4666)', transformOrigin: 'top left', width: 600, height: 600 }}>
                <ProfileFrame state={demo} />
              </div>
            </div>
            <figcaption className="mt-2 font-mono text-[9px] tracking-widest text-[#5A5A4A] uppercase text-center">
              Profile Frame
            </figcaption>
          </figure>
          <figure className="w-[270px] shrink-0">
            <div className="w-[270px] h-[480px] border-2 border-[#111111] bg-white shadow-[3px_3px_0px_#0B6E3D] overflow-hidden relative">
              <div style={{ transform: 'scale(0.25)', transformOrigin: 'top left', width: 1080, height: 1920 }}>
                <BuilderCard state={demo} />
              </div>
            </div>
            <figcaption className="mt-2 font-mono text-[9px] tracking-widest text-[#5A5A4A] uppercase text-center">
              Builder ID Card
            </figcaption>
          </figure>
        </div>

        {/* footer strip */}
        <div className="border-t-2 border-[#111111] py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#5A5A4A] uppercase">
              HACKERHOUSE GOA · 28–31 OCT 2026
            </span>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#FF0A7A]" />
              <span className="size-2 rounded-full bg-[#FFE600]" />
              <span className="size-2 rounded-full bg-[#0B6E3D]" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#5A5A4A] uppercase">
              #FrameInGoa
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
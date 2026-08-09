'use client'

import { Button } from '@/components/ui/button'
import { BrandMark } from './brand-mark'
import { BuilderCard } from './builder-card'
import { ProfileFrame } from './profile-frame'
import { DEFAULT_STATE } from './types'

export function Landing({ onStart }: { onStart: () => void }) {
  const demo = { ...DEFAULT_STATE, name: 'Aarav Menon', role: 'Founder, Studio Tide' }

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      {/* nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:py-6">
        <BrandMark className="scale-90 origin-left sm:scale-100" />
        <Button
          size="lg"
          onClick={onStart}
          className="scale-90 origin-right rounded-full bg-[#2EA043] px-5 text-[#F0F6FC] hover:bg-[#3FB950] sm:scale-100"
        >
          Start Creating
        </Button>
      </header>

      {/* hero text — full width, no longer sharing a row with the preview */}
      <div className="animate-rise mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-12 lg:pt-20">
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#30363D] bg-[#161B22]/70 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.05em] text-[#8B949E] backdrop-blur-md sm:px-3 sm:text-[10px] sm:tracking-[0.07em] lg:text-[11px] lg:tracking-[0.08em]">
          <span className="size-1.5 shrink-0 rounded-full bg-[#2EA043]" />
          <span className="truncate">OFFICIAL HH GOA IDENTITY CREATOR</span>
        </span>

        <h1 className="mt-5 max-w-3xl text-pretty text-4xl font-semibold leading-[1.05] tracking-tight text-[#F0F6FC] sm:mt-6 sm:text-5xl sm:leading-[1.02] md:text-6xl lg:mt-7 lg:text-[4.75rem] lg:leading-[0.98]">
          Build your{' '}
          <span className="bg-gradient-to-r from-[#3FB950] to-[#58A6FF] bg-clip-text text-transparent">
            HH Goa
          </span>{' '}
          Identity.
        </h1>

        <p className="mt-4 max-w-[85%] text-pretty text-sm leading-relaxed text-[#8B949E] sm:mt-5 sm:max-w-md sm:text-base lg:mt-6 lg:text-lg">
          Upload one selfie and instantly generate your official Builder ID, Profile
          Frame, Team Banner and Social Banner for HH Goa 2026.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center lg:mt-10">
          <Button
            size="lg"
            onClick={onStart}
            className="h-12 w-full rounded-full bg-[#2EA043] px-6 text-[15px] font-medium text-[#F0F6FC] shadow-[0_0_0_1px_rgba(46,160,67,0.35),0_8px_24px_-8px_rgba(46,160,67,0.45)] hover:bg-[#3FB950] sm:w-auto"
          >
            Start Creating
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToFeatures}
            className="h-12 w-full rounded-full border border-[#30363D] px-5 text-[15px] text-[#8B949E] hover:border-[#3FB950]/40 hover:text-[#F0F6FC] sm:w-auto"
          >
            How it works
          </Button>
        </div>

        <dl className="mt-8 grid max-w-[280px] grid-cols-3 gap-3 border-t border-[#30363D] pt-5 sm:mt-10 sm:max-w-sm sm:gap-5 sm:pt-6 lg:mt-14 lg:gap-6 lg:pt-8">
          {[
            ['4', 'Assets generated'],
            ['<10s', 'Photo to export'],
            ['4K', 'Export resolution'],
          ].map(([n, l]) => (
            <div key={l} className="min-w-0">
              <dt className="truncate font-mono text-lg font-semibold tracking-tight text-[#F0F6FC] sm:text-xl lg:text-2xl">
                {n}
              </dt>
              <dd className="mt-1 text-[11px] leading-snug text-[#6E7681] sm:text-xs">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* live preview — full-width row, identical figure/grid markup to
          PreviewScreen. Because this section is NOT squeezed into a shared
          grid column with the text block, the minmax(0,20rem)/minmax(0,26rem)
          tracks always get their real intended space, so BuilderCard and
          ProfileFrame render at full size with no text truncation and no
          bottom clipping — exactly like the Preview page. */}
      <div className="animate-rise [animation-delay:120ms] mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="grid items-start justify-items-center gap-10 sm:grid-cols-[minmax(0,20rem)_minmax(0,26rem)] sm:gap-8 lg:gap-14">
          <figure className="mx-auto w-full max-w-xs">
            <div className="rounded-[2rem] border border-border/60 glass p-4 shadow-2xl shadow-black/40">
              <ProfileFrame state={demo} />
            </div>
          </figure>

          <figure className="mx-auto w-full max-w-md">
            <div className="w-full rounded-[2rem] border border-border/60 glass p-5 shadow-2xl shadow-black/40">
              <BuilderCard state={demo} />
            </div>
          </figure>
        </div>
      </div>
    </div>
  )
}
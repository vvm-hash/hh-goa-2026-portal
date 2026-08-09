// components/creator/preview-screen.tsx
'use client'

import { Button } from '@/components/ui/button'
import { BuilderCard } from './builder-card'
import { ProfileFrame } from './profile-frame'
import type { CreatorState } from './types'

export function PreviewScreen({
  state,
  onBack,
  onExport,
}: {
  state: CreatorState
  onBack: () => void
  onExport: () => void
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="animate-rise text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          STEP 04
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Looking sharp, {state.name.split(' ')[0]}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          Your HH Goa 2026 assets are ready to export in full resolution.
        </p>
      </div>

      <div className="animate-rise [animation-delay:80ms] mt-12 grid items-start justify-items-center gap-14 sm:grid-cols-[minmax(0,20rem)_minmax(0,26rem)] sm:gap-10 lg:gap-20">
        <figure className="mx-auto w-full max-w-xs">
          <div className="rounded-[2rem] border border-border/60 glass p-4 shadow-2xl shadow-black/40">
            <ProfileFrame state={state} />
          </div>
          <figcaption className="mt-4 text-center">
            <span className="text-sm font-medium">Profile Frame</span>
            <span className="ml-2 font-mono text-[10px] tracking-widest text-muted-foreground">
              2048 × 2048
            </span>
          </figcaption>
        </figure>

        <figure className="mx-auto w-full max-w-md">
          <div className="w-full rounded-[2rem] border border-border/60 glass p-5 shadow-2xl shadow-black/40">
            <BuilderCard state={state} />
          </div>
          <figcaption className="mt-4 text-center">
            <span className="text-sm font-medium">Builder ID Card</span>
            <span className="ml-2 font-mono text-[10px] tracking-widest text-muted-foreground">
              1080 × 1584
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="animate-rise [animation-delay:140ms] mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="h-12 w-full rounded-full px-6 sm:w-auto"
        >
          Keep editing
        </Button>
        <Button
          size="lg"
          onClick={onExport}
          className="h-12 w-full rounded-full px-8 text-[15px] sm:w-auto"
        >
          Export assets
        </Button>
      </div>
    </section>
  )
}
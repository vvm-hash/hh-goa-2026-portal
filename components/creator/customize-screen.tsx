// components/creator/customize-screen.tsx
'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BuilderCard } from './builder-card'
import { ProfileFrame } from './profile-frame'
import { rollBuilderTitle, type CreatorState, type Template } from './types'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] text-[#5A5A4A] uppercase">
        {label}
      </span>
      {children}
    </label>
  )
}

export function CustomizeScreen({
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
  const inputClass =
    'w-full border-2 border-[#111111] bg-white px-4 py-2.5 text-sm font-medium text-[#111111] outline-none transition-all placeholder:text-[#5A5A4A]/50 focus:border-[#0B6E3D] focus:shadow-[0_0_0_2px_rgba(11,110,61,0.15)]'

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      {/* step header */}
      <div className="animate-rise">
        <span className="sticker-tag bg-[#FF0A7A] text-white">03 / CUSTOMIZE</span>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-4xl">
          Make it yours
        </h1>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
        {/* controls */}
        <div className="animate-rise [animation-delay:60ms] space-y-7">

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="DISPLAY NAME">
              <input
                className={inputClass}
                value={state.name}
                maxLength={28}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="Your name"
              />
            </Field>
            <Field label="LOCATION">
              <input
                className={inputClass}
                value={state.location}
                maxLength={28}
                onChange={(e) => update({ location: e.target.value })}
                placeholder="Goa, India"
              />
            </Field>
          </div>

          <Field label="TEAM NAME">
            <input
              className={inputClass}
              value={state.teamName}
              maxLength={28}
              onChange={(e) => update({ teamName: e.target.value })}
              placeholder="Solo Builder"
            />
          </Field>

          {/* builder title */}
          <div>
            <span className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] text-[#5A5A4A] uppercase">
              BUILDER TITLE
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 border-2 border-[#111111] bg-[#FFE600] px-4 py-2.5 text-sm font-bold text-[#111111] shadow-[2px_2px_0px_#111111]">
                {state.role}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => update({ role: rollBuilderTitle(state.role) })}
                className="shrink-0 text-xs"
              >
                🎲 Generate Title
              </Button>
            </div>
            <p className="mt-1.5 font-mono text-[9px] tracking-[0.1em] text-[#5A5A4A] uppercase">
              Generate a unique builder identity
            </p>
          </div>

          {/* primary asset selector */}
          <div>
            <span className="mb-2 block font-mono text-[9px] font-bold tracking-[0.2em] text-[#5A5A4A] uppercase">
              PRIMARY ASSET
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ['frame', 'Profile Frame', 'For avatars & socials'],
                  ['card', 'Builder ID Card', 'Your official pass'],
                ] as [Template, string, string][]
              ).map(([key, title, desc]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update({ template: key })}
                  aria-pressed={state.template === key}
                  className={cn(
                    'border-2 p-4 text-left transition-all',
                    state.template === key
                      ? 'border-[#0B6E3D] bg-[#0B6E3D]/8 shadow-[3px_3px_0px_#0B6E3D]'
                      : 'border-[#111111] bg-white shadow-[2px_2px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px]',
                  )}
                >
                  {state.template === key && (
                    <span className="mb-2 inline-block border border-[#0B6E3D] bg-[#0B6E3D] px-1.5 py-0.5 font-mono text-[8px] tracking-widest text-[#F7F3E8] uppercase">
                      SELECTED
                    </span>
                  )}
                  <span className="block text-sm font-bold text-[#111111]">{title}</span>
                  <span className="mt-0.5 block font-mono text-[9px] tracking-[0.1em] text-[#5A5A4A] uppercase">
                    {desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 border-t-2 border-[#111111]/15 pt-6">
            <Button variant="outline" size="lg" onClick={onBack} className="px-6">
              ← Back
            </Button>
            <Button size="lg" onClick={onNext} className="px-8">
              Preview →
            </Button>
          </div>
        </div>

        {/* live preview */}
        <div className="animate-rise [animation-delay:120ms]">
          <div className="lg:sticky lg:top-28">
            <div className="mb-2 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#FF0A7A]" style={{ animation: 'hh-pulse-dot 1.5s ease-in-out infinite' }} />
              <span className="font-mono text-[9px] tracking-[0.16em] text-[#5A5A4A] uppercase">Live Preview</span>
            </div>
            <div
              className={cn(
                'border-2 border-[#111111] bg-white p-4 shadow-[4px_4px_0px_#111111] flex justify-center overflow-hidden',
                state.template === 'frame' ? 'w-[332px]' : 'w-[356px]',
              )}
            >
              {state.template === 'frame' ? (
                <div className="w-[300px] h-[300px] overflow-hidden relative">
                  <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 600, height: 600 }}>
                    <ProfileFrame state={state} />
                  </div>
                </div>
              ) : (
                <div className="w-[324px] h-[576px] overflow-hidden relative">
                  <div style={{ transform: 'scale(0.3)', transformOrigin: 'top left', width: 1080, height: 1920 }}>
                    <BuilderCard state={state} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
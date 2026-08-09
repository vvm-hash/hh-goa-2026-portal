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
      <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
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
    'w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:bg-secondary'

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="animate-rise">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          STEP 03
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Make it yours
        </h1>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
        {/* controls */}
        <div className="animate-rise [animation-delay:60ms] space-y-10">
          <div className="grid gap-6 sm:grid-cols-2">
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

          <div>
            <span className="mb-2 block font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
              BUILDER TITLE
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div
                className={cn(
                  inputClass,
                  'flex-1 cursor-default select-none py-4 text-base font-semibold',
                )}
              >
                {state.role}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => update({ role: rollBuilderTitle(state.role) })}
                className="h-[50px] shrink-0 rounded-xl px-5 text-sm"
              >
                🎲 Generate Builder Title
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Generate a unique Hacker House Goa builder identity.
            </p>
          </div>

          <div>
            <span className="mb-3 block font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
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
                    'rounded-2xl border p-4 text-left transition-all',
                    state.template === key
                      ? 'border-foreground/30 bg-foreground/5'
                      : 'border-border hover:border-foreground/20',
                  )}
                >
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={onBack}
              className="h-12 rounded-full px-6"
            >
              Back
            </Button>
            <Button
              size="lg"
              onClick={onNext}
              className="h-12 rounded-full px-8 text-[15px]"
            >
              Preview
            </Button>
          </div>
        </div>

        {/* live preview */}
        <div className="animate-rise [animation-delay:120ms]">
          <div className="lg:sticky lg:top-28">
            <div
              className={cn(
                'mx-auto w-full rounded-[2rem] border border-border/60 glass p-4 shadow-2xl shadow-black/40',
                state.template === 'frame' ? 'max-w-[19rem]' : 'max-w-[26rem] sm:p-5',
              )}
            >
              {state.template === 'frame' ? (
                <ProfileFrame state={state} />
              ) : (
                <BuilderCard state={state} />
              )}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Live preview · updates as you type
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
// components/creator/steps.tsx
import { cn } from '@/lib/utils'

export type StepKey = 'upload' | 'crop' | 'customize' | 'preview'

export const STEP_ORDER: StepKey[] = ['upload', 'crop', 'customize', 'preview']

const LABELS: Record<StepKey, string> = {
  upload: 'Upload',
  crop: 'Crop',
  customize: 'Customize',
  preview: 'Preview',
}

export function StepIndicator({ current }: { current: StepKey }) {
  const currentIndex = STEP_ORDER.indexOf(current)

  return (
    <nav aria-label="Progress" className="flex items-center justify-center">
      <ol className="flex items-center gap-1.5 rounded-full border border-[#30363D] bg-[#161B22]/70 px-2 py-1.5 backdrop-blur-md">
        {STEP_ORDER.map((step, i) => {
          const state =
            i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'upcoming'
          return (
            <li key={step} className="flex items-center gap-1.5">
              <div
                className={cn(
                  'flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                  state === 'active' && 'bg-[#F0F6FC]/[0.07] text-[#F0F6FC]',
                  state === 'done' && 'text-[#8B949E]',
                  state === 'upcoming' && 'text-[#6E7681]',
                )}
              >
                <span
                  className={cn(
                    'grid size-4 place-items-center rounded-full font-mono text-[9px] leading-none transition-colors',
                    state === 'active' && 'bg-[#2EA043] text-[#F0F6FC]',
                    state === 'done' && 'bg-[#3FB950]/20 text-[#3FB950]',
                    state === 'upcoming' && 'border border-[#30363D] text-[#6E7681]',
                  )}
                >
                  {state === 'done' ? '✓' : i + 1}
                </span>
                <span className="hidden sm:inline">{LABELS[step]}</span>
              </div>
              {i < STEP_ORDER.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    'h-px w-3 sm:w-5',
                    i < currentIndex ? 'bg-[#3FB950]/40' : 'bg-[#30363D]',
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
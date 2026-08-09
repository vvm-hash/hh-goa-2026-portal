// components/creator/steps.tsx
import { cn } from '@/lib/utils'

export type StepKey = 'upload' | 'crop' | 'customize' | 'preview'

export const STEP_ORDER: StepKey[] = ['upload', 'crop', 'customize', 'preview']

const LABELS: Record<StepKey, string> = {
  upload: 'UPLOAD',
  crop: 'CROP',
  customize: 'CUSTOMIZE',
  preview: 'PREVIEW',
}

export function StepIndicator({ current }: { current: StepKey }) {
  const currentIndex = STEP_ORDER.indexOf(current)

  return (
    <nav aria-label="Progress" className="flex items-center gap-px">
      {STEP_ORDER.map((step, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'upcoming'
        return (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                'flex items-center gap-1.5 border-2 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.18em] transition-all',
                state === 'active' && 'border-[#FFE600] bg-[#FFE600] text-[#111111]',
                state === 'done'   && 'border-[#F7F3E8]/40 bg-[#F7F3E8]/10 text-[#F7F3E8]/60',
                state === 'upcoming' && 'border-[#F7F3E8]/20 bg-transparent text-[#F7F3E8]/30',
              )}
            >
              <span
                className={cn(
                  'grid size-3.5 place-items-center font-mono text-[8px] font-bold leading-none',
                )}
              >
                {state === 'done' ? '✓' : `0${i + 1}`}
              </span>
              <span className="hidden sm:inline">{LABELS[step]}</span>
            </div>
            {i < STEP_ORDER.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  'h-px w-4',
                  i < currentIndex ? 'bg-[#FFE600]/60' : 'bg-[#F7F3E8]/15',
                )}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
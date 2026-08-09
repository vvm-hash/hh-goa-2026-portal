// components/creator/flow-header.tsx
'use client'

import { Button } from '@/components/ui/button'
import { BrandMark } from './brand-mark'
import { StepIndicator, type StepKey } from './steps'

export function FlowHeader({
  step,
  onExit,
}: {
  step: StepKey
  onExit: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-[#111111] bg-[#084C2A]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* brand */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-[9px] font-bold tracking-[0.22em] text-[#FFE600] uppercase">
            HH GOA
          </span>
          <span className="h-3 w-px bg-[#F7F3E8]/20" />
          <span className="font-mono text-[9px] tracking-[0.18em] text-[#F7F3E8]/60 uppercase">
            2026
          </span>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <StepIndicator current={step} />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onExit}
          className="shrink-0 border-[#F7F3E8]/30 text-[#F7F3E8]/70 hover:border-[#F7F3E8]/60 hover:bg-[#F7F3E8]/10 hover:text-[#F7F3E8]"
        >
          Exit
        </Button>
      </div>
      <div className="flex justify-center border-t border-[#F7F3E8]/10 pb-2.5 pt-2 md:hidden">
        <StepIndicator current={step} />
      </div>
    </header>
  )
}
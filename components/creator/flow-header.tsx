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
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#070B08]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <BrandMark className="shrink-0" />
        <div className="hidden flex-1 justify-center md:flex">
          <StepIndicator current={step} />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onExit}
          className="shrink-0 rounded-full text-[#8B949E] hover:bg-[#11161D] hover:text-[#F5F7FA]"
        >
          Exit
        </Button>
      </div>
      <div className="flex justify-center pb-3 md:hidden">
        <StepIndicator current={step} />
      </div>
    </header>
  )
}
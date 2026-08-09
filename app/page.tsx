// app/page.tsx
'use client'

import { useRef, useState } from 'react'
import { Aurora } from '@/components/creator/aurora'
import { CropScreen } from '@/components/creator/crop-screen'
import { CustomizeScreen } from '@/components/creator/customize-screen'
import { FlowHeader } from '@/components/creator/flow-header'
import { Landing } from '@/components/creator/landing'
import { PreviewScreen } from '@/components/creator/preview-screen'
import type { StepKey } from '@/components/creator/steps'
import { SuccessModal } from '@/components/creator/success-modal'
import { DEFAULT_STATE, type CreatorState } from '@/components/creator/types'
import { UploadScreen } from '@/components/creator/upload-screen'

type Screen = 'landing' | StepKey

export default function Page() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [state, setState] = useState<CreatorState>(DEFAULT_STATE)
  const [exported, setExported] = useState(false)

  // Refs to the preview DOM elements — passed to PreviewScreen to attach,
  // then read by SuccessModal to capture exactly what the user sees.
  const profileFrameRef = useRef<HTMLDivElement>(null)
  const builderCardRef = useRef<HTMLDivElement>(null)

  const update = (patch: Partial<CreatorState>) =>
    setState((prev) => ({ ...prev, ...patch }))

  const reset = () => {
    setState(DEFAULT_STATE)
    setExported(false)
    setScreen('landing')
  }

  return (
    <>
      <Aurora />

      {screen === 'landing' ? (
        <Landing onStart={() => setScreen('upload')} />
      ) : (
        <div className="min-h-dvh">
          <FlowHeader step={screen} onExit={reset} />

          {screen === 'upload' && (
            <UploadScreen
              imageSrc={state.imageSrc}
              onImage={(src) => update({ imageSrc: src })}
              onNext={() => setScreen('crop')}
            />
          )}

          {screen === 'crop' && (
            <CropScreen
              state={state}
              update={update}
              onBack={() => setScreen('upload')}
              onNext={() => setScreen('customize')}
            />
          )}

          {screen === 'customize' && (
            <CustomizeScreen
              state={state}
              update={update}
              onBack={() => setScreen('crop')}
              onNext={() => setScreen('preview')}
            />
          )}

          {screen === 'preview' && (
            <PreviewScreen
              state={state}
              onBack={() => setScreen('customize')}
              onExport={() => setExported(true)}
              profileFrameRef={profileFrameRef}
              builderCardRef={builderCardRef}
            />
          )}
        </div>
      )}

      <SuccessModal
        open={exported}
        state={state}
        onClose={() => setExported(false)}
        onRestart={reset}
        profileFrameRef={profileFrameRef}
        builderCardRef={builderCardRef}
      />
    </>
  )
}
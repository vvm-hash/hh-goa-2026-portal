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
import { DEFAULT_STATE, type CreatorState, generateBuilderId } from '@/components/creator/types'
import { UploadScreen } from '@/components/creator/upload-screen'
import { compressPngIfNeeded, uploadWithRetry } from '@/components/creator/upload-utils'
import { saveBuilderAssets } from '@/app/actions'

type Screen = 'landing' | StepKey

export default function Page() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [state, setState] = useState<CreatorState>(DEFAULT_STATE)
  const [exported, setExported] = useState(false)
  const [shareLinkStatus, setShareLinkStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [shareLinkError, setShareLinkError] = useState<string | null>(null)
  
  // Holds the background upload function so we can retry from the Success Modal without regenerating PNGs
  const retryRef = useRef<(() => void) | null>(null)

  // Refs to the preview DOM elements — passed to PreviewScreen to attach,
  // then read by SuccessModal to capture exactly what the user sees.
  const profileFrameRef = useRef<HTMLDivElement>(null)
  const builderCardRef = useRef<HTMLDivElement>(null)

  const update = (patch: Partial<CreatorState>) =>
    setState((prev) => ({ ...prev, ...patch }))

  const reset = () => {
    if (state.imageSrc && state.imageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(state.imageSrc)
    }
    setState({ ...DEFAULT_STATE, builderId: generateBuilderId() })
    setExported(false)
    setScreen('landing')
  }

  const isUploadingRef = useRef(false)

  const handleExport = (profileBlob: Blob, cardBlob: Blob) => {
    setExported(true)
    
    const executeUpload = async () => {
      // Prevent concurrent uploads using a persistent ref lock
      if (isUploadingRef.current) return
      isUploadingRef.current = true

      try {
        setShareLinkStatus('uploading')
        setShareLinkError(null)
        
        const builderId = state.builderId || '7140-620'
        
        // Upload the generated blobs directly without the risky canvas-based downscaling
        // to avoid silent browser hangs on large image processing.
        const [profileUrl, cardUrl] = await Promise.all([
          uploadWithRetry(`profiles/${builderId}.jpg`, profileBlob),
          uploadWithRetry(`cards/${builderId}.jpg`, cardBlob)
        ])

        const result = await saveBuilderAssets({
          builderId,
          profileUrl,
          cardUrl
        })
        
        if (!result.success) {
          throw new Error('Failed to save builder record.')
        }
        
        setShareLinkStatus('success')
      } catch (err: any) {
        console.error('Background upload failed:', err)
        setShareLinkStatus('error')
        setShareLinkError(`Failed to create share link: ${err.message || 'Network error'}`)
      } finally {
        isUploadingRef.current = false
      }
    }
    
    retryRef.current = executeUpload
    executeUpload()
  }

  return (
    <>
      <Aurora />

      {screen === 'landing' ? (
        <Landing onStart={() => {
          update({ builderId: generateBuilderId() })
          setScreen('upload')
        }} />
      ) : (
        <div className="min-h-dvh">
          <FlowHeader step={screen} onExit={reset} />

          {screen === 'upload' && (
            <UploadScreen
              imageSrc={state.imageSrc}
              onImage={(src) => {
                if (state.imageSrc && state.imageSrc.startsWith('blob:') && state.imageSrc !== src) {
                  URL.revokeObjectURL(state.imageSrc)
                }
                update({ imageSrc: src })
              }}
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
              onBack={() => {
                setScreen('customize')
                if (shareLinkStatus !== 'idle') {
                  setShareLinkStatus('idle')
                  setShareLinkError(null)
                  update({ builderId: generateBuilderId() })
                }
              }}
              onExport={handleExport}
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
        shareLinkStatus={shareLinkStatus}
        shareLinkError={shareLinkError}
        onRetry={() => retryRef.current?.()}
      />
    </>
  )
}
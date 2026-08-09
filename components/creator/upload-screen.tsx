// components/creator/upload-screen.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

export function UploadScreen({
  imageSrc,
  onImage,
  onNext,
}: {
  imageSrc: string | null
  onImage: (src: string) => void
  onNext: () => void
}) {
  const browseInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [dragging, setDragging] = useState(false)
  const [webcamOpen, setWebcamOpen] = useState(false)
  const [webcamError, setWebcamError] = useState<string | null>(null)
  const [webcamLoading, setWebcamLoading] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => onImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  function stopWebcam() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
  }

  function closeWebcam() {
    stopWebcam()
    setWebcamOpen(false)
    setWebcamError(null)
    setWebcamLoading(false)
    setCapturedPhoto(null)
  }

  async function attachStream(stream: MediaStream) {
    streamRef.current = stream
    if (videoRef.current) {
      videoRef.current.srcObject = stream
      await videoRef.current.play()
    }
  }

  async function openWebcam() {
    setWebcamOpen(true)
    setWebcamError(null)
    setWebcamLoading(true)
    setCapturedPhoto(null)

    if (!navigator.mediaDevices?.getUserMedia) {
      setWebcamLoading(false)
      setWebcamError(
        'Camera access isn\u2019t supported in this browser. You can use Browse Device instead.',
      )
      return
    }

    // Prefer the front camera. Fall back gracefully if it's unavailable,
    // and finally fall back to any camera the device has.
    const attempts: MediaStreamConstraints[] = [
      { video: { facingMode: { exact: 'user' } }, audio: false },
      { video: { facingMode: 'user' }, audio: false },
      { video: true, audio: false },
    ]

    let lastError: unknown = null
    for (const constraints of attempts) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        await attachStream(stream)
        setWebcamLoading(false)
        return
      } catch (err) {
        lastError = err
      }
    }

    setWebcamLoading(false)
    const name = lastError instanceof Error ? lastError.name : ''
    if (name === 'NotAllowedError' || name === 'SecurityError') {
      setWebcamError(
        'Camera access was denied. You can use Browse Device instead.',
      )
    } else {
      setWebcamError(
        'Camera is unavailable right now. You can use Browse Device instead.',
      )
    }
  }

  function handleCapture() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const width = video.videoWidth
    const height = video.videoHeight
    if (!width || !height) return

    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Mirror the frame so the capture matches the mirrored preview.
    ctx.translate(width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, width, height)

    setCapturedPhoto(canvas.toDataURL('image/png'))
  }

  function handleRetake() {
    setCapturedPhoto(null)
  }

  function handleUsePhoto() {
    if (!capturedPhoto) return
    onImage(capturedPhoto)
    closeWebcam()
  }

  function handleTakeSelfie() {
    void openWebcam()
  }

  useEffect(() => {
    return () => {
      stopWebcam()
    }
  }, [])

  return (
    <section className="mx-auto max-w-xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="animate-rise text-center">
        <p className="font-mono text-xs tracking-[0.24em] text-[#8B949E]">
          STEP 01
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[#F5F7FA] sm:text-4xl">
          Add your photo
        </h1>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-[#8B949E]">
          Upload one clear front-facing selfie. Nothing leaves your device.
        </p>
      </div>

      {/* premium upload card */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`animate-rise [animation-delay:80ms] mt-9 rounded-3xl border p-6 transition-colors sm:p-8 ${
          dragging
            ? 'border-[#2FB344]/50 bg-[#2FB344]/[0.04]'
            : 'border-white/[0.08] bg-[#11161D]'
        }`}
        style={{
          boxShadow: dragging
            ? '0 0 0 1px rgba(47,179,68,0.15), 0 0 40px -12px rgba(47,179,68,0.35)'
            : '0 0 0 1px rgba(255,255,255,0.02)',
        }}
      >
        {/* preview */}
        {imageSrc && (
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-1.5 rounded-2xl opacity-60 blur-md"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(73,209,122,0.5), transparent 70%)',
                }}
              />
              <img
                src={imageSrc || '/placeholder.svg'}
                alt="Selected portrait preview"
                className="relative size-28 rounded-2xl border border-white/[0.08] object-cover shadow-lg"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.18em] text-[#49D17A]">
              PHOTO CAPTURED
            </span>
          </div>
        )}

        {/* primary actions */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleTakeSelfie}
            className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1310] px-5 py-8 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2FB344]/40"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.02)' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(120% 100% at 50% 0%, rgba(47,179,68,0.12), transparent 70%)',
              }}
            />
            <span className="relative grid size-12 place-items-center rounded-xl border border-[#2FB344]/30 bg-[#2FB344]/10 text-[#49D17A] transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path d="M4 8a2 2 0 0 1 2-2h2l1.2-1.8a2 2 0 0 1 1.66-.9h2.28a2 2 0 0 1 1.66.9L16 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="relative">
              <span className="block text-sm font-medium text-[#F5F7FA]">Take Selfie</span>
              <span className="mt-1 block font-mono text-[10px] tracking-[0.14em] text-[#8B949E]">
                USE CAMERA
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => browseInputRef.current?.click()}
            className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1310] px-5 py-8 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4DB5FF]/40"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.02)' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(120% 100% at 50% 0%, rgba(77,181,255,0.12), transparent 70%)',
              }}
            />
            <span className="relative grid size-12 place-items-center rounded-xl border border-[#4DB5FF]/30 bg-[#4DB5FF]/10 text-[#4DB5FF] transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="relative">
              <span className="block text-sm font-medium text-[#F5F7FA]">Browse Device</span>
              <span className="mt-1 block font-mono text-[10px] tracking-[0.14em] text-[#8B949E]">
                CHOOSE FROM FILES
              </span>
            </span>
          </button>
        </div>

        {/* divider */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/[0.08]" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#8B949E]">
            OR DRAG & DROP
          </span>
          <span className="h-px flex-1 bg-white/[0.08]" />
        </div>

        {/* secondary drop zone */}
        <div
          className={`rounded-xl border border-dashed px-5 py-5 text-center transition-colors ${
            dragging ? 'border-[#2FB344]/50' : 'border-white/[0.08]'
          }`}
        >
          <p className="text-xs text-[#8B949E]">
            Drop an image anywhere in this card
          </p>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] tracking-[0.12em] text-[#8B949E]">
          Supports JPG, PNG, HEIC · Maximum 10MB
        </p>

        {/* hidden input for Browse Device — unchanged */}
        <input
          ref={browseInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="animate-rise [animation-delay:140ms] mt-8 flex justify-center">
        <Button
          size="lg"
          disabled={!imageSrc}
          onClick={onNext}
          className="h-12 rounded-full bg-[#2FB344] px-8 text-[15px] text-[#070B08] hover:bg-[#49D17A] disabled:bg-[#11161D] disabled:text-[#8B949E]"
        >
          Continue
        </Button>
      </div>

      {/* cross-platform camera modal */}
      {webcamOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex max-h-[92dvh] w-full max-w-md flex-col overflow-y-auto rounded-3xl border border-white/[0.08] bg-[#11161D] p-5 sm:p-6"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 0 60px -12px rgba(47,179,68,0.25)' }}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#8B949E]">
                CAMERA ACCESS
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] text-[#49D17A]">
                <span className="size-1.5 rounded-full bg-[#49D17A]" />
                {webcamError
                  ? 'BLOCKED'
                  : webcamLoading
                    ? 'CONNECTING'
                    : capturedPhoto
                      ? 'CAPTURED'
                      : 'LIVE'}
              </span>
            </div>

            <h2 className="mt-2 text-lg font-semibold tracking-tight text-[#F5F7FA]">
              Take a selfie
            </h2>

            {webcamError ? (
              <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#0D1310] px-5 py-8 text-center">
                <p className="text-sm text-[#F5F7FA]">{webcamError}</p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      closeWebcam()
                      browseInputRef.current?.click()
                    }}
                    className="rounded-full border-white/[0.08] bg-transparent text-[#F5F7FA] hover:bg-white/[0.06]"
                  >
                    Browse Device
                  </Button>
                  <Button
                    onClick={closeWebcam}
                    className="rounded-full bg-[#2FB344] text-[#070B08] hover:bg-[#49D17A]"
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative mt-5 aspect-square w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1310]">
                  {/* live feed — kept mounted (just hidden) while a photo is
                      captured, so the stream stays attached and Retake is instant */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`h-full w-full scale-x-[-1] object-cover ${
                      capturedPhoto ? 'hidden' : ''
                    }`}
                  />

                  {capturedPhoto && (
                    <img
                      src={capturedPhoto || '/placeholder.svg'}
                      alt="Captured selfie preview"
                      className="h-full w-full object-cover"
                    />
                  )}

                  {webcamLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0D1310]">
                      <span className="font-mono text-xs tracking-[0.14em] text-[#8B949E]">
                        Starting camera…
                      </span>
                    </div>
                  )}

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-inset ring-[#2FB344]/20"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {capturedPhoto ? (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={handleRetake}
                        className="h-11 flex-1 rounded-full border-white/[0.08] bg-transparent text-[#F5F7FA] hover:bg-white/[0.06]"
                      >
                        Retake
                      </Button>
                      <Button
                        onClick={handleUsePhoto}
                        className="h-11 flex-1 rounded-full bg-[#2FB344] text-[#070B08] hover:bg-[#49D17A]"
                      >
                        Use Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={closeWebcam}
                        className="h-11 flex-1 rounded-full border-white/[0.08] bg-transparent text-[#F5F7FA] hover:bg-white/[0.06]"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCapture}
                        disabled={webcamLoading}
                        className="h-11 flex-1 rounded-full bg-[#2FB344] text-[#070B08] hover:bg-[#49D17A] disabled:bg-[#0D1310] disabled:text-[#8B949E]"
                      >
                        Capture
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* offscreen canvas used for frame capture, never rendered */}
      <canvas ref={canvasRef} className="hidden" />
    </section>
  )
}
// components/creator/upload-screen.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { convertHeicToPngIfNeeded } from './heic'

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

  async function handleFiles(files: FileList | null) {
    const rawFile = files?.[0]
    if (!rawFile || !rawFile.type.startsWith('image/')) return
    
    const file = await convertHeicToPngIfNeeded(rawFile)
    
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      
      const img = new Image()
      const finalize = async () => {
        try { await img.decode() } catch {}
        onImage(dataUrl)
      }
      
      img.onload = finalize
      img.onerror = () => onImage(dataUrl)
      img.src = dataUrl
    }
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
      setWebcamError('Camera access was denied. You can use Browse Device instead.')
    } else {
      setWebcamError('Camera is unavailable right now. You can use Browse Device instead.')
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
    ctx.translate(width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, width, height)
    setCapturedPhoto(canvas.toDataURL('image/png'))
  }

  function handleRetake() { setCapturedPhoto(null) }
  function handleUsePhoto() { if (!capturedPhoto) return; onImage(capturedPhoto); closeWebcam() }
  function handleTakeSelfie() { void openWebcam() }

  useEffect(() => { return () => { stopWebcam() } }, [])

  return (
    <section className="mx-auto max-w-xl px-5 py-12 sm:px-8 sm:py-16">
      {/* step header */}
      <div className="animate-rise">
        <div className="mb-1 flex items-center gap-2">
          <span className="sticker-tag bg-[#0B6E3D] text-[#F7F3E8]">01 / UPLOAD</span>
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#111111] sm:text-4xl">
          Add your photo
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#5A5A4A]">
          Upload one clear front-facing selfie. Nothing leaves your device.
        </p>
      </div>

      {/* upload card */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
        className={`animate-rise [animation-delay:80ms] mt-7 border-2 p-6 transition-all sm:p-8 ${
          dragging
            ? 'border-[#0B6E3D] bg-[#0B6E3D]/5 shadow-[4px_4px_0px_#0B6E3D]'
            : 'border-[#111111] bg-white shadow-[4px_4px_0px_#111111]'
        }`}
      >
        {/* photo preview */}
        {imageSrc && (
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="relative border-2 border-[#0B6E3D] p-1 shadow-[3px_3px_0px_#0B6E3D]">
              <img
                src={imageSrc}
                alt="Selected portrait preview"
                className="size-24 object-cover"
              />
            </div>
            <span className="sticker-tag bg-[#0B6E3D] text-[#F7F3E8]">
              <span className="size-1.5 rounded-full bg-[#FFE600]" />
              PHOTO READY
            </span>
          </div>
        )}

        {/* action buttons */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Take Selfie */}
          <button
            type="button"
            onClick={handleTakeSelfie}
            className="group flex flex-col items-center justify-center gap-3 border-2 border-[#111111] bg-[#F7F3E8] px-5 py-7 text-center transition-all shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none"
          >
            <span className="grid size-11 place-items-center border-2 border-[#111111] bg-[#0B6E3D] text-[#F7F3E8] shadow-[2px_2px_0px_#111111] group-hover:shadow-[1px_1px_0px_#111111] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                <path d="M4 8a2 2 0 0 1 2-2h2l1.2-1.8a2 2 0 0 1 1.66-.9h2.28a2 2 0 0 1 1.66.9L16 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-bold text-[#111111]">Take Selfie</span>
              <span className="mt-0.5 block font-mono text-[9px] tracking-[0.16em] text-[#5A5A4A] uppercase">Use Camera</span>
            </span>
          </button>

          {/* Browse Device */}
          <button
            type="button"
            onClick={() => browseInputRef.current?.click()}
            className="group flex flex-col items-center justify-center gap-3 border-2 border-[#111111] bg-[#F7F3E8] px-5 py-7 text-center transition-all shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none"
          >
            <span className="grid size-11 place-items-center border-2 border-[#111111] bg-[#FF0A7A] text-white shadow-[2px_2px_0px_#111111] group-hover:shadow-[1px_1px_0px_#111111] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                <path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-bold text-[#111111]">Browse Device</span>
              <span className="mt-0.5 block font-mono text-[9px] tracking-[0.16em] text-[#5A5A4A] uppercase">Choose From Files</span>
            </span>
          </button>
        </div>

        {/* divider */}
        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#111111]/15" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#5A5A4A] uppercase">Or Drag & Drop</span>
          <span className="h-px flex-1 bg-[#111111]/15" />
        </div>

        {/* drop zone */}
        <div className={`border-2 border-dashed px-5 py-4 text-center transition-colors ${dragging ? 'border-[#0B6E3D]' : 'border-[#111111]/30'}`}>
          <p className="font-mono text-[10px] tracking-[0.14em] text-[#5A5A4A] uppercase">
            Drop an image anywhere in this card
          </p>
        </div>

        <p className="mt-4 text-center font-mono text-[9px] tracking-[0.14em] text-[#5A5A4A] uppercase">
          Supports JPG · PNG · HEIC · Max 10MB
        </p>

        <input
          ref={browseInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="animate-rise [animation-delay:140ms] mt-7 flex justify-center">
        <Button
          size="lg"
          disabled={!imageSrc}
          onClick={onNext}
          className="px-10 disabled:border-[#111111]/20 disabled:bg-[#E8E3D4] disabled:text-[#5A5A4A] disabled:shadow-none"
        >
          Continue →
        </Button>
      </div>

      {/* camera modal */}
      {webcamOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/70 p-4 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex max-h-[92dvh] w-full max-w-md flex-col overflow-y-auto border-2 border-[#111111] bg-[#F7F3E8] p-5 shadow-[6px_6px_0px_#111111] sm:p-6">
            {/* modal header */}
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3">
              <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#5A5A4A] uppercase">
                Camera Access
              </span>
              <span className="flex items-center gap-1.5 border border-[#0B6E3D] bg-[#0B6E3D]/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-[#0B6E3D] uppercase">
                <span className="size-1.5 rounded-full bg-[#0B6E3D]" style={{ animation: 'hh-pulse-dot 1.5s ease-in-out infinite' }} />
                {webcamError ? 'BLOCKED' : webcamLoading ? 'CONNECTING' : capturedPhoto ? 'CAPTURED' : 'LIVE'}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-black tracking-tight text-[#111111]">
              Take a selfie
            </h2>

            {webcamError ? (
              <div className="mt-5 border-2 border-[#111111] bg-white px-5 py-6 text-center">
                <p className="text-sm text-[#111111]">{webcamError}</p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <Button variant="outline" onClick={() => { closeWebcam(); browseInputRef.current?.click() }}>
                    Browse Device
                  </Button>
                  <Button onClick={closeWebcam}>Close</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative mt-5 aspect-square w-full overflow-hidden border-2 border-[#111111] bg-[#E8E3D4]">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`h-full w-full scale-x-[-1] object-cover ${capturedPhoto ? 'hidden' : ''}`}
                  />
                  {capturedPhoto && (
                    <img src={capturedPhoto} alt="Captured selfie preview" className="h-full w-full object-cover" />
                  )}
                  {webcamLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#E8E3D4]">
                      <span className="font-mono text-xs tracking-[0.14em] text-[#5A5A4A] uppercase">
                        Starting camera…
                      </span>
                    </div>
                  )}
                  {/* rule-of-thirds guides */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="border border-[#0B6E3D]/15" />
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {capturedPhoto ? (
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleRetake} className="flex-1">Retake</Button>
                      <Button onClick={handleUsePhoto} className="flex-1">Use Photo</Button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={closeWebcam} className="flex-1">Cancel</Button>
                      <Button onClick={handleCapture} disabled={webcamLoading} className="flex-1 disabled:border-[#111111]/20 disabled:bg-[#E8E3D4] disabled:text-[#5A5A4A] disabled:shadow-none">
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

      {/* offscreen canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </section>
  )
}
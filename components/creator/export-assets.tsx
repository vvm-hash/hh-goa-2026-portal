// components/creator/export-assets.tsx
'use client'

import { domToPng } from 'modern-screenshot'
import { type CreatorState } from './types'



export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Waits for every <img> inside `root` to finish loading AND decoding, so
 * the uploaded photo is guaranteed to be pixel-ready before capture.
 */
async function waitForImages(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll('img'))
  await Promise.all(
    imgs.map(async (img, i) => {
      if (!img.complete || img.naturalWidth === 0) {
        await new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true })
          img.addEventListener('error', () => resolve(), { once: true })
        })
      }
      try {
        await img.decode()
      } catch {
        // A decode failure shouldn't hard-fail the whole export.
      }
    }),
  )
}

/**
 * Captures an ALREADY-RENDERED live DOM element (the actual preview on screen)
 * and produces a high-resolution PNG data URL.
 *
 * HOW IT WORKS
 * ─────────────
 * We target the exact DOM element the user is already looking at.
 * By using modern-screenshot (a highly robust dom-to-image alternative) with scale: 2,
 * we bypass the UI constraints and extract a pristine, 1:1 render.
 * We also use a double-render pass to force Safari to paint properly.
 */
async function captureLiveElement({
  element,
  label,
}: {
  element: HTMLElement
  label: string
}): Promise<string> {
  // Make sure all images inside the live element are decoded before capture.
  await waitForImages(element)

  // --- DIAGNOSTICS START ---
  const imgs = Array.from(element.querySelectorAll('img'))
  
  await Promise.all(imgs.map(img => {
    if (img.complete && img.naturalHeight !== 0) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      const handleLoad = () => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
        resolve(true)
      }
      const handleError = (e: any) => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
        reject(new Error(`Failed to load image in preview: ${img.src}`))
      }
      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)
    })
  }))
  // --- DIAGNOSTICS END ---

  const options = {
    scale: 2, // Forces high-res export
    width: element.offsetWidth,
    height: element.offsetHeight,
    backgroundColor: '#F6F1E8', // Ensures the cream background is captured
    style: { 
      transform: 'scale(1)', 
      transformOrigin: 'top left',
      margin: '0'
    },
    fetch: {
      bypassingCache: true, // Bypass cache to avoid cors issues
    }
  }

  // Double execution: First pass forces layout computation and resource fetching
  await domToPng(element, options)
  
  // Short wait
  await wait(100)

  // Second pass: Captures the fully painted state (fixes Safari issues)
  return await domToPng(element, options)
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Exports the Profile Frame from the live preview DOM element.
 * Pass `profileFrameEl` — the ref'd wrapper div around <ProfileFrame /> in
 * the preview screen.
 */
export async function renderProfileFramePng(
  _state: CreatorState,
  profileFrameEl: HTMLElement,
): Promise<string> {
  return captureLiveElement({
    element: profileFrameEl,
    label: 'Profile Frame',
  })
}

/**
 * Exports the Builder ID Card from the live preview DOM element.
 * Pass `builderCardEl` — the ref'd wrapper div around <BuilderCard /> in
 * the preview screen.
 */
export async function renderBuilderIdPng(
  _state: CreatorState,
  builderCardEl: HTMLElement,
): Promise<string> {
  return captureLiveElement({
    element: builderCardEl,
    label: 'Builder ID',
  })
}

export async function exportProfileFrame(state: CreatorState, profileFrameEl: HTMLElement) {
  const dataUrl = await renderProfileFramePng(state, profileFrameEl)
  downloadDataUrl(dataUrl, 'hhgoa-profile-frame.png')
}

export async function exportBuilderId(state: CreatorState, builderCardEl: HTMLElement) {
  const dataUrl = await renderBuilderIdPng(state, builderCardEl)
  downloadDataUrl(dataUrl, 'hhgoa-builder-id.png')
}

export async function exportBothAssets(
  state: CreatorState,
  profileFrameEl: HTMLElement,
  builderCardEl: HTMLElement,
) {
  const [profileFrame, builderId] = await Promise.all([
    renderProfileFramePng(state, profileFrameEl),
    renderBuilderIdPng(state, builderCardEl),
  ])
  downloadDataUrl(profileFrame, 'hhgoa-profile-frame.png')
  // Small gap so browsers don't coalesce/block the second download.
  await wait(150)
  downloadDataUrl(builderId, 'hhgoa-builder-id.png')
}

export function shareOnX(builderId: string) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hhbuilder.vercel.app'
  const text = `Just created my official HH Goa 2026 Builder ID & Profile Frame. 🚀\n\nReady to build. Ready to connect. Ready for HH Goa 2026.\n\nCreate yours:\n${baseUrl}\n\n#HHGoa2026 #FrameInGoa\n\n${baseUrl}/share/${builderId}`
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
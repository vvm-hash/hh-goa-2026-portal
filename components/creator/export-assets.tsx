// components/creator/export-assets.tsx
'use client'

import { toPng } from 'html-to-image'
import type { CreatorState } from './types'

// Set to true locally if you need to debug an export failure — logs
// pre-capture and onclone DOM snapshots to the console. Off by default so
// normal usage stays quiet.
const DEBUG_EXPORT = false

function debugLog(label: string, ...args: unknown[]) {
  if (DEBUG_EXPORT) {
    // eslint-disable-next-line no-console
    console.debug(`[export:${label}]`, ...args)
  }
}

function downloadDataUrl(dataUrl: string, filename: string) {
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
      debugLog('images', `img[${i}] settled`, {
        src: img.src.slice(0, 80),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      })
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
 * By using html-to-image with pixelRatio: 2 and transform: scale(1),
 * we bypass the UI constraints and extract a pristine, 1:1 render.
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

  debugLog(label, 'capturing live element with html-to-image')

  return await toPng(element, {
    pixelRatio: 2, // Forces high-res export
    backgroundColor: '#F6F1E8', // Ensures the cream background is captured
    cacheBust: true, // Prevents cross-origin cache blanking
    style: { 
      transform: 'scale(1)', 
      transformOrigin: 'top left',
      margin: '0'
    }
  })
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

export function shareOnX() {
  const text = '🌅 Builder mode: ONLINE.\nOfficially heading to HackerHouse Goa 2026.\nReady to build, ship, and meet incredible founders by the sea. 🌊🚀\n\n#HHGoa2026 #BuildInGoa #FrameInGoa'
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
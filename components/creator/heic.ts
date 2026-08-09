// components/creator/heic.ts
'use client'

const HEIC_MIME_TYPES = ['image/heic', 'image/heif']
const HEIC_EXTENSION = /\.(heic|heif)$/i

export function isHeicFile(file: File): boolean {
  return HEIC_MIME_TYPES.includes(file.type) || HEIC_EXTENSION.test(file.name)
}

/**
 * Converts an iPhone HEIC/HEIF photo to a PNG File client-side. Non-HEIC
 * files are returned unchanged. heic2any is dynamically imported so it
 * never gets pulled into any server bundle.
 *
 * Call this at the top of your file-select handler, before generating an
 * object/data URL for cropping:
 *
 *   const handleFile = async (rawFile: File) => {
 *     const file = await convertHeicToPngIfNeeded(rawFile)
 *     const reader = new FileReader()
 *     reader.onload = () => onImage(reader.result as string)
 *     reader.readAsDataURL(file)
 *   }
 */
export async function convertHeicToPngIfNeeded(file: File): Promise<File> {
  if (!isHeicFile(file)) return file

  const heic2any = (await import('heic2any')).default

  const result = await heic2any({
    blob: file,
    toType: 'image/png',
    quality: 0.92,
  })

  const blob = Array.isArray(result) ? result[0] : result
  const newName = file.name.replace(HEIC_EXTENSION, '.png') || 'converted.png'

  return new File([blob], newName, { type: 'image/png' })
}
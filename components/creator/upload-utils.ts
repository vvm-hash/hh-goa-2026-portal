import { upload } from '@vercel/blob/client'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB

export async function compressPngIfNeeded(blob: Blob): Promise<Blob> {
  if (blob.size <= MAX_FILE_SIZE) {
    return blob
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(blob)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      
      const canvas = document.createElement('canvas')
      // Reduce dimensions to 80% to compress the PNG size while keeping it a PNG
      const scale = 0.8 
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return resolve(blob) // fallback
      }

      // Fill background in case of transparency issues, though PNG supports it
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((compressedBlob) => {
        if (compressedBlob) {
          resolve(compressedBlob)
        } else {
          resolve(blob)
        }
      }, 'image/png')
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(blob) // fallback on error
    }

    img.src = objectUrl
  })
}

export async function uploadWithRetry(
  filename: string,
  blob: Blob,
  retries = 3
): Promise<string> {
  let attempt = 0
  let lastError: any

  while (attempt < retries) {
    try {
      // We implement a basic timeout using AbortController if supported, 
      // but @vercel/blob/client doesn't natively take an abort signal.
      // So we use a Promise.race for the 30-second timeout.
      const uploadPromise = upload(filename, blob, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      })

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Connection is taking longer than expected.')), 30000)
      })

      const result = await Promise.race([uploadPromise, timeoutPromise])
      return result.url
    } catch (err: any) {
      lastError = err
      attempt++
      if (attempt < retries) {
        console.warn(`Upload failed, retrying (${attempt}/${retries})...`, err)
        await new Promise(res => setTimeout(res, 1000 * attempt)) // Backoff
      }
    }
  }

  throw lastError
}

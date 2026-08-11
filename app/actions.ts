'use server'

import { put, list } from '@vercel/blob'
import { getBlobConfig } from '@/lib/utils'

export async function saveBuilderAssets(formData: FormData) {
  try {
    const builderId = formData.get('builderId') as string
    const profileFile = formData.get('profile') as File
    const cardFile = formData.get('card') as File

    console.log(`\n\n=== [Blob Pipeline START] Builder ID: ${builderId} ===`)
    
    console.log(`[Blob Pipeline] Checking if record exists: records/${builderId}.json`)
    const { blobs } = await list({ 
      prefix: `records/${builderId}.json`,
      ...getBlobConfig() 
    })
    
    if (blobs.length > 0 && blobs[0].url) {
      console.log(`[Blob Pipeline] Record exists! Fetching from ${blobs[0].url}...`)
      const response = await fetch(blobs[0].url)
      if (response.ok) {
        const existingRecord = await response.json()
        console.log(`[Blob Pipeline] Reusing existing record:`, existingRecord)
        return { success: true, ...existingRecord }
      }
    }

    console.log(`[Blob Pipeline] Uploading profile frame...`)
    const profileBlob = await put(`profiles/${builderId}.png`, profileFile, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
      ...getBlobConfig()
    })
    console.log(`[Blob Pipeline] Profile frame uploaded successfully. URL: ${profileBlob.url}`)

    console.log(`[Blob Pipeline] Uploading builder card...`)
    const cardBlob = await put(`cards/${builderId}.png`, cardFile, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
      ...getBlobConfig()
    })
    console.log(`[Blob Pipeline] Builder card uploaded successfully. URL: ${cardBlob.url}`)

    const record = {
      profileUrl: profileBlob.url,
      cardUrl: cardBlob.url,
      createdAt: new Date().toISOString(),
    }
    
    console.log(`[Blob Pipeline] Saving JSON record:`, JSON.stringify(record, null, 2))
    const jsonBlob = await put(`records/${builderId}.json`, JSON.stringify(record), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      ...getBlobConfig()
    })
    console.log(`[Blob Pipeline] JSON record saved successfully. URL: ${jsonBlob.url}`)
    console.log(`=== [Blob Pipeline END] ===\n\n`)

    return { success: true, ...record }
  } catch (error: any) {
    console.error('\n\n[Blob Pipeline FATAL ERROR]:')
    console.error(error)
    throw error // Throw explicit error per user request
  }
}

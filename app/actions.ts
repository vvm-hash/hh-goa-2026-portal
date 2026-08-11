'use server'

import { put, list } from '@vercel/blob'
import { getBlobConfig } from '@/lib/utils'

export async function saveBuilderAssets(formData: FormData) {
  try {
    const builderId = formData.get('builderId') as string
    const profileFile = formData.get('profile') as File
    const cardFile = formData.get('card') as File

    console.log(`\n\n=== [Diagnostic] saveBuilderAssets() started executing for ID: ${builderId} ===`)
    
    console.log(`[Diagnostic] Checking if record exists: records/${builderId}.json`)
    const { blobs } = await list({ 
      prefix: `records/${builderId}.json`,
      ...getBlobConfig() 
    })
    
    if (blobs.length > 0 && blobs[0].url) {
      console.log(`[Diagnostic] Record already exists! Fetching from ${blobs[0].url}...`)
      const res = await fetch(blobs[0].url)
      const data = await res.json()
      return { success: true, ...data }
    }
    
    console.log(`[Diagnostic] Uploading profile frame...`)
    const profileBlob = await put(`profiles/${builderId}.png`, profileFile, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
      ...getBlobConfig()
    })
    console.log(`[Diagnostic] Profile put() succeeded: ${profileBlob.url}`)

    console.log(`[Diagnostic] Uploading builder card...`)
    const cardBlob = await put(`cards/${builderId}.png`, cardFile, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
      ...getBlobConfig()
    })
    console.log(`[Diagnostic] Card put() succeeded: ${cardBlob.url}`)

    const record = {
      builderId,
      profileUrl: profileBlob.url,
      cardUrl: cardBlob.url,
      createdAt: new Date().toISOString()
    }
    
    const jsonPathname = `records/${builderId}.json`
    console.log(`[Diagnostic] JSON pathname being written: ${jsonPathname}`)
    const jsonBlob = await put(jsonPathname, JSON.stringify(record), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      ...getBlobConfig()
    })
    console.log(`[Diagnostic] JSON put() succeeded: ${jsonBlob.url}`)
    console.log(`=== [Diagnostic] END ===\n\n`)

    return { success: true, ...record }
  } catch (error: any) {
    console.error('\n\n[Diagnostic] FATAL ERROR in saveBuilderAssets:')
    console.error(error)
    throw error // Throw explicit error per user request
  }
}

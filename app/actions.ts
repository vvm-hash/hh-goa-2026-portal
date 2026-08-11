'use server'

import { put } from '@vercel/blob'
import { getBlobConfig } from '@/lib/utils'

export async function saveBuilderAssets(data: { builderId: string, profileUrl: string, cardUrl: string }) {
  try {
    const { builderId, profileUrl, cardUrl } = data;

    const record = {
      builderId,
      profileUrl,
      cardUrl,
      createdAt: new Date().toISOString()
    }
    
    const jsonPathname = `records/${builderId}.json`
    const jsonBlob = await put(jsonPathname, JSON.stringify(record), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      ...getBlobConfig()
    })

    return { success: true, ...record }
  } catch (error: any) {
    console.error('\n\n[Diagnostic] FATAL ERROR in saveBuilderAssets:')
    console.error(error)
    throw error // Throw explicit error per user request
  }
}

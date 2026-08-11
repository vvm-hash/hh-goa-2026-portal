import { Metadata } from 'next'
import Link from 'next/link'

import { list } from '@vercel/blob'
import { getBlobConfig } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ builderId: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const builderId = resolvedParams.builderId
  let ogImage = '/hhgoalogo.jpg'
  
  try {
    const { blobs } = await list({ 
      prefix: `records/${builderId}.json`,
      ...getBlobConfig() 
    })
    if (blobs.length > 0 && blobs[0].url) {
      const res = await fetch(blobs[0].url)
      if (res.ok) {
        const data = await res.json()
        if (data.cardUrl) ogImage = data.cardUrl
      } else {
        console.error(`[Metadata] Failed to fetch JSON data from ${blobs[0].url}. Status: ${res.status}`)
      }
    } else {
      console.warn(`[Metadata] No Blob record found for Builder ID: ${builderId}`)
    }
  } catch (error) {
    console.error('[Metadata] Failed to fetch OG image from Blob:', error)
  }

  return {
    title: `HH Goa 2026 Builder ID: ${builderId}`,
    description: 'Check out my official HackerHouse Goa 2026 Builder Credential. Create your own now!',
    openGraph: {
      title: `HH Goa 2026 Builder ID: ${builderId}`,
      description: 'Check out my official HackerHouse Goa 2026 Builder Credential. Create your own now!',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `HH Goa 2026 Builder ID: ${builderId}`,
      description: 'Check out my official HackerHouse Goa 2026 Builder Credential. Create your own now!',
      images: [ogImage],
    }
  }
}

export default async function SharePage({ params }: { params: Promise<{ builderId: string }> }) {
  const resolvedParams = await params
  console.log("params =", resolvedParams)
  console.log("builderId =", resolvedParams?.builderId)
  
  const builderId = resolvedParams.builderId
  let profileUrl = null
  let cardUrl = null

  try {
    const prefix = `records/${builderId}.json`
    
    console.log(`\n\n=== [Diagnostic] Share Page started for Builder ID: ${builderId} ===`)
    console.log(`[Diagnostic] Share page searching for Builder ID: ${builderId}`)
    console.log(`[Diagnostic] Share page prefix: ${prefix}`)
    
    const { blobs } = await list({ 
      prefix,
      ...getBlobConfig() 
    })
    
    console.log(`[Diagnostic] list() returned ${blobs.length} blobs`)
    
    if (blobs.length === 0) {
      console.error(`[Diagnostic] FATAL: list() returned 0 blobs for prefix "${prefix}"!`)
      throw new Error(`Builder record not found in Blob storage for ID: ${builderId}`)
    }

    const recordUrl = blobs[0].url
    console.log(`[Share Page] Found record in Blob! URL: ${recordUrl}`)
    console.log(`[Share Page] Attempting to fetch JSON data from ${recordUrl}...`)
    
    const res = await fetch(recordUrl)
    console.log(`[Share Page] fetch() returned status: ${res.status} ${res.statusText}`)
    
    if (!res.ok) {
      console.error(`[Share Page FATAL] Failed to fetch JSON data. Status: ${res.status}`)
      throw new Error(`Failed to fetch record data from Blob (Status: ${res.status})`)
    }

    const rawText = await res.text()
    console.log(`[Share Page] Raw fetched JSON text:`, rawText)
    
    const data = JSON.parse(rawText)
    profileUrl = data.profileUrl
    cardUrl = data.cardUrl

    console.log(`[Share Page] Parsed URLs -> profileUrl: ${profileUrl}, cardUrl: ${cardUrl}`)
    console.log(`=== [Share Page END] ===\n\n`)

    if (!profileUrl || !cardUrl) {
      console.error(`[Share Page FATAL] JSON record is missing image URLs!`)
      throw new Error('Blob record found, but missing image URLs')
    }

  } catch (error: any) {
    console.error('[Share Page] EXCEPTION:', error)
    return (
      <div className="min-h-dvh bg-[#F6F1E8] p-8 flex flex-col items-center justify-center font-sans">
        <div className="border-4 border-[#D93025] bg-[#D93025]/10 p-8 max-w-lg w-full">
          <h2 className="text-2xl font-black text-[#D93025] mb-4">Error loading Builder Card</h2>
          <p className="text-[#111111] mb-2">We couldn't load the share link for this Builder ID.</p>
          <pre className="text-sm bg-black text-[#F7F3E8] p-4 mt-4 overflow-x-auto">
            {error.message || String(error)}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-[#F6F1E8] p-8 flex flex-col items-center justify-center font-sans overflow-x-hidden">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="mb-5 inline-flex items-center gap-2 border-2 border-[#111111] bg-[#0B6E3D] px-3 py-1.5 shadow-[2px_2px_0px_#111111]">
          <span className="size-1.5 rounded-full bg-[#FFE600]" />
          <span className="font-mono text-[9px] font-bold tracking-[0.22em] text-[#F7F3E8] uppercase">
            HACKERHOUSE GOA
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#111111] mb-6 tracking-tighter leading-[1.1]">
          I just created my official HH Goa 2026 Builder ID & Profile Frame 🚀
        </h1>
        <p className="text-[#5A5A4A] mx-auto text-lg font-mono tracking-widest uppercase">
          Think you&apos;ve got what it takes? Create yours below.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <div className="w-[300px] h-[300px] overflow-hidden border-4 border-[#111111] shadow-[8px_8px_0px_#111111] bg-white relative">
          <img src={profileUrl} alt="Profile Frame" className="w-full h-full object-cover" />
        </div>

        <div className="w-[270px] h-[480px] sm:w-[378px] sm:h-[672px] overflow-hidden border-4 border-[#111111] shadow-[8px_8px_0px_#0B6E3D] bg-white relative">
          <img src={cardUrl} alt="Builder Card" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mt-14">
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-10 py-4 text-lg font-black bg-[#FF0A7A] text-white border-2 border-[#111111] shadow-[6px_6px_0px_#111111] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] transition-all uppercase tracking-wider"
        >
          Create Yours →
        </Link>
      </div>
    </div>
  )
}

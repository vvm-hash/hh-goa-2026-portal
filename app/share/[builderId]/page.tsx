import { Metadata } from 'next'
import Link from 'next/link'


import { getBlobConfig } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ builderId: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const builderId = resolvedParams.builderId
  let ogImage = '/hhgoalogo.jpg'
  
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN || ''
    const match = token.match(/^vercel_blob_rw_([^_]+)_/)
    const storeId = process.env.BLOB_STORE_ID || match?.[1]
    
    if (storeId) {
      const subdomain = storeId.replace(/^store_/, '').toLowerCase()
      const recordUrl = `https://${subdomain}.public.blob.vercel-storage.com/records/${builderId}.json`
      const res = await fetch(recordUrl)
      if (res.ok) {
        const data = await res.json()
        if (data.cardUrl) ogImage = data.cardUrl
      } else {
        console.error(`[Metadata] Failed to fetch JSON data from ${recordUrl}. Status: ${res.status}`)
      }
    } else {
      console.warn(`[Metadata] Could not determine Blob store ID for Builder ID: ${builderId}`)
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
  const builderId = resolvedParams.builderId
  let profileUrl = null
  let cardUrl = null

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN || ''
    const match = token.match(/^vercel_blob_rw_([^_]+)_/)
    const storeId = process.env.BLOB_STORE_ID || match?.[1]
    
    if (!storeId) {
      console.error(`[Diagnostic] FATAL: Could not determine Blob store ID!`)
      throw new Error(`Configuration error: Blob store ID not found`)
    }

    const subdomain = storeId.replace(/^store_/, '').toLowerCase()
    const recordUrl = `https://${subdomain}.public.blob.vercel-storage.com/records/${builderId}.json`
    const res = await fetch(recordUrl)
    
    if (!res.ok) {
      console.error(`[Share Page FATAL] Failed to fetch JSON data. Status: ${res.status}`)
      throw new Error(`Failed to fetch record data from Blob (Status: ${res.status})`)
    }

    const rawText = await res.text()
    
    const data = JSON.parse(rawText)
    profileUrl = data.profileUrl
    cardUrl = data.cardUrl

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
        <div className="mb-5 inline-flex items-center gap-2.5 border-2 border-[#111111] bg-[#0B6E3D] px-4 py-2 shadow-[3px_3px_0px_#111111]">
          <img src="/hhgoalogo.jpg" alt="HH Goa" className="size-6 object-cover border-[1.5px] border-[#111111] rounded-full" />
          <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#F7F3E8] uppercase">
            HACKERHOUSE GOA
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#111111] mb-6 tracking-tighter leading-[1.1]">
          I just created my official HH Goa 2026 Builder ID & Profile Frame 🚀
        </h1>
        <p className="text-[#5A5A4A] mx-auto text-lg font-mono tracking-widest uppercase">
          Think you&apos;ve got what it takes? Create yours below.
        </p>
        <p className="mt-4 font-mono text-sm font-bold tracking-widest text-[#0B6E3D] uppercase">
          #FrameInGoa · HH Goa 2026
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

import { BuilderCard } from '@/components/creator/builder-card'
import { ProfileFrame } from '@/components/creator/profile-frame'
import { DEFAULT_STATE } from '@/components/creator/types'
import { Metadata } from 'next'
import Link from 'next/link'

export function generateMetadata({ params }: { params: { builderId: string } }): Metadata {
  return {
    title: `HH Goa 2026 Builder ID: ${params.builderId}`,
    description: 'Check out my official HackerHouse Goa 2026 Builder Credential. Create your own now!',
    openGraph: {
      title: `HH Goa 2026 Builder ID: ${params.builderId}`,
      description: 'Check out my official HackerHouse Goa 2026 Builder Credential. Create your own now!',
      images: ['/hhgoalogo.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `HH Goa 2026 Builder ID: ${params.builderId}`,
      description: 'Check out my official HackerHouse Goa 2026 Builder Credential. Create your own now!',
      images: ['/hhgoalogo.jpg'],
    }
  }
}

export default function SharePage({ params }: { params: { builderId: string } }) {
  const demo = {
    ...DEFAULT_STATE,
    name: 'Goa Builder',
    role: 'Hacker',
    location: 'Goa, India',
    teamName: 'HackerHouse Goa',
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
          <div className="origin-top-left scale-[0.5] w-[600px] h-[600px]">
            <ProfileFrame state={demo} />
          </div>
        </div>

        <div className="w-[270px] h-[480px] sm:w-[378px] sm:h-[672px] overflow-hidden border-4 border-[#111111] shadow-[8px_8px_0px_#0B6E3D] bg-white relative">
          <div className="origin-top-left scale-[0.25] sm:scale-[0.35] w-[1080px] h-[1920px]">
            <BuilderCard state={demo} />
          </div>
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

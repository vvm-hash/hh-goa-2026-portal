import React from 'react'
import { cn } from '@/lib/utils'
import { PhotoLayer } from './photo-layer'
import { type CreatorState } from './types'

interface BuilderCardProps {
  state: CreatorState
}

export function BuilderCard({ state }: BuilderCardProps) {
  const location = state.location?.trim() || 'GOA, INDIA'
  const teamName = state.teamName?.trim() || 'SOLO BUILDER'
  const role = state.role?.trim() || 'CHAOS ENGINEER'
  const builderId = state.builderId || '7140-620'

  return (
    <div className="w-[1080px] h-[1920px] bg-[#F6F1E8] border-[16px] border-black flex flex-col font-sans box-border">
      
      {/* PANEL 1: HEADER (200px) */}
      <div className="h-[200px] w-full flex border-b-[16px] border-black shrink-0">
        <div className="flex-1 bg-[#FFE600] p-10 px-12 flex flex-col justify-center">
          <div className="font-mono text-3xl font-black tracking-[0.2em] uppercase text-black mb-3">
            BUILD IN GOA
          </div>
          <div className="font-mono text-5xl font-black tracking-widest uppercase text-black">
            BUILDER CREDENTIAL
          </div>
        </div>
        <div className="w-[400px] bg-[#111111] border-l-[16px] border-black p-10 flex flex-col justify-center items-end shrink-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-5 h-5 bg-[#22C55E] rounded-full border-2 border-white shadow-[0_0_10px_#22C55E]" />
            <div className="font-mono text-2xl font-bold tracking-widest text-[#22C55E] uppercase">
              SYS: ONLINE
            </div>
          </div>
          <div className="font-mono text-base tracking-widest text-[#888888] mb-1">
            ROLE
          </div>
          <div className="font-mono text-base tracking-widest text-[#888888]">
            PARTICIPANT
          </div>
        </div>
      </div>

      {/* PANEL 2: ABSTRACT SCENERY (400px) */}
      <div className="h-[400px] w-full bg-[#F6F1E8] border-b-[16px] border-black relative overflow-hidden flex items-center justify-center shrink-0">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 2px, transparent 2px), linear-gradient(to bottom, rgba(0,0,0,0.05) 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Beach/Sand */}
        <div className="absolute bottom-0 inset-x-0 h-[100px] bg-[#FFE600] border-t-[16px] border-black z-10" />
        
        {/* The Sun */}
        <div className="absolute bottom-[100px] left-[80px] w-[300px] h-[150px] bg-[#FF0A7A] rounded-t-full border-t-[16px] border-x-[16px] border-black z-10" />
        
        {/* Ocean Waves */}
        <div className="absolute bottom-[100px] left-[350px] w-[800px] h-[100px] flex overflow-hidden z-10">
           <div className="w-[140px] h-[140px] rounded-full border-[16px] border-black mt-10 -ml-4 bg-[#A2E2C3] shrink-0 border-b-0"></div>
           <div className="w-[140px] h-[140px] rounded-full border-[16px] border-black mt-10 -ml-8 bg-[#A2E2C3] shrink-0 border-b-0"></div>
           <div className="w-[140px] h-[140px] rounded-full border-[16px] border-black mt-10 -ml-8 bg-[#A2E2C3] shrink-0 border-b-0"></div>
           <div className="w-[140px] h-[140px] rounded-full border-[16px] border-black mt-10 -ml-8 bg-[#A2E2C3] shrink-0 border-b-0"></div>
           <div className="w-[140px] h-[140px] rounded-full border-[16px] border-black mt-10 -ml-8 bg-[#A2E2C3] shrink-0 border-b-0"></div>
           <div className="w-[140px] h-[140px] rounded-full border-[16px] border-black mt-10 -ml-8 bg-[#A2E2C3] shrink-0 border-b-0"></div>
        </div>

        {/* Abstract Coconut Leaves */}
        <div className="absolute top-[-40px] right-[-40px] w-[260px] h-[260px] border-b-[36px] border-l-[36px] border-[#0B5C3B] rounded-bl-full z-10" />
        <div className="absolute top-[40px] right-[80px] w-[220px] h-[220px] border-b-[28px] border-l-[28px] border-[#0B5C3B] rounded-bl-full z-10" />
        <div className="absolute top-[140px] right-[0px] w-[200px] h-[200px] border-b-[24px] border-l-[24px] border-[#0B5C3B] rounded-bl-full z-10" />
        
        {/* Typography */}
        <div className="z-20 text-[85px] font-black uppercase tracking-tighter text-black bg-white px-12 py-4 border-[16px] border-black shadow-[20px_20px_0px_#111111] -mt-12 whitespace-nowrap">
          HACKERHOUSE GOA
        </div>
      </div>

      {/* PANEL 3: THE IDENTITY (700px) */}
      <div className="h-[700px] w-full flex border-b-[16px] border-black shrink-0 bg-[#0B5C3B]">
        {/* Left: Photo */}
        <div className="w-[460px] border-r-[16px] border-black p-10 flex items-center justify-center relative shrink-0">
          <div className="w-[360px] h-[450px] bg-[#F6F1E8] border-[16px] border-black shadow-[24px_24px_0px_#111111] p-5 rotate-[-3deg] relative z-20">
            <div className="w-full h-full relative overflow-hidden border-[8px] border-black bg-white">
              <PhotoLayer state={state} />
            </div>
          </div>
          
          {/* Logo Sticker */}
          <div className="absolute bottom-8 right-6 w-[120px] h-[120px] bg-white border-[8px] border-black shadow-[8px_8px_0px_#FF0A7A] rounded-full overflow-hidden rotate-[15deg] z-30">
            <img src="/hhgoalogo.jpg" alt="HH Goa" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right: Data */}
        <div className="flex-1 flex flex-col shrink-0 min-w-0">
          <div className="flex-1 p-10 bg-[#F6F1E8] flex flex-col justify-center shrink-0 min-w-0">
            <div className="font-mono text-3xl font-bold tracking-widest text-[#FF0A7A] uppercase mb-6">
              HH GOA BUILDER
            </div>
            <div 
              className={cn(
                "font-black uppercase text-black leading-[0.9] break-words max-h-[220px] overflow-hidden",
                (state.name || "BUILDER").length > 12 ? "text-[60px]" : (state.name || "BUILDER").length > 8 ? "text-[80px]" : "text-[100px]"
              )}
            >
              {state.name || "BUILDER"}
            </div>
          </div>
          {/* Stacked Vertical Blocks for max width */}
          <div className="flex flex-col shrink-0 border-t-[16px] border-black">
            <div className="h-[140px] bg-[#FF0A7A] border-b-[16px] border-black px-10 flex flex-col justify-center min-w-0">
               <div className="font-mono text-xl font-bold tracking-widest text-black uppercase mb-1">
                 BUILDER CLASS
               </div>
               <div className="text-4xl font-black uppercase text-white break-words leading-tight max-h-full overflow-hidden">
                 {role}
               </div>
            </div>
            <div className="h-[140px] bg-[#FFE600] px-10 flex flex-col justify-center min-w-0">
               <div className="font-mono text-xl font-bold tracking-widest text-black uppercase mb-1">
                 TEAM
               </div>
               <div className="text-4xl font-black uppercase text-black break-words leading-tight max-h-full overflow-hidden">
                 {teamName}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL 4: THE TECH GRID (400px) */}
      <div className="h-[400px] flex w-full border-b-[16px] border-black shrink-0">
        <div className="w-[460px] border-r-[16px] border-black flex flex-col shrink-0">
          <div className="h-[200px] border-b-[16px] border-black p-12 flex flex-col justify-center bg-white shrink-0">
             <div className="font-mono text-2xl font-bold tracking-widest text-[#888888] uppercase mb-4">
               BASE
             </div>
             <div className="text-4xl font-black uppercase text-black break-words leading-tight max-h-full overflow-hidden">
               {location}
             </div>
          </div>
          <div className="h-[184px] p-12 flex flex-col justify-center bg-[#F6F1E8] shrink-0">
             <div className="font-mono text-2xl font-bold tracking-widest text-[#888888] uppercase mb-4">
               NETWORK
             </div>
             <div className="text-4xl font-black uppercase text-[#22C55E]">
               BUILDER ONLINE
             </div>
          </div>
        </div>
        
        <div className="flex-1 bg-[#111111] p-10 flex flex-col justify-center items-center text-center min-w-0">
           <div className="font-mono text-4xl font-bold tracking-[0.3em] text-[#FFE600] uppercase mb-10">
             CREDENTIAL ID
           </div>
           <div className="text-7xl font-black font-mono text-white tracking-widest">
             {builderId}
           </div>
           <div className="mt-14 flex gap-2">
             {[4,2,6,1,3,5,2,4,7,2,1,5,3,4,6,2,3,1,5].map((w, i) => (
               <div key={i} className="bg-[#5A5A4A] h-20" style={{ width: `${w * 4}px` }} />
             ))}
           </div>
        </div>
      </div>

      {/* PANEL 5: FOOTER (188px) */}
      <div className="h-[188px] w-full bg-[#FF0A7A] px-14 py-0 flex justify-between items-center shrink-0">
         <div className="text-7xl font-black text-black tracking-widest uppercase">
           #FRAMEINGOA
         </div>
         <div className="font-mono text-4xl font-bold text-black uppercase">
           OCT '26
         </div>
      </div>
      
    </div>
  )
}
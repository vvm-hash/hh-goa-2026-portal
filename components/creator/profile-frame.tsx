import React from 'react'
import { cn } from '@/lib/utils'
import { PhotoLayer } from './photo-layer'
import { type CreatorState } from './types'

interface ProfileFrameProps {
  state: CreatorState
}

export function ProfileFrame({ state }: ProfileFrameProps) {
  const location = state.location.trim() || 'Goa, India'

  return (
    <div className="relative w-[600px] h-[600px] bg-[#F6F1E8] font-sans flex items-center justify-center overflow-hidden border-[8px] border-[#111111]">
      
      {/* Outer Container */}
      <div className="absolute inset-0 bg-[#F7F3E8] border-[6px] border-[#111111] overflow-hidden shadow-2xl">
        
        {/* Layer 1: Background Topography & Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
             style={{
               backgroundImage: 'repeating-radial-gradient(circle at 100% 0%, transparent, transparent 40px, #111111 40px, #111111 42px)'
             }}
        />
        
        {/* Technical Grid Lines */}
        <div className="absolute top-[80px] bottom-0 left-[80px] w-px bg-[#111111]/15 z-0" />
        <div className="absolute top-[80px] bottom-0 right-[80px] w-px bg-[#111111]/15 z-0" />
        <div className="absolute left-[80px] right-[80px] top-[80px] h-px bg-[#111111]/15 z-0" />
        <div className="absolute left-[80px] right-0 bottom-[160px] h-px bg-[#111111]/15 z-0" />

        {/* Layer 2: Midground Geometry (Sun & Sea) */}
        {/* Massive Offset Golden Sun */}
        <div className="absolute top-[-100px] right-[-100px] w-[460px] h-[460px] rounded-full bg-[#FFE600] border-[6px] border-[#111111] z-10 flex items-center justify-center overflow-hidden">
           {/* Magenta Sea Cut */}
           <div className="w-full h-[40%] bg-[#FF0A7A] mt-auto border-t-[6px] border-[#111111]" />
        </div>

        {/* Huge Bleeding Background Typography */}
        <div className="absolute bottom-[180px] left-[-10px] text-[180px] font-black leading-[0.8] tracking-tighter text-[#111111] opacity-[0.03] select-none z-0">
          BUILD
        </div>
        
        {/* Layer 3: Foreground Structure */}
        <div className="relative w-full h-full flex flex-col z-20">
          
          {/* Header Strip */}
          <div className="flex justify-between items-center p-5 pl-8 pr-8 border-b-[6px] border-[#111111] bg-white/90">
             <div className="flex gap-4 items-center">
               <div className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#111111] uppercase bg-[#FFE600] px-2 py-0.5 border-[2px] border-[#111111]">
                 Session 01
               </div>
               <div className="font-mono text-[9px] tracking-widest text-[#5A5A4A] uppercase">
                 Arabian Sea • Golden Hour
               </div>
             </div>
             <div className="font-mono text-[9px] font-bold tracking-widest text-[#111111] uppercase">
               UTC +05:30
             </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative p-8">
             
             {/* Registration Marks */}
             <div className="absolute top-8 left-8 w-4 h-4 border-t-[3px] border-l-[3px] border-[#111111]" />
             <div className="absolute top-8 right-8 w-4 h-4 border-t-[3px] border-r-[3px] border-[#111111]" />
             <div className="absolute bottom-8 left-8 w-4 h-4 border-b-[3px] border-l-[3px] border-[#111111]" />
             
             {/* The Portrait Container (Massive, overlapping) */}
             <div className="absolute top-[60px] left-[40px] z-30">
                {/* Elevation Contours */}
                <div className="absolute inset-[-24px] rounded-full border-[2px] border-[#111111]/20" />
                <div className="absolute inset-[-48px] rounded-full border-[2px] border-[#111111]/10" />
                
                <div className="relative w-[300px] h-[300px] rounded-full bg-white border-[6px] border-[#111111] shadow-[12px_12px_0px_#0B6E3D] overflow-hidden flex items-center justify-center">
                   <PhotoLayer state={state} />
                </div>
                
                {/* BUILD IN GOA Sticker */}
                <div className="absolute top-[-24px] left-[30px] bg-white px-4 py-1 border-[3px] border-[#111111] shadow-[4px_4px_0px_#FF0A7A] z-40 rotate-[-4deg]">
                  <span className="font-black text-xl uppercase tracking-tighter text-[#111111]">
                    BUILD IN GOA
                  </span>
                </div>

                {/* Maker Network Stamp */}
                <div className="absolute bottom-4 right-[-10px] bg-[#FF0A7A] border-[3px] border-[#111111] w-[88px] h-[88px] rounded-full flex flex-col items-center justify-center rotate-12 shadow-[4px_4px_0px_#111111]">
                   <span className="font-mono text-[9px] tracking-[0.1em] text-white uppercase font-bold text-center leading-tight">Maker<br/>Network</span>
                </div>
             </div>

             {/* Personal Data Block */}
             <div className="absolute top-[110px] right-[40px] w-[210px] z-30">
                <div className="bg-white border-[5px] border-[#111111] p-5 shadow-[6px_6px_0px_#111111] rotate-[-2deg]">
                  <h1 
                    className={cn(
                      "leading-[0.9] font-black uppercase tracking-tight text-[#111111] break-words mb-4",
                      (state.name || "Hacker").length > 12 ? "text-[22px]" : (state.name || "Hacker").length > 8 ? "text-[28px]" : "text-[36px]"
                    )}
                  >
                    {state.name || "Hacker"}
                  </h1>
                  <div className="space-y-4 mt-5 border-t-[3px] border-[#111111] pt-4">
                    <div>
                      <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#5A5A4A] uppercase mb-1">Signal</div>
                      <div className="font-bold text-[13px] uppercase text-[#111111] leading-tight">
                        {state.role || "Creator"}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#5A5A4A] uppercase mb-1">Node</div>
                      <div className="font-bold text-[13px] uppercase text-[#111111] leading-tight">
                        {location}
                      </div>
                    </div>
                  </div>
                </div>
             </div>

          </div>

          {/* Footer Area */}
          <div className="border-t-[6px] border-[#111111] bg-[#0B6E3D] text-[#F7F3E8] p-6 pb-7 relative overflow-hidden flex items-end justify-between shrink-0">
             <div className="flex items-center gap-5">
                {/* Logo Sticker */}
                <div className="w-[60px] h-[60px] bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] shrink-0 overflow-hidden rotate-[-3deg]">
                  <img src="/hhgoalogo.jpg" alt="HH Goa" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[#FFE600] mb-1">
                    Official Campaign Frame
                  </div>
                  <div className="text-[42px] font-black leading-[0.8] uppercase tracking-tighter drop-shadow-[4px_4px_0px_#111111]">
                    HACKERHOUSE GOA
                  </div>
                </div>
             </div>
             
             {/* Hashtag Block */}
             <div className="bg-[#111111] border-[3px] border-[#111111] px-4 py-2 shadow-[4px_4px_0px_#FF0A7A] rotate-2">
               <span className="font-mono text-[13px] tracking-widest text-[#F7F3E8] uppercase font-bold">
                 #FrameInGoa
               </span>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
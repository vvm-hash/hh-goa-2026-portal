// components/creator/builder-card.tsx
import { cn } from '@/lib/utils'
import { BrandMark } from './brand-mark'
import { PhotoLayer } from './photo-layer'
import { ACCENTS, BUILDER_ID, type CreatorState } from './types'

export function BuilderCard({
  state,
  className,
}: {
  state: CreatorState
  className?: string
}) {
  // Accent kept for compatibility with existing state/types, but the
  // credential itself always renders in the official HH Goa system palette.
  void ACCENTS[state.accent]

  const location = state.location.trim() || 'Goa, India'
  const teamName = state.teamName.trim() || 'Solo Builder'

  return (
    <div
      className={cn(
        'group relative flex aspect-[3/5.3] w-full flex-col overflow-hidden rounded-[1.9rem] border border-[#232D35] bg-[#11161B] text-[#F0F6FC] transition-transform duration-300 ease-out hover:-translate-y-1',
        className,
      )}
    >
      <style>{`
        @keyframes hh-bc-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes hh-bc-shimmer {
          0% { transform: translateX(-140%) rotate(18deg); }
          100% { transform: translateX(140%) rotate(18deg); }
        }
        @keyframes hh-bc-scan {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 200%; }
        }
      `}</style>

      {/* faint structural grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F0F6FC 1px, transparent 1px), linear-gradient(to bottom, #F0F6FC 1px, transparent 1px)',
          backgroundSize: '21px 21px',
        }}
      />

      {/* scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, #F0F6FC 0px, #F0F6FC 1px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 6px',
          animation: 'hh-bc-scan 10s linear infinite',
        }}
      />

      {/* header band — top label moved out of absolute-overlap position and
          the badge given its own row so nothing collides */}
      <div className="relative shrink-0 border-b border-[#232D35] bg-[#0B0F0C] px-6 pb-4 pt-5">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-[#2EA043] via-[#3FB950] to-[#58A6FF]"
        />

        <div className="flex items-center justify-between">
          <BrandMark showWordmark={false} />
          <span className="font-mono text-[8px] tracking-[0.22em] text-[#6E7681]">
            HACKER HOUSE GOA
          </span>
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-3">
          <p className="font-mono text-[9.5px] tracking-[0.2em] text-[#6E7681]">
            OFFICIAL RESIDENCY CREDENTIAL
          </p>
          <span className="shrink-0 rounded-full border border-[#3FB950]/30 bg-[#2EA043]/10 px-3 py-1.5 font-mono text-[10.5px] tracking-[0.2em] text-[#3FB950]">
            BUILDER PASS
          </span>
        </div>
      </div>

      {/* photo + identity — portrait remains the hero element */}
      <div className="flex shrink-0 items-center gap-5 px-6 pt-8">
        <div className="relative aspect-square w-[7.6rem] shrink-0">
          <div
            aria-hidden
            className="absolute -inset-2 rounded-2xl blur-md"
            style={{
              background:
                'radial-gradient(closest-side, rgba(46,160,67,0.4), transparent 70%)',
              animation: 'hh-bc-pulse 4.5s ease-in-out infinite',
            }}
          />
          <div
            aria-hidden
            className="absolute -inset-1 rounded-2xl"
            style={{
              padding: '2.5px',
              background: 'linear-gradient(135deg, #2EA043, #58A6FF)',
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.8,
            }}
          />
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#232D35] bg-[#0B0F0C]">
            <PhotoLayer state={state} />
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-y-0 left-0 w-1/3"
                style={{
                  background:
                    'linear-gradient(105deg, transparent, rgba(240,246,252,0.2), transparent)',
                  animation: 'hh-bc-shimmer 6s ease-in-out infinite',
                }}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
        </div>
        <div className="min-w-0 flex-1 self-center pl-1">
          <p className="truncate text-[20px] font-semibold tracking-tight">{state.name}</p>
          <p className="mt-1 truncate text-[13.5px] text-[#8B949E]">{state.role}</p>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#2EA043]/15 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.14em] text-[#3FB950]">
            <span className="size-[7px] rounded-full bg-[#3FB950]" style={{ animation: 'hh-bc-pulse 2.4s ease-in-out infinite' }} />
            LIVE
          </span>
        </div>
      </div>

      {/* builder credential grid — meaningful HH Goa fields, driven by state */}
      <div className="relative mt-7 shrink-0 px-6">
        <span className="absolute -top-1 right-6 font-mono text-[8px] tracking-[0.22em] text-[#6E7681]">
          CREDENTIAL
        </span>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#232D35] bg-[#232D35]">
          {[
            ['BUILDER ID', BUILDER_ID],
            ['TEAM NAME', teamName.toUpperCase()],
            ['LOCATION', location.toUpperCase()],
            ['STATUS', 'ACTIVE'],
          ].map(([label, value]) => (
            <div key={label} className="bg-[#0B0F0C] px-4 py-2.5">
              <dt className="font-mono text-[8.5px] tracking-[0.14em] text-[#6E7681]">{label}</dt>
              <dd className="mt-1 truncate font-mono text-[13px] text-[#F0F6FC]">{value}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* footer meta pinned to bottom */}
      <div className="mt-auto space-y-5 px-6 pb-8 pt-6">
        <dl className="flex items-center justify-between border-t border-[#232D35] pt-4 font-mono text-[10.5px] tracking-[0.1em] text-[#6E7681]">
          <div>
            <dt className="text-[9.5px] tracking-[0.16em]">EVENT</dt>
            <dd className="mt-1 text-[#8B949E]">HACKER HOUSE GOA</dd>
          </div>
          <div className="text-right">
            <dt className="text-[9.5px] tracking-[0.16em]">RESIDENCY</dt>
            <dd className="mt-1 text-[#8B949E]">28–31 OCT</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[9.5px] tracking-[0.16em] text-[#6E7681]">SESSION HASH</p>
            <p className="truncate font-mono text-[12px] text-[#6E7681]">
              {BUILDER_ID.split('').reverse().join('').slice(0, 12).toUpperCase() || 'A1F9-3C7D-90BE'}
            </p>
            <p className="mt-2 font-mono text-[8.5px] tracking-[0.2em] text-[#6E7681]/70">
              {location.toUpperCase()} · 2026
            </p>
          </div>

          {/* premium security seal */}
          <div className="relative shrink-0" aria-hidden>
            <div
              className="absolute -inset-2 rounded-full blur-md"
              style={{
                background: 'radial-gradient(closest-side, rgba(63,185,80,0.5), transparent 70%)',
                animation: 'hh-bc-pulse 3.6s ease-in-out infinite',
              }}
            />
            <div
              className="relative grid size-[3.3rem] place-items-center rounded-full border border-[#3FB950]/40 bg-[#0B0F0C]"
              style={{
                backgroundImage:
                  'conic-gradient(from 0deg, rgba(46,160,67,0.35), rgba(88,166,255,0.25), rgba(46,160,67,0.35))',
              }}
            >
              <div className="grid size-9 place-items-center rounded-full border border-[#232D35] bg-[#11161B]">
                <span className="font-mono text-[10.5px] font-semibold tracking-tight text-[#3FB950]">
                  HH
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center font-mono text-[9.5px] tracking-[0.24em] text-[#6E7681]">
          HACKER HOUSE GOA • BUILD • CONNECT • SHIP
        </p>
      </div>
    </div>
  )
}
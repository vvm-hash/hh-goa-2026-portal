// components/creator/profile-frame.tsx
import { cn } from '@/lib/utils'
import { PhotoLayer } from './photo-layer'
import { type CreatorState } from './types'

const RING_PRIMARY = '#2EA043'
const RING_HIGHLIGHT = '#58A6FF'

export function ProfileFrame({
  state,
  className,
}: {
  state: CreatorState
  className?: string
}) {
  const location = state.location.trim() || 'Goa, India'

  return (
    <div
      className={cn(
        'group relative aspect-square w-full overflow-visible rounded-[1.5rem]',
        className,
      )}
    >
      <style>{`
        @keyframes hh-pf-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.95; }
        }
        @keyframes hh-pf-shimmer {
          0% { transform: translateX(-120%) rotate(20deg); }
          100% { transform: translateX(120%) rotate(20deg); }
        }
        @keyframes hh-pf-scan {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 200%; }
        }
        @keyframes hh-pf-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* outer premium panel — same footprint as before (unchanged -inset-[6%]
          technique), now with overflow-hidden so nothing can ever render or
          export past the card's own bounds */}
      <div className="absolute -inset-[6%] overflow-hidden rounded-[1.75rem] border border-[#232D35] bg-[#11161B]">
        {/* base wash */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[1.75rem]"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 10%, rgba(46,160,67,0.10), transparent 60%), radial-gradient(90% 70% at 85% 95%, rgba(88,166,255,0.08), transparent 60%)',
          }}
        />

        {/* scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem] opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, #F0F6FC 0px, #F0F6FC 1px, transparent 1px, transparent 3px)',
            backgroundSize: '100% 6px',
            animation: 'hh-pf-scan 9s linear infinite',
          }}
        />

        {/* gradient border */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{
            padding: '1px',
            background:
              'linear-gradient(135deg, rgba(46,160,67,0.5), rgba(88,166,255,0.25) 55%, transparent 85%)',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* content column — equal padding on all four edges, and a vertical
            rhythm sized so the photo never outgrows the space left by the
            header/identity/footer chrome (root cause of the old clipping) */}
        <div className="relative flex h-full flex-col p-4">
          {/* top labels — shrink-0, stronger branding */}
          <div className="flex shrink-0 items-center justify-between">
            <span className="font-mono text-[9.5px] font-semibold tracking-[0.2em] text-[#F0F6FC]/90">
              HACKER HOUSE GOA
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.26em] text-[#8B949E]">
              2026
            </span>
          </div>

          {/* photo zone — flex-1, sized in px terms it can never exceed */}
          <div className="relative mt-2 flex min-h-0 flex-1 items-center justify-center">
            <div className="relative aspect-square w-[70%]">
              {/* soft glow */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full blur-xl"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(46,160,67,0.45), rgba(88,166,255,0.18) 65%, transparent)',
                  animation: 'hh-pf-pulse 4.5s ease-in-out infinite',
                }}
              />

              {/* rotating curved-text identity ring — strong, repeated branding */}
              <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="absolute -inset-[10%]"
                style={{ animation: 'hh-pf-spin 34s linear infinite' }}
              >
                <defs>
                  <path
                    id="hh-pf-ring-path"
                    d="M 100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
                  />
                </defs>
                <text
                  fill="#8B949E"
                  fontSize="9.5"
                  fontFamily="var(--font-mono, ui-monospace, monospace)"
                  letterSpacing="3.4"
                >
                  <textPath href="#hh-pf-ring-path" startOffset="0%">
                    HACKER HOUSE GOA • HACKER HOUSE GOA •
                  </textPath>
                </text>
              </svg>

              {/* small separator dots around the circle */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <span
                  key={deg}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 size-[3px] rounded-full bg-[#3FB950]/70"
                  style={{
                    transform: `rotate(${deg}deg) translate(0, -108%) rotate(-${deg}deg)`,
                    transformOrigin: 'center',
                  }}
                />
              ))}

              {/* holographic gradient ring — fixed HH Goa palette */}
              <div
                aria-hidden
                className="absolute inset-1 rounded-full"
                style={{
                  padding: '2.5px',
                  background: `conic-gradient(from 180deg,
                  ${RING_PRIMARY},
                  ${RING_PRIMARY},
                  ${RING_HIGHLIGHT},
                  ${RING_PRIMARY})`,
                  WebkitMask:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0.85,
                }}
              />

              {/* photo — the full frame, always visible, never clipped */}
              <div className="absolute inset-[6px] overflow-hidden rounded-full border border-[#232D35] bg-[#0B0F0C]">
                <PhotoLayer state={state} />

                {/* shimmer sweep */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1/3"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent, rgba(240,246,252,0.22), transparent)',
                      animation: 'hh-pf-shimmer 5.5s ease-in-out infinite',
                    }}
                  />
                </div>

                {/* inner ring for glass depth */}
                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>

          {/* identity — shrink-0, unchanged two-line footprint */}
          <div className="mt-2 shrink-0 text-center">
            <p className="truncate text-[17px] font-semibold tracking-tight text-[#F0F6FC]">
              {state.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-[#8B949E]">{state.role}</p>
          </div>

          {/* footer — shrink-0, always inside the canvas; carries dynamic
              location instead of a hardcoded one */}
          <div className="relative mt-2 flex shrink-0 items-center justify-center">
            <span className="max-w-[66%] truncate font-mono text-[7.5px] tracking-[0.14em] text-[#3FB950]/85">
              VERIFIED BUILDER · {location.toUpperCase()}
            </span>
            <span className="absolute right-0 rounded-full border border-[#232D35] bg-[#0B0F0C]/70 px-2 py-1 font-mono text-[8px] tracking-[0.18em] text-[#3FB950] backdrop-blur-sm">
              HH GOA
            </span>
          </div>
        </div>

        {/* corner brackets */}
        {[
          'left-3 top-3 border-l border-t',
          'right-3 top-3 border-r border-t',
          'left-3 bottom-3 border-l border-b',
          'right-3 bottom-3 border-r border-b',
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={cn('absolute size-3.5 border-[#3FB950]/50', pos)}
          />
        ))}
      </div>
    </div>
  )
}
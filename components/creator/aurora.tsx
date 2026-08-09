// components/creator/aurora.tsx
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base graphite wash */}
      <div className="absolute inset-0 bg-[#0D1117]" />

      {/* faint emerald glow, upper area */}
      <div
        className="absolute -top-[28vh] left-1/2 h-[62vh] w-[80vw] -translate-x-1/2 rounded-full opacity-[0.16] blur-[130px]"
        style={{
          background: 'radial-gradient(closest-side, #2EA043, transparent)',
          animation: 'hh-float 16s ease-in-out infinite',
        }}
      />

      {/* faint blue accent glow, lower left */}
      <div
        className="absolute bottom-[-22vh] left-[-12vw] h-[48vh] w-[48vw] rounded-full opacity-[0.10] blur-[130px]"
        style={{
          background: 'radial-gradient(closest-side, #58A6FF, transparent)',
          animation: 'hh-float 20s ease-in-out infinite reverse',
        }}
      />

      {/* soft secondary emerald wash, lower right */}
      <div
        className="absolute bottom-[-18vh] right-[-10vw] h-[40vh] w-[40vw] rounded-full opacity-[0.08] blur-[130px]"
        style={{
          background: 'radial-gradient(closest-side, #3FB950, transparent)',
          animation: 'hh-float 22s ease-in-out infinite',
        }}
      />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #8B949E 1px, transparent 1px), linear-gradient(to bottom, #8B949E 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
        }}
      />

      {/* faint noise-like grain */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(rgba(240,246,252,0.6) 0.5px, transparent 0.5px)',
          backgroundSize: '3px 3px',
        }}
      />
    </div>
  )
}
// components/creator/aurora.tsx
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* cream base */}
      <div className="absolute inset-0 bg-[#F7F3E8]" />

      {/* technical grid — ruled paper feel */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* large dot grid accent, upper area */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(ellipse 70% 40% at 80% 10%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 40% at 80% 10%, black, transparent 70%)',
        }}
      />

      {/* subtle warm wash, bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] opacity-40"
        style={{
          background: 'linear-gradient(to top, #E8E3D4, transparent)',
        }}
      />
    </div>
  )
}
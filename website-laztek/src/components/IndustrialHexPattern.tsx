type IndustrialHexPatternProps = {
  className?: string
  opacity?: number
}

export default function IndustrialHexPattern({
  className = '',
  opacity = 0.22,
}: IndustrialHexPatternProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{opacity}}
    >
      {/* glow */}
      <div className="absolute -right-16 top-[-40px] h-56 w-56 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="absolute left-[-40px] bottom-[-40px] h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

      {/* večji hex outline */}
      <div
        className="absolute right-10 top-8 h-40 w-40"
        style={{
          backgroundImage: `
            url("data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'>
              <g fill='none' stroke='rgba(56,189,248,0.22)' stroke-width='2'>
                <polygon points='90,12 146,45 146,111 90,144 34,111 34,45'/>
                <polygon points='90,42 120,60 120,96 90,114 60,96 60,60'/>
              </g>
            </svg>")
          `,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      />

      {/* manjši raster */}
      <div
        className="absolute left-0 top-0 h-full w-full"
        style={{
          backgroundImage: `
            url("data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'>
              <g fill='none' stroke='rgba(34,211,238,0.12)' stroke-width='1.3'>
                <polygon points='30,2 50,14 50,38 30,50 10,38 10,14'/>
                <polygon points='90,2 110,14 110,38 90,50 70,38 70,14'/>
                <polygon points='60,28 80,40 80,64 60,76 40,64 40,40'/>
              </g>
            </svg>")
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 156px',
          maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      />

      {/* dodatni poudarki */}
      <div className="absolute left-[12%] top-[22%] h-2.5 w-2.5 rounded-full bg-cyan-300/40 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
      <div className="absolute right-[18%] bottom-[28%] h-2 w-2 rounded-full bg-sky-300/35 shadow-[0_0_16px_rgba(56,189,248,0.45)]" />
      <div className="absolute right-[28%] top-[38%] h-1.5 w-1.5 rounded-full bg-white/30" />
    </div>
  )
}
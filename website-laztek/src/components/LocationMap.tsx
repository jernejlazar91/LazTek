import {MapPin, Navigation} from 'lucide-react'

const latitude = 45.98020087787109
const longitude = 14.1705128253313

const mapEmbedUrl =
  `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`

const directionsUrl =
  `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`

export default function LocationMap() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-cyan-200/15 bg-[#061a2c]/68 shadow-[0_18px_58px_rgba(0,15,27,0.22)] backdrop-blur-xl transition hover:border-cyan-300/30">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 text-cyan-300">
            <MapPin className="h-5 w-5" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/55">
              Lokacija
            </span>
          </div>

          <div className="mt-3 text-sm font-semibold text-white/85">
            Rovte 23, 1373 Rovte, Slovenija
          </div>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
        >
          <Navigation size={14} />
          Odpri navigacijo
        </a>
      </div>

      <div className="relative h-[220px] border-t border-white/10">
        <iframe
          src={mapEmbedUrl}
          title="Lokacija LazTek Engineering, Rovte 23"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
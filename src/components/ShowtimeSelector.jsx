
import { Clock, MapPin } from 'lucide-react'

export default function ShowtimeSelector({ theatres, selected, onSelect }) {
  return (
    <div className="space-y-4">
      {theatres.map((theatre) => (
        <article
          key={theatre.id}
          className={`rounded-2xl border p-4 transition sm:p-5 ${
            selected?.theatreId === theatre.id
              ? 'border-rose-500/70 bg-rose-500/[0.06]'
              : 'border-white/10 bg-[#131316]'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold">{theatre.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                <MapPin size={13} /> {theatre.area}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {theatre.formats.map((format) => (
                <span key={format} className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400">
                  {format}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {theatre.times.map((time) => {
              const active = selected?.theatreId === theatre.id && selected?.time === time
              return (
                <button
                  key={time}
                  onClick={() => onSelect(theatre, time)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                    active
                      ? 'border-rose-500 bg-rose-500 text-white'
                      : 'border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-400/10'
                  }`}
                >
                  <Clock size={13} /> {time}
                </button>
              )
            })}
          </div>
        </article>
      ))}
    </div>
  )
}

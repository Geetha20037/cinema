
import { useState } from 'react'
import { Armchair, Info } from 'lucide-react'

const rows = 'ABCDEFGHIJ'.split('')
const bookedSeats = new Set([
  'A4', 'A5', 'B2', 'B3', 'B8', 'C5', 'C6', 'D1',
  'D9', 'E4', 'E7', 'F2', 'F8', 'G5', 'H3', 'H9',
  'I4', 'I5', 'J7',
])

export default function SeatLayout({ selected, onChange }) {
  const [seatType, setSeatType] = useState('Standard')
  const price = seatType === 'Premium' ? 300 : 180

  function toggleSeat(seat) {
    if (bookedSeats.has(seat)) return
    const next = selected.includes(seat)
      ? selected.filter((item) => item !== seat)
      : selected.length < 8 ? [...selected, seat] : selected
    onChange(next, price)
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111114] p-4 sm:p-7">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold">Choose your seats</h3>
          <p className="mt-1 text-xs text-zinc-500">Select up to 8 seats per booking</p>
        </div>
        <div className="flex rounded-lg border border-white/10 p-1">
          {['Standard', 'Premium'].map((type) => (
            <button
              key={type}
              onClick={() => { setSeatType(type); onChange([], type === 'Premium' ? 300 : 180) }}
              className={`rounded-md px-3 py-2 text-xs font-semibold ${
                seatType === type ? 'bg-rose-600 text-white' : 'text-zinc-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-lg">
        <div className="relative mb-10 pt-2">
          <div className="h-1 rounded-full bg-gradient-to-r from-transparent via-rose-400 to-transparent shadow-[0_0_24px_rgba(244,63,94,0.4)]" />
          <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">Screen this way</p>
        </div>

        <div className="space-y-2">
          {rows.map((row, rowIndex) => (
            <div key={row} className="flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="w-4 text-[10px] text-zinc-600">{row}</span>
              {Array.from({ length: 10 }, (_, index) => {
                const seat = `${row}${index + 1}`
                const booked = bookedSeats.has(seat)
                const active = selected.includes(seat)
                return (
                  <button
                    key={seat}
                    disabled={booked}
                    onClick={() => toggleSeat(seat)}
                    aria-label={`Seat ${seat}${booked ? ', booked' : active ? ', selected' : ', available'}`}
                    title={seat}
                    className={`seat ${
                      booked ? 'booked' : active ? 'selected' : 'available'
                    } ${index === 4 ? 'ml-2 sm:ml-4' : ''}`}
                  >
                    {index + 1}
                  </button>
                )
              })}
              <span className="w-4 text-right text-[10px] text-zinc-600">{row}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-white/10 pt-5 text-xs text-zinc-400">
        <span className="flex items-center gap-2"><span className="seat available" /> Available</span>
        <span className="flex items-center gap-2"><span className="seat selected" /> Selected</span>
        <span className="flex items-center gap-2"><span className="seat booked" /> Booked</span>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-lg bg-white/[0.03] p-3 text-xs leading-5 text-zinc-500">
        <Info size={15} className="mt-0.5 shrink-0" />
        {seatType} seats cost ₹{price} each. Maximum 8 seats per booking.
      </div>
    </div>
  )
}

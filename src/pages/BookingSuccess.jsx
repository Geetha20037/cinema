
import { Link, useLocation, Navigate } from 'react-router-dom'
import { CheckCircle2, CalendarDays, MapPin, Ticket, Home, UserRound } from 'lucide-react'

export default function BookingSuccess() {
  const { state } = useLocation()
  const booking = state?.booking

  if (!booking) return <Navigate to="/profile" replace />

  return (
    <main className="page-container min-h-[70vh] py-12 sm:py-16">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#131316]">
        <div className="bg-gradient-to-br from-emerald-950/70 to-[#131316] px-6 py-10 text-center sm:px-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 size={36} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Booking confirmed</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">You're all set!</h1>
          <p className="mt-3 text-sm text-zinc-400">Your demo ticket details are ready.</p>
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex gap-4">
            <img src={booking.movie.poster} alt="" className="h-36 w-24 rounded-xl object-cover" />
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold">{booking.movie.title}</h2>
              <p className="mt-2 text-sm text-zinc-500">{booking.movie.language} · {booking.movie.duration}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-zinc-300"><CalendarDays size={15} className="text-rose-400" /> {booking.date} · {booking.time}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-zinc-300"><MapPin size={15} className="text-rose-400" /> {booking.theatreName}</p>
            </div>
          </div>

          <div className="my-7 border-t border-dashed border-white/15" />
          <div className="grid grid-cols-2 gap-5">
            <div><p className="text-xs text-zinc-500">Booking ID</p><p className="mt-1 font-semibold">{booking.id}</p></div>
            <div><p className="text-xs text-zinc-500">Seats</p><p className="mt-1 font-semibold">{booking.seats.join(', ')}</p></div>
            <div><p className="text-xs text-zinc-500">Payment preference</p><p className="mt-1 font-semibold">{booking.paymentMethod} · Demo</p></div>
            <div><p className="text-xs text-zinc-500">Total amount</p><p className="mt-1 font-display text-xl font-bold">₹{booking.total}</p></div>
          </div>

          <p className="mt-7 rounded-xl bg-amber-500/10 p-4 text-xs leading-5 text-amber-200">
            This is a locally saved demo booking, not a real cinema ticket. No payment has been processed and seats are not reserved at an actual theatre.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link to="/profile" className="primary-btn"><UserRound size={17} /> My bookings</Link>
            <Link to="/" className="secondary-btn"><Home size={17} /> Back home</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

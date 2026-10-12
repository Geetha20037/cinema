
import { Link, Navigate } from 'react-router-dom'
import { CalendarDays, Clock, MapPin, Ticket, UserRound, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  let bookings = []
  try {
    bookings = JSON.parse(localStorage.getItem('cineora-bookings') || '[]')
      .filter((item) => item.customer === user.email)
  } catch {
    bookings = []
  }

  return (
    <main className="page-container min-h-[65vh] py-10 sm:py-14">
      <div className="mb-9 flex flex-wrap items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-rose-500/15 text-rose-400">
          <UserRound size={30} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400">Your CINEORA account</p>
          <h1 className="mt-1 font-display text-3xl font-bold">{user.name}</h1>
          <p className="mt-1 text-sm text-zinc-500">{user.email}</p>
        </div>
      </div>

      <div className="mb-9 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#131316] p-5">
          <p className="text-sm text-zinc-500">Confirmed demo bookings</p>
          <p className="mt-2 font-display text-3xl font-bold">{bookings.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#131316] p-5">
          <p className="text-sm text-zinc-500">Your next movie night</p>
          <Link to="/movies" className="mt-2 inline-flex items-center gap-2 font-semibold text-rose-400">
            Find a movie <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="section-title">My bookings</h2>
        <Link to="/movies" className="text-sm text-rose-400 hover:text-rose-300">Book another</Link>
      </div>

      {bookings.length ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <article key={booking.id} className="grid gap-4 rounded-2xl border border-white/10 bg-[#131316] p-4 sm:grid-cols-[90px_1fr_auto] sm:items-center sm:p-5">
              <img src={booking.movie.poster} alt="" className="h-32 w-24 rounded-xl object-cover sm:h-28 sm:w-20" />
              <div>
                <h3 className="font-display text-xl font-semibold">{booking.movie.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-zinc-400"><MapPin size={14} /> {booking.theatreName}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-zinc-400"><CalendarDays size={14} /> {booking.date} · {booking.time}</p>
                <p className="mt-2 text-xs text-zinc-500">Seats: {booking.seats.join(', ')} · ID: {booking.id}</p>
              </div>
              <div className="sm:text-right">
                <p className="font-display text-xl font-bold">₹{booking.total}</p>
                <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">Confirmed · Demo</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/15 px-5 py-14 text-center">
          <Ticket size={36} className="mx-auto text-zinc-600" />
          <h3 className="mt-4 font-display text-xl font-semibold">No bookings yet</h3>
          <p className="mt-2 text-sm text-zinc-500">Your next cinema adventure is waiting.</p>
          <Link to="/movies" className="primary-btn mt-5">Explore movies <ArrowRight size={16} /></Link>
        </div>
      )}
    </main>
  )
}

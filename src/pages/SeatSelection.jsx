
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Ticket } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import SeatLayout from '../components/SeatLayout'

export default function SeatSelection() {
  const { booking, updateBooking } = useBooking()
  const navigate = useNavigate()
  const [seats, setSeats] = useState(booking.seats || [])
  const [seatPrice, setSeatPrice] = useState(booking.seatPrice || booking.movie?.price || 180)

  if (!booking.movie || !booking.theatreId || !booking.time) {
    return (
      <main className="page-container py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Choose a movie and showtime first</h1>
        <Link to="/movies" className="primary-btn mt-5">Browse movies</Link>
      </main>
    )
  }

  function updateSeats(next, price) {
    setSeats(next)
    setSeatPrice(price)
    updateBooking({ seats: next, seatPrice: price })
  }

  function proceed() {
    if (!seats.length) return
    updateBooking({ seats, seatPrice })
    navigate('/checkout')
  }

  return (
    <main className="page-container min-h-[65vh] py-8 sm:py-12">
      <Link to={`/movie/${booking.movie.id}`} className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft size={16} /> Back to showtimes
      </Link>

      <div className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-400">Step 2 of 3 · Your seats</p>
        <h1 className="section-title text-3xl sm:text-4xl">Pick your perfect spot.</h1>
        <p className="mt-3 text-sm text-zinc-500">Select up to eight seats for your movie.</p>
      </div>

      <div className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-[#131316] p-5 sm:grid-cols-3">
        <div><p className="text-xs text-zinc-500">Movie</p><p className="mt-1 font-semibold">{booking.movie.title}</p></div>
        <div><p className="flex items-center gap-1 text-xs text-zinc-500"><MapPin size={13} /> Theatre</p><p className="mt-1 font-semibold">{booking.theatreName}</p></div>
        <div><p className="flex items-center gap-1 text-xs text-zinc-500"><CalendarDays size={13} /> Date & time</p><p className="mt-1 font-semibold">{booking.date} · {booking.time}</p></div>
      </div>

      <SeatLayout selected={seats} onChange={updateSeats} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#131316] p-5">
        <div>
          <p className="text-xs text-zinc-500">Selected seats: {seats.length ? seats.join(', ') : 'None'}</p>
          <p className="mt-1 font-display text-2xl font-bold">₹{seats.length * seatPrice}</p>
          <p className="mt-1 text-xs text-zinc-500">Before any applicable fees</p>
        </div>
        <button disabled={!seats.length} onClick={proceed} className="primary-btn">
          Continue <ArrowRight size={17} />
        </button>
      </div>
    </main>
  )
}

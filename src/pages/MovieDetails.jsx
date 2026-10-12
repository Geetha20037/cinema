
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin, Star, Ticket } from 'lucide-react'
import { movies, theatres } from '../data/movies'
import { useBooking } from '../context/BookingContext'
import ShowtimeSelector from '../components/ShowtimeSelector'

export default function MovieDetails() {
  const { id } = useParams()
  const movie = movies.find((item) => item.id === id)
  const { booking, updateBooking } = useBooking()
  const navigate = useNavigate()
  const [date, setDate] = useState(booking.date || new Date().toLocaleDateString('en-CA'))
  const [showtime, setShowtime] = useState(
    booking.movie?.id === id ? { theatreId: booking.theatreId, time: booking.time } : null,
  )

  if (!movie) {
    return (
      <main className="page-container py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Movie not found</h1>
        <Link to="/movies" className="primary-btn mt-5">Browse movies</Link>
      </main>
    )
  }

  function chooseShowtime(theatre, time) {
    setShowtime({ theatreId: theatre.id, time })
    updateBooking({
      movie,
      theatreId: theatre.id,
      theatreName: theatre.name,
      theatreArea: theatre.area,
      time,
      date,
      seats: [],
      seatPrice: movie.price,
    })
  }

  function continueToSeats() {
    if (!showtime) return
    const theatre = theatres.find((item) => item.id === showtime.theatreId)
    updateBooking({
      movie,
      theatreId: theatre.id,
      theatreName: theatre.name,
      theatreArea: theatre.area,
      time: showtime.time,
      date,
      seats: [],
      seatPrice: movie.price,
    })
    navigate('/seats')
  }

  return (
    <main className="page-container py-8 sm:py-12">
      <Link to="/movies" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft size={16} /> All movies
      </Link>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#131316]">
        <div className="absolute inset-0">
          <img src={movie.banner} alt="" className="h-full w-full object-cover opacity-20 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/90 to-[#09090b]/50" />
        </div>
        <div className="relative grid gap-8 p-5 sm:p-9 md:grid-cols-[220px_1fr] md:gap-10">
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="mx-auto aspect-[3/4] w-44 rounded-2xl object-cover shadow-2xl sm:w-56 md:w-full"
          />
          <div className="self-center">
            <span className="rounded-md bg-rose-500/15 px-3 py-1.5 text-xs font-semibold text-rose-400">
              {movie.genre}
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">{movie.title}</h1>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 text-sm text-zinc-300">
              <span className="flex items-center gap-1 text-amber-400"><Star size={16} fill="currentColor" /> {movie.rating}</span>
              <span>{movie.year}</span>
              <span>{movie.certificate}</span>
              <span className="flex items-center gap-1"><Clock size={15} /> {movie.duration}</span>
              <span>{movie.language}</span>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400">{movie.description}</p>
            <p className="mt-5 text-sm text-zinc-300">Starting from <strong className="text-lg text-white">₹{movie.price}</strong> per ticket</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
            <CalendarDays size={15} /> Choose a date
          </p>
          <h2 className="section-title">Select your show</h2>
        </div>

        <input
          type="date"
          min={new Date().toLocaleDateString('en-CA')}
          value={date}
          onChange={(event) => {
            setDate(event.target.value)
            setShowtime(null)
            updateBooking({ date: event.target.value, seats: [], time: null, theatreId: null })
          }}
          className="mb-7 rounded-xl border border-white/10 bg-[#131316] px-4 py-3 text-sm text-white outline-none focus:border-rose-500"
          aria-label="Select movie date"
        />

        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
          <MapPin size={18} className="text-rose-400" /> Theatres and timings
        </h3>
        <ShowtimeSelector
          theatres={theatres}
          selected={showtime}
          onSelect={chooseShowtime}
        />

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#131316] p-5">
          <div>
            <p className="text-sm text-zinc-400">Selected date</p>
            <p className="mt-1 font-semibold">{date}</p>
            <p className="mt-1 text-xs text-zinc-500">{showtime?.time || 'Choose a showtime to continue'}</p>
          </div>
          <button disabled={!showtime} onClick={continueToSeats} className="primary-btn">
            Choose seats <Ticket size={17} /> <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </main>
  )
}

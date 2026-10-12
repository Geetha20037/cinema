
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, CreditCard, LockKeyhole, Ticket } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'

export default function Checkout() {
  const { user } = useAuth()
  const { booking, saveConfirmedBooking } = useBooking()
  const navigate = useNavigate()
  const location = useLocation()
  const [paymentMethod, setPaymentMethod] = useState('UPI')
  const [error, setError] = useState('')

  if (!booking.movie || !booking.seats?.length || !booking.time) {
    return (
      <main className="page-container py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Your booking is incomplete</h1>
        <Link to="/movies" className="primary-btn mt-5">Start booking</Link>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="page-container py-20 text-center">
        <LockKeyhole size={36} className="mx-auto text-rose-400" />
        <h1 className="mt-5 font-display text-3xl font-bold">Sign in to continue</h1>
        <p className="mt-3 text-sm text-zinc-500">Your selected seats are saved in this browser.</p>
        <Link to="/login" state={{ from: location.pathname }} className="primary-btn mt-6">Sign in</Link>
      </main>
    )
  }

  const subtotal = booking.seats.length * booking.seatPrice
  const fee = Math.round(subtotal * 0.05)
  const total = subtotal + fee

  function confirmBooking() {
    setError('')
    const confirmed = {
      id: `CIN${Date.now().toString().slice(-8)}`,
      movie: booking.movie,
      theatreName: booking.theatreName,
      theatreArea: booking.theatreArea,
      date: booking.date,
      time: booking.time,
      seats: booking.seats,
      seatPrice: booking.seatPrice,
      subtotal,
      fee,
      total,
      paymentMethod,
      customer: user.email,
      createdAt: new Date().toISOString(),
    }

    try {
      saveConfirmedBooking(confirmed)
      navigate('/booking-success', { state: { booking: confirmed }, replace: true })
    } catch {
      setError('Unable to save this demo booking. Please try again.')
    }
  }

  return (
    <main className="page-container min-h-[65vh] py-8 sm:py-12">
      <Link to="/seats" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft size={16} /> Back to seats
      </Link>

      <div className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-400">Step 3 of 3 · Checkout</p>
        <h1 className="section-title text-3xl sm:text-4xl">One last step.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-white/10 bg-[#131316] p-5 sm:p-7">
          <h2 className="font-display text-xl font-semibold">Payment preference</h2>
          <p className="mt-2 text-sm text-zinc-500">Choose a demo payment method for this frontend booking.</p>

          <div className="mt-6 space-y-3">
            {[
              { name: 'UPI', detail: 'UPI app / QR payment' },
              { name: 'Card', detail: 'Credit or debit card' },
              { name: 'Net Banking', detail: 'Bank transfer' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setPaymentMethod(item.name)}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left ${
                  paymentMethod === item.name ? 'border-rose-500 bg-rose-500/[0.06]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <CreditCard size={21} className={paymentMethod === item.name ? 'text-rose-400' : 'text-zinc-500'} />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
                </div>
                <span className={`h-4 w-4 rounded-full border-2 ${paymentMethod === item.name ? 'border-rose-500 bg-rose-500' : 'border-zinc-600'}`} />
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3 rounded-xl bg-amber-500/10 p-4 text-xs leading-5 text-amber-200">
            <LockKeyhole size={17} className="shrink-0" />
            Demo mode: no real payment will be taken. Never enter real card or banking credentials here.
          </div>
          {error && <p role="alert" className="mt-4 text-sm text-rose-400">{error}</p>}
        </section>

        <aside className="h-fit rounded-2xl border border-white/10 bg-[#131316] p-5 sm:p-7">
          <h2 className="font-display text-xl font-semibold">Booking summary</h2>
          <div className="mt-5 flex gap-4">
            <img src={booking.movie.poster} alt="" className="h-28 w-20 rounded-lg object-cover" />
            <div>
              <h3 className="font-semibold">{booking.movie.title}</h3>
              <p className="mt-2 text-xs text-zinc-500">{booking.movie.language} · {booking.movie.duration}</p>
              <p className="mt-2 text-xs text-zinc-400">{booking.theatreName}</p>
              <p className="mt-1 text-xs text-zinc-500">{booking.date} · {booking.time}</p>
            </div>
          </div>

          <div className="my-5 border-t border-dashed border-white/15" />
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-zinc-500">Seats ({booking.seats.length})</span>
            <span>{booking.seats.join(', ')}</span>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-zinc-500">Tickets</span><span>₹{subtotal}</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-zinc-500">Convenience fee (5%)</span><span>₹{fee}</span>
          </div>
          <div className="my-5 border-t border-white/10" />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total amount</span>
            <span className="font-display text-2xl font-bold">₹{total}</span>
          </div>
          <button onClick={confirmBooking} className="primary-btn mt-6 w-full">
            <CheckCircle2 size={18} /> Confirm demo booking
          </button>
          <p className="mt-3 flex items-center justify-center gap-1 text-center text-[11px] text-zinc-600">
            <Ticket size={13} /> Demo confirmation · No payment processed
          </p>
        </aside>
      </div>
    </main>
  )
}

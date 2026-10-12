
import { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

function loadBooking() {
  try {
    return JSON.parse(localStorage.getItem('cineora-draft')) || {}
  } catch {
    return {}
  }
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(loadBooking)

  function updateBooking(updates) {
    setBooking((previous) => {
      const next = { ...previous, ...updates }
      localStorage.setItem('cineora-draft', JSON.stringify(next))
      return next
    })
  }

  function clearBooking() {
    localStorage.removeItem('cineora-draft')
    setBooking({})
  }

  function saveConfirmedBooking(confirmed) {
    const history = JSON.parse(localStorage.getItem('cineora-bookings') || '[]')
    localStorage.setItem('cineora-bookings', JSON.stringify([confirmed, ...history]))
    clearBooking()
  }

  return (
    <BookingContext.Provider value={{
      booking, updateBooking, clearBooking, saveConfirmedBooking,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking must be used inside BookingProvider')
  return context
}

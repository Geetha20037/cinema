
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem('cineora-user')) || null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser)

  function signup(name, email, password) {
    const users = JSON.parse(localStorage.getItem('cineora-users') || '[]')
    const normalized = email.trim().toLowerCase()

    if (users.some((item) => item.email === normalized)) {
      throw new Error('An account with this email already exists.')
    }

    const newUser = { name: name.trim(), email: normalized, password }
    localStorage.setItem('cineora-users', JSON.stringify([...users, newUser]))

    const safeUser = { name: newUser.name, email: normalized }
    localStorage.setItem('cineora-user', JSON.stringify(safeUser))
    setUser(safeUser)
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('cineora-users') || '[]')
    const found = users.find(
      (item) => item.email === email.trim().toLowerCase() && item.password === password,
    )

    if (!found) {
      throw new Error('Invalid email or password. Please sign up first if you are new.')
    }

    const safeUser = { name: found.name, email: found.email }
    localStorage.setItem('cineora-user', JSON.stringify(safeUser))
    setUser(safeUser)
  }

  function logout() {
    localStorage.removeItem('cineora-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}

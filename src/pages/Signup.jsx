
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Film, UserRound, Mail, LockKeyhole, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (name.trim().length < 2) {
      setError('Please enter your full name.')
      return
    }

    if (password.length < 8) {
      setError('Your password must contain at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      signup(name, email, password)
      navigate('/profile', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="page-container flex min-h-[75vh] items-center justify-center py-12">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#131316] p-6 sm:p-9">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2 font-display text-xl font-extrabold">
          <Film className="text-rose-500" /> CINEORA
        </Link>
        <p className="mt-7 text-center text-xs font-bold uppercase tracking-[0.2em] text-rose-400">Your story starts here</p>
        <h1 className="mt-3 text-center font-display text-3xl font-bold">Create your account.</h1>
        <p className="mt-3 text-center text-sm text-zinc-500">A better movie night is just around the corner.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Full name</span>
            <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 focus-within:border-rose-500">
              <UserRound size={17} className="text-zinc-500" />
              <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" placeholder="Your name" className="w-full bg-transparent text-sm outline-none" />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Email address</span>
            <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 focus-within:border-rose-500">
              <Mail size={17} className="text-zinc-500" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@example.com" className="w-full bg-transparent text-sm outline-none" />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Password</span>
            <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 focus-within:border-rose-500">
              <LockKeyhole size={17} className="text-zinc-500" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className="w-full bg-transparent text-sm outline-none" />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Confirm password</span>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" placeholder="Re-enter your password" className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-rose-500" />
          </label>

          {error && <p role="alert" className="text-sm leading-5 text-rose-400">{error}</p>}
          <button type="submit" className="primary-btn w-full">Create account <ArrowRight size={17} /></button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already registered? <Link to="/login" className="font-semibold text-rose-400 hover:text-rose-300">Sign in</Link>
        </p>
        <p className="mt-5 text-center text-[11px] leading-5 text-zinc-600">
          Demo only: credentials are stored in local browser storage, not a secure server.
        </p>
      </section>
    </main>
  )
}

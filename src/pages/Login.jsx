
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Film, Eye, EyeOff, Mail, LockKeyhole, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      login(email, password)
      navigate(location.state?.from === '/checkout' ? '/checkout' : '/profile', { replace: true })
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
        <p className="mt-7 text-center text-xs font-bold uppercase tracking-[0.2em] text-rose-400">Welcome back</p>
        <h1 className="mt-3 text-center font-display text-3xl font-bold">Sign in to your world.</h1>
        <p className="mt-3 text-center text-sm text-zinc-500">Pick up where your next movie night begins.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Email address</span>
            <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 focus-within:border-rose-500">
              <Mail size={17} className="text-zinc-500" />
              <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-transparent text-sm outline-none" />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Password</span>
            <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 focus-within:border-rose-500">
              <LockKeyhole size={17} className="text-zinc-500" />
              <input type={showPassword ? 'text' : 'password'} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-transparent text-sm outline-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-zinc-500">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>

          {error && <p role="alert" className="text-sm leading-5 text-rose-400">{error}</p>}
          <button type="submit" className="primary-btn w-full">Sign in <ArrowRight size={17} /></button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          New to CINEORA? <Link to="/signup" className="font-semibold text-rose-400 hover:text-rose-300">Create account</Link>
        </p>
        <p className="mt-5 text-center text-[11px] leading-5 text-zinc-600">
          Demo authentication stores account information in this browser only.
        </p>
      </section>
    </main>
  )
}

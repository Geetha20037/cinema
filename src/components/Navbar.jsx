
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Film, Menu, X, UserRound, Ticket, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Movies', to: '/movies' },
  ]

  function signOut() {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/90 backdrop-blur-xl">
      <div className="page-container flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-600">
            <Film size={22} />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">
            CINE<span className="text-rose-500">ORA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-rose-400' : 'text-zinc-400 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/profile" className="secondary-btn text-sm">
                <UserRound size={17} /> {user.name.split(' ')[0]}
              </Link>
              <button onClick={signOut} className="text-zinc-400 hover:text-white" title="Sign out">
                <LogOut size={19} />
              </button>
            </>
          ) : (
            <Link to="/login" className="secondary-btn text-sm">Sign in</Link>
          )}
          <Link to="/movies" className="primary-btn text-sm">
            <Ticket size={17} /> Book tickets
          </Link>
        </div>

        <button
          className="rounded-lg border border-white/10 p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-zinc-950 p-4 md:hidden">
          <div className="page-container flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to={user ? '/profile' : '/login'} onClick={() => setOpen(false)}>
              {user ? 'My profile' : 'Sign in'}
            </Link>
            <Link to="/movies" onClick={() => setOpen(false)} className="primary-btn">
              Book tickets
            </Link>
            {user && (
              <button onClick={signOut} className="text-left text-zinc-400">
                Sign out
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}

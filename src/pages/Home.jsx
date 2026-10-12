
import { Link } from 'react-router-dom'
import { ArrowRight, Flame, ShieldCheck, Ticket, Clock3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { movies } from '../data/movies'
import HeroBanner from '../components/HeroBanner'
import MovieCard from '../components/MovieCard'

export default function Home() {
  const featured = movies.find((movie) => movie.id === 'stellar') || movies[0]

  return (
    <>
      <HeroBanner movie={featured} />

      <section className="page-container py-12 sm:py-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
              <Flame size={15} /> The audience is watching
            </p>
            <h2 className="section-title">Trending this week</h2>
            <p className="mt-2 text-sm text-zinc-500">Stories worth seeing on the big screen.</p>
          </div>
          <Link to="/movies" className="flex shrink-0 items-center gap-2 text-sm font-semibold text-rose-400 hover:text-rose-300">
            All movies <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {movies.slice(0, 4).map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </section>

      <section className="page-container pb-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Ticket, title: 'Easy booking', text: 'Find a film and pick your seats in minutes.' },
            { icon: ShieldCheck, title: 'Clear pricing', text: 'See your ticket total before confirming.' },
            { icon: Clock3, title: 'Your plans, together', text: 'Keep your booking details in your profile.' },
          ].map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-[#131316] p-6"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-rose-500/10 text-rose-400">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="page-container pb-16">
        <div className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-950 via-[#171116] to-zinc-950 p-7 sm:p-12">
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300">Lights. Camera. You.</p>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">Make tonight a movie night.</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400">Find your next favourite film, choose the perfect seat, and get ready for the show.</p>
            <Link to="/movies" className="primary-btn mt-6">Explore the collection <ArrowRight size={17} /></Link>
          </div>
          <FilmDecoration />
        </div>
      </section>
    </>
  )
}

function FilmDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 hidden rotate-12 opacity-10 sm:block">
      <div className="grid h-80 w-80 place-items-center rounded-full border-[28px] border-white">
        <span className="font-display text-9xl font-black">C</span>
      </div>
    </div>
  )
}

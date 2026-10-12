
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clapperboard, ArrowRight } from 'lucide-react'
import { movies, genres } from '../data/movies'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'

export default function Movies() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')

  const filtered = useMemo(() => movies.filter((movie) => {
    const matchesSearch = `${movie.title} ${movie.genre} ${movie.language}`
      .toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (genre === 'All' || movie.genre === genre)
  }), [search, genre])

  return (
    <main className="page-container min-h-[65vh] py-10 sm:py-14">
      <div className="mb-9">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
          <Clapperboard size={15} /> The movie collection
        </p>
        <h1 className="section-title text-3xl sm:text-4xl">Find your next film.</h1>
        <p className="mt-3 text-sm text-zinc-500">Search, explore genres, and discover your next cinema experience.</p>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
        genres={genres}
      />

      <div className="mb-5 mt-8 flex items-center justify-between">
        <p className="text-sm text-zinc-400">{filtered.length} {filtered.length === 1 ? 'movie' : 'movies'} found</p>
        {(search || genre !== 'All') && (
          <button
            onClick={() => { setSearch(''); setGenre('All') }}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/15 py-16 text-center">
          <Clapperboard size={36} className="mx-auto text-zinc-600" />
          <h2 className="mt-4 font-display text-xl font-semibold">No movies found</h2>
          <p className="mt-2 text-sm text-zinc-500">Try another title or genre.</p>
          <button onClick={() => { setSearch(''); setGenre('All') }} className="primary-btn mt-5">
            Show all movies
          </button>
        </div>
      )}

      <Link to="/" className="mt-10 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
        Back to home <ArrowRight size={15} />
      </Link>
    </main>
  )
}

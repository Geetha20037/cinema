
import { Search, SlidersHorizontal } from 'lucide-react'

export default function SearchBar({ search, setSearch, genre, setGenre, genres }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#131316] px-4 py-3 focus-within:border-rose-500/60">
        <Search size={19} className="shrink-0 text-zinc-500" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search movies, genres..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
          aria-label="Search movies"
        />
      </label>
      <div className="flex items-center gap-3">
        <SlidersHorizontal size={18} className="shrink-0 text-zinc-500" />
        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#131316] px-4 py-3 text-sm outline-none focus:border-rose-500 sm:min-w-48"
          aria-label="Filter by genre"
        >
          {genres.map((item) => <option key={item} value={item}>{item === 'All' ? 'All genres' : item}</option>)}
        </select>
      </div>
    </div>
  )
}

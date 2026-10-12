import { motion } from 'framer-motion'
import { Ticket, Clapperboard, Sparkles } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <motion.main
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.55 }}
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#050506] px-5"
      role="status"
      aria-label="Loading CINEORA"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(190,18,60,0.18),transparent_52%)]" />

      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.15, 1], opacity: [0, 0.7, 0.35] }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        className="absolute h-[360px] w-[360px] rounded-full border border-rose-500/30 shadow-[0_0_100px_rgba(225,29,72,0.12)] sm:h-[480px] sm:w-[480px]"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute h-[290px] w-[290px] rounded-full border border-dashed border-white/10 sm:h-[390px] sm:w-[390px]"
      />

      <div className="absolute left-0 top-0 h-px w-full bg-white/5">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'linear' }}
          className="h-full bg-rose-500 shadow-[0_0_18px_#f43f5e]"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2 text-rose-400">
            <Clapperboard size={17} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">
              The movie experience
            </span>
          </div>

          <h1 className="font-display text-4xl font-black tracking-[0.15em] text-white sm:text-5xl">
            CINE<span className="text-rose-500">ORA</span>
          </h1>

          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-zinc-600">
            Every ticket opens a story
          </p>
        </motion.div>

        <div className="relative flex h-44 w-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.7, 1.1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute h-36 w-36 rounded-full bg-rose-600/15 blur-2xl"
          />

          <motion.div
            initial={{ x: -150, rotate: -12, opacity: 0 }}
            animate={{
              x: [-150, 0, 0, 150],
              rotate: [-12, 0, 0, 12],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.3, 0.76, 1],
              ease: 'easeInOut',
            }}
            className="relative w-[260px] max-w-full"
          >
            <div className="relative flex h-[100px] items-center overflow-hidden rounded-xl border border-rose-300/30 bg-gradient-to-r from-[#350711] via-[#7f1029] to-[#350711] shadow-[0_12px_55px_rgba(225,29,72,0.22)]">
              <div className="flex h-full w-[72px] shrink-0 flex-col items-center justify-center border-r border-dashed border-rose-200/35">
                <Ticket size={27} className="text-rose-200" />
                <span className="mt-1 text-[7px] font-bold tracking-[0.2em] text-rose-200/70">
                  ADMIT
                </span>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center">
                <span className="text-[9px] font-bold tracking-[0.3em] text-rose-200">
                  YOUR NEXT
                </span>
                <span className="mt-1 font-display text-2xl font-black tracking-wider text-white">
                  BIG SCENE
                </span>
                <span className="mt-1 text-[8px] tracking-[0.22em] text-rose-100/60">
                  ONE STORY · ENDLESS FEELINGS
                </span>
              </div>

              <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#080809]" />
              <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#080809]" />

              <motion.div
                initial={{ y: '-110%' }}
                animate={{ y: ['-110%', '110%', '-110%'] }}
                transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-rose-300/25 to-transparent"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: 0.3 }}
            className="absolute right-2 top-5 text-rose-300"
          >
            <Sparkles size={19} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: [8, -8, -16] }}
            transition={{ duration: 1.7, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-1 left-3 text-rose-400/80"
          >
            <Sparkles size={15} />
          </motion.div>
        </div>

        <motion.p
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8 text-center text-sm font-medium tracking-wide text-zinc-200"
        >
          Your story is about to begin
        </motion.p>

        <p className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          Please take your seats
        </p>

        <div className="mt-7 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '250%' }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-rose-500 shadow-[0_0_12px_#f43f5e]"
          />
        </div>
      </div>

      <div className="absolute bottom-6 text-[9px] tracking-[0.3em] text-zinc-700">
        LIGHTS OUT · STORY ON
      </div>
    </motion.main>
  )
}

import { Film, Heart, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "My Profile", href: "/profile" },
  ];

  const socialLinks = [
    { name: "Instagram", symbol: "ig", href: "https://www.instagram.com/" },
    { name: "YouTube", symbol: "▶", href: "https://www.youtube.com/" },
    { name: "Twitter / X", symbol: "𝕏", href: "https://x.com/" },
    { name: "Facebook", symbol: "f", href: "https://www.facebook.com/" },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#09090d] text-gray-400">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="mb-5 inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
                <Film size={22} />
              </span>
              <span className="text-2xl font-extrabold tracking-wide text-white">
                CINE<span className="text-red-500">ORA</span>
              </span>
            </a>

            <p className="max-w-xs text-sm leading-7">
              Your next cinematic experience starts here. Discover movies,
              choose your seats, and make every moment memorable.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm font-bold text-white transition hover:border-red-500 hover:bg-red-500"
                >
                  {social.symbol}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm transition hover:text-red-400"
                  >
                    <ArrowUpRight size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/movies" className="transition hover:text-red-400">
                  Now Showing
                </a>
              </li>
              <li>
                <a href="/movies" className="transition hover:text-red-400">
                  Popular Movies
                </a>
              </li>
              <li>
                <a href="/profile" className="transition hover:text-red-400">
                  My Bookings
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Stay in the Loop
            </h3>
            <p className="mb-4 text-sm leading-6">
              Get the latest movie updates and cinematic news.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                const email = event.currentTarget.elements.email.value.trim();

                if (email) {
                  alert("Thank you for subscribing to CINEORA!");
                  event.currentTarget.reset();
                }
              }}
              className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:border-red-500"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                aria-label="Email address"
                required
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-red-600 px-4 text-white transition hover:bg-red-700"
              >
                <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} CINEORA. All rights reserved.</p>
          <p className="inline-flex items-center gap-1">
            Made with
            <Heart size={13} className="fill-red-500 text-red-500" />
            for movie lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
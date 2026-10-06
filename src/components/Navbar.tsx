import { useEffect, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScroll';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Competitions', href: '#competitions' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Exhibitions', href: '#exhibitions' },
  { label: 'Workshops', href: '#workshops' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-aether-500/40 blur-md group-hover:bg-aether-500/60 transition-colors" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-aether-600 to-aether-400">
                <Zap className="h-5 w-5 text-white" fill="white" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-wide text-gradient-aurora">
                Techfest
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                IIT Bombay
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-200 transition-all duration-300 hover:bg-aether-950/40 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="#register" className="btn-gold !px-6 !py-2.5 !text-xs">
              Register Now
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-ink-200 transition-colors hover:bg-ink-800 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <div className="h-[2px] w-full bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-aether-500 via-gold-400 to-aether-500 transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 glass border-l border-aether-500/20 p-6 pt-24">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink-200 transition-all hover:bg-aether-950/40 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#register"
                onClick={() => setMobileOpen(false)}
                className="btn-gold mt-4 w-full"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

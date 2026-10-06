import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Calendar, MapPin } from 'lucide-react';
import { heroStats } from '@/data/content';
import Countdown from '@/components/Countdown';

const FEST_DATE = new Date('2026-12-16T09:00:00+05:30');

function StarField() {
  const [stars, setStars] = useState<
    { id: number; top: string; left: string; size: number; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `glowPulse ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-ink-950">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <StarField />

      {/* Radial glows */}
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-aether-600/20 blur-[120px] animate-glow-pulse" />
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-gold-500/15 blur-[100px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] rounded-full bg-aether-400/10 blur-[90px] animate-glow-pulse" style={{ animationDelay: '1s' }} />

      {/* Orbiting rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full border border-aether-500/10 animate-spin-slow" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[800px] w-[800px] rounded-full border border-gold-500/8 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-20 text-center lg:px-8">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-gold-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="tracking-[0.2em] uppercase">The 30th Edition</span>
          </div>
        </div>

        <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <p className="font-display text-sm uppercase tracking-[0.4em] text-aether-300 mb-4">
            An Aetherial Renaissance
          </p>
          <h1 className="font-display text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="text-gradient-aurora">Techfest</span>
            <br />
            <span className="text-white/90 italic font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              where heritage meets
            </span>
            <br />
            <span className="text-gradient-gold italic font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              futuristic technology
            </span>
          </h1>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <div className="flex items-center gap-2 text-sm text-ink-300">
            <Calendar className="h-4 w-4 text-gold-400" />
            <span>16–18 December 2026</span>
          </div>
          <div className="h-4 w-px bg-ink-700" />
          <div className="flex items-center gap-2 text-sm text-ink-300">
            <MapPin className="h-4 w-4 text-aether-400" />
            <span>IIT Bombay, Mumbai</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-10 animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-ink-500">
            The Renaissance begins in
          </p>
          <Countdown target={FEST_DATE} />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 animate-fade-up sm:flex-row" style={{ animationDelay: '0.7s', opacity: 0 }}>
          <a href="#register" className="btn-primary group">
            Register Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#highlights" className="btn-ghost">
            Explore the Fest
          </a>
        </div>

        {/* Hero stats */}
        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 animate-fade-up sm:grid-cols-4" style={{ animationDelay: '0.9s', opacity: 0 }}>
          {heroStats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl px-4 py-5 text-center">
              <div className="font-display text-2xl font-semibold text-gradient-gold">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-ink-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '1.5s', opacity: 0 }}>
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-ink-500">Scroll</div>
          <div className="h-12 w-px bg-gradient-to-b from-aether-500/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

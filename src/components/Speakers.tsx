import { Mic, Quote } from 'lucide-react';
import { speakers } from '@/data/content';
import { useInView } from '@/hooks/useScroll';

export default function Speakers() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="speakers" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 right-1/4 h-[400px] w-[400px] rounded-full bg-gold-600/10 blur-[120px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="section-label">Techfest Summit</div>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            Voices that <span className="text-gradient-aurora italic">shape nations</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-400">
            A lecture series with a Nobel-laureate lineage. Three decades of visionaries,
            policymakers, and pioneers on one stage.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker, i) => (
            <div
              key={speaker.name}
              className={`group relative overflow-hidden rounded-2xl glass p-7 transition-all duration-500 hover:border-gold-500/30 hover:shadow-[0_0_30px_rgba(212,153,32,0.12)] ${
                inView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="absolute -top-2 -right-2 h-20 w-20 text-aether-500/5" />

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-aether-600/30 to-gold-500/20 transition-transform duration-500 group-hover:scale-110">
                  <Mic className="h-5 w-5 text-gold-300" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {speaker.name}
                  </h3>
                  <p className="text-xs text-aether-300">{speaker.role}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-ink-800 pt-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-ink-500">
                  Lecture Topic
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-200 italic">
                  "{speaker.topic}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

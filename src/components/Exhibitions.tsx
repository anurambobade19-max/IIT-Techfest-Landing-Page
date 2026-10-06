import { ArrowRight } from 'lucide-react';
import { exhibitions } from '@/data/content';
import { useInView } from '@/hooks/useScroll';

export default function Exhibitions() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="exhibitions" className="relative py-28 overflow-hidden bg-ink-950/50">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute top-1/3 left-0 h-[450px] w-[450px] rounded-full bg-aether-800/15 blur-[130px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="section-label">International Exhibitions</div>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            A living atlas of <span className="text-gradient-gold italic">tomorrow</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-400">
            30+ countries. Cutting-edge innovations in robotics, AI, aerospace, and defense.
            The future, on display.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {exhibitions.map((ex, i) => (
            <article
              key={ex.title}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-700 ${
                inView ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="relative h-80 overflow-hidden rounded-3xl">
                <img
                  src={ex.image}
                  alt={ex.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-medium text-white">
                    {ex.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {ex.desc}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-300 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

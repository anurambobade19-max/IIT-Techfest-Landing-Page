import { ArrowUpRight } from 'lucide-react';
import { highlights } from '@/data/content';
import { useInView } from '@/hooks/useScroll';

export default function Highlights() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="highlights" className="relative py-28 overflow-hidden">
      <div className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-gold-500/8 blur-[130px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="section-label">Flagship Experiences</div>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            Where the <span className="text-gradient-aurora italic">extraordinary</span> happens
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-400">
            Four pillars of Techfest that draw hundreds of thousands to IIT Bombay every December.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {highlights.map((item, i) => (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-3xl glass transition-all duration-700 hover:border-aether-500/40 hover:shadow-[0_0_40px_rgba(139,91,247,0.2)] ${
                inView ? 'animate-scale-in' : 'opacity-0'
              } ${i % 2 === 0 ? 'md:mt-0' : 'md:mt-12'}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="relative h-56 overflow-hidden sm:h-64">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                <div className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-300">
                  {item.tag}
                </div>
                <div className="absolute top-4 right-4 rounded-full bg-aether-600/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {item.stat}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-medium text-white transition-colors group-hover:text-aether-200">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">
                  {item.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-aether-400 transition-colors group-hover:text-aether-300">
                  <span>Learn more</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { sponsors } from '@/data/content';
import { useInView } from '@/hooks/useScroll';

export default function Sponsors() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const doubled = [...sponsors, ...sponsors];

  return (
    <section className="relative py-20 overflow-hidden">
      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="section-label">Associates & Partners</div>
          <h2 className="mt-4 font-display text-3xl font-light text-white sm:text-4xl">
            Backed by the <span className="text-gradient-gold italic">best in the world</span>
          </h2>
        </div>

        <div className="relative mt-12 overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-ink-950 to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-ink-950 to-transparent" />

          <div
            className={`flex w-max gap-8 ${inView ? 'animate-scroll-x' : ''}`}
          >
            {doubled.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex h-20 min-w-[200px] items-center justify-center rounded-2xl glass px-8"
              >
                <span className="font-display text-xl font-semibold tracking-wide text-ink-300 transition-colors hover:text-white">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

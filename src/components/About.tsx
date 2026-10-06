import { Award, Globe2, Users, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { stats } from '@/data/content';
import { useInView, useCountUp } from '@/hooks/useScroll';

const icons: LucideIcon[] = [Users, Globe2, Trophy, Award];

function StatCard({
  value,
  label,
  icon: Icon,
  inView,
  delay,
}: {
  value: string;
  label: string;
  icon: LucideIcon;
  inView: boolean;
  delay: number;
}) {
  const num = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const count = useCountUp(num, 2000, inView);
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div
      className="group glass rounded-3xl p-6 transition-all duration-500 hover:border-aether-500/40 hover:shadow-[0_0_30px_rgba(139,91,247,0.15)]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-aether-600/30 to-gold-500/20 transition-transform duration-500 group-hover:scale-110">
        <Icon className="h-6 w-6 text-aether-300" />
      </div>
      <div className="mt-4 font-display text-4xl font-semibold text-white">
        {count}
        <span className="text-gradient-gold">{suffix}</span>
      </div>
      <div className="mt-1 text-sm text-ink-400">{label}</div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-aether-900/20 blur-[120px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="section-label">About Techfest</div>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl">
              Asia's largest science
              <br />
              &amp; technology festival,
              <br />
              <span className="text-gradient-aurora italic">reimagined for 30 years.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-300">
              <p>
                Born in 1998 at IIT Bombay, Techfest has grown from a campus event into a
                movement — a platform where the sharpest minds across 20+ countries converge
                to build, compete, and dream.
              </p>
              <p>
                The 30th edition steps into{' '}
                <span className="text-gold-300 italic">An Aetherial Renaissance</span> —
                a celebration where ancient traditions meet futuristic technology, where heritage
                is reimagined through the lens of innovation.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Robotics', 'AI/ML', 'Aerospace', 'Innovation', 'Sustainability'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-aether-500/20 bg-aether-950/30 px-4 py-1.5 text-xs font-medium text-aether-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={icons[i]}
                inView={inView}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

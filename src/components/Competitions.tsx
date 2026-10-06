import { useEffect, useState } from 'react';
import { Trophy, Code, Cpu, Bot, Zap, Brain, Lightbulb, Calculator, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/useScroll';
import { supabase } from '@/lib/supabase';
import type { Competition } from '@/types/database';
import { competitions as fallbackCompetitions } from '@/data/content';

const categoryIcons: Record<string, LucideIcon> = {
  Robotics: Bot,
  Coding: Code,
  Design: Zap,
  'AI/ML': Brain,
  Tech: Cpu,
  Innovation: Lightbulb,
  Mathematics: Calculator,
};

export default function Competitions() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setCompetitions(data);
      } else {
        setCompetitions(
          fallbackCompetitions.map((c, i) => ({
            id: String(i),
            title: c.title,
            category: c.category,
            prize: c.prize,
            description: c.desc,
            sort_order: i,
          }))
        );
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section id="competitions" className="relative py-28 overflow-hidden bg-ink-950/50">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-aether-700/15 blur-[120px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="section-label">Compete & Conquer</div>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            300+ competitions.
            <br />
            <span className="text-gradient-gold italic">₹2 Crore+ in prizes.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-400">
            From combat robotics to competitive coding — battle through regionals to claim your
            place on the national stage at IIT Bombay.
          </p>
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-aether-400" />
          </div>
        ) : (
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {competitions.map((comp, i) => {
              const Icon = categoryIcons[comp.category] ?? Trophy;
              return (
                <div
                  key={comp.id}
                  className={`group relative rounded-2xl border border-ink-800 bg-ink-900/40 p-6 transition-all duration-500 hover:border-aether-500/40 hover:bg-ink-900/70 hover:shadow-[0_0_25px_rgba(139,91,247,0.15)] hover:-translate-y-1 ${
                    inView ? 'animate-fade-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-aether-600/25 to-gold-500/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-5 w-5 text-aether-300" />
                    </div>
                    <span className="rounded-full bg-gold-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-300">
                      {comp.category}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-medium text-white">
                    {comp.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-400">
                    {comp.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-ink-800 pt-4">
                    <Trophy className="h-4 w-4 text-gold-400" />
                    <span className="text-sm font-semibold text-gradient-gold">
                      {comp.prize}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <a href="#register" className="btn-ghost group">
            View All Competitions
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

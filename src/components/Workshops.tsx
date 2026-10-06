import { useEffect, useState } from 'react';
import { GraduationCap, CheckCircle2, Loader2 } from 'lucide-react';
import { useInView } from '@/hooks/useScroll';
import { supabase } from '@/lib/supabase';
import type { Workshop } from '@/types/database';
import { workshops as fallbackWorkshops } from '@/data/content';

export default function Workshops() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setWorkshops(data);
      } else {
        setWorkshops(
          fallbackWorkshops.map((w, i) => ({
            id: String(i),
            title: w.title,
            description: w.desc,
            sort_order: i,
          }))
        );
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section id="workshops" className="relative py-28 overflow-hidden">
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gold-600/10 blur-[120px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-28">
            <div className="section-label">Workshops & Certifications</div>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl">
              Learn from
              <br />
              <span className="text-gradient-aurora italic">industry experts.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-400">
              Hands-on training across robotics, AI, cybersecurity, and more — with official
              certifications from IIT Bombay.
            </p>

            <div className="mt-6 space-y-3">
              {[
                'Certification from IIT Bombay',
                'Taught by industry professionals',
                'Hands-on practical sessions',
                'Open to all students',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-400" />
                  <span className="text-sm text-ink-200">{item}</span>
                </div>
              ))}
            </div>

            <a href="#register" className="btn-primary mt-8">
              Register for Workshops
            </a>
          </div>

          {/* Right: workshop cards */}
          {loading ? (
            <div className="flex justify-center pt-20">
              <Loader2 className="h-8 w-8 animate-spin text-aether-400" />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {workshops.map((ws, i) => (
                <div
                  key={ws.id}
                  className={`group glass rounded-2xl p-6 transition-all duration-500 hover:border-aether-500/40 hover:shadow-[0_0_25px_rgba(139,91,247,0.12)] hover:-translate-y-1 ${
                    inView ? 'animate-fade-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/20 to-aether-600/20 transition-transform duration-500 group-hover:scale-110">
                    <GraduationCap className="h-5 w-5 text-gold-300" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {ws.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-400">
                    {ws.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

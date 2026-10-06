import { useState } from 'react';
import { Mail, Send, Twitter, Instagram, Facebook, Linkedin, User, Phone, Building2, Trophy, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { competitions as fallbackCompetitions } from '@/data/content';

type Tab = 'newsletter' | 'register';

export default function CTA() {
  const [tab, setTab] = useState<Tab>('newsletter');

  // Newsletter state
  const [email, setEmail] = useState('');
  const [nlLoading, setNlLoading] = useState(false);
  const [nlSuccess, setNlSuccess] = useState(false);
  const [nlError, setNlError] = useState('');

  // Registration state
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    event_name: '',
  });
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlError('');
    setNlLoading(true);

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim() });

    setNlLoading(false);

    if (error) {
      if (error.code === '23505') {
        setNlError('You are already subscribed.');
      } else {
        setNlError('Something went wrong. Please try again.');
      }
      return;
    }

    setNlSuccess(true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regForm.name.trim() || !regForm.email.trim() || !regForm.event_name.trim()) {
      setRegError('Please fill in your name, email, and select an event.');
      return;
    }

    setRegLoading(true);

    const { error } = await supabase.from('registrations').insert({
      name: regForm.name.trim(),
      email: regForm.email.trim(),
      phone: regForm.phone.trim() || null,
      college: regForm.college.trim() || null,
      event_name: regForm.event_name,
    });

    setRegLoading(false);

    if (error) {
      setRegError('Registration failed. Please try again.');
      return;
    }

    setRegSuccess(true);
  };

  return (
    <section id="register" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-aether-600/15 blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] glass border-aether-500/20 p-10 text-center sm:p-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-2 text-xs font-medium text-gold-300">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-glow-pulse" />
            Registrations Open
          </div>

          <h2 className="mt-6 font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            Be part of the
            <br />
            <span className="text-gradient-aurora italic">Aetherial Renaissance</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base text-ink-300">
            Join 1.8 lakh+ attendees at Asia's largest science & technology festival.
            December 2026, IIT Bombay.
          </p>

          {/* Tab switcher */}
          <div className="mt-8 inline-flex rounded-full border border-ink-700 bg-ink-900/60 p-1">
            <button
              onClick={() => setTab('newsletter')}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                tab === 'newsletter'
                  ? 'bg-gradient-to-r from-aether-600 to-aether-500 text-white'
                  : 'text-ink-400 hover:text-white'
              }`}
            >
              Newsletter
            </button>
            <button
              onClick={() => setTab('register')}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                tab === 'register'
                  ? 'bg-gradient-to-r from-aether-600 to-aether-500 text-white'
                  : 'text-ink-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Newsletter form */}
          {tab === 'newsletter' && (
            <div className="mt-8">
              {!nlSuccess ? (
                <>
                  <form onSubmit={handleNewsletter} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-full border border-ink-700 bg-ink-900/60 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-ink-500 outline-none transition-colors focus:border-aether-500"
                      />
                    </div>
                    <button type="submit" disabled={nlLoading} className="btn-primary group whitespace-nowrap disabled:opacity-50">
                      {nlLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Get Updates
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                  {nlError && (
                    <p className="mt-3 text-sm text-red-400">{nlError}</p>
                  )}
                </>
              ) : (
                <div className="mx-auto max-w-md animate-scale-in rounded-2xl border border-gold-500/30 bg-gold-500/10 px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold-400" />
                    <p className="text-sm text-gold-200">
                      You're on the list. We'll send you updates as Techfest 2026 approaches.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Registration form */}
          {tab === 'register' && (
            <div className="mt-8">
              {!regSuccess ? (
                <form onSubmit={handleRegister} className="mx-auto grid max-w-lg gap-4 text-left sm:grid-cols-2">
                  <div className="relative sm:col-span-2">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
                    <input
                      type="text"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full rounded-full border border-ink-700 bg-ink-900/60 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-ink-500 outline-none transition-colors focus:border-aether-500"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
                    <input
                      type="email"
                      required
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      placeholder="Email"
                      className="w-full rounded-full border border-ink-700 bg-ink-900/60 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-ink-500 outline-none transition-colors focus:border-aether-500"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
                    <input
                      type="tel"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      placeholder="Phone (optional)"
                      className="w-full rounded-full border border-ink-700 bg-ink-900/60 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-ink-500 outline-none transition-colors focus:border-aether-500"
                    />
                  </div>
                  <div className="relative sm:col-span-2">
                    <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
                    <input
                      type="text"
                      value={regForm.college}
                      onChange={(e) => setRegForm({ ...regForm, college: e.target.value })}
                      placeholder="College / Institution (optional)"
                      className="w-full rounded-full border border-ink-700 bg-ink-900/60 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-ink-500 outline-none transition-colors focus:border-aether-500"
                    />
                  </div>
                  <div className="relative sm:col-span-2">
                    <Trophy className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
                    <select
                      required
                      value={regForm.event_name}
                      onChange={(e) => setRegForm({ ...regForm, event_name: e.target.value })}
                      className="w-full appearance-none rounded-full border border-ink-700 bg-ink-900/60 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-colors focus:border-aether-500 [&>option]:bg-ink-900"
                    >
                      <option value="">Select an event / competition</option>
                      {fallbackCompetitions.map((c) => (
                        <option key={c.title} value={c.title}>
                          {c.title} — {c.category}
                        </option>
                      ))}
                      <option value="Workshop">Workshop</option>
                      <option value="General Attendance">General Attendance</option>
                    </select>
                  </div>

                  {regError && (
                    <p className="text-sm text-red-400 sm:col-span-2">{regError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={regLoading}
                    className="btn-primary group col-span-full mx-auto mt-2 disabled:opacity-50"
                  >
                    {regLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Submit Registration
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="mx-auto max-w-md animate-scale-in rounded-2xl border border-gold-500/30 bg-gold-500/10 px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold-400" />
                    <p className="text-sm text-gold-200">
                      Registration received! We'll contact you with next steps.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-10 flex items-center justify-center gap-4">
            {[
              { Icon: Instagram, href: 'https://www.instagram.com/techfest_iitbombay' },
              { Icon: Twitter, href: 'https://x.com/Techfest_IITB' },
              { Icon: Facebook, href: 'https://www.facebook.com/iitbombaytechfest' },
              { Icon: Linkedin, href: 'https://in.linkedin.com/company/techfest' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-ink-300 transition-all duration-300 hover:border-aether-500 hover:bg-aether-950/40 hover:text-white hover:scale-110"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

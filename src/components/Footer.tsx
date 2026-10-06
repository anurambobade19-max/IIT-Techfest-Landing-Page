import { Zap, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Events',
    links: [
      { label: 'Competitions', href: '#competitions' },
      { label: 'Exhibitions', href: '#exhibitions' },
      { label: 'Lectures', href: '#speakers' },
      { label: 'Workshops', href: '#workshops' },
    ],
  },
  {
    title: 'Participate',
    links: [
      { label: 'Register', href: '#register' },
      { label: 'College Ambassador', href: '#register' },
      { label: 'Sponsor Us', href: '#register' },
      { label: 'Exhibit', href: '#exhibitions' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/techfest_iitbombay' },
      { label: 'Twitter / X', href: 'https://x.com/Techfest_IITB' },
      { label: 'Facebook', href: 'https://www.facebook.com/iitbombaytechfest' },
      { label: 'LinkedIn', href: 'https://in.linkedin.com/company/techfest' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-800 bg-ink-950">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-aether-600 to-aether-400">
                <Zap className="h-5 w-5 text-white" fill="white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold text-gradient-aurora">
                  Techfest
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-ink-500">
                  IIT Bombay
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Asia's largest science & technology festival. Organized by the student
              community of IIT Bombay since 1998.
            </p>
            <p className="mt-3 font-display text-sm italic text-gold-300/80">
              "An Aetherial Renaissance"
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-ink-500 font-semibold">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-ink-300 transition-colors hover:text-aether-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row">
          <p className="text-xs text-ink-500">
            © 2026 Techfest, IIT Bombay. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-ink-500">
            Made with <Heart className="h-3.5 w-3.5 text-aether-400" fill="currentColor" /> at IIT Bombay
          </p>
        </div>
      </div>
    </footer>
  );
}

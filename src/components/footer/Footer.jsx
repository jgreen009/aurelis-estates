import { handleAnchorClick } from '../../utils/scroll.js';

const columns = [
  {
    heading: 'Practice',
    links: [
      { label: 'Properties', href: '#properties' },
      { label: 'Services', href: '#services' },
      { label: 'Expertise', href: '#expertise' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
  {
    heading: 'Engage',
    links: [
      { label: 'Enquire', href: '#contact' },
      { label: 'Schedule viewing', href: '#contact' },
      { label: 'Property map', href: '#map' },
      { label: 'Mortgage calculator', href: '#calculator' },
    ],
  },
];

const contact = {
  heading: 'Studios',
  lines: ['New York · London · Gstaad', 'By appointment only'],
};

export default function Footer() {
  return (
    <footer
      className="bg-charcoal text-ivory/80 py-16 lg:py-20"
      aria-label="Site footer"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <a
            href="#home"
            onClick={handleAnchorClick}
            className="inline-flex items-center gap-2.5 font-serif text-2xl tracking-editorial text-ivory"
            aria-label="AURELIS ESTATES — home"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              className="text-gold shrink-0"
              aria-hidden="true"
            >
              <path
                d="M16 2L4 11v18a1 1 0 0 0 1 1h7V19h8v11h7a1 1 0 0 0 1-1V11L16 2z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M16 2v9M10 19v11M22 19v11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="whitespace-nowrap">
              AURELIS<span className="text-gold" aria-hidden="true"> · </span>ESTATES
            </span>
          </a>
          <p className="mt-3 text-sm text-ivory/60 max-w-sm">
            Exceptional Properties. Elevated Living.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="text-[11px] uppercase tracking-label text-ivory/50 mb-4">{col.heading}</h2>
            <ul className="space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={`${col.heading}-${link.label}`}>
                  <a
                    href={link.href}
                    onClick={handleAnchorClick}
                    className="text-ivory/80 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-[11px] uppercase tracking-label text-ivory/50 mb-4">{contact.heading}</h2>
          <address className="not-italic text-sm text-ivory/80 space-y-1">
            {contact.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </div>
      </div>

      <div className="container-editorial mt-12 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ivory/50">
        <p>© {new Date().getFullYear()} AURELIS ESTATES. All rights reserved.</p>
        <p>Private property advisory. By appointment only.</p>
      </div>
    </footer>
  );
}

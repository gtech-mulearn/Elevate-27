import { THEMES, EVENT } from '@/lib/event';

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold" aria-hidden>
      <path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0z" fill="currentColor" />
    </svg>
  );
}

export default function Marquee() {
  const items = [...THEMES.map((t) => t.title), 'Technopark, Trivandrum', `ELEVATE’${EVENT.year}`];
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="display text-3xl font-light italic text-paper sm:text-4xl">{t}</span>
          <Star />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden bg-forest py-7">
      <div className="kasavu absolute inset-x-0 top-0 opacity-70" />
      <div className="marquee-track flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

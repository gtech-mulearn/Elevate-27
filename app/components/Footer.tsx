import { EVENT, NAV, formatEventDate } from '@/lib/event';
import { RegisterButton } from './ui';

export default function Footer() {
  const date = formatEventDate(EVENT.startsAt);

  return (
    <footer className="relative overflow-hidden bg-forest text-paper">
      <div className="kasavu absolute inset-x-0 top-0 opacity-80" />

      <div className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05]">
              See you at Technopark, <em className="italic text-gold">people leaders.</em>
            </p>
            <div className="mt-10">
              <RegisterButton variant="gold" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="eyebrow text-[0.65rem] text-gold-soft">Explore</p>
              <ul className="mt-5 space-y-2.5 text-paper/75">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="link-draw hover:text-paper">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-[0.65rem] text-gold-soft">When</p>
              <p className="mt-5 text-paper/75">{date ? `${date.weekday}, ${date.full}` : 'Date announcing soon'}</p>
              <p className="eyebrow mt-8 text-[0.65rem] text-gold-soft">Where</p>
              <p className="mt-5 text-paper/75">
                {EVENT.venue.hall}, {EVENT.venue.building}
                <br />
                {EVENT.venue.area}, Thiruvananthapuram
              </p>
            </div>
            <div>
              <p className="eyebrow text-[0.65rem] text-gold-soft">Organised by</p>
              <a
                href={EVENT.organiser.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hr.png" alt="" className="h-10 w-auto" />
                <span className="link-draw text-paper/75 hover:text-paper">HR Evolve</span>
              </a>
            </div>
          </div>
        </div>

        <p
          className="display mt-24 select-none whitespace-nowrap text-center text-[16.5vw] font-semibold leading-[0.8] text-outline text-paper/25 xl:text-[15rem]"
          aria-hidden
        >
          ELEVATE<span className="italic">’{EVENT.year}</span>
        </p>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-paper/10 py-8 text-sm text-paper/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {EVENT.organiser.name}. All rights reserved.
          </p>
          <p>
            {EVENT.edition} · <span className="font-malayalam">{EVENT.editionLocal}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

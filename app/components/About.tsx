import { EVENT } from '@/lib/event';
import { DotsBackdrop } from './Backdrop';
import { Reveal, SectionHeading } from './ui';

const stats = [
  { value: '3rd', unit: 'Thursday', label: 'Monthly community meet-ups at Park Centre, Technopark' },
  { value: '200+', unit: 'leaders', label: 'HR professionals and industry leaders in the room' },
  { value: '1', unit: 'day', label: 'Of keynotes, power talks, panels and conversations' },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <DotsBackdrop side="right" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <SectionHeading
            index="01"
            eyebrow="About"
            title="A community of people leaders,"
            accent="raising the bar."
            className="lg:col-span-7"
          />

          <Reveal delay={0.1} className="flex flex-col justify-end gap-6 text-lg leading-relaxed text-ink-soft lg:col-span-5">
            <p>
              <a href={EVENT.organiser.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline decoration-gold decoration-2 underline-offset-4">
                HR Evolve
              </a>{' '}
              is a voluntary community for HR professionals and enthusiasts at Technopark, dedicated to reshaping the
              future of human resources. Every third Thursday we meet in person at Park Centre for expert-led sessions
              that tackle the challenges and opportunities of the profession.
            </p>
            <p>
              ELEVATE is the community’s flagship conclave. For one day, that conversation opens up to the wider
              industry, and everyone leaves with frameworks they can use the very next morning.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid border-t border-ink/15 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal
              key={s.value}
              delay={i * 0.1}
              className={`py-8 sm:px-8 sm:first:pl-0 ${i ? 'border-t border-ink/15 sm:border-t-0 sm:border-l' : ''}`}
            >
              <div className="flex items-baseline gap-3">
                <span className="display text-7xl font-light text-ink">{s.value}</span>
                <span className="display text-2xl italic text-laterite">{s.unit}</span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

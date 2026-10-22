'use client';

import { useEffect, useState } from 'react';
import { EVENT } from '@/lib/event';
import { PAST_SPEAKERS, fetchSpeakers, imageCandidates, type Speaker } from '@/lib/sheets';
import { SpotlightBackdrop } from './Backdrop';
import { Arrow, Reveal, SectionHeading } from './ui';

function Portrait({ speaker }: { speaker: Speaker }) {
  // Cards are ≤320px wide; 640px JPEG is sharp on 2× screens at ~5% of the original's size.
  const [urls] = useState(() => imageCandidates(speaker.image, { width: 640, format: 'jpg' }));
  const [idx, setIdx] = useState(0);
  const initials = speaker.name
    .replace(/^(Dr\.?|Col\.?|Adv\.?)\s*/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  if (idx >= urls.length) {
    return (
      <div className="display grid h-full w-full place-items-center bg-forest-2 text-5xl italic text-gold-soft">
        {initials}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={urls[idx]}
      referrerPolicy="no-referrer" // Google Drive refuses image requests that carry a site referrer
      alt={speaker.name}
      loading="lazy"
      decoding="async"
      onError={() => setIdx((i) => i + 1)}
      className="h-full w-full object-cover object-top grayscale transition-all duration-700 ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
    />
  );
}

function SpeakerCard({ speaker, index, compact }: { speaker: Speaker; index: number; compact?: boolean }) {
  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-paper-2">
        <Portrait speaker={speaker} />
        <span className="eyebrow absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[0.6rem] text-ink">
          {String(index + 1).padStart(2, '0')}
        </span>
        {speaker.linkedin && (
          <span className="absolute right-3 top-3 grid h-9 w-9 -rotate-45 place-items-center rounded-full bg-laterite text-paper opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100">
            <Arrow />
          </span>
        )}
      </div>
      <h3 className={`display mt-4 font-normal leading-tight ${compact ? 'text-lg' : 'text-2xl'}`}>{speaker.name}</h3>
      <p className={`mt-1 leading-snug text-muted ${compact ? 'text-xs' : 'text-sm'}`}>
        {speaker.title}
        {speaker.company && (
          <>
            {speaker.title && ', '}
            <span className="text-ink-soft">{speaker.company}</span>
          </>
        )}
      </p>
    </>
  );

  return speaker.linkedin ? (
    <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <div className="group">{body}</div>
  );
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[] | null | undefined>(undefined);

  useEffect(() => {
    fetchSpeakers().then(setSpeakers);
  }, []);

  const loading = speakers === undefined;
  const announced = !!speakers && speakers.length > 0;

  return (
    <section id="speakers" className="relative overflow-hidden">
      <SpotlightBackdrop />
      <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-36">
        <SectionHeading index="03" eyebrow="Speakers" title="Voices on" accent="the stage." />

        {loading && (
          <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-md bg-paper-2" />
            ))}
          </div>
        )}

        {announced && (
          <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {speakers.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 0.08}>
                <SpeakerCard speaker={s} index={i} />
              </Reveal>
            ))}
          </div>
        )}

        {!loading && !announced && (
          <>
            <Reveal className="relative mt-16 overflow-hidden rounded-2xl bg-forest px-6 py-12 text-paper sm:px-12 sm:py-16">
              <div className="kasavu absolute inset-x-0 bottom-0 opacity-60" />
              <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="eyebrow text-gold-soft">Line-up</p>
                  <p className="display mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.75rem)] font-light">
                    The ’{EVENT.year} line-up is being <em className="italic text-gold">curated.</em>
                  </p>
                  <p className="mt-5 max-w-xl text-paper/70">
                    CHROs, founders and practitioners from Kerala and beyond. Speakers are revealed here as they confirm —
                    meanwhile, here’s who took the stage at ELEVATE’25 in Trivandrum.
                  </p>
                </div>
                <a
                  href={EVENT.organiser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-3 self-start rounded-full border border-paper/25 px-6 text-sm transition-colors hover:border-gold hover:text-gold lg:self-end"
                >
                  Follow HR Evolve <Arrow />
                </a>
              </div>
            </Reveal>

            <div className="mt-16 flex items-center gap-4">
              <p className="eyebrow text-laterite">From the ELEVATE’25 stage</p>
              <span className="h-px flex-1 bg-ink/15" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {PAST_SPEAKERS.map((s, i) => (
                <Reveal key={s.name} delay={(i % 6) * 0.06}>
                  <SpeakerCard speaker={s} index={i} compact />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

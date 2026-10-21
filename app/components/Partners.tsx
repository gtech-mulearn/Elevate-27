'use client';

import { useEffect, useState } from 'react';
import { fetchPartners, imageCandidates, type Partner } from '@/lib/sheets';

function Logo({ partner }: { partner: Partner }) {
  const [urls] = useState(() => imageCandidates(partner.logo));
  const [idx, setIdx] = useState(0);
  if (idx >= urls.length) return null;
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={urls[idx]}
      referrerPolicy="no-referrer" // Google Drive refuses image requests that carry a site referrer
      alt={partner.name}
      onError={() => setIdx((i) => i + 1)}
      className="h-12 w-36 object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
    />
  );
  return partner.website ? (
    <a href={partner.website} target="_blank" rel="noopener noreferrer">
      {img}
    </a>
  ) : (
    img
  );
}

// Renders nothing until partners are configured in the sheet.
export default function Partners() {
  const [partners, setPartners] = useState<Partner[] | null>(null);

  useEffect(() => {
    fetchPartners().then(setPartners);
  }, []);

  if (!partners?.length) return null;

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-16 pr-16" aria-hidden={hidden}>
      {partners.map((p, i) => (
        <li key={`${p.name}-${i}`} className="shrink-0">
          <Logo partner={p} />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Partners" className="border-y border-ink/10 py-12">
      <p className="eyebrow mb-8 text-center text-muted">In partnership with</p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max animate-marquee">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

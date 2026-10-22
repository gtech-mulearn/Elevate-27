'use client';

import { useEffect, useState } from 'react';
import { EVENT } from '@/lib/event';

function remaining(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    mins: Math.floor(ms / 60_000) % 60,
    secs: Math.floor(ms / 1000) % 60,
  };
}

export default function Countdown({ className = '' }: { className?: string }) {
  const target = EVENT.startsAt ? new Date(EVENT.startsAt).getTime() : null;
  const [left, setLeft] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    if (!target) return;
    const tick = () => setLeft(remaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target || !left || target < Date.now()) return null;

  const units = [
    ['days', left.days],
    ['hrs', left.hours],
    ['min', left.mins],
    ['sec', left.secs],
  ] as const;

  return (
    <div className={`flex gap-5 ${className}`} aria-label="Time until ELEVATE’26">
      {units.map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="display text-3xl font-light tabular-nums sm:text-4xl">{String(value).padStart(2, '0')}</div>
          <div className="eyebrow mt-1 text-[0.6rem] text-muted">{label}</div>
        </div>
      ))}
    </div>
  );
}

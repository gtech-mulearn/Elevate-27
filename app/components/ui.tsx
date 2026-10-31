'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { EVENT } from '@/lib/event';
import { fetchSoldOut } from '@/lib/sheets';

let soldOutPromise: Promise<boolean> | null = null;

export function useSoldOut() {
  const [soldOut, setSoldOut] = useState(false);
  useEffect(() => {
    soldOutPromise ??= fetchSoldOut();
    let alive = true;
    soldOutPromise.then((v) => alive && setSoldOut(v));
    return () => {
      alive = false;
    };
  }, []);
  return soldOut;
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li';
}) {
  const Comp = as === 'li' ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  tone = 'light',
  className = '',
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <Reveal className={className}>
      <div className={`eyebrow flex items-center gap-3 ${dark ? 'text-gold-soft' : 'text-laterite'}`}>
        <span>{index}</span>
        <span className={`h-px w-10 ${dark ? 'bg-gold-soft/50' : 'bg-laterite/50'}`} />
        <span>{eyebrow}</span>
      </div>
      <h2
        className={`display mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-light ${dark ? 'text-paper' : 'text-ink'}`}
      >
        {title}
        {accent && (
          <>
            {' '}
            <em className={`font-normal italic ${dark ? 'text-gold' : 'text-laterite'}`}>{accent}</em>
          </>
        )}
      </h2>
    </Reveal>
  );
}

export function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Variant = 'ink' | 'paper' | 'gold';

const variants: Record<Variant, string> = {
  ink: 'bg-ink text-paper hover:bg-laterite',
  paper: 'bg-paper text-ink hover:bg-gold-soft',
  gold: 'bg-grad text-paper hover:opacity-90',
};

export function RegisterButton({
  variant = 'ink',
  label = 'Reserve your seat',
  size = 'lg',
  className = '',
}: {
  variant?: Variant;
  label?: string;
  size?: 'sm' | 'lg';
  className?: string;
}) {
  const soldOut = useSoldOut();
  const sizing = size === 'lg' ? 'h-14 pl-7 pr-2 text-[0.95rem] gap-5' : 'h-11 pl-5 pr-1.5 text-sm gap-3';
  const dot = size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  const base = `group inline-flex items-center justify-between rounded-full font-medium tracking-tight transition-colors duration-300 ${sizing} ${className}`;

  if (soldOut || !EVENT.registerUrl) {
    return (
      <span
        className={`${base} cursor-not-allowed border border-current/25 pr-7 opacity-70`}
        aria-disabled="true"
      >
        {soldOut ? 'Sold out' : 'Registrations opening soon'}
      </span>
    );
  }

  return (
    <a href={EVENT.registerUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]}`}>
      {label}
      <span
        className={`${dot} grid place-items-center rounded-full bg-current/10 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-rotate-45`}
      >
        <Arrow />
      </span>
    </a>
  );
}

'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { PointerEvent } from 'react';
import { EVENT, formatEventDate } from '@/lib/event';
import { RaysBackdrop } from './Backdrop';
import { RegisterButton, Reveal, SectionHeading, useSoldOut } from './ui';

// Deterministic "barcode" widths
const BARS = Array.from({ length: 34 }, (_, i) => 1 + ((i * 7 + 3) % 5 === 0 ? 3 : (i * 13) % 3));

function Notch({ className }: { className: string }) {
  return <span className={`absolute h-8 w-8 rounded-full bg-paper ${className}`} aria-hidden />;
}

export default function Tickets() {
  const soldOut = useSoldOut();
  const reduce = useReducedMotion();
  const date = formatEventDate(EVENT.startsAt);
  const earlyBird = EVENT.ticket.earlyBird.active;
  const currentPrice = earlyBird ? EVENT.ticket.earlyBird.price : EVENT.ticket.price;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="tickets" className="relative overflow-hidden">
      <RaysBackdrop />
      <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-36">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading index="05" eyebrow="Tickets" title="One pass." accent="The whole day." />
          <Reveal delay={0.1} className="max-w-sm text-ink-soft">
            Seats in Travancore Hall are limited. Earlier editions sold out, so book early if you want to be in the room.
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-16 [perspective:1400px]">
          <motion.div
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative mx-auto flex max-w-5xl flex-col drop-shadow-[0_30px_40px_rgba(13,13,15,0.22)] lg:flex-row"
          >
            {/* Main body */}
            <div className="relative flex-1 overflow-hidden rounded-t-3xl bg-forest px-6 pb-7 pt-8 text-paper sm:p-12 lg:rounded-l-3xl lg:rounded-tr-none">
              <div className="kasavu absolute inset-x-0 top-0 opacity-80" />
              <div
                className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, var(--color-gold), transparent 70%)' }}
              />
              {/* On phones the edition label sits beside the price (no wrap) to keep the ticket short */}
              <div className="relative flex items-start justify-between gap-4 sm:flex-wrap sm:gap-6">
                <div>
                  <p className="eyebrow text-gold-soft">Delegate pass</p>
                  <div className="mt-3 flex items-end gap-x-4 sm:mt-4 sm:gap-x-6">
                    <p className="display flex items-start text-[clamp(3.5rem,11vw,8rem)] font-light leading-none">
                      <span className="mr-1 mt-2 text-[0.4em] text-gold sm:mt-3">{EVENT.ticket.currency}</span>
                      {currentPrice}
                    </p>
                    {earlyBird && (
                      <div className="flex flex-col items-start gap-1.5 pb-1 sm:gap-2 sm:pb-2">
                        <span className="bg-grad eyebrow whitespace-nowrap rounded-full px-2.5 py-1 text-[0.55rem] tracking-[0.16em] text-paper sm:text-[0.6rem]">
                          <span className="hidden sm:inline">Early bird · </span>Save {EVENT.ticket.currency}
                          {EVENT.ticket.price - EVENT.ticket.earlyBird.price}
                        </span>
                        {/* the old price: big, dimmed, with a bold red strike so it reads at a glance */}
                        <span className="display text-3xl leading-none text-paper/55 line-through decoration-laterite decoration-[3px] sm:text-5xl sm:decoration-4">
                          {EVENT.ticket.currency}
                          {EVENT.ticket.price}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-paper/60 sm:mt-3">per person · full-day access</p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="display text-xl italic text-gold sm:text-2xl">ELEVATE’{EVENT.year}</p>
                  <p className="eyebrow mt-1 text-[0.55rem] text-paper/50 sm:text-[0.6rem]">{EVENT.edition}</p>
                </div>
              </div>

              <ul className="relative mt-6 grid gap-x-8 gap-y-2.5 text-[0.92rem] leading-snug sm:mt-10 sm:grid-cols-2 sm:gap-y-4 sm:text-base sm:leading-normal">
                {EVENT.ticket.includes.map((f) => (
                  <li key={f} className="flex gap-3 text-paper/85">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold sm:mt-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Perforation */}
            <div className="relative h-0 lg:h-auto lg:w-0">
              <Notch className="-left-4 -top-4 lg:-left-4 lg:-top-4" />
              <Notch className="-right-4 -top-4 lg:-bottom-4 lg:-left-4 lg:right-auto lg:top-auto" />
              <span className="absolute inset-x-6 -top-px border-t-2 border-dashed border-paper/70 lg:inset-x-auto lg:inset-y-6 lg:left-[-1px] lg:top-6 lg:border-l-2 lg:border-t-0" />
            </div>

            {/* Stub */}
            <div className="relative flex flex-col justify-between gap-8 rounded-b-3xl bg-grad p-8 text-paper sm:p-10 lg:w-80 lg:rounded-r-3xl lg:rounded-bl-none">
              <div>
                <p className="eyebrow text-paper/80">Admit one</p>
                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="eyebrow text-[0.6rem] text-paper/70">Date</dt>
                    <dd className="display mt-1 text-xl">{date ? date.full : 'Announcing soon'}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[0.6rem] text-paper/70">Venue</dt>
                    <dd className="display mt-1 text-xl leading-tight">
                      {EVENT.venue.hall}
                      <span className="block text-sm font-sans text-paper/80">
                        {EVENT.venue.building}, {EVENT.venue.area}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <div className="flex h-12 items-stretch gap-[3px]" aria-hidden>
                  {BARS.map((w, i) => (
                    <span key={i} className="bg-paper" style={{ width: w }} />
                  ))}
                </div>
                <RegisterButton variant="ink" label="Buy ticket" className="mt-6 w-full" />
                <p className="mt-3 text-xs text-paper/80">*{EVENT.ticket.note}</p>
              </div>
            </div>

            {soldOut && (
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-xl border-[5px] border-double border-laterite bg-paper/80 px-8 py-3 backdrop-blur-sm"
                style={{ transform: 'translateZ(40px)' }}
              >
                <span className="display text-5xl font-semibold tracking-widest text-laterite sm:text-7xl">SOLD OUT</span>
              </div>
            )}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

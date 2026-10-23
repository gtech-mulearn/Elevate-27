'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';

// Topographic contour lines — "elevation" drawn as a map of two hills.
// Deterministic maths so server and client render identical paths.

interface Peak {
  cx: number;
  cy: number;
  levels: number;
  r0: number;
  step: number;
  seed: number;
}

// Different terrains so each section gets its own map.
const MAPS = {
  hero: [
    { cx: 640, cy: 330, levels: 15, r0: 18, step: 26, seed: 1.3 },
    { cx: 1060, cy: 560, levels: 9, r0: 14, step: 24, seed: 4.1 },
  ],
  ridge: [{ cx: 700, cy: 450, levels: 14, r0: 20, step: 30, seed: 2.7 }],
  twin: [
    { cx: 520, cy: 380, levels: 10, r0: 16, step: 27, seed: 3.3 },
    { cx: 960, cy: 560, levels: 8, r0: 14, step: 25, seed: 5.6 },
  ],
} satisfies Record<string, Peak[]>;

export type ContourMap = keyof typeof MAPS;

function ring(p: Peak, level: number) {
  const r = p.r0 + level * p.step;
  const wobble = 0.16 - level * 0.004;
  const pts: string[] = [];
  const n = 96;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const k =
      1 +
      wobble * Math.sin(2 * t + p.seed + level * 0.21) +
      wobble * 0.6 * Math.sin(3 * t + p.seed * 2.3 - level * 0.13) +
      wobble * 0.35 * Math.sin(5 * t + p.seed * 0.7 + level * 0.3);
    const x = p.cx + Math.cos(t) * r * k * 1.25;
    const y = p.cy + Math.sin(t) * r * k * 0.85;
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join('') + 'Z';
}

const RINGS = Object.fromEntries(
  Object.entries(MAPS).map(([name, peaks]) => [
    name,
    peaks.flatMap((p, pi) =>
      Array.from({ length: p.levels }, (_, l) => ({ d: ring(p, l), key: `${pi}-${l}`, major: l % 5 === 4, l })),
    ),
  ]),
) as Record<ContourMap, { d: string; key: string; major: boolean; l: number }[]>;

export default function Contours({
  className = '',
  map = 'hero',
  tone = 'light',
  fade = false,
}: {
  className?: string;
  map?: ContourMap;
  tone?: 'light' | 'dark';
  /** Fade the edges out radially (an in-SVG mask, cheaper than CSS mask-image). */
  fade?: boolean;
}) {
  const reduce = useReducedMotion();
  const dark = tone === 'dark';
  const id = useId();
  // The map "ripples out" from its first summit. This used to draw each of ~24 long paths
  // stroke-by-stroke (pathLength), which re-rasterised the whole SVG every frame and dropped
  // to ~19 fps on phones. Now the static lines sit on one cached layer and only a radial
  // clip grows over it.
  const summit = MAPS[map][0];
  const origin = `${((summit.cx / 1400) * 100).toFixed(1)}% ${((summit.cy / 900) * 100).toFixed(1)}%`;
  return (
    <motion.svg
      viewBox="0 0 1400 900"
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      style={{ willChange: 'clip-path', transform: 'translateZ(0)' }}
      initial={reduce ? false : { clipPath: `circle(0% at ${origin})` }}
      whileInView={{ clipPath: `circle(85% at ${origin})` }}
      viewport={{ once: true }}
      transition={{ duration: 2.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {fade && (
        <defs>
          <radialGradient id={`${id}-g`}>
            <stop offset="0.45" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={`${id}-m`}>
            <rect width="1400" height="900" fill={`url(#${id}-g)`} />
          </mask>
        </defs>
      )}
      <g mask={fade ? `url(#${id}-m)` : undefined}>
        {RINGS[map].map(({ d, key, major }) => (
          <path
            key={key}
            d={d}
            stroke={major ? 'var(--color-laterite)' : dark ? 'var(--color-paper)' : 'var(--color-ink)'}
            strokeOpacity={major ? (dark ? 0.55 : 0.35) : dark ? 0.1 : 0.13}
            strokeWidth={major ? 1.2 : 0.9}
          />
        ))}
      </g>
    </motion.svg>
  );
}

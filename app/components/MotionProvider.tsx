'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Honours the visitor's "reduce motion" setting (transform animations are skipped) while the
// server and browser still render the same starting state. Branching on useReducedMotion()
// inside components made the server HTML differ from the client and caused a hydration error.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

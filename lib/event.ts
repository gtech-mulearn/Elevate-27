// ─────────────────────────────────────────────────────────────────────────────
// ELEVATE'26 — Trivandrum Edition
// Every piece of event copy lives here. Edit this file, not the components.
// Items marked CONFIRM are placeholders carried over from earlier editions.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://elevate26tvm.hrevolve.org';

export const EVENT = {
  name: 'ELEVATE',
  year: '26',
  edition: 'Trivandrum Edition',
  editionLocal: 'തിരുവനന്തപുരം',
  kind: 'HR Conclave',
  organiser: { name: 'HR Evolve', url: 'https://hrevolve.org/' },

  theme: 'Future Ready Workplaces',
  themeSub: 'Where Human Potential Meets Intelligent Technology',
  intro:
    'A one-day conclave for people leaders at Technopark. CHROs, founders, practitioners and policy makers come together to work through what HR now owns: turning technology into real productivity, keeping culture steady through change, and staying fair and human while organisations transform.',

  // ISO date-time with IST offset, e.g. '2026-11-20T09:00:00+05:30'.
  // Leave null until the date is final — the site shows "Date announcing soon"
  // and hides the countdown.
  startsAt: null as string | null,
  endsAt: null as string | null,

  // Registration link (e.g. MakeMyPass). Leave empty and every ticket button
  // reads "Registrations opening soon" instead of linking out.
  registerUrl: '',

  ticket: {
    price: 499, // CONFIRM — ₹499 for ELEVATE'25 and '26
    currency: '₹',
    note: 'Tickets are non-refundable once purchased.',
    includes: [
      'Access to every keynote, power talk & panel',
      'Lunch & refreshments through the day',
      'Networking with 200+ HR professionals & leaders',
      'Event materials & ready-to-use frameworks',
      'Certificate of participation',
      'Exclusive ELEVATE’26 goodies',
    ],
  },

  venue: {
    hall: 'Travancore Hall',
    building: 'Park Centre',
    area: 'Technopark Phase 1',
    city: 'Thiruvananthapuram, Kerala',
    mapUrl:
      'https://www.google.com/maps/place/Travancore+Hall+Technopark/@8.5580811,76.8813221,15z',
    embedQuery: 'Travancore Hall, Park Centre, Technopark, Thiruvananthapuram',
    images: [
      { src: '/hall1.avif', alt: 'Park Centre, Technopark' },
      { src: '/hall2.avif', alt: 'Inside Travancore Hall' },
    ],
  },
};

// Logos shown under the hero ("Presented by", "In association with" …).
// Left empty on purpose until the 2026 partners are confirmed. Example:
//   { role: 'Presented by', name: 'Federal Bank', logo: '/Federal_Bank.png' },
//   { role: 'Powered by', name: 'LEAD College', logo: '/Lead_logo.png' },
//   { role: 'In association with', name: 'The Times of India', logo: '/TOI_logo.jpg' },
export const PRESENTERS: { role: string; name: string; logo: string }[] = [];

// CONFIRM — themes carried over from the ELEVATE'26 Kochi edition as placeholders.
export const THEMES = [
  {
    title: 'Culture as Infrastructure',
    kicker: 'Not philosophy',
    description:
      'Culture now decides execution speed, innovation adoption and whether talent stays. It is an operating system for how work gets done, not a poster on the wall.',
    takeaways: [
      'Converting values into performance-driving behaviours',
      'Understanding trust, bias and influence in decisions',
      'Designing cultures that support speed and adaptability',
    ],
  },
  {
    title: 'The Great Reinvention of HR',
    kicker: 'From process owner to enterprise partner',
    description:
      'As automation absorbs administrative work, HR must rebuild itself around advisory capability, workforce design and business alignment.',
    takeaways: [
      'Identifying legacy practices that limit relevance',
      'Redesigning HR roles toward consulting, analytics and change',
      'Operating models aligned with enterprise outcomes',
    ],
  },
  {
    title: 'Workforce Economics',
    kicker: 'Capability design in an AI-normal world',
    description:
      'The conversation has moved from automation to productivity. How is talent deployed, reskilled and structured so it actually creates value?',
    takeaways: [
      'Linking talent strategy to financial performance',
      'Designing agile organisation structures',
      'Managing cost pressure while protecting innovation',
    ],
  },
  {
    title: 'Trust, Empathy & Governance',
    kicker: 'In a tech-accelerated workplace',
    description:
      'With algorithms shaping decisions, HR must keep transparency, fairness and human-centred leadership intact.',
    takeaways: [
      'Legal and ethical implications of digital workplaces',
      'Building employee trust in tech-enabled environments',
      'Governance that enables innovation responsibly',
    ],
  },
];

export type AgendaKind = 'break' | 'address' | 'keynote' | 'talk' | 'panel' | 'special';

export interface AgendaItem {
  time: string;
  kind: AgendaKind;
  title: string;
  topic?: string;
  people?: string[];
}

// CONFIRM — the shape of the day, modelled on earlier editions.
// Fill in topics and people as sessions are locked.
export const AGENDA: AgendaItem[] = [
  { time: '09:00', kind: 'break', title: 'Registration & morning coffee' },
  { time: '09:45', kind: 'address', title: 'Welcome address' },
  { time: '10:00', kind: 'address', title: 'Inaugural session' },
  { time: '10:45', kind: 'keynote', title: 'Keynote' },
  { time: '11:30', kind: 'talk', title: 'Power talk' },
  { time: '12:00', kind: 'panel', title: 'Panel discussion' },
  { time: '13:00', kind: 'break', title: 'Lunch & networking' },
  { time: '14:00', kind: 'talk', title: 'Power talk' },
  { time: '14:30', kind: 'special', title: 'Special session' },
  { time: '15:15', kind: 'panel', title: 'Panel discussion' },
  { time: '16:15', kind: 'address', title: 'Closing remarks' },
];
export const AGENDA_NOTE = 'Timings are indicative. Sessions and speakers will be announced here.';

export const FAQS = [
  {
    q: 'Who is ELEVATE’26 for?',
    a: 'HR leaders, CHROs, people managers, HR practitioners at every level, founders who own the people agenda, and anyone building a career in human resources.',
  },
  {
    q: 'What does the ticket include?',
    a: 'Entry to every session for the full day, lunch and refreshments, event materials, a certificate of participation and ELEVATE’26 goodies.',
  },
  {
    q: 'Can I cancel or get a refund?',
    a: 'Tickets are non-refundable once purchased.',
  },
  {
    q: 'Where exactly is the venue?',
    a: `${EVENT.venue.hall}, ${EVENT.venue.building}, ${EVENT.venue.area}, ${EVENT.venue.city}. There is a map further up this page.`,
  },
  {
    q: 'Who organises ELEVATE?',
    a: 'HR Evolve is a volunteer community of HR professionals at Technopark. We meet every third Thursday at Park Centre for expert-led sessions and open conversations.',
  },
];

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Themes', href: '#themes' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Venue', href: '#venue' },
  { label: 'FAQ', href: '#faq' },
];

// ── helpers ──────────────────────────────────────────────────────────────────

export function formatEventDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  const day = d.toLocaleDateString('en-IN', { day: 'numeric', timeZone: 'Asia/Kolkata' });
  const month = d.toLocaleDateString('en-IN', { month: 'long', timeZone: 'Asia/Kolkata' });
  const year = d.toLocaleDateString('en-IN', { year: 'numeric', timeZone: 'Asia/Kolkata' });
  const weekday = d.toLocaleDateString('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' });
  return { day, month, year, weekday, full: `${day} ${month} ${year}` };
}

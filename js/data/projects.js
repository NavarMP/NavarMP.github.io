/**
 * NAVAR MP — FEATURED PROJECTS & CASE STUDIES DATA
 */

export const projectsData = [
  {
    id: 'arivolam',
    title: 'Arivolam — Educational Management Platform',
    category: 'web',
    categoryLabel: 'Full-Stack Web App',
    featured: true,
    badge: 'Flagship Platform',
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Auth & RBAC', 'Tailwind CSS'],
    summary: 'An end-to-end educational management ecosystem with multi-tier role-based access control (Admin, Educators, Students, Parents), automated grading, and real-time student lifecycle tracking.',
    overview: 'Arivolam was architected from the ground up to eliminate operational friction in academic institutions. Combining an intuitive administrative dashboard with real-time student progress tracking, it delivers a high-speed, secure, and delightful experience for educators and learners alike.',
    challenges: [
      'Architecting fine-grained Row-Level Security (RLS) in PostgreSQL so student records remain strictly isolated between distinct classes and roles.',
      'Designing an ultra-clean UI that reduces cognitive overhead for educators inputting heavy datasets during grading seasons.',
      'Achieving sub-second database query performance under concurrent exam submission spikes.'
    ],
    solutions: [
      'Implemented Supabase Auth with custom JWT claims and declarative Postgres RLS policies.',
      'Built a reactive spreadsheet-grade data grid with instant keyboard navigation for grading workflows.',
      'Deployed server-side caching and optimistic UI updates for real-time responsiveness.'
    ],
    metrics: [
      { label: 'Role Types', value: '4 Tiers' },
      { label: 'Query Latency', value: '<45ms' },
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Architecture', value: 'Zero-Egress Cache' }
    ],
    liveUrl: 'https://navarmp.digibayt.com',
    githubUrl: 'https://github.com/NavarMP',
    accentColor: '#F0D000'
  },
  {
    id: 'attar-al-jannah',
    title: 'Attar al Jannah — Luxury E-Commerce PWA',
    category: 'web',
    categoryLabel: 'Next.js 15 PWA',
    featured: true,
    badge: 'E-Commerce PWA',
    stack: ['Next.js 15', 'Supabase', 'Razorpay API', 'GSAP Motion', 'Glassmorphism'],
    summary: 'A progressive web app for an artisanal attar brand blending spiritual Islamic-inspired glassmorphism, GSAP kinetic scroll, Razorpay checkout, and an interactive student sales gamification engine.',
    overview: 'Attar al Jannah combines high-touch sensory branding with frictionless digital commerce. The platform showcases artisanal fragrances through fluid interactive animations, rich storytelling, and an automated student distributor leaderboard that empowers campus sales campaigns.',
    challenges: [
      'Delivering high-fidelity glassmorphism with 60fps buttery scrolling across low-powered mobile devices.',
      'Integrating India’s Razorpay gateway with instant automated webhook verification and order fulfillment tracking.',
      'Developing a gamified sales contest engine with real-time leaderboard computations.'
    ],
    solutions: [
      'Utilized CSS hardware acceleration, reduced blur radii on mobile, and choreographed animations using GSAP and Lenis smooth scroll.',
      'Engineered serverless webhook handlers verifying cryptographic signatures with automatic inventory rollback on payment timeouts.',
      'Built real-time Supabase subscriptions syncing sales rankings instantly to student dashboards.'
    ],
    metrics: [
      { label: 'Framework', value: 'Next.js 15' },
      { label: 'Payment Success', value: '99.4%' },
      { label: 'Framerate', value: '60 FPS' },
      { label: 'Design System', value: 'Islamic Glass' }
    ],
    liveUrl: 'https://navarmp.digibayt.com',
    githubUrl: 'https://github.com/NavarMP',
    accentColor: '#D4AF37'
  },
  {
    id: 'personal-flagship',
    title: 'NavarMP Digital Flagship & Ecosystem',
    category: 'web',
    categoryLabel: 'Creative Portfolio',
    featured: true,
    badge: 'Award-Grade Web',
    stack: ['Modern Vanilla ES6+', 'WebGL Canvas', 'Web Audio API', 'Lenis Scroll', 'Fastly CDN'],
    summary: 'A high-velocity personal digital space highlighting the intersection of technical architecture and graphic design. Features interactive particle constellations, synthesized sound feedback, and dual-theme modes.',
    overview: 'Built specifically for zero-latency hosting on GitHub Pages, this flagship platform proves that world-class visual motion, accessibility, and micro-interactions can be achieved without bloated client-side frameworks.',
    challenges: [
      'Creating complex particle physics and 3D card tilt effects that maintain 60fps on mobile without draining battery.',
      'Generating synthetic audio haptics without requiring heavy external MP3 audio asset downloads.',
      'Achieving 100/100 across all four Google Lighthouse audit categories.'
    ],
    solutions: [
      'Engineered a lightweight native Canvas particle simulator with mouse repulsion and device gyroscope integration.',
      'Implemented native browser Web Audio API oscillator synthesis generating subtle organic clicks with 0kb payload.',
      'Optimized all assets into modern WebP with responsive srcset and zero-layout-shift (CLS=0) typography.'
    ],
    metrics: [
      { label: 'Lighthouse', value: '100/100' },
      { label: 'Bundle Size', value: '<50 KB' },
      { label: 'FCP Time', value: '<0.5s' },
      { label: 'Hosting', value: 'GitHub Pages' }
    ],
    liveUrl: 'https://NavarMP.github.io',
    githubUrl: 'https://github.com/NavarMP/NavarMP.github.io',
    accentColor: '#E8C96A'
  },
  {
    id: 'brand-design-gallery',
    title: 'Brand Systems & Poster Artistry',
    category: 'design',
    categoryLabel: 'Visual Identity',
    featured: true,
    badge: 'Behance Curated',
    stack: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Typography', 'Prepress'],
    summary: 'A curated collection of event posters, visual branding systems, social media graphics, and typographic compositions crafted for academic, commercial, and cultural institutions.',
    overview: 'With over four years of dedicated freelance practice in Kerala, Muḥammed Navār has delivered striking visual communication systems that balance modern geometric minimalism with rich, culturally resonant typography (English, Malayalam, and Arabic).',
    challenges: [
      'Harmonizing complex multilingual typographic scripts without sacrificing compositional balance or hierarchy.',
      'Meeting tight event turnaround times while maintaining strict prepress color accuracy (CMYK) and digital brand consistency.'
    ],
    solutions: [
      'Developed custom modular grid templates with golden-ratio proportions tailored for multi-script typesetting.',
      'Curated bespoke color palettes rooted in architectural tones, ensuring high contrast across both digital screens and large-format print.'
    ],
    metrics: [
      { label: 'Years Active', value: '2022—2026' },
      { label: 'Client Projects', value: '50+ Assets' },
      { label: 'Delivery Rate', value: '100% On-Time' },
      { label: 'Platform', value: 'Behance / Print' }
    ],
    liveUrl: 'https://www.behance.net/NavarMP',
    githubUrl: 'https://www.behance.net/NavarMP',
    accentColor: '#F0D000'
  }
];

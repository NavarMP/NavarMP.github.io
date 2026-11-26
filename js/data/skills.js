/**
 * NAVAR MP — SKILLS & TECHNOLOGIES DATA
 */

export const skillsData = {
  categories: [
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      icon: 'code',
      items: [
        { name: 'HTML5 & Semantic Web', level: 95, highlight: true },
        { name: 'CSS3 / SCSS / Tailwind', level: 95, highlight: true },
        { name: 'JavaScript (ES6+)', level: 85, highlight: true },
        { name: 'React.js', level: 82, highlight: true },
        { name: 'Next.js (App Router & SSR)', level: 80, highlight: true },
        { name: 'GSAP Animation & Motion', level: 85, highlight: false },
        { name: 'Responsive Web Design', level: 95, highlight: false }
      ]
    },
    {
      id: 'backend',
      title: 'Backend, Cloud & Architecture',
      icon: 'database',
      items: [
        { name: 'Supabase (PostgreSQL & Auth)', level: 82, highlight: true },
        { name: 'API Integration (REST & Webhooks)', level: 80, highlight: true },
        { name: 'Database Schema & RLS Security', level: 78, highlight: true },
        { name: 'Vercel & Cloud Deployment', level: 85, highlight: false },
        { name: 'Git & Version Control', level: 88, highlight: false },
        { name: 'Razorpay Payment Gateway', level: 75, highlight: false }
      ]
    },
    {
      id: 'design',
      title: 'Design & Visual Systems',
      icon: 'palette',
      items: [
        { name: 'Adobe Illustrator', level: 90, highlight: true },
        { name: 'Adobe Photoshop', level: 88, highlight: true },
        { name: 'Figma UI/UX & Prototyping', level: 85, highlight: true },
        { name: 'Brand Identity & Logomarks', level: 88, highlight: true },
        { name: 'Typography & Multilingual Layout', level: 90, highlight: false },
        { name: 'Poster & Editorial Design', level: 92, highlight: false }
      ]
    },
    {
      id: 'tools',
      title: 'Tools, Environments & Soft Skills',
      icon: 'terminal',
      items: [
        { name: 'Linux & Shell Environment', level: 80, highlight: false },
        { name: 'VS Code & Developer Tooling', level: 92, highlight: false },
        { name: 'English Communication', level: 85, highlight: false },
        { name: 'Malayalam (Native)', level: 100, highlight: false },
        { name: 'Arabic (Professional Reading)', level: 60, highlight: false },
        { name: 'Full-Cycle Design-to-Code Delivery', level: 95, highlight: true }
      ]
    }
  ],
  cloudPills: [
    'Next.js 15', 'React.js', 'Supabase', 'PostgreSQL', 'JavaScript ES6+',
    'Tailwind CSS', 'GSAP', 'HTML5/SCSS', 'Figma', 'Adobe Illustrator',
    'Adobe Photoshop', 'REST APIs', 'Razorpay', 'Git/GitHub', 'Vercel',
    'Linux', 'UI/UX Design', 'Branding', 'Typography', 'PWA'
  ]
};

import { Service, Project, ProcessStep, Testimonial, TechItem, StatItem } from './types';

export const servicesData: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'High-performance React & Next.js web applications engineered for speed, SEO, and scalability.',
    iconName: 'Globe',
    category: 'Engineering',
    benefits: ['Sub-second load times', 'SEO & Lighthouse optimized', 'Secure architecture'],
    features: ['Headless CMS integration', 'Interactive dashboards', 'Edge rendering']
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Applications',
    description: 'Native iOS and Android applications built with React Native and Flutter for seamless user experiences.',
    iconName: 'Smartphone',
    category: 'Engineering',
    benefits: ['Cross-platform efficiency', 'Offline-first storage', 'App Store compliance'],
    features: ['Biometric authentication', 'Push notification pipelines', 'Hardware integrations']
  },
  {
    id: 'ai-automation',
    title: 'AI Workflows',
    description: 'Custom AI agent integrations to automate repetitive processes, data entry, and reports.',
    iconName: 'Cpu',
    category: 'Intelligence',
    benefits: ['Reduce operating overhead', '24/7 automated execution', 'Error rate reduction'],
    features: ['RAG vector databases', 'Custom agent orchestration', 'LLM pipeline training']
  },
  {
    id: 'ai-voice',
    title: 'AI Voice Agents',
    description: 'Natural, low-latency conversational voice assistants for customer support and bookings.',
    iconName: 'Mic',
    category: 'Intelligence',
    benefits: ['Zero waiting queues', 'Low-latency voice routing', 'CRM auto-updates'],
    features: ['Real-time text-to-speech', 'Speech transcription API', 'Flow state control']
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Tailored enterprise software assets engineered to solve complex operational bottlenecks.',
    iconName: 'Code',
    category: 'Engineering',
    benefits: ['Full IP source ownership', 'No per-seat license fees', 'Legacy system integration'],
    features: ['Microservice architectures', 'Custom ERP workflows', 'High-throughput APIs']
  },
  {
    id: 'saas-platforms',
    title: 'SaaS Development',
    description: 'Multi-tenant platforms with subscription billing, security, and administration panels.',
    iconName: 'Layers',
    category: 'Engineering',
    benefits: ['Accelerated time-to-market', 'Stripe subscription sync', 'Scalable container setup'],
    features: ['Multi-tenant isolation', 'Tiered permission control', 'Telemetry tracking dashboards']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Minimalist visual design, responsive components, and interactive design prototypes.',
    iconName: 'Palette',
    category: 'Design',
    benefits: ['Conversion rate optimization', 'Consistent design system', 'Developer-ready design specs'],
    features: ['Matte typography style', 'Figma interactive prototypes', 'Design tokens library']
  },
  {
    id: 'backend-systems',
    title: 'Backend Systems',
    description: 'Robust API structures, secure database clustering, and high-availability server setups.',
    iconName: 'Server',
    category: 'Engineering',
    benefits: ['High traffic capacity', '99.99% system uptime', 'Data migration paths'],
    features: ['REST & GraphQL endpoints', 'Redis caching layers', 'Scalable cloud database']
  }
];

export const projectsData: Project[] = [
  {
    id: 'big-broker',
    title: 'BigBroker - Smart Realty Index',
    category: 'web',
    filterCategories: ['website'],
    techStack: ['React', 'Node.js', 'Express', 'Vercel Edge', 'Tailwind CSS', 'MongoDB'],
    problemSolved: 'Fragmented real estate listings, slow map search engines, and low user inquiry rates.',
    features: [
      'Micro-cached listings database.',
      'Edge-optimized API search response.',
      'Minimal responsive layouts.'
    ],
    results: [
      'Page load times reduced to 350ms.',
      'Client inquiry rates increased by 42%.',
      'High-availability serverless deployment.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: 'https://bigbroker-iota.vercel.app/',
    featured: true
  },
  {
    id: 'meena-properties',
    title: 'Meena Properties Showroom',
    category: 'web',
    filterCategories: ['website'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub Pages', 'Lucide Icons'],
    problemSolved: 'Lack of visual property showroom to demonstrate land parcels and units to premium clients.',
    features: [
      'Filterable list grid layouts.',
      'Optimized tactile asset rendering.',
      'Sub-second page routing loops.'
    ],
    results: [
      'Zero-cost serverless hosting pipeline.',
      'Client session engagement up 68%.',
      'Perfect Lighthouse performance scores.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: 'https://rohankkw.github.io/meena-properties',
    featured: true
  },
  {
    id: 'food-delivery',
    title: 'SavorSwift - Routing Pipeline',
    category: 'mobile',
    filterCategories: ['application', 'software'],
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'AWS'],
    problemSolved: 'High dispatch latencies and lagging courier coordinates for restaurant deliveries.',
    features: [
      'Sub-600ms driver assignment routing.',
      'WebSocket real-time coordinate streaming.',
      'Geofenced pickup boundaries.'
    ],
    results: [
      'Dispatch latency reduced by 84%.',
      'Average delivery transit reduced by 18m.',
      'Courier pickup errors dropped by 94%.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: '#',
    featured: true
  },
  {
    id: 'recipe-platform',
    title: 'ChefMind AI - Neural Engine',
    category: 'ai',
    filterCategories: ['application', 'ai'],
    techStack: ['Next.js', 'Gemini APIs', 'Pinecone Vector DB', 'Tailwind CSS', 'TypeScript', 'Node.js'],
    problemSolved: 'Pantry inventory tracking failures leading to high food waste and generic recommendations.',
    features: [
      'Vision classification for pantry items.',
      'Gemini semantic recipe retrieval search.',
      'Nutritional adaptation based on profile.'
    ],
    results: [
      'Household food waste reduced by 41%.',
      'Zero system latency on search generations.',
      'Client net satisfaction scores up.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: '#',
    featured: true
  },
  {
    id: 'gym-management',
    title: 'FlexCore - Fitness CRM SaaS',
    category: 'saas',
    filterCategories: ['application', 'software'],
    techStack: ['Next.js', 'PostgreSQL', 'TypeScript', 'Stripe Connect', 'Docker', 'Firebase Auth'],
    problemSolved: 'High administrative overhead from managing multiple disjointed scheduling and billing tools.',
    features: [
      'Unified bookings and payroll interface.',
      'Automated Stripe subscription invoicing.',
      'QR code member validation entry.'
    ],
    results: [
      'Saved fit-clubs average $2,300/month.',
      'Subscription churn reduced to 1.4%.',
      'Class attendance bookings rose 37%.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: '#',
    featured: false
  },
  {
    id: 'voice-support',
    title: 'AuraCall AI - Voice Processor',
    category: 'ai',
    filterCategories: ['software', 'ai'],
    techStack: ['Python', 'Gemini Live API', 'Deepgram TTS', 'WebSockets', 'FastAPI', 'Salesforce CRM'],
    problemSolved: 'Support hotlines overloaded during launch cycles, leading to long hold queues.',
    features: [
      'Full-duplex low-latency voice pipeline.',
      'Dynamic support KB document search.',
      'Autonomous CRM ticket updates.'
    ],
    results: [
      'Inbound volume handled without agents: 72%.',
      'Average user waiting queues dropped to 0.',
      'Post-call CRM summary write under 3s.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: '#',
    featured: true
  },
  {
    id: 'ecommerce-platform',
    title: 'VeloCart - Headless Commerce',
    category: 'saas',
    filterCategories: ['software'],
    techStack: ['React', 'Next.js', 'Express', 'MongoDB', 'Cloudflare Workers', 'Tailwind CSS'],
    problemSolved: 'Slow product page load times and shopping cart abandonment during spikes.',
    features: [
      'Stateless edge-rendered catalog cache.',
      'Sub-150ms product criteria filters.',
      'One-click payment processor sync.'
    ],
    results: [
      'Product load speed dropped to 1.1s.',
      'Cart checkout conversions rose 28%.',
      'Zero outages during high traffic volumes.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: '#',
    featured: false
  },
  {
    id: 'crm-dashboard',
    title: 'ApexPulse - Growth CRM',
    category: 'saas',
    filterCategories: ['application', 'software'],
    techStack: ['Next.js', 'Typescript', 'D3.js', 'PostgreSQL', 'Tailwind CSS', 'Auth0'],
    problemSolved: 'Low clarity on team pipelines and high time loss on manual client followups.',
    features: [
      'Interactive D3 pipeline visualizers.',
      'Automated custom trigger notifications.',
      'Real-time deal velocity forecasts.'
    ],
    results: [
      'Manual admin tasks reduced by 12h/week.',
      'Deal closing rates increased by 19%.',
      'Transparent analytics for leadership boards.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: '#',
    featured: true
  },
  {
    id: 'inventory-system',
    title: 'OptimaFlow - AI Controller',
    category: 'saas',
    filterCategories: ['software', 'ai'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS IoT Core', 'Gemini APIs', 'Docker'],
    problemSolved: 'Overstocking dead inventory and running out of fast-moving products.',
    features: [
      'Predictive inventory usage model.',
      'IoT weight and location tracking.',
      'Automated supplier restock orders.'
    ],
    results: [
      'Inventory holding fees reduced by 26%.',
      'Stockouts on top SKUs reduced to 0.',
      'Purchase order creation fully automated.'
    ],
    imageMockupColor: 'from-zinc-800 via-zinc-900 to-transparent',
    githubUrl: '#',
    demoUrl: '#',
    featured: false
  }
];

export const processSteps: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Discovery & Spec',
    description: 'We run technical sessions to define user flows, database structures, and API architecture specifications.',
    duration: 'Week 1',
    deliverables: ['Architecture Specification Document', 'Database schema designs', 'Scope and budget proposal'],
    iconName: 'Search'
  },
  {
    stepNumber: 2,
    title: 'UI/UX Prototypes',
    description: 'We construct high-fidelity Figma interactive wireframes and configure the design token library.',
    duration: 'Weeks 2-3',
    deliverables: ['Figma interactive mockups', 'Typography and color tokens', 'Detailed user maps'],
    iconName: 'Palette'
  },
  {
    stepNumber: 3,
    title: 'Modular Engineering',
    description: 'We develop secure, tested codebases using TypeScript and isolate modules to prevent downstream failures.',
    duration: 'Weeks 4-10',
    deliverables: ['Tested modular codebase', 'CI/CD pipeline configuration', 'Unit test coverage reports'],
    iconName: 'Code'
  },
  {
    stepNumber: 4,
    title: 'Rigorous QA Testing',
    description: 'We run load tests, API security checks, cross-browser layouts, and verify system integration paths.',
    duration: 'Week 11',
    deliverables: ['Lighthouse audit reports', 'QA test results', 'Security vulnerability review'],
    iconName: 'CheckCircle'
  },
  {
    stepNumber: 5,
    title: 'Global Deployment',
    description: 'We orchestrate secure serverless releases on AWS or Google Cloud platforms integrated with CDNs.',
    duration: 'Week 12',
    deliverables: ['Production deployment setup', 'Global CDN edge caches', 'Database replication config'],
    iconName: 'Rocket'
  },
  {
    stepNumber: 6,
    title: 'Active Operations',
    description: 'We monitor telemetry metrics, patch dependencies, tune indexes, and manage database scaling rules.',
    duration: 'Ongoing',
    deliverables: ['24/7 monitoring and alerts', 'Dependency security updates', 'Database performance audits'],
    iconName: 'ShieldAlert'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Chief Technology Officer',
    company: 'SavorSwift Delivery Group',
    avatarUrl: 'SJ',
    rating: 5,
    review: 'WrotX rebuilt our entire courier routing engine in under three months. Their engineering discipline was incredible – they delivered clean, fully tested React Native and WebSocket code that instantly slashed dispatch lag. The transition was smooth, and our delivery speeds have skyrocketed.',
    metricsAchieved: 'Slashed Dispatch Latency by 84%'
  },
  {
    id: 't2',
    name: 'Marcus Vance',
    role: 'VP of Product',
    company: 'ChefMind Culinary Systems',
    avatarUrl: 'MV',
    rating: 5,
    review: 'Most agencies hand you a gorgeous skin on top of a fragile backend. WrotX is built different. They crafted a complex AI recommendation engine using Gemini APIs and Pinecone vector databases that operates at an outstanding low latency. Our users are consistently amazed by how smart recommended meals are.',
    metricsAchieved: 'Reduced Household Food Waste by 41%'
  },
  {
    id: 't3',
    name: 'Rebecca Thorne',
    role: 'Founder & CEO',
    company: 'FlexCore Fitness SaaS',
    avatarUrl: 'RT',
    rating: 5,
    review: 'As a non-technical founder, finding an agency you can trust is extremely rare. WrotX acted not just as a developer, but as a strategic technology partner. They designed, developed, and deployed our entire SaaS membership framework with beautiful Stripe recurring billing in record time.',
    metricsAchieved: 'Saved $2,300/month in Vendor Overlaps'
  },
  {
    id: 't4',
    name: 'Kenneth Choi',
    role: 'Director of Customer Experience',
    company: 'AuraCall Communications',
    avatarUrl: 'KC',
    rating: 5,
    review: 'The AI voice customer support agents WrotX engineered for us feel like science fiction. They speak seamlessly with virtually zero lag, handle complex billing queries directly inside our SalesForce APIs, and automatically update client files. Our wait queue is officially dead.',
    metricsAchieved: 'Handled 72% Support Volume Autonomously'
  }
];

export const techStackData: TechItem[] = [
  { name: 'React', category: 'frontend', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'Next.js', category: 'frontend', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'Node.js', category: 'backend', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'Express', category: 'backend', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'MongoDB', category: 'database', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'PostgreSQL', category: 'database', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'Firebase', category: 'cloud', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'Docker', category: 'cloud', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'AWS', category: 'cloud', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'Tailwind CSS', category: 'frontend', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'TypeScript', category: 'frontend', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'OpenAI APIs', category: 'ai', glowColor: 'rgba(255, 255, 255, 0.1)' },
  { name: 'Gemini APIs', category: 'ai', glowColor: 'rgba(255, 255, 255, 0.1)' }
];

export const statsData: StatItem[] = [
  { label: 'Completed projects', value: 140, suffix: '+', iconName: 'CheckCircle' },
  { label: 'Global active clients', value: 95, suffix: '+', iconName: 'Users' },
  { label: 'Core technologies used', value: 18, suffix: '+', iconName: 'Code' },
  { label: 'AI pipelines delivered', value: 45, suffix: '+', iconName: 'Cpu' }
];

export const companyDetails = {
  name: 'WrotX',
  mission: 'We engineer custom-tailored digital products and automation pipelines with strict architecture standards, low latency, and modular codebases.',
  vision: 'To build high-performance digital platforms that scale with minimum complexity and automate operational tasks.',
  experience: 'Over a decade of full-stack experience designing databases, APIs, and cloud microservices for startups and enterprise systems.',
  mindset: 'An AI-first engineering ethos, configuring database structures and pipelines with intelligent automation in mind.'
};

import { SITE_CONFIG } from '../config/site';
import type { FaqItem } from './faqsData';

export interface ServicePageData {
  slug: string;
  badge: string;
  badgeBgClass: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  priceFrom: string;
  priceAmount: number | null;
  timeline: string;
  introParagraphs: string[];
  whoItIsForTitle: string;
  whoItIsFor: { title: string; detail: string }[];
  whatYouGetTitle: string;
  whatYouGet: string[];
  processTitle: string;
  processSteps: { step: string; title: string; detail: string }[];
  faqs: FaqItem[];
  relatedLinks: { label: string; to: string; description: string }[];
}

const { prices, support, brandName } = SITE_CONFIG;

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  '/website-development-mumbai': {
    slug: '/website-development-mumbai',
    badge: 'WEBSITE DEVELOPMENT',
    badgeBgClass: 'bg-[#00f0ff] text-[#003840]',
    title: 'Website Development Mumbai',
    metaTitle: `Website Development Mumbai (${prices.websites.fromLabel}) | ${brandName}`,
    metaDescription: `Business website design in Mumbai from ${prices.websites.formatted}, delivered in ${prices.websites.timeline}. Mobile-fast, Google SEO ready, ${support.days}-day support.`,
    h1: 'Website Development in Mumbai That Brings Direct Enquiries',
    lead: `Fast, mobile-first business websites starting from ${prices.websites.formatted} — delivered in ${prices.websites.timeline} with ${support.label} and zero recurring platform lock-in.`,
    priceFrom: prices.websites.fromLabel,
    priceAmount: prices.websites.amount,
    timeline: prices.websites.timelineLabel,
    introParagraphs: [
      `When a customer in Mumbai hears about your business, the first thing they do is check Google or tap your link on WhatsApp. If your website takes five seconds to open on a 4G connection, shows broken alignment on a budget Android phone, or hides your phone number inside a tiny menu, that buyer closes the tab and calls your competitor instead.`,
      `At ${brandName}, we build custom business websites engineered specifically for how Indian customers browse and buy. Instead of bloating your site with heavy WordPress themes and twenty third-party plugins that break after every update, we write clean, lightweight code. Your pages load fast, your WhatsApp and direct call buttons stay easy to tap, and Google can index every service you offer without struggling through heavy JavaScript.`,
      `You also keep complete control. Once we launch your site, we hand over the full source code, hosting access, and domain credentials. There are no monthly agency retainers just to change a headline, update a product price, or swap a photo. Plus, every build comes with official GST invoicing and ${support.label} while your team settles in.`,
    ],
    whoItIsForTitle: 'Who this website service is built for',
    whoItIsFor: [
      {
        title: 'Local service businesses & clinics across Mumbai',
        detail: 'Doctors, CA firms, salons, gyms, and repair studios that need Google visibility, clear service menus, and instant WhatsApp booking.',
      },
      {
        title: 'Manufacturers, wholesalers & B2B traders',
        detail: 'Businesses in MIDC, Andheri, Bhiwandi, and Navi Mumbai showcasing product catalogues, ISO certificates, and bulk enquiry forms.',
      },
      {
        title: 'Real estate brokers & builders',
        detail: 'Developers and advisory teams needing project microsites, floor-plan galleries, EMI tools, and direct site-visit scheduling.',
      },
      {
        title: 'Companies replacing slow template sites',
        detail: 'Owners tired of sluggish WordPress or Wix sites that fail mobile speed checks and leak paid ad clicks.',
      },
    ],
    whatYouGetTitle: 'What you get with every business website',
    whatYouGet: [
      'Mobile-first design tested across Indian Android and iOS screen sizes',
      'Direct WhatsApp chat button, click-to-call bar, and reliable email enquiry form',
      'Clean semantic HTML, proper headings, canonical URLs, and schema markup for Google',
      'Zero monthly plugin fees — you own 100% of the code, design, and domain',
      'Easy content updates and staff walkthrough training upon handover',
      `Razorpay, UPI payment links, or Google Maps integration when required`,
      `Official GST tax invoice and ${support.label}`,
    ],
    processTitle: 'How we take your website live',
    processSteps: [
      {
        step: '01',
        title: 'Scope & Fixed Quote',
        detail: 'We review your business goals, target Mumbai or pan-India customers, and give a clear price and timeline upfront.',
      },
      {
        step: '02',
        title: 'Phone-First Preview',
        detail: 'Within the first few days, you preview a working draft directly on your phone so layout and copy feel natural.',
      },
      {
        step: '03',
        title: 'Build, SEO & Speed Check',
        detail: 'We wire contact forms, WhatsApp routing, metadata, and structured data, then verify mobile responsiveness.',
      },
      {
        step: '04',
        title: 'Launch & Handover',
        detail: `Your site goes live on your domain in ${prices.websites.timeline} with full code ownership and ${support.days} days of free support.`,
      },
    ],
    faqs: [
      {
        question: 'How much does business website design in Mumbai cost?',
        answer: `Business websites at ${brandName} start from ${prices.websites.formatted}. Final cost depends on the number of pages and custom integrations such as payment gateways or property calculators, all quoted upfront before work starts.`,
      },
      {
        question: 'How long does it take to launch a website?',
        answer: `Standard business websites launch in ${prices.websites.timeline} once your basic business details and photos are shared.`,
      },
      {
        question: 'Will I have to pay monthly fees to keep the website running?',
        answer: 'No recurring agency fees. You pay only for your own domain registration and cloud hosting provider directly, and you own the complete source code.',
      },
      {
        question: 'Can you connect my website to WhatsApp and Google Search Console?',
        answer: 'Yes. Every website includes pre-filled WhatsApp enquiry buttons, click-to-call triggers, an XML sitemap, and Search Console-ready technical metadata.',
      },
    ],
    relatedLinks: [
      {
        label: 'Real Estate Website Development Mumbai',
        to: '/real-estate-websites',
        description: 'Property portals, floor plans, EMI tools, and builder microsites.',
      },
      {
        label: 'WhatsApp Automation for Business',
        to: '/whatsapp-automation',
        description: 'Reply to website leads on WhatsApp automatically 24/7.',
      },
      {
        label: 'Transparent Pricing',
        to: '/pricing',
        description: 'Compare website, software, and AI agent plans side by side.',
      },
      {
        label: 'Custom Software Development',
        to: '/custom-software-development',
        description: 'Upgrade from a website to full CRM, billing, and operations portals.',
      },
    ],
  },

  '/ai-agent-development': {
    slug: '/ai-agent-development',
    badge: 'AI AGENT DEVELOPMENT',
    badgeBgClass: 'bg-[#ff6b00] text-white',
    title: 'AI Agent Development India',
    metaTitle: `AI Agent Development India (${prices.aiAssistants.fromLabel}) | ${brandName}`,
    metaDescription: `Custom AI assistants for Indian businesses from ${prices.aiAssistants.formatted}. Qualify leads, book appointments, and sync CRM in ${prices.aiAssistants.timeline}.`,
    h1: 'AI Agent Development in India That Works Around the Clock',
    lead: `Custom AI assistants starting from ${prices.aiAssistants.formatted} — built in ${prices.aiAssistants.timeline} to qualify leads, answer product questions, and book appointments in English and Hindi.`,
    priceFrom: prices.aiAssistants.fromLabel,
    priceAmount: prices.aiAssistants.amount,
    timeline: prices.aiAssistants.timelineLabel,
    introParagraphs: [
      `Most Indian businesses do not lose customers because their service is weak — they lose them because nobody replies when a prospect messages at 9:30 PM or calls during lunch hour. Hiring round-the-clock support staff is expensive, and off-the-shelf generic chatbots frustrate buyers with rigid menu trees that cannot answer simple pricing or availability questions.`,
      `${brandName} builds practical AI agents trained on your exact business rules, service catalogue, and tone of voice. Whether a customer asks a question on your website chat widget, messages on WhatsApp, or fills out a form after office hours, your AI assistant responds within seconds, collects their requirements, checks your calendar or business hours, and forwards a clean summary straight to your team.`,
      `Instead of locking you into high per-seat SaaS markups, we connect your agent cleanly to your own business accounts, WhatsApp Business API, CRM, or Google Sheets. You stay in complete control of conversation logs, prompts, and escalation rules, backed by ${support.label}.`,
    ],
    whoItIsForTitle: 'Who benefits most from custom AI assistants',
    whoItIsFor: [
      {
        title: 'Clinics, diagnostic centres & wellness studios',
        detail: 'Answer timing, test preparation, and fee questions automatically and schedule patient slots without front-desk bottlenecks.',
      },
      {
        title: 'Real estate developers & channel partners',
        detail: 'Share project brochures, budget ranges, and site-visit availability immediately when an ad lead comes in.',
      },
      {
        title: 'Coaching institutes & education counsellors',
        detail: 'Handle batch timings, syllabus queries, and admission counselling follow-ups across hundreds of student enquiries.',
      },
      {
        title: 'D2C & B2B operations teams',
        detail: 'Automate order status checks, GST invoice requests, and internal SOP lookups for sales and support staff.',
      },
    ],
    whatYouGetTitle: 'What is included in your AI agent setup',
    whatYouGet: [
      'Custom knowledge base trained on your brochures, pricing, and FAQs',
      'English, Hindi, and Hinglish conversational comprehension',
      'Clean human handoff whenever a buyer asks for a custom negotiation or callback',
      'Lead capture straight into WhatsApp, email, Google Sheets, or your CRM',
      'Full transcript dashboard so your team can review every conversation',
      'Guardrails so the assistant never invents prices or makes unauthorized promises',
      `Full ownership of prompts and workflows plus ${support.label}`,
    ],
    processTitle: 'How we build and deploy your AI agent',
    processSteps: [
      {
        step: '01',
        title: 'Workflow Mapping',
        detail: 'We study your actual customer chats and common objections to define exactly what the agent should answer and escalate.',
      },
      {
        step: '02',
        title: 'Knowledge & Guardrails',
        detail: 'We structure your verified prices, timelines, and booking rules with strict fallback prompts when questions go out of scope.',
      },
      {
        step: '03',
        title: 'Channel Integration',
        detail: 'We connect the assistant to your website, WhatsApp Business API, calendar, or CRM and test edge cases with your team.',
      },
      {
        step: '04',
        title: 'Go-Live & Tuning',
        detail: `Delivered in ${prices.aiAssistants.timeline} with staff training and ${support.days} days of post-launch tuning.`,
      },
    ],
    faqs: [
      {
        question: 'How much does AI agent development cost in India?',
        answer: `AI assistants and WhatsApp conversational bots start from ${prices.aiAssistants.formatted}. Voice-enabled AI calling agents start from ${prices.aiCalling.formatted}. Multi-system enterprise automations are quoted based on integrations.`,
      },
      {
        question: 'How long does it take to build and test an AI assistant?',
        answer: `Most AI assistant deployments are completed and tested in ${prices.aiAssistants.timeline}.`,
      },
      {
        question: 'Can the AI agent pass complicated enquiries to my sales team?',
        answer: 'Yes. Whenever a customer asks to speak with a human, requests custom terms, or triggers a priority lead rule, the assistant immediately notifies your team with the full chat summary.',
      },
      {
        question: 'What happens if the AI does not know an answer?',
        answer: 'We configure strict guardrails so the assistant never guesses prices or policies. Instead, it politely collects the customer’s phone number and flags your team to reply.',
      },
    ],
    relatedLinks: [
      {
        label: 'WhatsApp Automation India',
        to: '/whatsapp-automation',
        description: 'Official WhatsApp Business API bots, follow-ups, and lead routing.',
      },
      {
        label: 'AI Calling Agents India',
        to: '/ai-calling-agents',
        description: '24/7 Hindi and English voice assistants for inbound and outbound calls.',
      },
      {
        label: 'Website Development Mumbai',
        to: '/website-development-mumbai',
        description: 'Pair your AI assistant with a fast, conversion-ready website.',
      },
      {
        label: 'Pricing & Timelines',
        to: '/pricing',
        description: 'See exact starting prices and delivery schedules.',
      },
    ],
  },

  '/whatsapp-automation': {
    slug: '/whatsapp-automation',
    badge: 'WHATSAPP AUTOMATION',
    badgeBgClass: 'bg-[#00fe66] text-[#00280b]',
    title: 'WhatsApp Automation India',
    metaTitle: `WhatsApp Automation India (${prices.aiAssistants.fromLabel}) | ${brandName}`,
    metaDescription: `WhatsApp chatbot & business automation in India from ${prices.aiAssistants.formatted}. Instant lead replies, appointment booking, and payment reminders in ${prices.aiAssistants.timeline}.`,
    h1: 'WhatsApp Automation & Chatbots Built for Indian Businesses',
    lead: `Turn incoming WhatsApp enquiries into qualified leads and booked calls — starting from ${prices.aiAssistants.formatted}, delivered in ${prices.aiAssistants.timeline}.`,
    priceFrom: prices.aiAssistants.fromLabel,
    priceAmount: prices.aiAssistants.amount,
    timeline: prices.aiAssistants.timelineLabel,
    introParagraphs: [
      `In India, business happens on WhatsApp. Whether a customer clicks your Meta ad, scans a QR code at your store, or taps the chat button on your website, they expect a reply within minutes — not the next afternoon. When sales reps juggle dozens of chats manually on one personal phone, follow-ups slip through the cracks and leads go cold.`,
      `${brandName} builds structured WhatsApp automation workflows using official API integrations so your business replies instantly, shares brochures or price lists, collects customer details, and logs every enquiry into your tracker or CRM automatically. Unlike generic bulk-spam tools that risk getting your number banned, we focus on permission-based inbound qualification, booking confirmations, and clean payment or renewal reminders.`,
      `Whether you need a guided WhatsApp chatbot starting from ${prices.aiAssistants.formatted} or custom workflow automation connecting Razorpay, Tally, and Google Sheets, you get a system tailored to your business with ${support.label}.`,
    ],
    whoItIsForTitle: 'Practical WhatsApp automation use cases',
    whoItIsFor: [
      {
        title: 'Click-to-WhatsApp Ad Campaigns',
        detail: 'Greet ad leads immediately, ask 2–3 qualifying questions (city, budget, timeline), and route hot buyers to the right salesperson.',
      },
      {
        title: 'Appointment & Site Visit Scheduling',
        detail: 'Let clinic patients, salon clients, or property buyers pick available slots and receive automatic reminder messages.',
      },
      {
        title: 'Invoice, Dispatch & Payment Reminders',
        detail: 'Send automated order confirmations, GST invoice PDFs, and polite UPI payment reminders without chasing manually.',
      },
      {
        title: 'Multi-Agent Team Routing',
        detail: 'Keep one official business number while routing Mumbai, Pune, or category-specific chats to the right team member.',
      },
    ],
    whatYouGetTitle: 'What you get with WhatsApp automation',
    whatYouGet: [
      'Instant auto-reply and structured lead qualification in English, Hindi, or Hinglish',
      'Official WhatsApp Business API template setup guidance to keep your number safe',
      'Automatic sync to Google Sheets, CRM, email alerts, or custom dashboards',
      'Optional AI reply layer so open-ended customer questions are answered naturally',
      'Human takeover anytime a team member wants to jump into the conversation',
      'Custom workflow hooks for Razorpay, UPI links, or invoicing software',
      `Full workflow documentation and ${support.label}`,
    ],
    processTitle: 'From manual chatting to clean automation',
    processSteps: [
      {
        step: '01',
        title: 'Audit Current Chats',
        detail: 'We review the top 10 questions your team answers daily and map the ideal qualification flow.',
      },
      {
        step: '02',
        title: 'API & Template Setup',
        detail: 'We help structure your official WhatsApp Business API connection and compliant message templates.',
      },
      {
        step: '03',
        title: 'Bot & CRM Integration',
        detail: 'We build the chatbot logic, AI fallback responses, and spreadsheet/CRM lead logging.',
      },
      {
        step: '04',
        title: 'Testing & Launch',
        detail: `Verified end-to-end with your team in ${prices.aiAssistants.timeline} plus ${support.days} days free support.`,
      },
    ],
    faqs: [
      {
        question: 'How much does a WhatsApp chatbot for business cost in India?',
        answer: `WhatsApp automation and AI chatbot setups start from ${prices.aiAssistants.formatted}. Complex multi-app ERP or payment reconciliation automations are quoted based on workflow scope.`,
      },
      {
        question: 'Do I have to pay Meta WhatsApp conversation charges separately?',
        answer: 'Yes. Just like hosting or domain fees, official WhatsApp Business API conversation charges from Meta are billed directly to your business account with zero hidden markup from us.',
      },
      {
        question: 'Will automating WhatsApp get my business number blocked?',
        answer: 'No, when built properly on the official WhatsApp Business API for inbound replies and opted-in notifications. We do not build unauthorized spam scrapers.',
      },
      {
        question: 'Can WhatsApp automation connect with my website or software?',
        answer: 'Yes. Leads from your website form can receive an instant WhatsApp greeting within seconds, and chat details can push straight into your custom CRM or Google Sheet.',
      },
    ],
    relatedLinks: [
      {
        label: 'AI Agent Development India',
        to: '/ai-agent-development',
        description: 'Train custom AI assistants on your pricing, catalog, and FAQs.',
      },
      {
        label: 'AI Calling Agents',
        to: '/ai-calling-agents',
        description: 'Follow up on form leads by phone automatically in Hindi & English.',
      },
      {
        label: 'Custom Software Development',
        to: '/custom-software-development',
        description: 'Connect WhatsApp updates directly to GST billing and order portals.',
      },
      {
        label: 'Blog: WhatsApp Automation Guide',
        to: '/blog/whatsapp-automation-for-business',
        description: 'Read what WhatsApp automation can and cannot do for Indian SMBs.',
      },
    ],
  },

  '/ai-calling-agents': {
    slug: '/ai-calling-agents',
    badge: 'AI VOICE AGENTS',
    badgeBgClass: 'bg-[#ffe600] text-[#131b2e]',
    title: 'AI Calling Agents India',
    metaTitle: `AI Calling Agents India (${prices.aiCalling.fromLabel}) | ${brandName}`,
    metaDescription: `24/7 AI voice calling agents for Indian businesses from ${prices.aiCalling.formatted}. Natural Hindi, Hinglish & English calls, delivered in ${prices.aiCalling.timeline}.`,
    h1: 'AI Calling Agents for Indian Businesses in Hindi & English',
    lead: `Answer every inbound call and follow up on leads in seconds — natural Hindi, Hinglish, and Indian English voice agents starting from ${prices.aiCalling.formatted}.`,
    priceFrom: prices.aiCalling.fromLabel,
    priceAmount: prices.aiCalling.amount,
    timeline: prices.aiCalling.timelineLabel,
    introParagraphs: [
      `Missed phone calls cost service businesses more revenue than almost anything else. A customer calling a clinic at 10 PM, a real estate buyer enquiring during a busy Sunday site visit, or a prospect waiting two hours for a callback rarely calls twice — they simply dial the next listing on Google.`,
      `${brandName} builds AI voice calling agents tuned for Indian accents, Hindi, Hinglish, and Indian English. Your voice assistant picks up inbound calls 24/7, greets callers politely, answers common questions about pricing, timings, or location, qualifies their requirement, and books an appointment or transfers urgent calls straight to your team’s mobile number.`,
      `After every conversation, you receive a concise summary and recording link on WhatsApp or your dashboard so your staff knows exactly who called and what they need — with zero guesswork. Delivered in ${prices.aiCalling.timeline} and backed by ${support.label}.`,
    ],
    whoItIsForTitle: 'Where AI voice calling makes the biggest difference',
    whoItIsFor: [
      {
        title: 'Inbound After-Hours & Overflow Reception',
        detail: 'Ensure no caller ever hears a busy tone or unanswered ring after 7 PM, on Sundays, or when your front desk is occupied.',
      },
      {
        title: 'Instant Lead Qualification Callbacks',
        detail: 'Call web-form or Meta ad leads within 30 seconds to confirm budget, location preference, and convenient callback time.',
      },
      {
        title: 'Appointment Confirmations & Reminders',
        detail: 'Reduce no-shows for clinics, diagnostic labs, salons, and service centres with polite automated confirmation calls.',
      },
      {
        title: 'Real Estate & Education Enquiry Desks',
        detail: 'Handle high-volume weekend enquiry spikes smoothly in Hindi, English, or mixed Hinglish.',
      },
    ],
    whatYouGetTitle: 'What is included with your AI calling agent',
    whatYouGet: [
      'Natural Indian English, Hindi, and Hinglish speech recognition and voice synthesis',
      'Works alongside your existing business phone number or Indian virtual telephony line',
      'Live call transfer to your sales or support team when human intervention is needed',
      'Instant WhatsApp & email summary after every completed call',
      'Structured call scripts with strict accuracy guardrails around your pricing and policies',
      'Calendar and CRM integration for direct slot booking',
      `End-to-end testing plus ${support.label}`,
    ],
    processTitle: 'How we launch your voice assistant',
    processSteps: [
      {
        step: '01',
        title: 'Call Script & Language Scope',
        detail: 'We map greeting style, Hindi/English switching rules, qualifying questions, and warm transfer triggers.',
      },
      {
        step: '02',
        title: 'Voice & Telephony Setup',
        detail: 'We configure Indian telephony routing, latency optimization, and natural voice pronunciation for local terms.',
      },
      {
        step: '03',
        title: 'WhatsApp & CRM Hooks',
        detail: 'Every call automatically pushes caller phone, intent summary, and booked slot to your team.',
      },
      {
        step: '04',
        title: 'Live Pilot & Handover',
        detail: `Tested with your team on real test calls and launched within ${prices.aiCalling.timeline}.`,
      },
    ],
    faqs: [
      {
        question: 'How much does an AI calling agent cost in India?',
        answer: `AI calling agent setup starts from ${prices.aiCalling.formatted}. Ongoing telephony and AI voice minute usage is billed directly through your chosen providers at actuals.`,
      },
      {
        question: 'Can the voice agent speak both Hindi and English?',
        answer: 'Yes. We configure our voice agents to handle natural Indian English, Hindi, and everyday Hinglish phrases smoothly.',
      },
      {
        question: 'Can it transfer the call to a human staff member?',
        answer: 'Yes. If a caller asks for a manager, has an urgent issue, or qualifies as a ready-to-buy lead, the system can bridge the call straight to your team.',
      },
      {
        question: 'How long does setup take?',
        answer: `Setup, script tuning, and telephony testing typically take ${prices.aiCalling.timeline}.`,
      },
    ],
    relatedLinks: [
      {
        label: 'AI Agent Development India',
        to: '/ai-agent-development',
        description: 'Combine voice agents with website and chat AI assistants.',
      },
      {
        label: 'WhatsApp Automation',
        to: '/whatsapp-automation',
        description: 'Automatically follow up every AI phone call with a WhatsApp brochure.',
      },
      {
        label: 'Pricing & Plans',
        to: '/pricing',
        description: 'View transparent starting prices across all WrotX services.',
      },
      {
        label: 'Contact Our Engineers',
        to: '/contact',
        description: 'Request a live test call demo tailored to your industry.',
      },
    ],
  },

  '/custom-software-development': {
    slug: '/custom-software-development',
    badge: 'CUSTOM SOFTWARE',
    badgeBgClass: 'bg-[#ffe600] text-[#131b2e]',
    title: 'Custom Software Development Mumbai',
    metaTitle: `Custom Software Development Mumbai (${prices.software.fromLabel}) | ${brandName}`,
    metaDescription: `Custom business software, CRM & GST billing portals in Mumbai from ${prices.software.formatted}. Zero monthly SaaS fees, built in ${prices.software.timeline}.`,
    h1: 'Custom Software & GST Billing Portals Built Around Your Team',
    lead: `Stop paying per-user monthly SaaS fees for bloated tools your staff barely uses — custom web software starting from ${prices.software.formatted}, delivered in ${prices.software.timeline}.`,
    priceFrom: prices.software.fromLabel,
    priceAmount: prices.software.amount,
    timeline: prices.software.timelineLabel,
    introParagraphs: [
      `Many growing Indian businesses end up running operations across five disconnected spreadsheets, WhatsApp groups, and expensive subscription software where 80% of the features sit untouched. Meanwhile, staff waste hours copying customer entries from one sheet into a GST billing tool and exporting CSVs back into Tally.`,
      `${brandName} builds custom software and web applications around how your team actually operates. Whether you need an internal CRM with role-based permissions, a GST-compliant invoice and quotation generator, a distributor order portal, or a custom operations dashboard, you pay once to build it and own the entire system forever.`,
      `Because we build modern web-based software, your team can log in securely from office desktops, laptops, or phones on the road. You get clean Tally/Excel exports, automated payment status tracking, official GST invoicing for our work, and ${support.label} while your staff transitions off spreadsheets.`,
    ],
    whoItIsForTitle: 'Who custom software saves the most time and money',
    whoItIsFor: [
      {
        title: 'Growing teams outgrowing Excel & Google Sheets',
        detail: 'Replace fragile multi-tab spreadsheets with proper user logins, audit logs, and zero accidental deletions.',
      },
      {
        title: 'Distributors, wholesalers & service companies',
        detail: 'Manage quotations, GST invoices, pending receivables, and field-team updates in one fast portal.',
      },
      {
        title: 'Businesses tired of per-seat SaaS renewals',
        detail: 'Eliminate rising monthly per-employee software bills with software you own outright.',
      },
      {
        title: 'Financial & regulated teams needing custom rules',
        detail: 'Enforce strict maker-checker approvals, role-based data visibility, and custom report exports.',
      },
    ],
    whatYouGetTitle: 'What comes standard in our software builds',
    whatYouGet: [
      'Role-based staff logins so employees see only what their job requires',
      'GST invoice, quotation, and PDF receipt generation',
      'One-click Excel, CSV, and Tally-friendly accounting exports',
      'UPI, Razorpay, or Cashfree payment tracking & reconciliation hooks',
      'Clean mobile + desktop interface that requires minimal staff training',
      'Full source code, database schema, and cloud ownership with zero lock-in',
      `Dedicated walkthrough training and ${support.label}`,
    ],
    processTitle: 'How we build without disrupting daily operations',
    processSteps: [
      {
        step: '01',
        title: 'Workflow & Sheet Audit',
        detail: 'We inspect your existing spreadsheets, invoices, and approval steps so nothing important is missed.',
      },
      {
        step: '02',
        title: 'Clickable Prototype',
        detail: 'You review key screens and role permissions before full backend development begins.',
      },
      {
        step: '03',
        title: 'Weekly Live Demos',
        detail: 'We ship working modules week by week so your managers can test with real sample data early.',
      },
      {
        step: '04',
        title: 'Migration & Training',
        detail: `Launched in ${prices.software.timeline} with data import support, staff training, and ${support.days} days free support.`,
      },
    ],
    faqs: [
      {
        question: 'How much does custom software development in Mumbai cost?',
        answer: `Custom software and internal web portals start from ${prices.software.formatted}. Final cost depends on user roles, integrations, and report complexity, quoted clearly before starting.`,
      },
      {
        question: 'How long does custom software take to deliver?',
        answer: `Focused portals and internal tools are typically delivered in ${prices.software.timeline}. Larger multi-module systems are broken into milestone releases so you start using core screens early.`,
      },
      {
        question: 'Do we have to pay per-user monthly license fees?',
        answer: 'No. You own the source code and database outright and only pay your own cloud server/database hosting charges.',
      },
      {
        question: 'Can it generate GST invoices and export to Excel or Tally?',
        answer: 'Yes. GST invoice generation, HSN/SAC tax breakdowns, and clean Excel/Tally exports are core features we build regularly.',
      },
    ],
    relatedLinks: [
      {
        label: 'Banking & Fintech Solutions',
        to: '/banking-fintech-solutions',
        description: 'Custom portals and automation for finance, NBFC, and advisory teams.',
      },
      {
        label: 'Website Development Mumbai',
        to: '/website-development-mumbai',
        description: 'Connect your public marketing site straight to your internal CRM.',
      },
      {
        label: 'WhatsApp Automation',
        to: '/whatsapp-automation',
        description: 'Trigger automated WhatsApp invoice and payment alerts from your software.',
      },
      {
        label: 'Pricing & Timelines',
        to: '/pricing',
        description: 'Compare custom software and automation pricing clearly.',
      },
    ],
  },

  '/real-estate-websites': {
    slug: '/real-estate-websites',
    badge: 'REAL ESTATE',
    badgeBgClass: 'bg-[#1be66f] text-[#111a2e]',
    title: 'Real Estate Website Development Mumbai',
    metaTitle: `Real Estate Websites Mumbai (${prices.websites.fromLabel}) | ${brandName}`,
    metaDescription: `Real estate websites & property portals in Mumbai from ${prices.websites.formatted}. Interactive listings, EMI tools, WhatsApp lead routing in ${prices.websites.timeline}.`,
    h1: 'Real Estate Website & Property Portal Development in Mumbai',
    lead: `High-converting property websites for builders, brokers, and real estate advisories — starting from ${prices.websites.formatted}, delivered in ${prices.websites.timeline}.`,
    priceFrom: prices.websites.fromLabel,
    priceAmount: prices.websites.amount,
    timeline: prices.websites.timelineLabel,
    introParagraphs: [
      `Homebuyers in Mumbai, Thane, and Navi Mumbai search properties on their phones while commuting, compare floor plans on WhatsApp, and decide within ten seconds whether a broker or developer looks trustworthy. If your website looks dated, forces buyers to download 40 MB PDF brochures just to view 2BHK layouts, or lacks instant WhatsApp enquiry buttons, your Google and Meta ad budget leaks straight out the door.`,
      `${brandName} builds fast, clear real estate websites and property portals designed specifically for Indian developers, channel partners, and commercial/residential brokerages. From clean locality filters and RERA-ready project detail sections to built-in home loan EMI calculators and pre-filled WhatsApp site-visit buttons, every element guides buyers toward calling or messaging your sales desk.`,
      `You can see our live interactive property portal and brokerage templates directly in our portfolio. Plus, you own the website 100%, launch in ${prices.websites.timeline}, and receive ${support.label}.`,
    ],
    whoItIsForTitle: 'Who we build real estate platforms for',
    whoItIsFor: [
      {
        title: 'Independent Brokers & Property Advisories',
        detail: 'Showcase verified residential and commercial inventory across Mumbai micro-markets with direct WhatsApp callback.',
      },
      {
        title: 'Builders & Project Microsites',
        detail: 'Dedicated landing pages for new towers featuring floor plans, amenities, RERA ID slots, and Google Ads conversion tracking.',
      },
      {
        title: 'Channel Partners Running Meta & Google Ads',
        detail: 'Sub-2-second mobile pages built to maximize Quality Score and convert paid clicks into site visits.',
      },
      {
        title: 'Commercial Leasing & Warehouse Specialists',
        detail: 'Filterable spec sheets showing carpet area, power load, loading bays, and rent per sq ft cleanly.',
      },
    ],
    whatYouGetTitle: 'Built-in features for property portals',
    whatYouGet: [
      'Filterable property listings by locality, BHK configuration, budget, and status',
      'Built-in home loan EMI calculator and area unit converter (sq ft / sq m)',
      'One-tap WhatsApp & Call buttons pre-filled with the exact property name',
      'Easy admin or sheet-backed listing updates so your team adds properties without a developer',
      'Dedicated slots for MahaRERA registration numbers, disclaimers, and floor-plan galleries',
      'Local SEO structure targeting Mumbai, Thane, Navi Mumbai, and project keywords',
      `Complete code ownership and ${support.label}`,
    ],
    processTitle: 'How your property website goes live',
    processSteps: [
      {
        step: '01',
        title: 'Inventory & Micro-Market Plan',
        detail: 'We align on your property categories (buy, rent, commercial, new launch) and target localities.',
      },
      {
        step: '02',
        title: 'Mobile Listing UX Preview',
        detail: 'You test the property card filters, EMI calculator, and enquiry flow on your own phone.',
      },
      {
        step: '03',
        title: 'Lead & WhatsApp Routing',
        detail: 'Every enquiry captures the exact project name and forwards cleanly to your sales desk or CRM.',
      },
      {
        step: '04',
        title: 'Launch & SEO Setup',
        detail: `Delivered in ${prices.websites.timeline} with sitemap, structured data, and ${support.days} days free support.`,
      },
    ],
    faqs: [
      {
        question: 'How much does a real estate website cost in Mumbai?',
        answer: `Real estate websites and agency portals start from ${prices.websites.formatted}. Custom multi-broker portals with CRM dashboards start from ${prices.software.formatted}.`,
      },
      {
        question: 'Can I update properties, prices, and photos myself?',
        answer: 'Yes. We structure your site so your team can add, edit, or mark properties as sold without hiring a developer every time.',
      },
      {
        question: 'Can you integrate WhatsApp and AI lead follow-up for property ads?',
        answer: `Yes. You can pair your property site with our WhatsApp automation (${prices.aiAssistants.fromLabel}) or AI calling agents (${prices.aiCalling.fromLabel}) to qualify leads 24/7.`,
      },
      {
        question: 'Where can I see examples of real estate websites you built?',
        answer: 'You can inspect our live interactive Real Estate Brokerage Portal and Meena Properties demos on our Work page.',
      },
    ],
    relatedLinks: [
      {
        label: 'View Our Real Estate Portfolio Demos',
        to: '/work',
        description: 'Inspect live interactive previews for real estate brokerages and portals.',
      },
      {
        label: 'Blog: Real Estate Website Cost in India',
        to: '/blog/real-estate-website-cost-india',
        description: 'Detailed breakdown of single-project microsites vs full property portals.',
      },
      {
        label: 'Website Development Mumbai',
        to: '/website-development-mumbai',
        description: 'Explore our core fast business website architecture and standards.',
      },
      {
        label: 'AI Calling Agents for Property Leads',
        to: '/ai-calling-agents',
        description: 'Call back weekend property ad leads automatically in Hindi and English.',
      },
    ],
  },

  '/banking-fintech-solutions': {
    slug: '/banking-fintech-solutions',
    badge: 'BANKING & FINTECH',
    badgeBgClass: 'bg-[#00f0ff] text-[#003840]',
    title: 'Software for Banking & Finance Companies India',
    metaTitle: `Banking & Fintech Software India (${prices.software.fromLabel}) | ${brandName}`,
    metaDescription: `Custom web portals, loan DSA CRMs & automated client onboarding for Indian finance teams from ${prices.software.formatted}. Built in ${prices.software.timeline}.`,
    h1: 'Software & Automation for Banking, NBFC & Finance Teams in India',
    lead: `Secure lead portals, DSA workflow tools, EMI calculators, and automated KYC/document follow-ups — starting from ${prices.software.formatted} with full code ownership.`,
    priceFrom: prices.software.fromLabel,
    priceAmount: prices.software.amount,
    timeline: prices.software.timelineLabel,
    introParagraphs: [
      `Financial services teams — from DSAs, credit advisors, and wealth managers to cooperative credit societies and fintech startups — deal with high paperwork volume and strict client trust requirements. When prospects wait days for an eligibility update, or sales executives track loan files inside unencrypted spreadsheets, deals stall and compliance risks grow.`,
      `${brandName} builds clean, role-restricted web portals, client intake systems, and automated follow-up workflows tailored for Indian banking and finance companies. We keep sensitive workflows inside infrastructure you own and control, with strict role-based logins, structured audit trails, and automated WhatsApp document-collection checklists so relationship managers spend time closing instead of chasing PAN/ITR scans.`,
      `Whether you need a customer-facing financial advisory website from ${prices.websites.formatted}, a custom loan/client tracking portal from ${prices.software.formatted}, or AI-assisted onboarding from ${prices.aiAssistants.formatted}, we build clearly scoped software with ${support.label}.`,
    ],
    whoItIsForTitle: 'Finance & advisory teams we build for',
    whoItIsFor: [
      {
        title: 'Loan DSAs & Mortgage Advisory Firms',
        detail: 'Track application stages across banks, collect KYC documents neatly, and compute eligibility on mobile.',
      },
      {
        title: 'Wealth Management, Mutual Fund & Insurance Advisors',
        detail: 'Build trust online with clean advisory websites, SIP/EMI calculators, and automated renewal reminders.',
      },
      {
        title: 'NBFC Operations & Credit Societies',
        detail: 'Internal dashboards with maker-checker roles, staff permissions, and automated repayment alert hooks.',
      },
      {
        title: 'Fintech MVP & Internal Ops Teams',
        detail: 'Launch clean web portals and vendor/payout reconciliation dashboards without bloated enterprise retainers.',
      },
    ],
    whatYouGetTitle: 'Key capabilities for finance portals',
    whatYouGet: [
      'Role-based access control so branch staff and advisors only view assigned client files',
      'Interactive EMI, SIP, and eligibility calculators tailored to your loan or investment products',
      'Automated WhatsApp checklists for missing KYC, bank statements, or renewal reminders',
      'GST invoicing, fee tracking, and clean Excel/Tally exports for finance teams',
      'Clean audit trails showing who updated an application status and when',
      '100% source code & infrastructure ownership hosted on your own cloud account',
      `Official GST tax invoice and ${support.label}`,
    ],
    processTitle: 'Our delivery process for finance teams',
    processSteps: [
      {
        step: '01',
        title: 'Workflow & Access Review',
        detail: 'We map user roles (admin, branch, DSA, client), document stages, and reporting formats.',
      },
      {
        step: '02',
        title: 'Architecture & Security Check',
        detail: 'We lock down permission boundaries, validation rules, and clean database hosting on your account.',
      },
      {
        step: '03',
        title: 'Portal & Automation Build',
        detail: 'Weekly live demos covering calculators, lead intake, and automated client notifications.',
      },
      {
        step: '04',
        title: 'Training & Handover',
        detail: `Delivered in ${prices.software.timeline} with staff training and ${support.days} days free technical support.`,
      },
    ],
    faqs: [
      {
        question: 'How much does custom software for a finance or DSA team cost?',
        answer: `Custom finance portals and internal CRMs start from ${prices.software.formatted}. Public financial advisory websites start from ${prices.websites.formatted}.`,
      },
      {
        question: 'Where is client data stored?',
        answer: 'Your software and database are deployed directly on cloud infrastructure owned by your company, ensuring you retain full data custody and access control.',
      },
      {
        question: 'Can you automate document reminders on WhatsApp?',
        answer: `Yes. We can integrate official WhatsApp automation (${prices.aiAssistants.fromLabel}) to remind applicants about pending KYC or renewal dates automatically.`,
      },
      {
        question: 'Do you sign NDAs and hand over full source code?',
        answer: 'Yes. Upon completion, you receive 100% of the source code, admin credentials, and repository ownership.',
      },
    ],
    relatedLinks: [
      {
        label: 'Custom Software Development Mumbai',
        to: '/custom-software-development',
        description: 'Explore our role-based portals, GST billing, and Tally export capabilities.',
      },
      {
        label: 'WhatsApp Automation India',
        to: '/whatsapp-automation',
        description: 'Automate KYC document checklists and EMI/renewal notifications.',
      },
      {
        label: 'Our Work & Portfolio',
        to: '/work',
        description: 'See products we built across real estate, retail, and finance.',
      },
      {
        label: 'Book an Engineering Consultation',
        to: '/contact',
        description: 'Speak directly with our engineers about your workflow requirements.',
      },
    ],
  },
};

export const SERVICE_PAGE_LIST = Object.values(SERVICE_PAGES);

import { SITE_CONFIG } from '../config/site';

export interface ServiceItem {
  id: string;
  num: string;
  numClass: string;
  name: string;
  accent: string;
  chips: [string, string];
  priceDisplay: string;
  priceRaw: string;
  priceLabel?: string;
  timeline: string;
  description: string;
  ticks: string[];
  popular?: boolean;
  isQuote?: boolean;
  btnText: string;
  dropdownLabel: string;
  badgeBg: string;
  badgeText: string;
  badgeShadow: string;
  slug: string;
}

const { websites, software, aiAssistants, aiCalling, automation } = SITE_CONFIG.prices;

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'websites',
    num: '01',
    numClass: 'num-cyan',
    name: websites.name,
    accent: '#1f8bff',
    chips: ['Google', 'WhatsApp'],
    priceDisplay: websites.fromLabel,
    priceRaw: websites.rawDisplay,
    priceLabel: 'STARTING FROM',
    timeline: websites.timelineLabel,
    description: 'A website that brings you enquiries and customers.',
    ticks: [
      'Direct WhatsApp button',
      'Shows up on Google',
      'Quick to open on phones',
      'Easy to edit yourself',
    ],
    popular: false,
    btnText: 'Choose plan',
    dropdownLabel: `${websites.name} (${websites.fromLabel})`,
    badgeBg: 'bg-[#00f0ff]',
    badgeText: 'text-[#003840]',
    badgeShadow: 'shadow-[2px_2px_0px_#003840] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]',
    slug: '/website-development-mumbai',
  },
  {
    id: 'software-apps',
    num: '02',
    numClass: 'num-amber',
    name: software.name,
    accent: '#f08a0c',
    chips: ['GST', 'Tally'],
    priceDisplay: software.fromLabel,
    priceRaw: software.rawDisplay,
    priceLabel: 'STARTING FROM',
    timeline: software.timelineLabel,
    description: 'Custom software made around how your team works.',
    ticks: [
      'Staff logins and roles',
      'GST invoice generator',
      'Tally and Excel export',
      'Made for your team workflow',
    ],
    popular: true,
    btnText: 'Choose plan',
    dropdownLabel: `${software.name} (${software.fromLabel})`,
    badgeBg: 'bg-[#ffe600]',
    badgeText: 'text-[#131b2e]',
    badgeShadow: 'shadow-[2px_2px_0px_#131b2e] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]',
    slug: '/custom-software-development',
  },
  {
    id: 'ai-assistants',
    num: '03',
    numClass: 'num-purple',
    name: 'AI Assistants',
    accent: '#b13ad8',
    chips: ['Hindi', 'English'],
    priceDisplay: aiAssistants.fromLabel,
    priceRaw: aiAssistants.rawDisplay,
    priceLabel: 'STARTING FROM',
    timeline: aiAssistants.timelineLabel,
    description: `WhatsApp bots (${aiAssistants.fromLabel}) and AI calling agents (${aiCalling.fromLabel}) working 24/7.`,
    ticks: [
      'Multi Language support',
      'Books appointments 24/7',
      'Saves leads to WhatsApp',
      `Voice calling agents (${aiCalling.fromLabel})`,
    ],
    popular: false,
    btnText: 'Choose plan',
    dropdownLabel: `AI Assistants / WhatsApp (${aiAssistants.fromLabel})`,
    badgeBg: 'bg-[#ff6b00]',
    badgeText: 'text-[#2a0800]',
    badgeShadow: 'shadow-[2px_2px_0px_#2a0800] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]',
    slug: '/ai-agent-development',
  },
  {
    id: 'automation',
    num: '04',
    numClass: 'num-emerald',
    name: automation.name,
    accent: '#12a36b',
    chips: ['UPI', 'Invoice'],
    priceDisplay: automation.rawDisplay,
    priceRaw: automation.rawDisplay,
    priceLabel: 'SCOPE',
    timeline: automation.timelineLabel,
    isQuote: true,
    description: 'Stops manual data entry and chases payments automatically.',
    ticks: [
      'Payment reminders',
      'UPI payment matching',
      'Automated team alerts',
      'Connects your existing apps',
    ],
    popular: false,
    btnText: 'Get a quote',
    dropdownLabel: `${automation.name} (${automation.formatted})`,
    badgeBg: 'bg-[#00fe66]',
    badgeText: 'text-[#00280b]',
    badgeShadow: 'shadow-[2px_2px_0px_#00280b] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]',
    slug: '/whatsapp-automation',
  },
];

export const CONTACT_SERVICE_OPTIONS = [
  { id: 'websites', matchName: websites.name, label: `${websites.name} (${websites.fromLabel})` },
  { id: 'software-apps', matchName: software.name, label: `${software.name} (${software.fromLabel})` },
  { id: 'ai-assistants', matchName: 'AI Assistants', label: `AI Assistants / WhatsApp (${aiAssistants.fromLabel})` },
  { id: 'ai-calling', matchName: aiCalling.name, label: `${aiCalling.name} (${aiCalling.fromLabel})` },
  { id: 'automation', matchName: automation.name, label: `${automation.name} (${automation.formatted})` },
];

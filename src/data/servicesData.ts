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
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'websites',
    num: '01',
    numClass: 'num-cyan',
    name: 'Websites',
    accent: '#1f8bff',
    chips: ['Google', 'WhatsApp'],
    priceDisplay: 'From ₹6,999',
    priceRaw: '₹ 6,999',
    priceLabel: 'STARTING FROM',
    timeline: '5–7 days',
    description: 'A website that brings you enquiries and customers.',
    ticks: [
      'Direct WhatsApp button',
      'Shows up on Google',
      'Quick to open on phones',
      'Easy to edit yourself'
    ],
    popular: false,
    btnText: 'Choose plan',
    dropdownLabel: 'Websites (From ₹6,999)',
    badgeBg: 'bg-[#00f0ff]',
    badgeText: 'text-[#003840]',
    badgeShadow: 'shadow-[2px_2px_0px_#003840] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]'
  },
  {
    id: 'software-apps',
    num: '02',
    numClass: 'num-amber',
    name: 'Software & Apps',
    accent: '#f08a0c',
    chips: ['GST', 'Tally'],
    priceDisplay: 'From ₹14,999',
    priceRaw: '₹ 14,999',
    priceLabel: 'STARTING FROM',
    timeline: '3–5 weeks',
    description: 'Custom software made around how your team works.',
    ticks: [
      'Staff logins and roles',
      'GST invoice generator',
      'Tally and Excel export',
      'Made for your team workflow'
    ],
    popular: true,
    btnText: 'Choose plan',
    dropdownLabel: 'Software & Apps (From ₹14,999)',
    badgeBg: 'bg-[#ffe600]',
    badgeText: 'text-[#131b2e]',
    badgeShadow: 'shadow-[2px_2px_0px_#131b2e] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]'
  },
  {
    id: 'ai-assistants',
    num: '03',
    numClass: 'num-purple',
    name: 'AI Assistants',
    accent: '#b13ad8',
    chips: ['Hindi', 'English'],
    priceDisplay: 'From ₹14,999',
    priceRaw: '₹ 14,999',
    priceLabel: 'STARTING FROM',
    timeline: '10–14 days',
    description: 'Answers customer calls and WhatsApp for you, day and night.',
    ticks: [
      'Multi Language support',
      'Books appointments 24/7',
      'Saves leads to WhatsApp',
      'Full custom setup'
    ],
    popular: false,
    btnText: 'Choose plan',
    dropdownLabel: 'AI Assistants (From ₹14,999)',
    badgeBg: 'bg-[#ff6b00]',
    badgeText: 'text-[#2a0800]',
    badgeShadow: 'shadow-[2px_2px_0px_#2a0800] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]'
  },
  {
    id: 'automation',
    num: '04',
    numClass: 'num-emerald',
    name: 'Automation',
    accent: '#12a36b',
    chips: ['UPI', 'Invoice'],
    priceDisplay: 'Ask for a quote',
    priceRaw: 'Ask for a quote',
    priceLabel: 'SCOPE',
    timeline: 'Custom timeline',
    isQuote: true,
    description: 'Stops manual data entry and chases payments automatically.',
    ticks: [
      'Payment reminders',
      'UPI payment matching',
      'Automated team alerts',
      'Connects your existing apps'
    ],
    popular: false,
    btnText: 'Get a quote',
    dropdownLabel: 'Automation (Custom quote)',
    badgeBg: 'bg-[#00fe66]',
    badgeText: 'text-[#00280b]',
    badgeShadow: 'shadow-[2px_2px_0px_#00280b] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]'
  }
];

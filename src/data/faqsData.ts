import { SITE_CONFIG } from '../config/site';

export interface FaqItem {
  question: string;
  answer: string;
}

const { prices, support, brandName } = SITE_CONFIG;

export const HOME_FAQS_DATA: FaqItem[] = [
  {
    question: `How much does a website, custom software, or AI agent cost at ${brandName}?`,
    answer: `Our business websites start from ${prices.websites.formatted}, custom software and web applications start from ${prices.software.formatted}, AI assistants & WhatsApp automation start from ${prices.aiAssistants.formatted}, AI calling agents start from ${prices.aiCalling.formatted}, and custom automation is quoted per scope. All pricing is transparent with zero hidden charges.`,
  },
  {
    question: 'What is the delivery timeline for projects?',
    answer: `Fast websites launch in ${prices.websites.timeline}. AI assistants and WhatsApp automation workflows are delivered in ${prices.aiAssistants.timeline}. Custom software applications typically take ${prices.software.timeline} depending on scope and team size.`,
  },
  {
    question: 'Do I own the code, design, and domain?',
    answer: 'Yes, 100%. Upon final delivery, you receive full source code handover, admin credentials, and complete intellectual property ownership. You only pay for your own domain and cloud hosting.',
  },
  {
    question: 'What kind of post-launch support and training is included?',
    answer: `Every project comes with ${support.label}, maintenance, and comprehensive staff training so your team can confidently use and update your system.`,
  },
  {
    question: 'Do you provide official GST invoices and accept Indian payment methods?',
    answer: 'Yes. We issue official GST tax invoices for all projects and accept secure milestone payments via UPI, NEFT, RTGS, Razorpay, and direct bank transfer.',
  },
];

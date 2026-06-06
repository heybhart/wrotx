export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to dynamic-render lucide icon
  category: string;
  benefits: string[];
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'ai' | 'saas';
  filterCategories: ('website' | 'application' | 'software' | 'ai')[];
  techStack: string[];
  problemSolved: string;
  features: string[];
  results: string[];
  imageMockupColor: string; // Elegant gradient description or visual SVG model
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string; // Fallback to initials if omitted or broken
  rating: number;
  review: string;
  metricsAchieved: string; // e.g. "250% ROI Increase", "Saved 40h/week"
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'ai';
  imageUrl?: string;
  glowColor: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

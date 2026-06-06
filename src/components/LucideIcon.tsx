import React from 'react';
import {
  Globe,
  Smartphone,
  Cpu,
  Mic,
  Code,
  Layers,
  Palette,
  Server,
  Search,
  CheckCircle,
  Rocket,
  ShieldAlert,
  Users,
  Star,
  ArrowRight,
  ExternalLink,
  Github,
  Sparkles,
  Check,
  Play,
  Mail,
  Linkedin,
  Phone,
  Calendar,
  Menu,
  X,
  Clock,
  Compass,
  MessageSquare,
  ArrowUpRight,
  Calculator,
  TrendingUp,
  Database
} from 'lucide-react';

const icons: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Globe,
  Smartphone,
  Cpu,
  Mic,
  Code,
  Layers,
  Palette,
  Server,
  Search,
  CheckCircle,
  Rocket,
  ShieldAlert,
  Users,
  Star,
  ArrowRight,
  ExternalLink,
  Github,
  Sparkles,
  Check,
  Play,
  Mail,
  Linkedin,
  Phone,
  Calendar,
  Menu,
  X,
  Clock,
  Compass,
  MessageSquare,
  ArrowUpRight,
  Calculator,
  TrendingUp,
  Database
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className = '', size }) => {
  const IconComponent = icons[name] || HelpCircleFallback;
  return <IconComponent className={className} size={size} />;
};

const HelpCircleFallback: React.FC<{ className?: string; size?: number }> = ({ className = '', size }) => {
  return (
    <svg
      className={className}
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-slate-600 dark:text-slate-400">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {idx > 0 && <ChevronRight size={13} className="text-slate-400" aria-hidden="true" />}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors py-1"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-900 dark:text-white font-semibold" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};


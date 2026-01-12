'use client';

import clsx from 'clsx';
import type { Card } from '@/data/mockCards';
import type { UserRole } from '@/state/useRoleStore';

interface Props {
  card: Card;
  role: UserRole;
  isEmphasized?: boolean;
}

const priorityColor: Record<Card['priority'], string> = {
  HIGH: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
  MEDIUM: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
  LOW: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30',
};

export function BoardCard({ card, role, isEmphasized = false }: Props) {
  return (
    <article
      className={clsx(
        'rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-2 transition card-hover',
        isEmphasized && 'ring-2 ring-emerald-400/60 shadow-vibe'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p data-testid="card-title" className="font-semibold text-slate-100">
          {card.title}
        </p>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
          {card.type}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
        <span className={clsx('px-2 py-1 rounded-full border', priorityColor[card.priority])}>
          {card.priority} priority
        </span>
        <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
          Updated: {new Date(card.updatedAt).toLocaleDateString()}
        </span>
        {role === 'TechLead' && card.status === 'IN_REVIEW' && (
          <span className="px-2 py-1 rounded-full bg-rose-600/30 text-rose-100 border border-rose-500/40">
            Review bottleneck
          </span>
        )}
        {role === 'QA' && card.tags?.includes('QA') && (
          <span className="px-2 py-1 rounded-full bg-sky-600/25 text-sky-100 border border-sky-400/40">QA Ready</span>
        )}
      </div>
      {card.assigneeId && (
        <p className="text-xs text-slate-400">Assigned to: {card.assigneeId}</p>
      )}
      {card.dependencyIds.length > 0 && (
        <p className="text-xs text-slate-500">Depends on: {card.dependencyIds.join(', ')}</p>
      )}
    </article>
  );
}

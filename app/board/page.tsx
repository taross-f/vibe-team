'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
import { BoardCard } from '@/components/BoardCard';
import { mockCards, type Card, type CardStatus } from '@/data/mockCards';
import { computeAiSuggestions } from '@/lib/aiSuggestions';
import { useRoleStore, type UserRole } from '@/state/useRoleStore';

const columnMeta: Record<
  CardStatus,
  { label: string; vibe: 'heavy' | 'light'; accent: string }
> = {
  BACKLOG: { label: 'Backlog', vibe: 'light', accent: 'from-slate-900 to-slate-950' },
  IN_PROGRESS: { label: 'In Progress', vibe: 'light', accent: 'from-progress/30 to-slate-900' },
  IN_REVIEW: { label: 'In Review', vibe: 'heavy', accent: 'from-review/30 to-slate-900' },
  CHANGES_REQUESTED: { label: 'Changes Requested', vibe: 'heavy', accent: 'from-changes/30 to-slate-900' },
  DONE: { label: 'Done', vibe: 'light', accent: 'from-done/30 to-slate-900' },
};

const statusOrder: CardStatus[] = [
  'BACKLOG',
  'IN_PROGRESS',
  'IN_REVIEW',
  'CHANGES_REQUESTED',
  'DONE',
];

function sortCardsForRole(role: UserRole, cards: Card[], currentUserId: string | null) {
  const priorityRank: Record<Card['priority'], number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };

  return [...cards].sort((a, b) => {
    if (role === 'SWE') {
      const aOwn = a.assigneeId === currentUserId ? -10 : 0;
      const bOwn = b.assigneeId === currentUserId ? -10 : 0;
      if (aOwn !== bOwn) return aOwn - bOwn;
    }
    if (role === 'TechLead') {
      const reviewBoost = (card: Card) => (card.status === 'IN_REVIEW' ? -5 : 0);
      const diff = reviewBoost(a) - reviewBoost(b);
      if (diff !== 0) return diff;
    }

    const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
  });
}

export default function BoardPage() {
  const { role, isAuthenticated, currentUser } = useRoleStore();

  if (!isAuthenticated || !role) {
    throw new Error('Board requires authentication and a selected role. Go to /login first.');
  }

  const grouped = useMemo(() => {
    return statusOrder.reduce<Record<CardStatus, Card[]>>((acc, status) => {
      const columnCards = mockCards.filter((card) => card.status === status);
      acc[status] = sortCardsForRole(role, columnCards, currentUser.id);
      return acc;
    }, {} as Record<CardStatus, Card[]>);
  }, [role, currentUser.id]);

  const suggestions = useMemo(() => computeAiSuggestions(mockCards), []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {statusOrder.map((status) => {
          const meta = columnMeta[status];
          const cards = grouped[status];
          return (
            <div
              key={status}
              data-testid={`column-${status}`}
              className={clsx(
                'rounded-2xl border border-slate-800/80 p-4 space-y-3 bg-gradient-to-b',
                meta.accent,
                meta.vibe === 'heavy' ? 'column-heavy' : 'column-light'
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold" aria-label={meta.label}>
                  {meta.label}
                </h3>
                <span className="text-xs text-slate-400">{cards?.length ?? 0} items</span>
              </div>
              <div className="space-y-3">
                {cards?.map((card) => (
                  <BoardCard
                    key={card.id}
                    card={card}
                    role={role}
                    isEmphasized={
                      (role === 'TechLead' && card.status === 'IN_REVIEW') ||
                      (role === 'SWE' && card.assigneeId === currentUser.id)
                    }
                  />
                ))}
                {(!cards || cards.length === 0) && (
                  <p className="text-sm text-slate-500">No cards in this column.</p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <aside className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-vibe">
        <header>
          <p className="text-xs uppercase text-slate-500">AI Flow Orchestrator</p>
          <h4 className="text-lg font-semibold">Next actions & insights</h4>
        </header>
        <div>
          <p className="text-sm text-slate-400 mb-2">Top priorities</p>
          <ul className="space-y-2" data-testid="ai-suggestion-list">
            {suggestions.nextActions.map((card) => (
              <li key={card.id} className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100">{card.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                    {card.priority}
                  </span>
                </div>
                <p className="text-slate-400 text-xs">Updated {new Date(card.updatedAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-400">Reviewer hints</p>
          <ul className="space-y-2">
            {suggestions.reviewerHints.map((hint) => (
              <li key={hint.cardId} className="text-sm text-slate-200 bg-slate-800/70 border border-slate-700 rounded-xl p-3">
                <p className="font-semibold">{hint.cardId}</p>
                <p className="text-slate-400 text-xs">{hint.reason}</p>
                <p className="text-emerald-300 text-xs">Suggest: {hint.suggestedReviewer}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
          <p className="text-sm font-semibold text-rose-200">Bottleneck</p>
          <p className="text-slate-300 text-sm">{suggestions.bottleneck.description}</p>
        </div>
      </aside>
    </div>
  );
}

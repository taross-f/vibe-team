import type { Card, CardStatus } from '@/data/mockCards';
import type { UserRole } from '@/state/useRoleStore';

export interface SuggestionResult {
  nextActions: Card[];
  reviewerHints: { cardId: string; suggestedReviewer: UserRole; reason: string }[];
  bottleneck: { status: CardStatus; description: string };
}

const priorityRank: Record<Card['priority'], number> = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

const roleReviewerFallback: UserRole[] = ['TechLead', 'SWE', 'QA', 'PdM', 'Designer'];

export function computeAiSuggestions(cards: Card[]): SuggestionResult {
  if (!cards.length) {
    throw new Error('computeAiSuggestions requires at least one card');
  }

  const sorted = [...cards].sort((a, b) => {
    const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
  });

  const nextActions = sorted.slice(0, 3);

  const reviewerHints = sorted
    .filter((card) => card.type === 'PR')
    .map((card) => {
      const candidate = card.tags?.find((tag) => roleReviewerFallback.includes(tag)) ?? 'TechLead';
      return {
        cardId: card.id,
        suggestedReviewer: candidate,
        reason: `Pick ${candidate} because priority is ${card.priority}`,
      };
    });

  const counts = sorted.reduce<Record<CardStatus, number>>((acc, card) => {
    acc[card.status] = (acc[card.status] ?? 0) + 1;
    return acc;
  }, {} as Record<CardStatus, number>);

  const bottleneckStatus = (Object.keys(counts) as CardStatus[]).reduce((prev, curr) => {
    if (counts[curr] > (counts[prev] ?? 0)) return curr;
    return prev;
  }, 'BACKLOG' as CardStatus);

  const bottleneck = {
    status: bottleneckStatus,
    description: `${bottleneckStatus} has the highest WIP (${counts[bottleneckStatus]} items)`,
  };

  return { nextActions, reviewerHints, bottleneck };
}

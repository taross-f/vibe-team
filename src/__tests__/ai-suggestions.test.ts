import { computeAiSuggestions } from '@/lib/aiSuggestions';
import { mockCards } from '@/data/mockCards';

describe('AI suggestion layer TDD', () => {
  it('orders urgent items by priority then staleness', () => {
    const result = computeAiSuggestions(mockCards);
    expect(result.nextActions[0].id).toBe('PR-1');
    expect(result.nextActions).toHaveLength(3);
    expect(result.bottleneck.description).toMatch(/IN_PROGRESS/);
    expect(result.reviewerHints[0].suggestedReviewer).toBeDefined();
  });
});

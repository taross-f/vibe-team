import { render, screen, within } from '@testing-library/react';
import BoardPage from '@app/board/page';
import { useRoleStore } from '@/state/useRoleStore';
import { mockCards } from '@/data/mockCards';

describe('Board page TDD - adaptive board', () => {
  beforeEach(() => {
    useRoleStore.getState().reset();
  });

  it('renders the kanban columns with mock data', () => {
    useRoleStore.setState({ isAuthenticated: true, role: 'TechLead' });
    render(<BoardPage />);

    const columns = ['Backlog', 'In Progress', 'In Review', 'Changes Requested', 'Done'];
    columns.forEach((label) => {
      expect(screen.getByRole('heading', { name: label })).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Board skeleton/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Refine auth flow/).length).toBeGreaterThan(0);
    expect(screen.getByText(/QA checklist/)).toBeInTheDocument();
    expect(mockCards.length).toBeGreaterThan(0);
  });

  it('pushes SWE assigned work to the top of columns', () => {
    useRoleStore.setState({
      isAuthenticated: true,
      role: 'SWE',
      currentUser: {
        id: 'user-1',
        name: 'Adaptive Member',
        avatarUrl: 'avatar',
        role: 'SWE',
      },
    });

    render(<BoardPage />);
    const inProgress = screen.getByTestId('column-IN_PROGRESS');
    const cardTitles = within(inProgress)
      .getAllByTestId('card-title')
      .map((el) => el.textContent);

    expect(cardTitles[0]).toContain('Board skeleton');
    expect(cardTitles[1]).toContain('Onboarding UX');
  });

  it('shows AI suggestions with priority ordering', () => {
    useRoleStore.setState({ isAuthenticated: true, role: 'TechLead' });
    render(<BoardPage />);

    const suggestionList = screen.getByTestId('ai-suggestion-list');
    const items = within(suggestionList).getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(3);
    expect(items[0].textContent).toMatch(/Refine auth flow/);
  });
});

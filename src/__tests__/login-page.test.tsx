import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@app/login/page';
import { useRoleStore } from '@/state/useRoleStore';

describe('Login page TDD - role selection', () => {
  beforeEach(() => {
    useRoleStore.getState().reset();
  });

  it('exposes role choices after the user triggers GitHub login', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /GitHub OAuth login/i })).toBeInTheDocument();
    const loginButton = screen.getByRole('button', { name: /simulate github login/i });
    await user.click(loginButton);

    const roleButtons = screen.getAllByRole('button', { name: /TechLead|SWE|PdM|QA|Designer/ });
    expect(roleButtons).toHaveLength(5);
    expect(screen.getByText('Choose your role to continue')).toBeInTheDocument();
  });

  it('persists the selected role in the Zustand store', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole('button', { name: /simulate github login/i }));
    await user.click(screen.getByRole('button', { name: 'TechLead' }));

    expect(screen.getByText(/role selected: techlead/i)).toBeInTheDocument();
    expect(useRoleStore.getState().role).toBe('TechLead');
    expect(useRoleStore.getState().isAuthenticated).toBe(true);
  });
});

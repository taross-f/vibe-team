import { create } from 'zustand';

export type UserRole = 'TechLead' | 'SWE' | 'PdM' | 'QA' | 'Designer';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: UserRole | null;
}

interface RoleState {
  role: UserRole | null;
  isAuthenticated: boolean;
  currentUser: User;
  loginWithGitHub: () => void;
  selectRole: (role: UserRole) => void;
  reset: () => void;
}

const initialUser: User = {
  id: 'user-1',
  name: 'Adaptive Member',
  avatarUrl: 'https://avatars.githubusercontent.com/u/0?v=4',
  role: null,
};

export const useRoleStore = create<RoleState>((set) => ({
  role: null,
  isAuthenticated: false,
  currentUser: initialUser,
  loginWithGitHub: () => set(() => ({ isAuthenticated: true })),
  selectRole: (role) =>
    set((state) => {
      if (!state.isAuthenticated) {
        throw new Error('Cannot set role before authentication');
      }
      return {
        role,
        currentUser: { ...state.currentUser, role },
      };
    }),
  reset: () =>
    set(() => ({
      role: null,
      isAuthenticated: false,
      currentUser: initialUser,
    })),
}));

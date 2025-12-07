import type { UserRole } from '@/state/useRoleStore';

export type CardType = 'PR' | 'ISSUE' | 'TASK';
export type CardStatus =
  | 'BACKLOG'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'CHANGES_REQUESTED'
  | 'DONE';

export interface Card {
  id: string;
  type: CardType;
  title: string;
  status: CardStatus;
  assigneeId: string | null;
  updatedAt: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dependencyIds: string[];
  tags?: UserRole[];
}

export const mockCards: Card[] = [
  {
    id: 'PR-1',
    type: 'PR',
    title: 'Refine auth flow and webhooks',
    status: 'IN_REVIEW',
    assigneeId: 'user-2',
    updatedAt: '2024-11-25T10:00:00.000Z',
    priority: 'HIGH',
    dependencyIds: ['TASK-1'],
    tags: ['TechLead'],
  },
  {
    id: 'TASK-1',
    type: 'TASK',
    title: 'Board skeleton and vibes',
    status: 'IN_PROGRESS',
    assigneeId: 'user-1',
    updatedAt: '2024-11-28T08:00:00.000Z',
    priority: 'HIGH',
    dependencyIds: [],
    tags: ['SWE', 'Designer'],
  },
  {
    id: 'ISSUE-1',
    type: 'ISSUE',
    title: 'UI polish backlog triage',
    status: 'BACKLOG',
    assigneeId: null,
    updatedAt: '2024-11-20T12:00:00.000Z',
    priority: 'LOW',
    dependencyIds: [],
    tags: ['Designer'],
  },
  {
    id: 'PR-2',
    type: 'PR',
    title: 'API schema sync for flows',
    status: 'CHANGES_REQUESTED',
    assigneeId: 'user-1',
    updatedAt: '2024-11-26T09:00:00.000Z',
    priority: 'MEDIUM',
    dependencyIds: ['PR-1'],
    tags: ['TechLead', 'SWE'],
  },
  {
    id: 'TASK-2',
    type: 'TASK',
    title: 'QA checklist for adaptive view',
    status: 'DONE',
    assigneeId: 'user-3',
    updatedAt: '2024-11-18T10:00:00.000Z',
    priority: 'MEDIUM',
    dependencyIds: [],
    tags: ['QA'],
  },
  {
    id: 'PR-3',
    type: 'PR',
    title: 'Onboarding UX hints',
    status: 'IN_PROGRESS',
    assigneeId: 'user-2',
    updatedAt: '2024-11-27T13:00:00.000Z',
    priority: 'HIGH',
    dependencyIds: ['ISSUE-1'],
    tags: ['Designer'],
  },
];

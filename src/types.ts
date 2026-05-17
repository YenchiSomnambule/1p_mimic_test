export type IssueType = 'story' | 'bug' | 'task' | 'epic';
export type Priority = 'highest' | 'high' | 'medium' | 'low' | 'lowest';
export type Status = 'todo' | 'inprogress' | 'inreview' | 'done';

export interface Comment {
  id: string;
  author: string;
  body: string;
  createdAt: number;
}

export interface Issue {
  id: string;
  key: string;
  title: string;
  description: string;
  type: IssueType;
  priority: Priority;
  status: Status;
  assignee: string | null;
  reporter: string;
  storyPoints: number | null;
  sprintId: string | null;
  labels: string[];
  comments: Comment[];
  createdAt: number;
  order: number;
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  active: boolean;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  color: string;
}

export interface Project {
  name: string;
  key: string;
}

export interface AppState {
  project: Project;
  users: User[];
  sprints: Sprint[];
  issues: Issue[];
  counter: number;
}

export const STATUSES: { id: Status; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'inprogress', label: 'In Progress' },
  { id: 'inreview', label: 'In Review' },
  { id: 'done', label: 'Done' },
];

export const TYPE_META: Record<IssueType, { label: string; icon: string; color: string }> = {
  story: { label: 'Story', icon: '☰', color: '#63ba3c' },
  bug: { label: 'Bug', icon: '●', color: '#e5493a' },
  task: { label: 'Task', icon: '✓', color: '#4bade8' },
  epic: { label: 'Epic', icon: '⚡', color: '#904ee2' },
};

export const PRIORITY_META: Record<Priority, { label: string; icon: string; color: string }> = {
  highest: { label: 'Highest', icon: '▲', color: '#cd1317' },
  high: { label: 'High', icon: '▲', color: '#e9494a' },
  medium: { label: 'Medium', icon: '■', color: '#e97f33' },
  low: { label: 'Low', icon: '▼', color: '#2d8738' },
  lowest: { label: 'Lowest', icon: '▼', color: '#57a55a' },
};

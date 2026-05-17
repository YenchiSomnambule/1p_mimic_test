import { AppState, Issue, IssueType, Priority, Status } from './types';

const users = [
  { id: 'u1', name: 'Alex Rivera', color: '#0052cc' },
  { id: 'u2', name: 'Sam Chen', color: '#36b37e' },
  { id: 'u3', name: 'Jordan Blake', color: '#ff5630' },
  { id: 'u4', name: 'Priya Nair', color: '#6554c0' },
];

interface SeedIssue {
  title: string;
  type: IssueType;
  priority: Priority;
  status: Status;
  points: number | null;
  sprint: string | null;
  assignee: string | null;
  desc: string;
}

const seedIssues: SeedIssue[] = [
  { title: 'Set up CI/CD pipeline', type: 'task', priority: 'high', status: 'done', points: 5, sprint: 's1', assignee: 'u1', desc: 'Configure automated builds and deployments.' },
  { title: 'Design login screen', type: 'story', priority: 'medium', status: 'done', points: 3, sprint: 's1', assignee: 'u4', desc: 'Create the UI for user authentication.' },
  { title: 'Login button unresponsive on mobile', type: 'bug', priority: 'highest', status: 'inprogress', points: 2, sprint: 's1', assignee: 'u2', desc: 'Tapping the login button does nothing on iOS Safari.' },
  { title: 'Implement user profile page', type: 'story', priority: 'medium', status: 'inprogress', points: 8, sprint: 's1', assignee: 'u3', desc: 'Users should be able to view and edit their profile.' },
  { title: 'Add password reset flow', type: 'story', priority: 'high', status: 'inreview', points: 5, sprint: 's1', assignee: 'u1', desc: 'Email-based password recovery.' },
  { title: 'Write API documentation', type: 'task', priority: 'low', status: 'todo', points: 3, sprint: 's1', assignee: null, desc: 'Document all public REST endpoints.' },
  { title: 'Dark mode support', type: 'story', priority: 'low', status: 'todo', points: 5, sprint: null, assignee: null, desc: 'Add a theme toggle and dark color palette.' },
  { title: 'Optimize database queries', type: 'task', priority: 'medium', status: 'todo', points: 8, sprint: null, assignee: 'u2', desc: 'Reduce N+1 queries on the dashboard.' },
  { title: 'Crash when uploading large files', type: 'bug', priority: 'high', status: 'todo', points: 3, sprint: null, assignee: null, desc: 'App crashes for uploads over 50MB.' },
  { title: 'Notifications system', type: 'epic', priority: 'medium', status: 'todo', points: null, sprint: null, assignee: 'u4', desc: 'In-app and email notifications across the product.' },
  { title: 'Search functionality', type: 'story', priority: 'high', status: 'todo', points: 13, sprint: null, assignee: null, desc: 'Global search across issues and projects.' },
  { title: 'Onboarding tour for new users', type: 'story', priority: 'low', status: 'todo', points: 5, sprint: null, assignee: 'u3', desc: 'Guided walkthrough on first login.' },
];

export function createSeedState(): AppState {
  const now = Date.now();
  const issues: Issue[] = seedIssues.map((s, i) => ({
    id: `i${i + 1}`,
    key: `WEB-${i + 1}`,
    title: s.title,
    description: s.desc,
    type: s.type,
    priority: s.priority,
    status: s.status,
    assignee: s.assignee,
    reporter: 'u1',
    storyPoints: s.points,
    sprintId: s.sprint,
    labels: [],
    comments: [],
    createdAt: now - (seedIssues.length - i) * 86400000,
    order: i,
  }));

  return {
    project: { name: 'Web Platform', key: 'WEB' },
    users,
    sprints: [
      { id: 's1', name: 'WEB Sprint 1', goal: 'Ship authentication and core profile features.', active: true, completed: false },
      { id: 's2', name: 'WEB Sprint 2', goal: '', active: false, completed: false },
    ],
    issues,
    counter: seedIssues.length,
  };
}

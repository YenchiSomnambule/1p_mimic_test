import { Issue, IssueType } from '../types';

export interface Filters {
  search: string;
  type: IssueType | 'all';
  assignee: string | 'all' | 'unassigned';
}

export const emptyFilters: Filters = { search: '', type: 'all', assignee: 'all' };

export function matchesFilters(issue: Issue, f: Filters): boolean {
  if (f.search.trim()) {
    const q = f.search.trim().toLowerCase();
    const hit =
      issue.title.toLowerCase().includes(q) ||
      issue.key.toLowerCase().includes(q) ||
      issue.description.toLowerCase().includes(q);
    if (!hit) return false;
  }
  if (f.type !== 'all' && issue.type !== f.type) return false;
  if (f.assignee === 'unassigned' && issue.assignee != null) return false;
  if (f.assignee !== 'all' && f.assignee !== 'unassigned' && issue.assignee !== f.assignee)
    return false;
  return true;
}

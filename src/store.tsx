import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AppState, Comment, Issue, Sprint, Status } from './types';
import { createSeedState } from './seed';

const STORAGE_KEY = 'jira-clone-state-v1';

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppState;
  } catch {
    /* ignore corrupt storage */
  }
  return createSeedState();
}

interface Store {
  state: AppState;
  createIssue: (data: Partial<Issue>) => Issue;
  updateIssue: (id: string, patch: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;
  moveIssue: (id: string, status: Status, beforeId: string | null) => void;
  setIssueSprint: (id: string, sprintId: string | null) => void;
  addComment: (issueId: string, body: string, author: string) => void;
  createSprint: () => void;
  updateSprint: (id: string, patch: Partial<Sprint>) => void;
  startSprint: (id: string) => void;
  completeSprint: (id: string) => void;
  resetData: () => void;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const createIssue = useCallback((data: Partial<Issue>): Issue => {
    let created!: Issue;
    setState((s) => {
      const n = s.counter + 1;
      created = {
        id: `i${n}-${Date.now()}`,
        key: `${s.project.key}-${n}`,
        title: data.title || 'Untitled issue',
        description: data.description || '',
        type: data.type || 'task',
        priority: data.priority || 'medium',
        status: data.status || 'todo',
        assignee: data.assignee ?? null,
        reporter: data.reporter || s.users[0].id,
        storyPoints: data.storyPoints ?? null,
        sprintId: data.sprintId ?? null,
        labels: data.labels || [],
        comments: [],
        createdAt: Date.now(),
        order: s.issues.length,
      };
      return { ...s, counter: n, issues: [...s.issues, created] };
    });
    return created;
  }, []);

  const updateIssue = useCallback((id: string, patch: Partial<Issue>) => {
    setState((s) => ({
      ...s,
      issues: s.issues.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    }));
  }, []);

  const deleteIssue = useCallback((id: string) => {
    setState((s) => ({ ...s, issues: s.issues.filter((i) => i.id !== id) }));
  }, []);

  const moveIssue = useCallback((id: string, status: Status, beforeId: string | null) => {
    setState((s) => {
      const moving = s.issues.find((i) => i.id === id);
      if (!moving) return s;
      const updated = { ...moving, status };
      const rest = s.issues.filter((i) => i.id !== id);
      const idx = beforeId ? rest.findIndex((i) => i.id === beforeId) : -1;
      const next = [...rest];
      if (idx === -1) next.push(updated);
      else next.splice(idx, 0, updated);
      return { ...s, issues: next.map((i, n) => ({ ...i, order: n })) };
    });
  }, []);

  const setIssueSprint = useCallback((id: string, sprintId: string | null) => {
    setState((s) => ({
      ...s,
      issues: s.issues.map((i) => (i.id === id ? { ...i, sprintId } : i)),
    }));
  }, []);

  const addComment = useCallback((issueId: string, body: string, author: string) => {
    const comment: Comment = { id: `c${Date.now()}`, author, body, createdAt: Date.now() };
    setState((s) => ({
      ...s,
      issues: s.issues.map((i) =>
        i.id === issueId ? { ...i, comments: [...i.comments, comment] } : i
      ),
    }));
  }, []);

  const createSprint = useCallback(() => {
    setState((s) => {
      const num = s.sprints.length + 1;
      const sprint: Sprint = {
        id: `s${num}-${Date.now()}`,
        name: `${s.project.key} Sprint ${num}`,
        goal: '',
        active: false,
        completed: false,
      };
      return { ...s, sprints: [...s.sprints, sprint] };
    });
  }, []);

  const updateSprint = useCallback((id: string, patch: Partial<Sprint>) => {
    setState((s) => ({
      ...s,
      sprints: s.sprints.map((sp) => (sp.id === id ? { ...sp, ...patch } : sp)),
    }));
  }, []);

  const startSprint = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      sprints: s.sprints.map((sp) => (sp.id === id ? { ...sp, active: true } : sp)),
    }));
  }, []);

  const completeSprint = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      sprints: s.sprints.map((sp) =>
        sp.id === id ? { ...sp, active: false, completed: true } : sp
      ),
      issues: s.issues.map((i) =>
        i.sprintId === id && i.status !== 'done' ? { ...i, sprintId: null } : i
      ),
    }));
  }, []);

  const resetData = useCallback(() => {
    setState(createSeedState());
  }, []);

  const store = useMemo<Store>(
    () => ({
      state,
      createIssue,
      updateIssue,
      deleteIssue,
      moveIssue,
      setIssueSprint,
      addComment,
      createSprint,
      updateSprint,
      startSprint,
      completeSprint,
      resetData,
    }),
    [
      state,
      createIssue,
      updateIssue,
      deleteIssue,
      moveIssue,
      setIssueSprint,
      addComment,
      createSprint,
      updateSprint,
      startSprint,
      completeSprint,
      resetData,
    ]
  );

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

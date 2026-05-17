import { useState } from 'react';
import { useStore } from './store';
import { Sidebar } from './components/Sidebar';
import { Board } from './components/Board';
import { Backlog } from './components/Backlog';
import { IssueModal } from './components/IssueModal';
import { CreateIssueModal } from './components/CreateIssueModal';
import { Avatar } from './components/common';
import { Filters, emptyFilters } from './components/filters';
import { TYPE_META } from './types';

export function App() {
  const { state } = useStore();
  const [view, setView] = useState<'board' | 'backlog'>('board');
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [openIssueId, setOpenIssueId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="app">
      <Sidebar view={view} onChangeView={setView} />

      <div className="main">
        <header className="topbar">
          <div className="breadcrumb">
            <span>{state.project.name}</span>
            <span className="crumb-sep">/</span>
            <strong>{view === 'board' ? 'Board' : 'Backlog'}</strong>
          </div>

          <div className="topbar-controls">
            <input
              className="search-input"
              placeholder="Search issues..."
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            />
            <select
              className="filter-select"
              value={filters.type}
              onChange={(e) =>
                setFilters((f) => ({ ...f, type: e.target.value as Filters['type'] }))
              }
            >
              <option value="all">All types</option>
              {Object.entries(TYPE_META).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filters.assignee}
              onChange={(e) =>
                setFilters((f) => ({ ...f, assignee: e.target.value as Filters['assignee'] }))
              }
            >
              <option value="all">All assignees</option>
              <option value="unassigned">Unassigned</option>
              {state.users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <div className="avatar-stack">
              {state.users.map((u) => (
                <Avatar key={u.id} user={u} size={28} />
              ))}
            </div>
            <button className="btn btn-primary" onClick={() => setCreating(true)}>
              + Create
            </button>
          </div>
        </header>

        <main className="content">
          {view === 'board' ? (
            <Board filters={filters} onOpenIssue={setOpenIssueId} />
          ) : (
            <Backlog filters={filters} onOpenIssue={setOpenIssueId} />
          )}
        </main>
      </div>

      {openIssueId && (
        <IssueModal issueId={openIssueId} onClose={() => setOpenIssueId(null)} />
      )}
      {creating && (
        <CreateIssueModal
          onClose={() => setCreating(false)}
          onCreated={(id) => {
            setCreating(false);
            setOpenIssueId(id);
          }}
        />
      )}
    </div>
  );
}

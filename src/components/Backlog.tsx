import { useMemo, useState } from 'react';
import { useStore } from '../store';
import { Issue, PRIORITY_META, Sprint, User } from '../types';
import { Avatar, PriorityIcon, TypeIcon } from './common';
import { Filters, matchesFilters } from './filters';

interface Props {
  filters: Filters;
  onOpenIssue: (id: string) => void;
}

export function Backlog({ filters, onOpenIssue }: Props) {
  const { state, createSprint, startSprint, completeSprint, setIssueSprint } = useStore();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropZone, setDropZone] = useState<string | null>(null);

  const visible = useMemo(
    () => state.issues.filter((i) => matchesFilters(i, filters)),
    [state.issues, filters]
  );

  const openSprints = state.sprints.filter((s) => !s.completed);

  function handleDrop(sprintId: string | null) {
    if (draggingId) setIssueSprint(draggingId, sprintId);
    setDraggingId(null);
    setDropZone(null);
  }

  function points(list: Issue[]) {
    return list.reduce((sum, i) => sum + (i.storyPoints || 0), 0);
  }

  const renderSection = (key: string, list: Issue[], header: React.ReactNode) => (
    <div
      key={key}
      className={`backlog-section${dropZone === key ? ' drop-active' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDropZone(key);
      }}
      onDragLeave={() => setDropZone((z) => (z === key ? null : z))}
      onDrop={() => handleDrop(key === 'backlog' ? null : key)}
    >
      <div className="backlog-section-header">{header}</div>
      <div className="backlog-list">
        {list.map((issue) => (
          <BacklogRow
            key={issue.id}
            issue={issue}
            users={state.users}
            dragging={draggingId === issue.id}
            onClick={() => onOpenIssue(issue.id)}
            onDragStart={() => setDraggingId(issue.id)}
            onDragEnd={() => setDraggingId(null)}
          />
        ))}
        {list.length === 0 && <div className="backlog-empty">No issues — drag issues here</div>}
      </div>
    </div>
  );

  return (
    <div className="backlog-view">
      <div className="backlog-toolbar">
        <h2>Backlog</h2>
        <button className="btn" onClick={createSprint}>
          + Create sprint
        </button>
      </div>

      {openSprints.map((sprint: Sprint) => {
        const list = visible
          .filter((i) => i.sprintId === sprint.id)
          .sort((a, b) => a.order - b.order);
        const done = list.filter((i) => i.status === 'done').length;
        return renderSection(
          sprint.id,
          list,
          <>
            <div className="backlog-section-title">
              <strong>{sprint.name}</strong>
              {sprint.active && <span className="badge-active">Active</span>}
              <span className="backlog-meta">
                {list.length} issues · {points(list)} pts · {done} done
              </span>
            </div>
            {sprint.active ? (
              <button className="btn" onClick={() => completeSprint(sprint.id)}>
                Complete sprint
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={list.length === 0}
                onClick={() => startSprint(sprint.id)}
              >
                Start sprint
              </button>
            )}
          </>
        );
      })}

      {renderSection(
        'backlog',
        visible.filter((i) => i.sprintId == null).sort((a, b) => a.order - b.order),
        <div className="backlog-section-title">
          <strong>Backlog</strong>
          <span className="backlog-meta">
            {visible.filter((i) => i.sprintId == null).length} issues
          </span>
        </div>
      )}
    </div>
  );
}

function BacklogRow({
  issue,
  users,
  dragging,
  onClick,
  onDragStart,
  onDragEnd,
}: {
  issue: Issue;
  users: User[];
  dragging: boolean;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const assignee = users.find((u) => u.id === issue.assignee) || null;
  return (
    <div
      className={`backlog-row${dragging ? ' dragging' : ''}${
        issue.status === 'done' ? ' is-done' : ''
      }`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <TypeIcon type={issue.type} />
      <span className="backlog-row-key">{issue.key}</span>
      <span className="backlog-row-title">{issue.title}</span>
      <span className="backlog-row-spacer" />
      <PriorityIcon priority={issue.priority} />
      <span className="backlog-row-status" data-status={issue.status}>
        {issue.status === 'todo'
          ? 'To Do'
          : issue.status === 'inprogress'
          ? 'In Progress'
          : issue.status === 'inreview'
          ? 'In Review'
          : 'Done'}
      </span>
      {issue.storyPoints != null && <span className="points-badge">{issue.storyPoints}</span>}
      <Avatar user={assignee} size={24} />
      <span className="sr-only">{PRIORITY_META[issue.priority].label}</span>
    </div>
  );
}

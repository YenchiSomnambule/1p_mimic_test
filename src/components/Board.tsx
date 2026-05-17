import { useMemo, useState } from 'react';
import { useStore } from '../store';
import { Issue, STATUSES, Status } from '../types';
import { IssueCard } from './IssueCard';
import { Filters, matchesFilters } from './filters';

interface Props {
  filters: Filters;
  onOpenIssue: (id: string) => void;
}

export function Board({ filters, onOpenIssue }: Props) {
  const { state, moveIssue } = useStore();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{ col: Status; before: string | null } | null>(null);

  const activeSprint = state.sprints.find((s) => s.active && !s.completed);

  const visible = useMemo(
    () =>
      state.issues
        .filter((i) => activeSprint && i.sprintId === activeSprint.id)
        .filter((i) => matchesFilters(i, filters))
        .sort((a, b) => a.order - b.order),
    [state.issues, activeSprint, filters]
  );

  const byStatus = (st: Status) => visible.filter((i) => i.status === st);

  function handleDrop(col: Status) {
    if (draggingId) {
      moveIssue(draggingId, col, dropTarget?.before ?? null);
    }
    setDraggingId(null);
    setDropTarget(null);
  }

  if (!activeSprint) {
    return (
      <div className="empty-state">
        <h2>No active sprint</h2>
        <p>Start a sprint from the Backlog to populate the board.</p>
      </div>
    );
  }

  return (
    <div className="board-view">
      <div className="board-header">
        <div>
          <div className="board-sprint-name">{activeSprint.name}</div>
          {activeSprint.goal && <div className="board-sprint-goal">{activeSprint.goal}</div>}
        </div>
        <div className="board-count">{visible.length} issues</div>
      </div>
      <div className="board-columns">
        {STATUSES.map((col) => {
          const colIssues = byStatus(col.id);
          return (
            <div
              key={col.id}
              className={`board-column${dropTarget?.col === col.id ? ' drop-active' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                if (!dropTarget || dropTarget.col !== col.id) {
                  setDropTarget({ col: col.id, before: null });
                }
              }}
              onDrop={() => handleDrop(col.id)}
            >
              <div className="board-column-header">
                <span>{col.label}</span>
                <span className="board-column-count">{colIssues.length}</span>
              </div>
              <div className="board-column-body">
                {colIssues.map((issue: Issue) => (
                  <div
                    key={issue.id}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDropTarget({ col: col.id, before: issue.id });
                    }}
                  >
                    <IssueCard
                      issue={issue}
                      users={state.users}
                      dragging={draggingId === issue.id}
                      onClick={() => onOpenIssue(issue.id)}
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = 'move';
                        setDraggingId(issue.id);
                      }}
                    />
                  </div>
                ))}
                {colIssues.length === 0 && <div className="board-column-empty">Drop issues here</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

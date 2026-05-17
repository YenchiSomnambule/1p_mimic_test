import { Issue, User } from '../types';
import { Avatar, PriorityIcon, TypeIcon } from './common';

interface Props {
  issue: Issue;
  users: User[];
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  dragging: boolean;
}

export function IssueCard({ issue, users, onClick, onDragStart, dragging }: Props) {
  const assignee = users.find((u) => u.id === issue.assignee) || null;
  return (
    <div
      className={`issue-card${dragging ? ' dragging' : ''}`}
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
    >
      <div className="issue-card-title">{issue.title}</div>
      {issue.labels.length > 0 && (
        <div className="issue-card-labels">
          {issue.labels.map((l) => (
            <span key={l} className="label-chip">
              {l}
            </span>
          ))}
        </div>
      )}
      <div className="issue-card-footer">
        <div className="issue-card-meta">
          <TypeIcon type={issue.type} />
          <PriorityIcon priority={issue.priority} />
          <span className="issue-key">{issue.key}</span>
        </div>
        <div className="issue-card-right">
          {issue.storyPoints != null && (
            <span className="points-badge">{issue.storyPoints}</span>
          )}
          <Avatar user={assignee} size={24} />
        </div>
      </div>
    </div>
  );
}

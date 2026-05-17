import { useState } from 'react';
import { useStore } from '../store';
import { IssueType, PRIORITY_META, Priority, STATUSES, Status, TYPE_META } from '../types';
import { Avatar, TypeIcon, timeAgo } from './common';

interface Props {
  issueId: string;
  onClose: () => void;
}

export function IssueModal({ issueId, onClose }: Props) {
  const { state, updateIssue, deleteIssue, addComment } = useStore();
  const issue = state.issues.find((i) => i.id === issueId);
  const [comment, setComment] = useState('');
  const [labelInput, setLabelInput] = useState('');

  if (!issue) return null;

  const reporter = state.users.find((u) => u.id === issue.reporter) || null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <TypeIcon type={issue.type} />
            <span className="issue-key">{issue.key}</span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body issue-modal-body">
          <div className="issue-modal-main">
            <input
              className="issue-title-input"
              value={issue.title}
              onChange={(e) => updateIssue(issue.id, { title: e.target.value })}
            />

            <label className="field-label">Description</label>
            <textarea
              className="issue-desc-input"
              value={issue.description}
              placeholder="Add a description..."
              rows={5}
              onChange={(e) => updateIssue(issue.id, { description: e.target.value })}
            />

            <label className="field-label">Labels</label>
            <div className="label-editor">
              {issue.labels.map((l) => (
                <span key={l} className="label-chip removable">
                  {l}
                  <button
                    onClick={() =>
                      updateIssue(issue.id, { labels: issue.labels.filter((x) => x !== l) })
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
              <input
                className="label-input"
                placeholder="Add label + Enter"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && labelInput.trim()) {
                    const v = labelInput.trim();
                    if (!issue.labels.includes(v)) {
                      updateIssue(issue.id, { labels: [...issue.labels, v] });
                    }
                    setLabelInput('');
                  }
                }}
              />
            </div>

            <label className="field-label">Comments ({issue.comments.length})</label>
            <div className="comment-compose">
              <textarea
                rows={2}
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="btn btn-primary"
                disabled={!comment.trim()}
                onClick={() => {
                  addComment(issue.id, comment.trim(), state.users[0].id);
                  setComment('');
                }}
              >
                Comment
              </button>
            </div>
            <div className="comment-list">
              {issue.comments
                .slice()
                .reverse()
                .map((c) => {
                  const author = state.users.find((u) => u.id === c.author) || null;
                  return (
                    <div key={c.id} className="comment">
                      <Avatar user={author} size={28} />
                      <div className="comment-body">
                        <div className="comment-meta">
                          <strong>{author?.name || 'Unknown'}</strong>
                          <span>{timeAgo(c.createdAt)}</span>
                        </div>
                        <div>{c.body}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="issue-modal-side">
            <label className="field-label">Status</label>
            <select
              value={issue.status}
              onChange={(e) => updateIssue(issue.id, { status: e.target.value as Status })}
            >
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>

            <label className="field-label">Type</label>
            <select
              value={issue.type}
              onChange={(e) => updateIssue(issue.id, { type: e.target.value as IssueType })}
            >
              {Object.entries(TYPE_META).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>

            <label className="field-label">Priority</label>
            <select
              value={issue.priority}
              onChange={(e) => updateIssue(issue.id, { priority: e.target.value as Priority })}
            >
              {Object.entries(PRIORITY_META).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>

            <label className="field-label">Assignee</label>
            <select
              value={issue.assignee || ''}
              onChange={(e) =>
                updateIssue(issue.id, { assignee: e.target.value || null })
              }
            >
              <option value="">Unassigned</option>
              {state.users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            <label className="field-label">Sprint</label>
            <select
              value={issue.sprintId || ''}
              onChange={(e) => updateIssue(issue.id, { sprintId: e.target.value || null })}
            >
              <option value="">Backlog</option>
              {state.sprints
                .filter((s) => !s.completed)
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
            </select>

            <label className="field-label">Story points</label>
            <input
              type="number"
              min={0}
              value={issue.storyPoints ?? ''}
              onChange={(e) =>
                updateIssue(issue.id, {
                  storyPoints: e.target.value === '' ? null : Number(e.target.value),
                })
              }
            />

            <div className="side-meta">
              <div>
                Reporter: <Avatar user={reporter} size={20} /> {reporter?.name}
              </div>
              <div>Created {timeAgo(issue.createdAt)}</div>
            </div>

            <button
              className="btn btn-danger"
              onClick={() => {
                if (confirm('Delete this issue?')) {
                  deleteIssue(issue.id);
                  onClose();
                }
              }}
            >
              Delete issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

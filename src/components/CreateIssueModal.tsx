import { useState } from 'react';
import { useStore } from '../store';
import { IssueType, PRIORITY_META, Priority, STATUSES, Status, TYPE_META } from '../types';

interface Props {
  onClose: () => void;
  onCreated: (id: string) => void;
}

export function CreateIssueModal({ onClose, onCreated }: Props) {
  const { state, createIssue } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<IssueType>('task');
  const [priority, setPriority] = useState<Priority>('medium');
  const [status, setStatus] = useState<Status>('todo');
  const [assignee, setAssignee] = useState('');
  const [sprintId, setSprintId] = useState('');
  const [points, setPoints] = useState('');

  function submit() {
    if (!title.trim()) return;
    const issue = createIssue({
      title: title.trim(),
      description,
      type,
      priority,
      status,
      assignee: assignee || null,
      sprintId: sprintId || null,
      storyPoints: points === '' ? null : Number(points),
    });
    onCreated(issue.id);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create issue</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body create-form">
          <label className="field-label">Summary</label>
          <input
            autoFocus
            value={title}
            placeholder="What needs to be done?"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />

          <label className="field-label">Description</label>
          <textarea
            rows={3}
            value={description}
            placeholder="Add more detail..."
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="create-form-grid">
            <div>
              <label className="field-label">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as IssueType)}>
                {Object.entries(TYPE_META).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                {Object.entries(PRIORITY_META).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Assignee</label>
              <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                <option value="">Unassigned</option>
                {state.users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Sprint</label>
              <select value={sprintId} onChange={(e) => setSprintId(e.target.value)}>
                <option value="">Backlog</option>
                {state.sprints
                  .filter((s) => !s.completed)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="field-label">Story points</label>
              <input
                type="number"
                min={0}
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!title.trim()} onClick={submit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

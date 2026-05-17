import { Issue, PRIORITY_META, TYPE_META, User } from '../types';

export function Avatar({ user, size = 24 }: { user: User | null; size?: number }) {
  if (!user) {
    return (
      <span
        className="avatar avatar-empty"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        title="Unassigned"
      >
        ?
      </span>
    );
  }
  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.42, background: user.color }}
      title={user.name}
    >
      {initials}
    </span>
  );
}

export function TypeIcon({ type }: { type: Issue['type'] }) {
  const m = TYPE_META[type];
  return (
    <span className="type-icon" style={{ background: m.color }} title={m.label}>
      {m.icon}
    </span>
  );
}

export function PriorityIcon({ priority }: { priority: Issue['priority'] }) {
  const m = PRIORITY_META[priority];
  return (
    <span className="priority-icon" style={{ color: m.color }} title={m.label}>
      {m.icon}
    </span>
  );
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

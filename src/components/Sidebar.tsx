import { useStore } from '../store';
import { Avatar } from './common';

interface Props {
  view: 'board' | 'backlog';
  onChangeView: (v: 'board' | 'backlog') => void;
}

export function Sidebar({ view, onChangeView }: Props) {
  const { state, resetData } = useStore();

  return (
    <aside className="sidebar">
      <div className="sidebar-project">
        <div className="project-avatar">{state.project.key.slice(0, 2)}</div>
        <div>
          <div className="project-name">{state.project.name}</div>
          <div className="project-sub">Software project</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Planning</div>
        <button
          className={`nav-item${view === 'board' ? ' active' : ''}`}
          onClick={() => onChangeView('board')}
        >
          <span className="nav-icon">▤</span> Board
        </button>
        <button
          className={`nav-item${view === 'backlog' ? ' active' : ''}`}
          onClick={() => onChangeView('backlog')}
        >
          <span className="nav-icon">≡</span> Backlog
        </button>
      </nav>

      <div className="sidebar-team">
        <div className="sidebar-section-label">Team</div>
        {state.users.map((u) => (
          <div key={u.id} className="team-member">
            <Avatar user={u} size={26} />
            <span>{u.name}</span>
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={() => confirm('Reset all data?') && resetData()}>
        Reset demo data
      </button>
    </aside>
  );
}

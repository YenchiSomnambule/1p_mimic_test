# Jira Clone

A functional Jira-like project management application built with React, TypeScript, and Vite. This app mimics the core features of Jira, including a Kanban board, backlog management, and sprint planning.

## Features

- **Board View** – Kanban-style board with columns for To Do, In Progress, In Review, and Done
- **Backlog View** – Full backlog list with sprint management and issue ordering
- **Sprint Management** – Create and manage sprints; move issues between backlog and active sprint
- **Issue Management** – Create, view, and edit issues with detailed modal dialogs
- **Issue Types** – Supports Story, Bug, Task, and Epic with distinct icons and colors
- **Priority Levels** – Five priority levels: Highest, High, Medium, Low, Lowest
- **Assignee & Reporter** – Assign issues to team members with avatar display
- **Story Points** – Estimate effort with story points per issue
- **Labels** – Tag issues with custom labels
- **Comments** – Add comments to issues
- **Filtering** – Filter issues by type, assignee, and free-text search
- **Persistent State** – Application state managed via a custom React store (Context + useReducer)

## Tech Stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## Project Structure

```
src/
├── components/
│   ├── App.tsx              # Root component with layout, routing, and filters
│   ├── Board.tsx            # Kanban board view
│   ├── Backlog.tsx          # Backlog and sprint management view
│   ├── IssueCard.tsx        # Individual issue card component
│   ├── IssueModal.tsx       # Issue detail / edit modal
│   ├── CreateIssueModal.tsx # New issue creation modal
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── common.tsx           # Shared UI components (Avatar, etc.)
│   └── filters.ts           # Filter type definitions and helpers
├── store.tsx                # Global app state (Context + useReducer)
├── types.ts                 # TypeScript type definitions and constants
├── seed.ts                  # Initial seed data for demo
├── main.tsx                 # App entry point
└── styles.css               # Global styles
```

## Data Model

| Entity | Key Fields |
|--------|-----------|
| `Issue` | id, key, title, description, type, priority, status, assignee, reporter, storyPoints, sprintId, labels, comments |
| `Sprint` | id, name, goal, active, completed |
| `User`  | id, name, color |
| `Project` | name, key |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YenchiSomnambule/1p_mimic_test.git
cd 1p_mimic_test

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## License

MIT


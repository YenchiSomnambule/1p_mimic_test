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


---

## 中文說明
### 項目簡介
這是一個使用 React、TypeScript 和 Vite 構建的 Jira 仿製應用程式。
它模擬了 Jira 的核心功能，包括看板（Kanban Board）、待辦事項列表（Backlog）和 Sprint 規劃。
### 主要功能
- **看板視圖（Board View）**：以 Kanban 形式展示任務，分為「待辦」、「進行中」、「審查中」和「已完成」四個欄位
- **待辦列表（Backlog View）**：查看所有待辦事項，並支援 Sprint 管理和任務排序
- **Sprint 管理**：建立與管理 Sprint，將任務從 Backlog 移入當前 Sprint
- **Issue 管理**：建立、查看、編輯任務，並透過彈出視窗（Modal）呈現詳細資訊
- **任務類型（Issue Types）**：支援 Story（故事）、Bug、Task（任務）和 Epic 四種類型，各有不同圖示與顏色
- **優先級（Priority Levels）**：提供最高、高、中、低、最低共五個優先級別
- **成員指派**：可為每個任務指定負責人（Assignee）和回報人（Reporter），並顯示頭像
- **故事點數（Story Points）**：為每個任務估計工作量
- **標籤（Labels）**：為任務添加自定義標籤
- **評論（Comments）**：在任務下新增評論
- **篩選功能（Filtering）**：依任務類型、負責人進行篩選，並支援全文搜尋
- **狀態持久化**：應用程式狀態透過自定義 React Store（Context + useReducer）管理
### 技術架構
- **前端框架**：React 18（使用 Hooks）
- **型別系統**：TypeScript（強型別，確保程式碼品質）
- **建置工具**：Vite（快速開發伺服器與打包）
- **樣式**：CSS Modules（模組化 CSS）
- **狀態管理**：React Context API + useReducer（無需第三方狀態管理庫）
### 專案結構
```
src/
├── components/
│   ├── App.tsx              # 根元件（佈局、路由、篩選）
│   ├── Board.tsx            # 看板視圖
│   ├── Backlog.tsx          # Backlog 與 Sprint 管理視圖
│   ├── IssueCard.tsx        # 任務卡片元件
│   ├── IssueModal.tsx       # 任務詳情 / 編輯彈窗
│   ├── CreateIssueModal.tsx # 新建任務彈窗
│   ├── Sidebar.tsx          # 導航側邊欄
│   └── common.tsx           # 共用 UI 元件（Avatar 等）
├── types.ts                 # TypeScript 型別定義
└── store/                   # 狀態管理（Context + useReducer）
```
### 如何啟動
```bash
# 複製儲存庫
git clone https://github.com/YenchiSomnambule/1p_mimic_test.git
cd 1p_mimic_test

# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev
```
啟動後，在瀏覽器中開啟 [http://localhost:5173](http://localhost:5173) 即可查看應用程式。
### 線上預覽

應用程式已部署至 GitHub Pages，可透過以下連結直接查看：

**[https://yenchisomnambule.github.io/1p_mimic_test/](https://yenchisomnambule.github.io/1p_mimic_test/)**

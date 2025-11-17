# AGENTS.md - Todo List React TypeScript Application

## 1. Project Overview

This is a simple yet functional **Todo List application** built with React and TypeScript. The application allows users to:

- Add new tasks with a task name and deadline (in days)
- View all added tasks in a list format
- Delete/complete tasks by clicking the "X" button
- Experience a clean, responsive UI with a tomato-themed color scheme

The application demonstrates fundamental React concepts including component composition, state management with hooks, TypeScript typing, and event handling. It's an ideal starting point for learning React with TypeScript or for extending into a more feature-rich task management system.

## 2. Architecture

### Technical Stack

- **Frontend Framework**: React 17.0.1
- **Language**: TypeScript 4.1.2
- **Build Tool**: Create React App (react-scripts 4.0.3)
- **Styling**: CSS (vanilla CSS with flexbox layout)
- **Testing**: Jest & React Testing Library (configured but no tests implemented)
- **Package Manager**: Yarn

### Design Patterns

1. **Functional Components with Hooks**: Uses React Hooks (useState) for state management
2. **Props-based Communication**: Parent-child communication through props and callback functions
3. **Unidirectional Data Flow**: State flows down, events flow up
4. **Controlled Components**: Form inputs are controlled by React state
5. **Interface-based Typing**: TypeScript interfaces define data structures and component props
6. **Single Responsibility**: Each component has a focused, specific purpose

### Component Architecture

```
App (Root Component)
├── Header Section
│   ├── Input: Task Name
│   ├── Input: Deadline
│   └── Button: Add Task
└── TodoList Section
    └── TodoTask (Multiple Instances)
        ├── Task Content Display
        └── Delete Button
```

## 3. Key Components

### App.tsx (Main Component)

**Location**: `/src/App.tsx`

**Responsibilities**:
- Root component managing the entire application state
- Handles user input for task name and deadline
- Maintains the list of all tasks in state
- Provides functions to add and complete tasks
- Renders the input form and the list of tasks

**Key State Variables**:
- `task` (string): Current task name being typed
- `deadline` (number): Current deadline being entered
- `todoList` (ITask[]): Array of all todo tasks

**Key Methods**:
- `handleChange()`: Updates state when input fields change
- `addTask()`: Adds a new task to the todo list
- `completeTask()`: Removes a task from the list by task name

### TodoTask.tsx (Task Item Component)

**Location**: `/src/Components/TodoTask.tsx`

**Responsibilities**:
- Displays a single todo task
- Shows task name and deadline
- Provides a delete button to remove the task

**Props Interface**:
- `task` (ITask): The task object containing taskName and deadline
- `completeTask` (function): Callback function to delete the task

**User Interaction**:
- Clicking the "X" button triggers the `completeTask` callback with the task name

### Interfaces.ts (Type Definitions)

**Location**: `/src/Interfaces.ts`

**ITask Interface**:
```typescript
{
  taskName: string;
  deadline: number;
}
```

Defines the structure of a todo task object used throughout the application.

## 4. Data Flow

### State Management Strategy

The application uses **local component state** managed by React's `useState` hook. There is no external state management library (Redux, Context API, etc.).

### Data Flow Diagram

```
User Input → handleChange() → State Update (task/deadline)
                                     ↓
User Clicks "Add Task" → addTask() → todoList State Updated
                                     ↓
                              App Re-renders
                                     ↓
                        TodoTask Components Rendered
                                     ↓
User Clicks "X" → completeTask() → Filter todoList
                                     ↓
                              App Re-renders
                                     ↓
                        Task Removed from View
```

### State Lifting Pattern

- **State Location**: All state lives in the `App` component (top-level)
- **Props Down**: Task data is passed down to `TodoTask` components via props
- **Events Up**: User actions in `TodoTask` trigger callbacks that modify state in `App`

### Key Data Transformations

1. **Adding a Task**: Spreads existing `todoList` and appends new task object
2. **Completing a Task**: Filters `todoList` to exclude the task with matching name
3. **Input Handling**: Converts deadline input to number, keeps task as string

## 5. File Structure

```
todo-list-react-typescript/
├── public/                    # Static assets
│   ├── index.html            # HTML template
│   ├── favicon.ico           # App icon
│   ├── logo192.png           # PWA icon (192x192)
│   ├── logo512.png           # PWA icon (512x512)
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # Search engine instructions
│
├── src/                      # Source code
│   ├── Components/           # React components
│   │   └── TodoTask.tsx     # Individual task component
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── Interfaces.ts        # TypeScript type definitions
│   ├── index.tsx            # Application entry point
│   ├── react-app-env.d.ts   # React types declaration
│   └── reportWebVitals.ts   # Performance monitoring
│
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── yarn.lock                # Locked dependency versions
├── README.md                # Project documentation
└── AGENTS.md                # This file (agent documentation)
```

### Directory Conventions

- **Components**: Organized in `/src/Components/` directory with PascalCase naming
- **Interfaces**: Centralized in `/src/Interfaces.ts` for reusability
- **Styles**: Component-specific styles in `/src/App.css`
- **Entry Point**: `/src/index.tsx` bootstraps the React application

## 6. Development Guidelines

### Getting Started

1. **Install Dependencies**:
   ```bash
   yarn install
   ```

2. **Start Development Server**:
   ```bash
   yarn start
   ```
   Opens at [http://localhost:3000](http://localhost:3000)

3. **Build for Production**:
   ```bash
   yarn build
   ```
   Creates optimized build in `/build` directory

4. **Run Tests**:
   ```bash
   yarn test
   ```
   Launches Jest test runner (no tests currently implemented)

### Code Style & Conventions

1. **TypeScript Strict Mode**: Enabled in `tsconfig.json`
2. **Component Types**: Use `FC` (FunctionComponent) type or explicit typing
3. **Event Handlers**: Type events explicitly (e.g., `ChangeEvent<HTMLInputElement>`)
4. **State Typing**: Always provide type arguments to `useState<T>()`
5. **Props Interfaces**: Define interfaces for all component props
6. **Naming Conventions**:
   - Components: PascalCase (e.g., `TodoTask.tsx`)
   - Interfaces: PascalCase with "I" prefix (e.g., `ITask`)
   - Functions: camelCase (e.g., `handleChange`)
   - CSS Classes: camelCase or kebab-case

### Adding New Features

**To add a new component**:
1. Create file in `/src/Components/` with PascalCase name
2. Define props interface if needed
3. Export default the component
4. Import and use in parent component

**To add new data fields**:
1. Update `ITask` interface in `/src/Interfaces.ts`
2. Update form inputs in `App.tsx`
3. Update display in `TodoTask.tsx`
4. Update state handling logic

### TypeScript Configuration

- **Target**: ES5 for broad browser compatibility
- **Module**: ESNext with Node resolution
- **JSX**: react-jsx (new JSX transform)
- **Strict Mode**: Enabled for type safety
- **Includes**: Only `/src` directory

### ESLint Configuration

Extends `react-app` and `react-app/jest` configurations from Create React App.

## 7. Future Enhancements

### Suggested Improvements

#### 1. **Persistence**
- **Local Storage**: Save tasks to browser localStorage to persist across sessions
- **Backend Integration**: Connect to a REST API or GraphQL endpoint
- **Database**: Implement server-side storage with MongoDB/PostgreSQL

#### 2. **Enhanced Functionality**
- **Edit Tasks**: Allow users to modify existing tasks
- **Task Priority**: Add priority levels (high, medium, low)
- **Task Categories**: Organize tasks by categories/projects
- **Search/Filter**: Filter tasks by name, deadline, or status
- **Sort Options**: Sort by deadline, name, or creation date
- **Task Status**: Add "in progress" and "completed" states beyond just delete

#### 3. **User Experience**
- **Validation**: Prevent adding empty tasks or invalid deadlines
- **Confirmation Dialogs**: Ask before deleting tasks
- **Animations**: Add transitions when adding/removing tasks
- **Responsive Design**: Optimize for mobile devices
- **Dark Mode**: Add theme toggle for dark/light modes
- **Keyboard Shortcuts**: Support Enter key to add tasks

#### 4. **Date Handling**
- **Actual Dates**: Use date picker instead of "days from now"
- **Date Formatting**: Display human-readable dates (e.g., "Nov 15, 2025")
- **Overdue Indicators**: Highlight tasks past their deadline
- **Date Validation**: Prevent past dates for new tasks

#### 5. **Code Quality**
- **Unit Tests**: Add tests for components and functions
- **Integration Tests**: Test user workflows
- **Error Boundaries**: Handle runtime errors gracefully
- **Prop Validation**: Add runtime prop validation
- **Code Splitting**: Lazy load components for better performance

#### 6. **State Management**
- **Context API**: Share state without prop drilling
- **Redux/Zustand**: For more complex state management needs
- **React Query**: For server state management

#### 7. **Accessibility**
- **ARIA Labels**: Add proper accessibility attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Ensure compatibility with assistive technologies
- **Focus Management**: Proper focus handling for modals and interactions

#### 8. **Developer Experience**
- **Prettier**: Add code formatting
- **Husky**: Pre-commit hooks for linting/testing
- **Storybook**: Component documentation and testing
- **Environment Variables**: Configuration management

### Known Issues

1. **Task Identification**: Tasks are identified by name, which means duplicate task names cause issues. Consider adding unique IDs (UUID or timestamp-based).

2. **Delete Logic**: Uses loose equality (`!=` instead of `!==`) in the filter function, which could cause unexpected behavior.

3. **Form Reset**: Forms don't validate—users can add tasks with empty names or zero/negative deadlines.

4. **No Persistence**: Refreshing the page loses all tasks.

### Recommended Next Steps

For AI agents or developers working on this codebase:

1. **First Priority**: Add unique IDs to tasks using `uuid` or `Date.now()`
2. **Second Priority**: Implement localStorage for basic persistence
3. **Third Priority**: Add input validation and error handling
4. **Fourth Priority**: Write unit tests for core functionality
5. **Fifth Priority**: Enhance UI/UX with better date handling and responsive design

---

## Notes for AI Agents

When working with this codebase:

- **State is simple**: Everything is in the App component—no need to hunt for state management libraries
- **TypeScript types**: Always check `/src/Interfaces.ts` for data structures
- **Styling**: All styles are in `/src/App.css`—modify carefully as classes are tightly coupled
- **Testing**: No tests exist yet—consider adding them before major refactors
- **Dependencies**: Minimal dependencies make this easy to extend without conflicts
- **Create React App**: Standard CRA structure—refer to CRA docs for build/config questions

This application is intentionally simple and serves as an excellent foundation for learning or building more complex features. The clean separation of concerns and TypeScript typing make it easy to understand and extend.

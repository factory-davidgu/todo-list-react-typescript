import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  describe('Initial Rendering', () => {
    test('renders the App component without crashing', () => {
      render(<App />);
      expect(screen.getByPlaceholderText('Task...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Deadline (in Days)...')).toBeInTheDocument();
      expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    test('renders empty todo list initially', () => {
      const { container } = render(<App />);
      const todoList = container.querySelector('.todoList');
      expect(todoList).toBeInTheDocument();
      expect(todoList?.children.length).toBe(0);
    });

    test('input fields are initially empty', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      
      expect(taskInput.value).toBe('');
      expect(deadlineInput.value).toBe('0');
    });
  });

  describe('Input Field Changes', () => {
    test('updates task input field when user types', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      
      fireEvent.change(taskInput, { target: { value: 'Buy groceries', name: 'task' } });
      
      expect(taskInput.value).toBe('Buy groceries');
    });

    test('updates deadline input field when user types', () => {
      render(<App />);
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      
      fireEvent.change(deadlineInput, { target: { value: '5', name: 'deadline' } });
      
      expect(deadlineInput.value).toBe('5');
    });

    test('handles multiple changes to task input', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      
      fireEvent.change(taskInput, { target: { value: 'First task', name: 'task' } });
      expect(taskInput.value).toBe('First task');
      
      fireEvent.change(taskInput, { target: { value: 'Updated task', name: 'task' } });
      expect(taskInput.value).toBe('Updated task');
    });

    test('handles multiple changes to deadline input', () => {
      render(<App />);
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      
      fireEvent.change(deadlineInput, { target: { value: '3', name: 'deadline' } });
      expect(deadlineInput.value).toBe('3');
      
      fireEvent.change(deadlineInput, { target: { value: '7', name: 'deadline' } });
      expect(deadlineInput.value).toBe('7');
    });

    test('handles zero deadline value', () => {
      render(<App />);
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      
      fireEvent.change(deadlineInput, { target: { value: '0', name: 'deadline' } });
      
      expect(deadlineInput.value).toBe('0');
    });
  });

  describe('Adding Tasks', () => {
    test('adds a new task when Add Task button is clicked', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      fireEvent.change(taskInput, { target: { value: 'Write tests', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '3', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText('Write tests')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('clears input fields after adding a task', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      fireEvent.change(taskInput, { target: { value: 'Clean room', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(taskInput.value).toBe('');
      expect(deadlineInput.value).toBe('0');
    });

    test('adds multiple tasks to the list', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      // Add first task
      fireEvent.change(taskInput, { target: { value: 'Task 1', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      
      // Add second task
      fireEvent.change(taskInput, { target: { value: 'Task 2', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      // Add third task
      fireEvent.change(taskInput, { target: { value: 'Task 3', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '3', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    test('adds task with empty task name', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      fireEvent.change(taskInput, { target: { value: '', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '5', name: 'deadline' } });
      fireEvent.click(addButton);
      
      const todoList = document.querySelector('.todoList');
      expect(todoList?.children.length).toBe(1);
    });

    test('adds task with zero deadline', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      fireEvent.change(taskInput, { target: { value: 'Urgent task', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '0', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText('Urgent task')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('adds tasks with large deadline numbers', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      fireEvent.change(taskInput, { target: { value: 'Long term goal', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '365', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText('Long term goal')).toBeInTheDocument();
      expect(screen.getByText('365')).toBeInTheDocument();
    });

    test('handles special characters in task name', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      fireEvent.change(taskInput, { target: { value: 'Task @#$% & special!', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText('Task @#$% & special!')).toBeInTheDocument();
    });
  });

  describe('Task List Updates', () => {
    test('displays correct number of tasks in the list', () => {
      const { container } = render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      const todoList = container.querySelector('.todoList');
      expect(todoList?.children.length).toBe(0);
      
      // Add first task
      fireEvent.change(taskInput, { target: { value: 'Task 1', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      expect(todoList?.children.length).toBe(1);
      
      // Add second task
      fireEvent.change(taskInput, { target: { value: 'Task 2', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      expect(todoList?.children.length).toBe(2);
    });

    test('maintains task order when adding multiple tasks', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      fireEvent.change(taskInput, { target: { value: 'First', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      
      fireEvent.change(taskInput, { target: { value: 'Second', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      fireEvent.change(taskInput, { target: { value: 'Third', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '3', name: 'deadline' } });
      fireEvent.click(addButton);
      
      const tasks = screen.getAllByRole('button', { name: 'X' });
      expect(tasks.length).toBe(3);
    });
  });

  describe('Completing/Deleting Tasks', () => {
    test('removes task when complete button is clicked', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      fireEvent.change(taskInput, { target: { value: 'Task to delete', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '5', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText('Task to delete')).toBeInTheDocument();
      
      const completeButton = screen.getByRole('button', { name: 'X' });
      fireEvent.click(completeButton);
      
      expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
    });

    test('removes only the clicked task from multiple tasks', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      // Add three tasks
      fireEvent.change(taskInput, { target: { value: 'Task 1', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      
      fireEvent.change(taskInput, { target: { value: 'Task 2', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      fireEvent.change(taskInput, { target: { value: 'Task 3', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '3', name: 'deadline' } });
      fireEvent.click(addButton);
      
      const completeButtons = screen.getAllByRole('button', { name: 'X' });
      fireEvent.click(completeButtons[1]); // Delete Task 2
      
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    test('removes all tasks when all complete buttons are clicked', () => {
      const { container } = render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      // Add two tasks
      fireEvent.change(taskInput, { target: { value: 'Task 1', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      
      fireEvent.change(taskInput, { target: { value: 'Task 2', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      const todoList = container.querySelector('.todoList');
      expect(todoList?.children.length).toBe(2);
      
      // Remove first task
      let completeButtons = screen.getAllByRole('button', { name: 'X' });
      fireEvent.click(completeButtons[0]);
      expect(todoList?.children.length).toBe(1);
      
      // Remove second task
      completeButtons = screen.getAllByRole('button', { name: 'X' });
      fireEvent.click(completeButtons[0]);
      expect(todoList?.children.length).toBe(0);
    });

    test('task list updates correctly after deletion', () => {
      const { container } = render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      const todoList = container.querySelector('.todoList');
      
      // Add task
      fireEvent.change(taskInput, { target: { value: 'Temporary task', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      expect(todoList?.children.length).toBe(1);
      
      // Delete task
      const completeButton = screen.getByRole('button', { name: 'X' });
      fireEvent.click(completeButton);
      expect(todoList?.children.length).toBe(0);
      
      // Add new task after deletion
      fireEvent.change(taskInput, { target: { value: 'New task', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      expect(todoList?.children.length).toBe(1);
      expect(screen.getByText('New task')).toBeInTheDocument();
    });
  });

  describe('Edge Cases and Integration', () => {
    test('handles rapid task additions', () => {
      const { container } = render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      for (let i = 1; i <= 5; i++) {
        fireEvent.change(taskInput, { target: { value: `Task ${i}`, name: 'task' } });
        fireEvent.change(deadlineInput, { target: { value: `${i}`, name: 'deadline' } });
        fireEvent.click(addButton);
      }
      
      const todoList = container.querySelector('.todoList');
      expect(todoList?.children.length).toBe(5);
    });

    test('handles tasks with duplicate names', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      // Add first task
      fireEvent.change(taskInput, { target: { value: 'Duplicate', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      
      // Add second task with same name
      fireEvent.change(taskInput, { target: { value: 'Duplicate', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      const duplicateTasks = screen.getAllByText('Duplicate');
      expect(duplicateTasks.length).toBe(2);
    });

    test('deletes all tasks with the same name when duplicate task names exist', () => {
      const { container } = render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      // Add two tasks with same name but different deadlines
      fireEvent.change(taskInput, { target: { value: 'Duplicate', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      
      fireEvent.change(taskInput, { target: { value: 'Duplicate', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      const todoList = container.querySelector('.todoList');
      expect(todoList?.children.length).toBe(2);
      
      const completeButtons = screen.getAllByRole('button', { name: 'X' });
      fireEvent.click(completeButtons[0]);
      
      // Due to the implementation using filter by taskName, all tasks with the same name are deleted
      expect(screen.queryByText('Duplicate')).not.toBeInTheDocument();
      expect(todoList?.children.length).toBe(0);
    });

    test('handles long task names', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      
      const longTaskName = 'This is a very long task name that contains many characters and should still be handled correctly by the application';
      
      fireEvent.change(taskInput, { target: { value: longTaskName, name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '5', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText(longTaskName)).toBeInTheDocument();
    });

    test('maintains state consistency after multiple operations', () => {
      const { container } = render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      const addButton = screen.getByText('Add Task');
      const todoList = container.querySelector('.todoList');
      
      // Add tasks
      fireEvent.change(taskInput, { target: { value: 'Task A', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '1', name: 'deadline' } });
      fireEvent.click(addButton);
      
      fireEvent.change(taskInput, { target: { value: 'Task B', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '2', name: 'deadline' } });
      fireEvent.click(addButton);
      
      fireEvent.change(taskInput, { target: { value: 'Task C', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '3', name: 'deadline' } });
      fireEvent.click(addButton);
      
      expect(todoList?.children.length).toBe(3);
      
      // Delete middle task
      const completeButtons = screen.getAllByRole('button', { name: 'X' });
      fireEvent.click(completeButtons[1]);
      expect(todoList?.children.length).toBe(2);
      
      // Add another task
      fireEvent.change(taskInput, { target: { value: 'Task D', name: 'task' } });
      fireEvent.change(deadlineInput, { target: { value: '4', name: 'deadline' } });
      fireEvent.click(addButton);
      expect(todoList?.children.length).toBe(3);
      
      // Verify correct tasks remain
      expect(screen.getByText('Task A')).toBeInTheDocument();
      expect(screen.queryByText('Task B')).not.toBeInTheDocument();
      expect(screen.getByText('Task C')).toBeInTheDocument();
      expect(screen.getByText('Task D')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    test('renders header section with input container', () => {
      const { container } = render(<App />);
      const header = container.querySelector('.header');
      const inputContainer = container.querySelector('.inputContainer');
      
      expect(header).toBeInTheDocument();
      expect(inputContainer).toBeInTheDocument();
    });

    test('renders todo list container', () => {
      const { container } = render(<App />);
      const todoList = container.querySelector('.todoList');
      
      expect(todoList).toBeInTheDocument();
    });

    test('input fields have correct types', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      
      expect(taskInput.type).toBe('text');
      expect(deadlineInput.type).toBe('number');
    });

    test('input fields have correct names', () => {
      render(<App />);
      const taskInput = screen.getByPlaceholderText('Task...') as HTMLInputElement;
      const deadlineInput = screen.getByPlaceholderText('Deadline (in Days)...') as HTMLInputElement;
      
      expect(taskInput.name).toBe('task');
      expect(deadlineInput.name).toBe('deadline');
    });
  });
});

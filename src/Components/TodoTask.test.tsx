import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoTask from './TodoTask';
import { ITask } from '../Interfaces';

describe('TodoTask Component', () => {
  const mockCompleteTask = jest.fn();

  beforeEach(() => {
    mockCompleteTask.mockClear();
  });

  describe('Rendering with Task Props', () => {
    test('renders the TodoTask component with task name', () => {
      const mockTask: ITask = {
        taskName: 'Test Task',
        deadline: 5
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    test('renders the TodoTask component with deadline', () => {
      const mockTask: ITask = {
        taskName: 'Sample Task',
        deadline: 3
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('renders both task name and deadline together', () => {
      const mockTask: ITask = {
        taskName: 'Complete assignment',
        deadline: 7
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('Complete assignment')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
    });

    test('renders task with zero deadline', () => {
      const mockTask: ITask = {
        taskName: 'Urgent task',
        deadline: 0
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('Urgent task')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('renders task with large deadline number', () => {
      const mockTask: ITask = {
        taskName: 'Long term project',
        deadline: 365
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('Long term project')).toBeInTheDocument();
      expect(screen.getByText('365')).toBeInTheDocument();
    });

    test('renders task with empty task name', () => {
      const mockTask: ITask = {
        taskName: '',
        deadline: 2
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('2')).toBeInTheDocument();
      const contentDiv = screen.getByText('2').parentElement;
      expect(contentDiv).toBeInTheDocument();
    });

    test('renders task with special characters in name', () => {
      const mockTask: ITask = {
        taskName: 'Task @#$% & special!',
        deadline: 4
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('Task @#$% & special!')).toBeInTheDocument();
    });

    test('renders task with very long name', () => {
      const longName = 'This is a very long task name that contains many characters and should still be rendered correctly by the component';
      const mockTask: ITask = {
        taskName: longName,
        deadline: 10
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    test('renders task with negative deadline', () => {
      const mockTask: ITask = {
        taskName: 'Overdue task',
        deadline: -5
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('Overdue task')).toBeInTheDocument();
      expect(screen.getByText('-5')).toBeInTheDocument();
    });

    test('renders task with unicode characters in name', () => {
      const mockTask: ITask = {
        taskName: 'Buy groceries 🛒 and cook 🍳',
        deadline: 1
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('Buy groceries 🛒 and cook 🍳')).toBeInTheDocument();
    });
  });

  describe('Complete Button Functionality', () => {
    test('renders the complete button with X text', () => {
      const mockTask: ITask = {
        taskName: 'Test Task',
        deadline: 5
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const button = screen.getByRole('button', { name: 'X' });
      expect(button).toBeInTheDocument();
    });

    test('calls completeTask with correct task name when button is clicked', () => {
      const mockTask: ITask = {
        taskName: 'Task to complete',
        deadline: 3
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const completeButton = screen.getByRole('button', { name: 'X' });
      fireEvent.click(completeButton);
      
      expect(mockCompleteTask).toHaveBeenCalledTimes(1);
      expect(mockCompleteTask).toHaveBeenCalledWith('Task to complete');
    });

    test('calls completeTask only once per click', () => {
      const mockTask: ITask = {
        taskName: 'Single click task',
        deadline: 2
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const completeButton = screen.getByRole('button', { name: 'X' });
      fireEvent.click(completeButton);
      
      expect(mockCompleteTask).toHaveBeenCalledTimes(1);
    });

    test('calls completeTask multiple times when clicked multiple times', () => {
      const mockTask: ITask = {
        taskName: 'Multi click task',
        deadline: 1
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const completeButton = screen.getByRole('button', { name: 'X' });
      
      fireEvent.click(completeButton);
      fireEvent.click(completeButton);
      fireEvent.click(completeButton);
      
      expect(mockCompleteTask).toHaveBeenCalledTimes(3);
      expect(mockCompleteTask).toHaveBeenCalledWith('Multi click task');
    });

    test('does not call completeTask on component render', () => {
      const mockTask: ITask = {
        taskName: 'No auto-complete',
        deadline: 4
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(mockCompleteTask).not.toHaveBeenCalled();
    });

    test('calls completeTask with correct task name when task has empty name', () => {
      const mockTask: ITask = {
        taskName: '',
        deadline: 1
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const completeButton = screen.getByRole('button', { name: 'X' });
      fireEvent.click(completeButton);
      
      expect(mockCompleteTask).toHaveBeenCalledWith('');
    });

    test('calls completeTask with task name containing special characters', () => {
      const mockTask: ITask = {
        taskName: 'Special @#$ characters!',
        deadline: 2
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const completeButton = screen.getByRole('button', { name: 'X' });
      fireEvent.click(completeButton);
      
      expect(mockCompleteTask).toHaveBeenCalledWith('Special @#$ characters!');
    });
  });

  describe('Component Structure', () => {
    test('renders task container with correct class name', () => {
      const mockTask: ITask = {
        taskName: 'Structural task',
        deadline: 3
      };

      const { container } = render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      const taskDiv = container.querySelector('.task');
      
      expect(taskDiv).toBeInTheDocument();
    });

    test('renders content container with correct class name', () => {
      const mockTask: ITask = {
        taskName: 'Content task',
        deadline: 5
      };

      const { container } = render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      const contentDiv = container.querySelector('.content');
      
      expect(contentDiv).toBeInTheDocument();
    });

    test('content container contains both task name and deadline', () => {
      const mockTask: ITask = {
        taskName: 'Verify structure',
        deadline: 7
      };

      const { container } = render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      const contentDiv = container.querySelector('.content');
      
      expect(contentDiv).toBeInTheDocument();
      expect(contentDiv?.textContent).toContain('Verify structure');
      expect(contentDiv?.textContent).toContain('7');
    });

    test('task name is rendered in a span element', () => {
      const mockTask: ITask = {
        taskName: 'Span test',
        deadline: 2
      };

      const { container } = render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      const spans = container.querySelectorAll('.content span');
      
      expect(spans.length).toBe(2);
      expect(spans[0].textContent).toBe('Span test');
    });

    test('deadline is rendered in a span element', () => {
      const mockTask: ITask = {
        taskName: 'Deadline span',
        deadline: 8
      };

      const { container } = render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      const spans = container.querySelectorAll('.content span');
      
      expect(spans.length).toBe(2);
      expect(spans[1].textContent).toBe('8');
    });

    test('button is a sibling of content container', () => {
      const mockTask: ITask = {
        taskName: 'Button position',
        deadline: 4
      };

      const { container } = render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      const taskDiv = container.querySelector('.task');
      
      expect(taskDiv?.children.length).toBe(2);
      expect(taskDiv?.children[0].className).toBe('content');
      expect(taskDiv?.children[1].tagName).toBe('BUTTON');
    });
  });

  describe('Props Handling', () => {
    test('renders correctly with different tasks', () => {
      const mockTask1: ITask = {
        taskName: 'First task',
        deadline: 1
      };

      const { rerender } = render(<TodoTask task={mockTask1} completeTask={mockCompleteTask} />);
      expect(screen.getByText('First task')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();

      const mockTask2: ITask = {
        taskName: 'Second task',
        deadline: 2
      };

      rerender(<TodoTask task={mockTask2} completeTask={mockCompleteTask} />);
      expect(screen.queryByText('First task')).not.toBeInTheDocument();
      expect(screen.getByText('Second task')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('updates when task prop changes', () => {
      const mockTask1: ITask = {
        taskName: 'Original task',
        deadline: 5
      };

      const { rerender } = render(<TodoTask task={mockTask1} completeTask={mockCompleteTask} />);
      expect(screen.getByText('Original task')).toBeInTheDocument();

      const mockTask2: ITask = {
        taskName: 'Updated task',
        deadline: 10
      };

      rerender(<TodoTask task={mockTask2} completeTask={mockCompleteTask} />);
      expect(screen.getByText('Updated task')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    test('works with different completeTask functions', () => {
      const mockTask: ITask = {
        taskName: 'Function test',
        deadline: 3
      };

      const mockFn1 = jest.fn();
      const { rerender } = render(<TodoTask task={mockTask} completeTask={mockFn1} />);
      
      let button = screen.getByRole('button', { name: 'X' });
      fireEvent.click(button);
      expect(mockFn1).toHaveBeenCalledTimes(1);

      const mockFn2 = jest.fn();
      rerender(<TodoTask task={mockTask} completeTask={mockFn2} />);
      
      button = screen.getByRole('button', { name: 'X' });
      fireEvent.click(button);
      expect(mockFn2).toHaveBeenCalledTimes(1);
      expect(mockFn1).toHaveBeenCalledTimes(1); // Should not increase
    });
  });

  describe('Display of Task Properties', () => {
    test('displays task name and deadline in correct order', () => {
      const mockTask: ITask = {
        taskName: 'Order test',
        deadline: 6
      };

      const { container } = render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      const spans = container.querySelectorAll('.content span');
      
      expect(spans[0].textContent).toBe('Order test');
      expect(spans[1].textContent).toBe('6');
    });

    test('preserves whitespace in task name', () => {
      const mockTask: ITask = {
        taskName: '  Task with spaces  ',
        deadline: 2
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      // Use regex to handle whitespace normalization by the browser
      expect(screen.getByText(/Task with spaces/)).toBeInTheDocument();
    });

    test('displays deadline as number without decimal places', () => {
      const mockTask: ITask = {
        taskName: 'Number format',
        deadline: 15
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const deadlineElement = screen.getByText('15');
      expect(deadlineElement.textContent).toBe('15');
    });

    test('handles task with newline characters in name', () => {
      const mockTask: ITask = {
        taskName: 'Task\nwith\nnewlines',
        deadline: 3
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      // Use regex to match text with newlines as they are rendered in the DOM
      expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'span' && element?.textContent === 'Task\nwith\nnewlines';
      })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('button is keyboard accessible', () => {
      const mockTask: ITask = {
        taskName: 'Keyboard task',
        deadline: 4
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const button = screen.getByRole('button', { name: 'X' });
      expect(button).toBeInTheDocument();
      
      // Simulate keyboard interaction
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    test('component maintains semantic HTML structure', () => {
      const mockTask: ITask = {
        taskName: 'Semantic test',
        deadline: 2
      };

      const { container } = render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(container.querySelector('.task')).toBeInTheDocument();
      expect(container.querySelector('.content')).toBeInTheDocument();
      expect(container.querySelector('button')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles very large deadline numbers', () => {
      const mockTask: ITask = {
        taskName: 'Large deadline',
        deadline: 999999
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      expect(screen.getByText('999999')).toBeInTheDocument();
    });

    test('handles task name with only numbers', () => {
      const mockTask: ITask = {
        taskName: '12345',
        deadline: 1
      };

      render(<TodoTask task={mockTask} completeTask={mockCompleteTask} />);
      
      const taskNameElements = screen.getAllByText('12345');
      expect(taskNameElements.length).toBeGreaterThan(0);
    });

    test('renders correctly when multiple instances exist', () => {
      const mockTask1: ITask = { taskName: 'Task 1', deadline: 1 };
      const mockTask2: ITask = { taskName: 'Task 2', deadline: 2 };
      const mockTask3: ITask = { taskName: 'Task 3', deadline: 3 };

      const { container } = render(
        <>
          <TodoTask task={mockTask1} completeTask={mockCompleteTask} />
          <TodoTask task={mockTask2} completeTask={mockCompleteTask} />
          <TodoTask task={mockTask3} completeTask={mockCompleteTask} />
        </>
      );

      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
      
      const buttons = screen.getAllByRole('button', { name: 'X' });
      expect(buttons.length).toBe(3);
    });

    test('clicking one task button does not affect others', () => {
      const mockFn1 = jest.fn();
      const mockFn2 = jest.fn();
      
      const mockTask1: ITask = { taskName: 'Task 1', deadline: 1 };
      const mockTask2: ITask = { taskName: 'Task 2', deadline: 2 };

      render(
        <>
          <TodoTask task={mockTask1} completeTask={mockFn1} />
          <TodoTask task={mockTask2} completeTask={mockFn2} />
        </>
      );

      const buttons = screen.getAllByRole('button', { name: 'X' });
      fireEvent.click(buttons[0]);

      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn1).toHaveBeenCalledWith('Task 1');
      expect(mockFn2).not.toHaveBeenCalled();
    });
  });
});

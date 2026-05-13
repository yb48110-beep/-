import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import '../styles/TodoApp.css';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Error loading tasks:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText, priority) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      priority,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getFilteredAndSortedTasks = () => {
    let filtered = tasks;

    if (filter === 'active') {
      filtered = tasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
      filtered = tasks.filter(t => t.completed);
    }

    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
  };

  const displayedTasks = getFilteredAndSortedTasks();

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>✅ مهامي</h1>
        <p>نظام إدارة مهام احترافي</p>
      </div>

      <TaskStats stats={stats} />
      <TaskInput onAddTask={addTask} />

      <div className="controls-section">
        <div className="filter-group">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            الكل ({tasks.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            نشطة ({stats.active})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            مكتملة ({stats.completed})
          </button>
        </div>

        <div className="sort-group">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">الأحدث</option>
            <option value="priority">الأولوية</option>
          </select>
        </div>
      </div>

      {displayedTasks.length > 0 ? (
        <TaskList
          tasks={displayedTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      ) : (
        <div className="empty-state">
          <p className="empty-icon">����</p>
          <p className="empty-text">
            {filter === 'completed' && 'لا توجد مهام مكتملة بعد'}
            {filter === 'active' && 'رائع! لا توجد مهام معلقة 🎉'}
            {filter === 'all' && 'ابدأ بإضافة مهمة جديدة!'}
          </p>
        </div>
      )}

      {stats.completed > 0 && (
        <div className="action-section">
          <button
            className="clear-btn"
            onClick={() => setTasks(tasks.filter(t => !t.completed))}
          >
            🗑️ حذف جميع المهام المكتملة ({stats.completed})
          </button>
        </div>
      )}
    </div>
  );
}
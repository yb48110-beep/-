import React from 'react';
import '../styles/TaskList.css';

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⭕';
    }
  };

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-content">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            <div className="task-text-section">
              <p className="task-text">{task.text}</p>
              <p className="task-date">
                {new Date(task.createdAt).toLocaleDateString('ar-EG')}
              </p>
            </div>
            <span className="priority-badge">{getPriorityIcon(task.priority)}</span>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDeleteTask(task.id)}
            title="حذف المهمة"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
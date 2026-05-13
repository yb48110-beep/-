import React, { useState } from 'react';
import '../styles/TaskInput.css';

export default function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() === '') {
      alert('الرجاء إدخال نص المهمة');
      return;
    }
    onAddTask(taskText, priority);
    setTaskText('');
    setPriority('medium');
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="task-input"
          placeholder="أضف مهمة جديدة..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">منخفضة 🟢</option>
          <option value="medium">متوسطة 🟡</option>
          <option value="high">عالية 🔴</option>
        </select>
        <button type="submit" className="add-btn">
          ➕ إضافة
        </button>
      </div>
    </form>
  );
}
import React from 'react';
import '../styles/TaskStats.css';

export default function TaskStats({ stats }) {
  const completionPercent = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="task-stats-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <p className="stat-label">إجمالي المهام</p>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <p className="stat-label">المكتملة</p>
            <p className="stat-value">{stats.completed}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <p className="stat-label">المتبقية</p>
            <p className="stat-value">{stats.active}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔴</div>
          <div className="stat-info">
            <p className="stat-label">عالية الأولوية</p>
            <p className="stat-value">{stats.highPriority}</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <p>معدل الإنجاز</p>
          <p className="progress-percent">{completionPercent}%</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${completionPercent}%` }}></div>
        </div>
      </div>
    </div>
  );
}
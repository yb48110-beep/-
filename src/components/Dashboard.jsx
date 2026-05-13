import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBalance: 12580,
    dailyProfit: 420,
    totalTrades: 342,
    assets: 4,
    profitPercent: 3.4
  });

  const [chartData] = useState([
    { time: '9:00', price: 62500 },
    { time: '10:30', price: 62800 },
    { time: '12:00', price: 63200 },
    { time: '14:30', price: 63100 },
    { time: '16:00', price: 63500 },
    { time: '18:00', price: 64230 }
  ]);

  const [recentTrades] = useState([
    { id: 1, type: 'شراء', asset: 'BTC/USD', amount: 0.5, price: '$62,000', time: '11:30 ص', status: 'مكتمل' },
    { id: 2, type: 'بيع', asset: 'ETH/USD', amount: 5, price: '$3,050', time: '10:15 ص', status: 'مكتمل' },
    { id: 3, type: 'شراء', asset: 'XAU/USD', amount: 100, price: '$2,320', time: '09:45 ص', status: 'مكتمل' },
    { id: 4, type: 'بيع', asset: 'EUR/USD', amount: 1000, price: '1.0812', time: '08:30 ص', status: 'مكتمل' }
  ]);

  return (
    <div className="dashboard-container">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <h3>💰 الرصيد الكلي</h3>
          <p className="stat-value">${stats.totalBalance.toLocaleString()}</p>
          <p className="stat-detail">الحساب الرئيسي</p>
        </div>

        <div className="stat-card success">
          <h3>📈 ربح اليوم</h3>
          <p className="stat-value">+${stats.dailyProfit}</p>
          <p className="stat-detail">+{stats.profitPercent}% من الرصيد</p>
        </div>

        <div className="stat-card info">
          <h3>📊 إجمالي العمليات</h3>
          <p className="stat-value">{stats.totalTrades}</p>
          <p className="stat-detail">عملية تداول</p>
        </div>

        <div className="stat-card warning">
          <h3>🏆 الأصول النشطة</h3>
          <p className="stat-value">{stats.assets}</p>
          <p className="stat-detail">أصل مراقب</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h2>📈 تحليل الأسعار</h2>
        <div className="chart-container">
          <div className="chart-placeholder">
            <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%' }}>
              {/* Grid lines */}
              {[0, 40, 80, 120, 160, 200].map((y) => (
                <line
                  key={`line-${y}`}
                  x1="0"
                  y1={y}
                  x2="600"
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Path */}
              <polyline
                points={chartData
                  .map((d, i) => `${(i / (chartData.length - 1)) * 600},${200 - (d.price - 62500) / 1730 * 180}`)
                  .join(' ')}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
              />

              {/* Gradient */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>

              {/* Area under curve */}
              <path
                d={`M 0 200 ${chartData
                  .map((d, i) => `${(i / (chartData.length - 1)) * 600},${200 - (d.price - 62500) / 1730 * 180}`)
                  .join(' ')} L 600 200 Z`}
                fill="url(#areaGradient)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="chart-labels">
            {chartData.map((d) => (
              <span key={d.time} className="chart-label">{d.time}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="recent-trades-section">
        <h2>📋 آخر العمليات</h2>
        <div className="trades-table">
          <div className="trades-header">
            <div className="trade-col type-col">النوع</div>
            <div className="trade-col asset-col">الأصل</div>
            <div className="trade-col amount-col">الكمية</div>
            <div className="trade-col price-col">السعر</div>
            <div className="trade-col time-col">الوقت</div>
            <div className="trade-col status-col">الحالة</div>
          </div>

          {recentTrades.map((trade) => (
            <div key={trade.id} className="trades-row">
              <div className={`trade-col type-col ${trade.type === 'شراء' ? 'buy' : 'sell'}`}>
                {trade.type === 'شراء' ? '📈' : '📉'} {trade.type}
              </div>
              <div className="trade-col asset-col">{trade.asset}</div>
              <div className="trade-col amount-col">{trade.amount}</div>
              <div className="trade-col price-col">{trade.price}</div>
              <div className="trade-col time-col">{trade.time}</div>
              <div className="trade-col status-col">
                <span className="status-badge">{trade.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn primary-btn">
          📊 تحليل متقدم
        </button>
        <button className="action-btn secondary-btn">
          💼 إدارة المحفظة
        </button>
        <button className="action-btn info-btn">
          🔔 الإشعارات
        </button>
      </div>
    </div>
  );
}

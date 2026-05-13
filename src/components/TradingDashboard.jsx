import React, { useState } from 'react';
import '../styles/TradingDashboard.css';

export default function TradingDashboard() {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState('');

  const assets = [
    { name: 'BTC/USD', symbol: 'BTC', price: '$64,230', change: '+2.4%', high: '$65,000', low: '$63,100', volume: '45,230 BTC', sentiment: 'صعودي' },
    { name: 'ETH/USD', symbol: 'ETH', price: '$3,120', change: '+1.2%', high: '$3,180', low: '$3,080', volume: '520,000 ETH', sentiment: 'صعودي' },
    { name: 'XAU/USD', symbol: 'XAU', price: '$2,340', change: '-0.4%', high: '$2,360', low: '$2,320', volume: '15,000 oz', sentiment: 'هابط' },
    { name: 'EUR/USD', symbol: 'EUR', price: '1.0821', change: '+0.6%', high: '1.0850', low: '1.0800', volume: '120M EUR', sentiment: 'محايد' },
  ];

  const handleExecuteTrade = () => {
    if (!selectedAsset || !amount) {
      alert('الرجاء اختيار أصل وإدخال المبلغ');
      return;
    }
    alert(`تم تنفيذ عملية ${tradeType === 'buy' ? 'شراء' : 'بيع'} ${amount} من ${selectedAsset.name} بسعر ${selectedAsset.price}`);
    setAmount('');
  };

  return (
    <div className="trading-container">
      <div className="trading-header">
        <h1>💱 منصة التداول</h1>
        <p>تداول العملات والذهب مباشرة</p>
      </div>

      {/* Trading Panel */}
      <div className="trading-panel">
        <div className="panel-section">
          <h3>نوع العملية</h3>
          <div className="trade-type-buttons">
            <button
              className={`trade-btn buy-btn ${tradeType === 'buy' ? 'active' : ''}`}
              onClick={() => setTradeType('buy')}
            >
              📈 شراء
            </button>
            <button
              className={`trade-btn sell-btn ${tradeType === 'sell' ? 'active' : ''}`}
              onClick={() => setTradeType('sell')}
            >
              📉 بيع
            </button>
          </div>
        </div>

        <div className="panel-section">
          <h3>المبلغ</h3>
          <input
            type="number"
            className="amount-input"
            placeholder="أدخل المبلغ..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="execute-btn" onClick={handleExecuteTrade}>
          ✓ تنفيذ العملية
        </button>
      </div>

      {/* Markets Grid */}
      <div className="markets-section">
        <h2>الأسواق المتاحة</h2>
        <div className="assets-grid">
          {assets.map((asset, index) => (
            <div
              key={index}
              className={`asset-card ${selectedAsset?.symbol === asset.symbol ? 'selected' : ''}`}
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="asset-header">
                <div className="asset-info">
                  <h4>{asset.name}</h4>
                  <p className="asset-symbol">{asset.symbol}</p>
                </div>
                <div className={`asset-change ${asset.change.includes('+') ? 'positive' : 'negative'}`}>
                  {asset.change}
                </div>
              </div>

              <div className="asset-price">
                <p className="price-value">{asset.price}</p>
              </div>

              <div className="asset-details">
                <div className="detail-row">
                  <span>أعلى:</span>
                  <span>{asset.high}</span>
                </div>
                <div className="detail-row">
                  <span>أقل:</span>
                  <span>{asset.low}</span>
                </div>
                <div className="detail-row">
                  <span>الحجم:</span>
                  <span>{asset.volume}</span>
                </div>
              </div>

              <div className={`sentiment-badge ${asset.sentiment === 'صعودي' ? 'bullish' : asset.sentiment === 'هابط' ? 'bearish' : 'neutral'}`}>
                {asset.sentiment === 'صعودي' && '📈'}
                {asset.sentiment === 'هابط' && '📉'}
                {asset.sentiment === 'محايد' && '➡️'}
                {asset.sentiment}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Info */}
      <div className="market-info-section">
        <h2>معلومات السوق</h2>
        <div className="info-grid">
          <div className="info-card">
            <h4>🕐 ساعات التداول</h4>
            <p>24/5 طوال أيام الأسبوع</p>
          </div>
          <div className="info-card">
            <h4>💰 الحد الأدنى للإيداع</h4>
            <p>$100 أو ما يعادله</p>
          </div>
          <div className="info-card">
            <h4>⚡ تنفيذ فوري</h4>
            <p>دون انتظار - تنفيذ فوري</p>
          </div>
          <div className="info-card">
            <h4>🔒 آمن وموثوق</h4>
            <p>تشفير عسكري للبيانات</p>
          </div>
        </div>
      </div>
    </div>
  );
}
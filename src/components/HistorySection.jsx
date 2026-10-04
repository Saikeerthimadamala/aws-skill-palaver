import React, { useState } from 'react';
import { SENTIMENT_CONFIG } from '../utils/mockData';
import { History, Clock, ArrowUpRight, RotateCcw, Trash2 } from 'lucide-react';
import '../styles/History.css';

export default function HistorySection({
  history = [],
  onLoadText,
  onClearHistory,
  onResetDefaultHistory
}) {
  const [filter, setFilter] = useState('ALL');

  const filteredHistory = history.filter(item => {
    if (filter === 'ALL') return true;
    return item.sentiment === filter;
  });

  const getSentimentPill = (sentiment) => {
    const theme = SENTIMENT_CONFIG[sentiment] || SENTIMENT_CONFIG.POSITIVE;
    return (
      <span
        className="sentiment-pill"
        style={{
          backgroundColor: theme.bgColor,
          borderColor: theme.borderColor,
          color: theme.color
        }}
      >
        <span>{theme.emoji}</span>
        <span>{theme.label}</span>
      </span>
    );
  };

  return (
    <section id="history" className="history-section">
      <div className="container history-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-pill">
            <History size={14} />
            Audit Log
          </span>
          <h2 className="section-title">Recent Analysis</h2>
          <p className="section-desc">
            Review past feedback evaluations and confidence ratings stored in your session history.
          </p>
        </div>

        {/* Controls */}
        <div className="history-controls">
          <div className="filter-pills">
            {['ALL', 'POSITIVE', 'NEGATIVE', 'NEUTRAL', 'MIXED'].map((type) => (
              <button
                key={type}
                className={`filter-btn ${filter === type ? 'active' : ''}`}
                onClick={() => setFilter(type)}
              >
                {type === 'ALL' ? 'All Reviews' : type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="history-actions">
            <button
              className="btn-history-action"
              onClick={onResetDefaultHistory}
              title="Reset history to sample defaults"
            >
              <RotateCcw size={14} />
              <span>Reset Samples</span>
            </button>
            {history.length > 0 && (
              <button
                className="btn-history-action"
                onClick={onClearHistory}
                title="Clear all stored history"
              >
                <Trash2 size={14} />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="history-list">
            {filteredHistory.map((item) => (
              <div key={item.id} className="history-card">
                <div className="history-content">
                  <p className="history-text">"{item.text}"</p>
                  <div className="history-meta">
                    <span className="history-meta-item">
                      <Clock size={13} />
                      <span>{item.timestamp}</span>
                    </span>
                    <span className="history-meta-item">
                      <span>Service: AWS Lambda</span>
                    </span>
                  </div>
                </div>

                <div className="history-badge-group">
                  {getSentimentPill(item.sentiment)}

                  <div className="history-score-col">
                    <div className="history-score-val">{item.confidence}%</div>
                    <div className="history-score-sub">Confidence</div>
                  </div>

                  <button
                    className="history-load-btn"
                    onClick={() => onLoadText(item.text)}
                    title="Load this text into the feedback analyzer"
                  >
                    <span>Load</span>
                    <ArrowUpRight size={13} style={{ marginLeft: 3 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="history-empty">
            <History size={36} className="empty-icon" />
            <h3>No analysis found for this filter</h3>
            <p>Try selecting a different filter or analyze new customer feedback above.</p>
          </div>
        )}
      </div>
    </section>
  );
}

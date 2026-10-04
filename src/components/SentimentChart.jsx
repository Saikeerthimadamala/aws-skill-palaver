import React from 'react';
import { SENTIMENT_CONFIG } from '../utils/mockData';

export default function SentimentChart({ sentimentScores, dominantSentiment }) {
  // sentimentScores is { Positive: float, Negative: float, Neutral: float, Mixed: float }
  const pos = sentimentScores?.Positive || 0;
  const neg = sentimentScores?.Negative || 0;
  const neu = sentimentScores?.Neutral || 0;
  const mix = sentimentScores?.Mixed || 0;

  // SVG Donut calculation
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.82

  // Slices in order: Positive, Negative, Neutral, Mixed
  const slices = [
    { key: 'Positive', val: pos, color: '#10b981' },
    { key: 'Negative', val: neg, color: '#ef4444' },
    { key: 'Neutral', val: neu, color: '#64748b' },
    { key: 'Mixed', val: mix, color: '#8b5cf6' }
  ];

  let accumulatedPercent = 0;

  const currentTheme = SENTIMENT_CONFIG[dominantSentiment] || SENTIMENT_CONFIG.POSITIVE;

  const formatPct = (val) => {
    const num = val * 100;
    return (num % 1 === 0) ? num.toFixed(0) : num.toFixed(1);
  };

  return (
    <div className="donut-chart-card">
      <h4 className="donut-chart-heading">Sentiment Distribution</h4>

      <div className="donut-svg-wrapper">
        <svg viewBox="0 0 180 180" className="donut-svg">
          {/* Background circle track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth="20"
          />

          {/* Slices */}
          {slices.map((slice) => {
            const strokeDasharray = `${slice.val * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;
            accumulatedPercent += slice.val;

            return (
              <circle
                key={slice.key}
                cx="90"
                cy="90"
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
                style={{
                  transition: 'stroke-dasharray 0.8s ease, stroke-dashoffset 0.8s ease'
                }}
              />
            );
          })}
        </svg>

        {/* Center overlay display */}
        <div className="donut-center-text">
          <span className="center-text-emoji">{currentTheme.emoji}</span>
          <span className="center-text-label">{dominantSentiment}</span>
          <span className="center-text-percent">
            {formatPct(Math.max(pos, neg, neu, mix))}%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#10b981' }}></span>
          <span>Pos: {formatPct(pos)}%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#ef4444' }}></span>
          <span>Neg: {formatPct(neg)}%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#64748b' }}></span>
          <span>Neu: {formatPct(neu)}%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#8b5cf6' }}></span>
          <span>Mix: {formatPct(mix)}%</span>
        </div>
      </div>
    </div>
  );
}

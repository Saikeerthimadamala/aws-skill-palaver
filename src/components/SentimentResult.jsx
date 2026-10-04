import React, { useState } from 'react';
import { SENTIMENT_CONFIG } from '../utils/mockData';
import SentimentChart from './SentimentChart';
import { CheckCircle2, ChevronDown, ChevronUp, Copy, Check, Sparkles, Terminal, FileText } from 'lucide-react';

export default function SentimentResult({ result }) {
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const sentiment = (result.sentiment || result.Sentiment || 'POSITIVE').toUpperCase();
  const scores = result.SentimentScore || {
    Positive: result.positive ?? 0,
    Negative: result.negative ?? 0,
    Neutral: result.neutral ?? 0,
    Mixed: result.mixed ?? 0
  };

  const theme = SENTIMENT_CONFIG[sentiment] || SENTIMENT_CONFIG.POSITIVE;

  // Calculate confidence percentage (e.g., 0.92 -> 92%)
  const rawConfidence = result.confidence != null
    ? (result.confidence <= 1 ? result.confidence * 100 : result.confidence)
    : (scores[sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase()] ||
       Math.max(scores.Positive, scores.Negative, scores.Neutral, scores.Mixed)) * 100;

  const displayConfidence = (rawConfidence % 1 === 0)
    ? rawConfidence.toFixed(0)
    : rawConfidence.toFixed(1);

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(result.rawApiResponse || result, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sentimentItems = [
    { label: 'Positive', key: 'Positive', score: scores.Positive, color: '#10b981' },
    { label: 'Negative', key: 'Negative', score: scores.Negative, color: '#ef4444' },
    { label: 'Neutral', key: 'Neutral', score: scores.Neutral, color: '#64748b' },
    { label: 'Mixed', key: 'Mixed', score: scores.Mixed, color: '#8b5cf6' }
  ];

  return (
    <div className="results-dashboard">
      {/* Header */}
      <div className="results-dashboard-header">
        <div className="results-title-group">
          <div className="results-badge-icon">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="results-main-title">Sentiment Analysis Result</h3>
            <span className="results-timestamp">
              Analyzed on {result.analyzedAt ? new Date(result.analyzedAt).toLocaleTimeString() : new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="results-status-badge">
          <CheckCircle2 size={15} />
          <span>AWS API Gateway Live</span>
        </div>
      </div>

      {/* Recapped text */}
      {result.inputText && (
        <div className="analyzed-text-card">
          <div className="analyzed-text-label">Evaluated Feedback Text</div>
          <p className="analyzed-text-content">"{result.inputText}"</p>
        </div>
      )}

      {/* Word-level NLP analytics returned by API */}
      {(result.analyzedWords != null || result.totalSentimentWords != null) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 16px',
          marginBottom: '24px',
          fontSize: '0.86rem',
          color: 'var(--text-body)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <FileText size={15} color="var(--primary)" />
            <span>Analyzed Words: <strong>{result.analyzedWords ?? 0}</strong></span>
          </div>
          <span>•</span>
          <span>Sentiment Words: <strong>{result.totalSentimentWords ?? 0}</strong></span>
          {result.positiveWords > 0 && (
            <>
              <span>•</span>
              <span style={{ color: 'var(--pos-color)', fontWeight: 600 }}>
                Positive Words: {result.positiveWords}
              </span>
            </>
          )}
          {result.negativeWords > 0 && (
            <>
              <span>•</span>
              <span style={{ color: 'var(--neg-color)', fontWeight: 600 }}>
                Negative Words: {result.negativeWords}
              </span>
            </>
          )}
        </div>
      )}

      {/* Main Overall Sentiment Banner */}
      <div
        className="overall-sentiment-banner"
        style={{
          backgroundColor: theme.bgColor,
          borderColor: theme.borderColor
        }}
      >
        <div className="banner-left">
          <div className="sentiment-emoji-large">{theme.emoji}</div>
          <div className="sentiment-label-group">
            <span className="sentiment-eyebrow" style={{ color: theme.color }}>
              Overall Detected Sentiment
            </span>
            <span className="sentiment-winner" style={{ color: theme.color }}>
              {theme.label}
            </span>
            <p className="sentiment-summary-desc">{theme.description}</p>
          </div>
        </div>

        <div className="banner-right">
          <span className="confidence-eyebrow">Confidence Score</span>
          <span className="confidence-val-big" style={{ color: theme.color }}>
            {displayConfidence}%
          </span>
          <span className="confidence-metric-tag">AWS Lambda Confidence Score</span>
        </div>
      </div>

      {/* Scores breakdown & visual donut chart */}
      <div className="breakdown-grid">
        {/* Progress bars list */}
        <div className="scores-list">
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
            Sentiment Probabilities
          </h4>
          {sentimentItems.map(item => {
            const pctVal = item.score * 100;
            const pctStr = (pctVal % 1 === 0) ? pctVal.toFixed(0) : pctVal.toFixed(1);
            return (
              <div key={item.key} className="score-item">
                <div className="score-item-header">
                  <div className="score-title-wrap">
                    <span className="score-badge-dot" style={{ backgroundColor: item.color }}></span>
                    <span className="score-name">{item.label}</span>
                  </div>
                  <span className="score-percentage" style={{ color: item.color }}>
                    {pctStr}%
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${Math.min(100, Math.max(0, pctVal))}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Chart */}
        <SentimentChart sentimentScores={scores} dominantSentiment={sentiment} />
      </div>

      {/* Accordion for Live AWS API Gateway JSON output */}
      <div className="raw-json-section">
        <button
          className="raw-json-toggle"
          onClick={() => setShowJson(prev => !prev)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} />
            <span>View AWS API Gateway JSON Response</span>
          </div>
          {showJson ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showJson && (
          <div className="raw-json-content">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
              <button
                onClick={handleCopyJson}
                style={{
                  color: '#94a3b8',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre>
              {JSON.stringify(result.rawApiResponse || result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

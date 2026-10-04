import React from 'react';
import { BarChart3, ThumbsUp, ThumbsDown, Minus, Smile, PieChart } from 'lucide-react';
import '../styles/Insights.css';

export default function InsightsSection({ history = [] }) {
  // Compute metrics dynamically from current session / localStorage history
  const totalCount = history.length;
  const posCount = history.filter(h => h.sentiment === 'POSITIVE').length;
  const negCount = history.filter(h => h.sentiment === 'NEGATIVE').length;
  const neuCount = history.filter(h => h.sentiment === 'NEUTRAL').length;
  const mixCount = history.filter(h => h.sentiment === 'MIXED').length;

  const posPct = totalCount > 0 ? Math.round((posCount / totalCount) * 100) : 0;
  const negPct = totalCount > 0 ? Math.round((negCount / totalCount) * 100) : 0;
  const neuPct = totalCount > 0 ? Math.round((neuCount / totalCount) * 100) : 0;

  // Calculate sentiment index directly from stored evaluations
  const csatScore = totalCount > 0 
    ? Math.round(((posCount + (mixCount * 0.5)) / totalCount) * 100) 
    : 0;

  return (
    <section id="insights" className="insights-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-pill">
            <BarChart3 size={14} />
            Session Metrics
          </span>
          <h2 className="section-title">Customer Insights</h2>
          <p className="section-desc">
            Metrics calculated dynamically from customer feedback evaluations stored in your analysis history.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="insights-grid">
          {/* Total Feedback */}
          <div className="insight-card">
            <div className="insight-card-top">
              <div className="insight-icon-box insight-icon-blue">
                <BarChart3 size={22} />
              </div>
              <span className="insight-trend trend-pos">Session Log</span>
            </div>
            <div className="insight-title">Total Feedback</div>
            <div className="insight-number">{totalCount}</div>
            <div className="insight-footnote">{totalCount} evaluations in stored history</div>
          </div>

          {/* Positive Feedback */}
          <div className="insight-card">
            <div className="insight-card-top">
              <div className="insight-icon-box insight-icon-green">
                <ThumbsUp size={22} />
              </div>
              <span className="insight-trend trend-pos">{posPct}% Share</span>
            </div>
            <div className="insight-title">Positive Feedback</div>
            <div className="insight-number">{posCount}</div>
            <div className="insight-footnote">{posCount} positive reviews recorded</div>
          </div>

          {/* Negative Feedback */}
          <div className="insight-card">
            <div className="insight-card-top">
              <div className="insight-icon-box insight-icon-red">
                <ThumbsDown size={22} />
              </div>
              <span className="insight-trend trend-neg">{negPct}% Share</span>
            </div>
            <div className="insight-title">Negative Feedback</div>
            <div className="insight-number">{negCount}</div>
            <div className="insight-footnote">{negCount} negative reviews flagged</div>
          </div>

          {/* Neutral Feedback */}
          <div className="insight-card">
            <div className="insight-card-top">
              <div className="insight-icon-box insight-icon-slate">
                <Minus size={22} />
              </div>
              <span className="insight-trend trend-neu">{neuPct}% Share</span>
            </div>
            <div className="insight-title">Neutral Feedback</div>
            <div className="insight-number">{neuCount}</div>
            <div className="insight-footnote">{neuCount} neutral reviews logged</div>
          </div>
        </div>

        {/* Insight Summary Strip */}
        <div className="insight-summary-strip">
          <div className="strip-left">
            <Smile size={24} color="var(--primary)" />
            <div>
              <div className="strip-info-title">Session Customer Sentiment Index (CSI)</div>
              <div className="strip-info-sub">
                Calculated dynamically from stored evaluations analyzed via AWS Lambda.
              </div>
            </div>
          </div>

          <div className="csat-badge-wrap">
            <span className="csat-label">Session CSAT:</span>
            <span className="csat-value">{totalCount > 0 ? `${csatScore}%` : 'N/A'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

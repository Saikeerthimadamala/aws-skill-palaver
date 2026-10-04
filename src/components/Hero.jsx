import React from 'react';
import { ArrowRight, Play, CheckCircle2, CloudLightning, ShieldCheck, Sparkles } from 'lucide-react';
import '../styles/Hero.css';

export default function Hero({ onSelectSample }) {
  const handleAnalyzeClick = () => {
    const el = document.getElementById('analyze');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDemoClick = () => {
    // Select first sample and scroll down
    if (onSelectSample) {
      onSelectSample('I am very happy with the product. The quality is excellent and delivery was fast.');
    }
    const el = document.getElementById('analyze');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <CloudLightning size={16} className="hero-badge-icon" />
            <span>AWS Serverless Sentiment Engine</span>
          </div>

          <h1 className="hero-heading">
            Understand Your Customers <span className="hero-heading-gradient">with AWS Serverless Analysis</span>
          </h1>

          <p className="hero-subheading">
            Analyze customer feedback instantly using AWS serverless sentiment analysis and discover
            whether your customers feel positive, negative, neutral, or mixed.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary hero-btn-primary" onClick={handleAnalyzeClick}>
              <span>Analyze Feedback</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary hero-btn-secondary" onClick={handleDemoClick}>
              <Play size={16} fill="currentColor" />
              <span>View Demo</span>
            </button>
          </div>

          <div className="hero-trust-row">
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-check" />
              <span>Custom NLP Logic</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-check" />
              <span>Sub-Second Latency</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-check" />
              <span>Real-Time Analysis</span>
            </div>
          </div>
        </div>

        {/* Right Modern AI Visual (CSS Shapes, Gradients & Live AI Representation) */}
        <div className="hero-visual-wrapper">
          <div className="hero-glow-sphere" />

          {/* Top Floating Badge */}
          <div className="floating-badge badge-top-left">
            <span className="badge-sentiment-emoji">😊</span>
            <div>
              <span className="badge-text-title">Sample Result</span>
              <span className="badge-text-val" style={{ color: 'var(--pos-color)' }}>Positive (Demo)</span>
            </div>
          </div>

          {/* Bottom Floating Badge */}
          <div className="floating-badge badge-bottom-right">
            <Sparkles size={20} color="var(--primary)" />
            <div>
              <span className="badge-text-title">Backend Engine</span>
              <span className="badge-text-val">AWS Lambda</span>
            </div>
          </div>

          {/* Center Glass Dashboard */}
          <div className="ai-glass-dashboard">
            <div className="dashboard-card-header">
              <div className="live-indicator">
                <span className="live-ping"></span>
                <span>AWS Lambda Engine</span>
              </div>
              <span className="dashboard-title-tag">Sample Analysis</span>
            </div>

            <div className="mock-feedback-box">
              <div className="mock-feedback-label">Sample Feedback (Demo)</div>
              <p className="mock-feedback-quote">
                "The product quality exceeded expectations! Fast delivery and exceptional packaging."
              </p>
            </div>

            <div className="visual-scores-container">
              <div className="visual-score-row">
                <div className="visual-score-header">
                  <span style={{ color: 'var(--pos-color)' }}>Positive (Sample)</span>
                  <span style={{ color: 'var(--pos-color)', fontWeight: 700 }}>98.5%</span>
                </div>
                <div className="visual-bar-bg">
                  <div className="visual-bar-fill" style={{ width: '98.5%', background: 'var(--pos-color)' }}></div>
                </div>
              </div>

              <div className="visual-score-row">
                <div className="visual-score-header">
                  <span style={{ color: 'var(--neu-color)' }}>Neutral (Sample)</span>
                  <span style={{ color: 'var(--neu-color)' }}>0.9%</span>
                </div>
                <div className="visual-bar-bg">
                  <div className="visual-bar-fill" style={{ width: '0.9%', background: 'var(--neu-color)' }}></div>
                </div>
              </div>

              <div className="visual-score-row">
                <div className="visual-score-header">
                  <span style={{ color: 'var(--neg-color)' }}>Negative (Sample)</span>
                  <span style={{ color: 'var(--neg-color)' }}>0.3%</span>
                </div>
                <div className="visual-bar-bg">
                  <div className="visual-bar-fill" style={{ width: '0.3%', background: 'var(--neg-color)' }}></div>
                </div>
              </div>

              <div className="visual-score-row">
                <div className="visual-score-header">
                  <span style={{ color: 'var(--mix-color)' }}>Mixed (Sample)</span>
                  <span style={{ color: 'var(--mix-color)' }}>0.3%</span>
                </div>
                <div className="visual-bar-bg">
                  <div className="visual-bar-fill" style={{ width: '0.3%', background: 'var(--mix-color)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

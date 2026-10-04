import React from 'react';
import { Sparkles, Cloud, Heart } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <div className="footer-brand">
              <div className="brand-icon-wrapper" style={{ width: 32, height: 32 }}>
                <Sparkles size={16} />
              </div>
              <span className="footer-brand-text">
                Sentify<span>.</span>
              </span>
            </div>
            <p className="footer-tagline">AI-Powered Customer Feedback Analysis</p>
            <p className="footer-aws-note">
              <Cloud size={16} color="#ff9900" />
              <span>Powered by Amazon Web Services</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <span className="footer-links-title">Navigation</span>
            <a href="#home" className="footer-link">Home</a>
            <a href="#analyze" className="footer-link">Analyze</a>
            <a href="#history" className="footer-link">History</a>
            <a href="#about" className="footer-link">About</a>
          </div>

          {/* Sentiment Categories */}
          <div className="footer-links-col">
            <span className="footer-links-title">Sentiments Detected</span>
            <span className="footer-link" style={{ color: 'var(--pos-color)' }}>Positive (Delight & Satisfaction)</span>
            <span className="footer-link" style={{ color: 'var(--neg-color)' }}>Negative (Friction & Complaints)</span>
            <span className="footer-link" style={{ color: 'var(--neu-color)' }}>Neutral (Objective Feedback)</span>
            <span className="footer-link" style={{ color: 'var(--mix-color)' }}>Mixed (Nuanced Experience)</span>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <p>© {currentYear} Sentify — College Project: AWS Sentiment Analysis on Customer Feedback.</p>
          <div className="footer-credits">
            <span>Built with React & AWS Serverless Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

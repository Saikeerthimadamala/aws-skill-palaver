import React from 'react';
import { Cloud, LayoutDashboard, CheckCircle2, Info, ArrowUpRight } from 'lucide-react';
import '../styles/AboutHowItWorks.css';

export default function AboutSection({ onOpenArchModal }) {
  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-pill">
            <Info size={14} />
            Background & Architecture
          </span>
          <h2 className="section-title">About the Project</h2>
          <p className="section-desc">
            Bridging cloud machine learning with enterprise feedback analytics for actionable business decisions.
          </p>
        </div>

        <div className="about-grid">
          {/* Card 1: AWS Lambda Sentiment Analysis */}
          <div className="about-card">
            <div className="about-badge">
              <Cloud size={16} />
              <span>AWS Serverless Compute</span>
            </div>

            <h3 className="about-heading">AWS Lambda Sentiment Analysis</h3>

            <p className="about-paragraph">
              AWS Lambda is an event-driven serverless computing service provided by Amazon Web Services 
              that executes backend code automatically in response to HTTP requests without provisioning or managing servers.
            </p>

            <p className="about-paragraph" style={{ marginBottom: '24px' }}>
              In this application, incoming customer feedback is routed through Amazon API Gateway to an AWS Lambda 
              function containing custom sentiment-analysis logic. The Lambda function analyzes word patterns, 
              detects emotional polarity, and computes granular confidence scores across sentiment categories.
            </p>

            <ul className="about-feature-list">
              <li className="about-feature-item">
                <CheckCircle2 size={16} className="about-check" />
                <span>Serverless execution triggered on demand via Amazon API Gateway</span>
              </li>
              <li className="about-feature-item">
                <CheckCircle2 size={16} className="about-check" />
                <span>Custom sentiment analysis evaluating word polarity and emotional cues</span>
              </li>
              <li className="about-feature-item">
                <CheckCircle2 size={16} className="about-check" />
                <span>Granular confidence scores calculated for each sentiment category</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Our Application */}
          <div className="about-card">
            <div className="about-badge">
              <LayoutDashboard size={16} />
              <span>Project Purpose</span>
            </div>

            <h3 className="about-heading">Our Application</h3>

            <p className="about-paragraph">
              This application analyzes customer feedback and displays sentiment results to help 
              businesses understand customer opinions, satisfaction levels, and operational pain points.
            </p>

            <p className="about-paragraph" style={{ marginBottom: '24px' }}>
              Built as a modern college project, Sentify delivers a clean enterprise-grade interface 
              simulating real-world AI software, complete with audit history, distribution metrics, 
              and a modular cloud integration blueprint.
            </p>

            <ul className="about-feature-list">
              <li className="about-feature-item">
                <CheckCircle2 size={16} className="about-check" />
                <span>Instant interactive feedback testing with automated validation</span>
              </li>
              <li className="about-feature-item">
                <CheckCircle2 size={16} className="about-check" />
                <span>Visual distribution charts and session sentiment metrics</span>
              </li>
              <li className="about-feature-item">
                <CheckCircle2 size={16} className="about-check" />
                <span>Serverless AWS architecture using API Gateway + Lambda</span>
              </li>
            </ul>

            {onOpenArchModal && (
              <div style={{ marginTop: '24px' }}>
                <button
                  className="btn-secondary"
                  onClick={onOpenArchModal}
                  style={{ fontSize: '0.88rem', padding: '10px 16px' }}
                >
                  <span>Review AWS Cloud Integration Blueprint</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

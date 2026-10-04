import React from 'react';
import { Edit3, Cpu, PieChart, ArrowRight, ArrowDown, Sparkles, Cloud, CheckCircle } from 'lucide-react';
import '../styles/AboutHowItWorks.css';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Enter Feedback',
      desc: 'Provide raw text reviews, support tickets, survey responses, or customer feedback into the input field.',
      icon: <Edit3 size={22} />
    },
    {
      number: '02',
      title: 'AI Analysis',
      desc: 'AWS Lambda processes the feedback using the sentiment-analysis logic implemented in the Lambda function to evaluate polarity and compute confidence scores.',
      icon: <Cpu size={22} />
    },
    {
      number: '03',
      title: 'View Sentiment',
      desc: 'Instantly view the dominant sentiment classification along with quantifiable percentage confidence metrics and distribution charts.',
      icon: <PieChart size={22} />
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-pill">
            <Sparkles size={14} />
            Execution Pipeline
          </span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            A seamless three-step architecture converting unstructured user feedback into actionable sentiment intelligence.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <span className="step-number">{step.number}</span>
              <div className="step-icon-wrap">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className="flow-diagram-container">
          <div className="flow-title">Visual Architecture Data Flow</div>

          <div className="flow-nodes-wrapper">
            {/* Node 1 */}
            <div className="flow-node">
              <div className="flow-node-icon" style={{ background: '#eff6ff', color: 'var(--primary)' }}>
                <Edit3 size={22} />
              </div>
              <div className="flow-node-title">Customer Feedback</div>
              <div className="flow-node-sub">Unstructured review or text payload</div>
            </div>

            {/* Connector 1 */}
            <div className="flow-connector">
              <div className="flow-arrow-line"></div>
              <ArrowRight size={18} className="desktop-arrow" />
            </div>

            {/* Node 2 */}
            <div className="flow-node">
              <div className="flow-node-icon" style={{ background: '#fffbeb', color: '#ff9900' }}>
                <Cloud size={24} />
              </div>
              <div className="flow-node-title">AWS Lambda</div>
              <div className="flow-node-sub">AWS Lambda Sentiment Engine</div>
            </div>

            {/* Connector 2 */}
            <div className="flow-connector">
              <div className="flow-arrow-line"></div>
              <ArrowRight size={18} className="desktop-arrow" />
            </div>

            {/* Node 3 */}
            <div className="flow-node">
              <div className="flow-node-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle size={22} />
              </div>
              <div className="flow-node-title">Sentiment Result</div>
              <div className="flow-node-sub">Positive, Negative, Neutral, Mixed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

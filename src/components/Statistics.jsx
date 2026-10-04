import React from 'react';
import { Cpu, Layers, Zap, TrendingUp } from 'lucide-react';
import '../styles/Statistics.css';

export default function Statistics() {
  const stats = [
    {
      icon: <Cpu size={24} />,
      colorClass: 'stat-icon-blue',
      title: 'AWS Serverless',
      desc: 'Custom sentiment analysis logic executed on AWS Lambda.'
    },
    {
      icon: <Layers size={24} />,
      colorClass: 'stat-icon-purple',
      title: '4 Sentiment Types',
      desc: 'Detects Positive, Negative, Neutral, and Mixed emotion.'
    },
    {
      icon: <Zap size={24} />,
      colorClass: 'stat-icon-emerald',
      title: 'Real-Time Analysis',
      desc: 'Low-latency sentiment analysis in sub-seconds.'
    },
    {
      icon: <TrendingUp size={24} />,
      colorClass: 'stat-icon-amber',
      title: 'Customer Insights',
      desc: 'Quantifiable confidence percentages to drive business action.'
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((item, index) => (
            <div key={index} className="stat-card">
              <div className={`stat-icon-wrapper ${item.colorClass}`}>
                {item.icon}
              </div>
              <h3 className="stat-label">{item.title}</h3>
              <p className="stat-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

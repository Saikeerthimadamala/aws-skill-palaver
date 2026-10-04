import React from 'react';
import { SAMPLE_BUTTONS } from '../utils/mockData';
import { MessageSquareText } from 'lucide-react';

export default function SampleFeedback({ onSelectSample }) {
  const getBadgeClass = (badge) => {
    switch (badge.toLowerCase()) {
      case 'positive': return 'tag-positive';
      case 'negative': return 'tag-negative';
      case 'neutral': return 'tag-neutral';
      case 'mixed': return 'tag-mixed';
      default: return '';
    }
  };

  return (
    <div className="sample-feedback-wrapper">
      <div className="sample-feedback-header">
        <span className="sample-title">
          <MessageSquareText size={16} />
          Try Sample Feedback
        </span>
      </div>

      <div className="sample-buttons-row">
        {SAMPLE_BUTTONS.map((sample) => (
          <button
            key={sample.id}
            type="button"
            className="sample-btn"
            onClick={() => onSelectSample(sample.text)}
            title="Click to populate this sample into the analyzer"
          >
            <span>{sample.label}</span>
            <span className={`sample-tag ${getBadgeClass(sample.badge)}`}>
              {sample.badge}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

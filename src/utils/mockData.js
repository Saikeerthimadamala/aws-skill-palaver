/**
 * mockData.js
 * Default sample data, initial history, and sentiment styling configuration.
 */

export const SAMPLE_BUTTONS = [
  {
    id: 'positive',
    label: 'Excellent Product',
    badge: 'Positive',
    text: 'I am very happy with the product. The quality is excellent and delivery was fast.'
  },
  {
    id: 'negative',
    label: 'The delivery was terrible',
    badge: 'Negative',
    text: 'The delivery was terrible, package arrived heavily damaged after three weeks, and support was rude.'
  },
  {
    id: 'neutral',
    label: 'The product is okay',
    badge: 'Neutral',
    text: 'The product is okay. It works as described, nothing special or exciting about it.'
  },
  {
    id: 'mixed',
    label: 'Good but late delivery',
    badge: 'Mixed',
    text: 'The product quality is good and sturdy, but the delivery needs serious improvement.'
  }
];

export const INITIAL_HISTORY = [
  {
    id: 'hist-1',
    text: 'I love this product. Amazing quality!',
    sentiment: 'POSITIVE',
    confidence: 95.8,
    scores: {
      Positive: 0.958,
      Negative: 0.005,
      Neutral: 0.024,
      Mixed: 0.013
    },
    timestamp: '2026-10-03 14:22:10'
  },
  {
    id: 'hist-2',
    text: 'The delivery was very late.',
    sentiment: 'NEGATIVE',
    confidence: 92.4,
    scores: {
      Positive: 0.008,
      Negative: 0.924,
      Neutral: 0.051,
      Mixed: 0.017
    },
    timestamp: '2026-10-03 15:40:05'
  },
  {
    id: 'hist-3',
    text: 'The product is okay.',
    sentiment: 'NEUTRAL',
    confidence: 88.1,
    scores: {
      Positive: 0.052,
      Negative: 0.041,
      Neutral: 0.881,
      Mixed: 0.026
    },
    timestamp: '2026-10-03 16:15:32'
  },
  {
    id: 'hist-4',
    text: 'The product is good but delivery needs improvement.',
    sentiment: 'MIXED',
    confidence: 84.6,
    scores: {
      Positive: 0.412,
      Negative: 0.398,
      Neutral: 0.044,
      Mixed: 0.846
    },
    timestamp: '2026-10-03 17:05:18'
  }
];

export const SENTIMENT_CONFIG = {
  POSITIVE: {
    label: 'POSITIVE',
    emoji: '😊',
    color: '#10b981',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    description: 'Customer expresses strong satisfaction, delight, and praise.'
  },
  NEGATIVE: {
    label: 'NEGATIVE',
    emoji: '😡',
    color: '#ef4444',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    description: 'Customer expresses dissatisfaction, frustration, or product issues.'
  },
  NEUTRAL: {
    label: 'NEUTRAL',
    emoji: '😐',
    color: '#64748b',
    bgColor: '#f8fafc',
    borderColor: '#e2e8f0',
    description: 'Customer statement is factual or objective without strong emotional bias.'
  },
  MIXED: {
    label: 'MIXED',
    emoji: '🤔',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    description: 'Customer feedback contains both strong positive and negative sentiments.'
  }
};

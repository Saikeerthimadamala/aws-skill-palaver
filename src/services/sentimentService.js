/**
 * sentimentService.js
 * 
 * Live AWS API Gateway Sentiment Analysis Service
 * Calls AWS Lambda via AWS API Gateway REST endpoint.
 */

export const API_ENDPOINT = 'https://t01kz93tzg.execute-api.us-east-1.amazonaws.com/analyze';

/**
 * Sends customer feedback text to the AWS API Gateway sentiment API.
 * @param {string} text - Customer feedback text
 * @returns {Promise<Object>} Sentiment result object with percentage-converted scores
 */
export async function analyzeSentiment(text) {
  if (!text || !text.trim()) {
    throw new Error('Please enter customer feedback text before analyzing.');
  }

  const trimmed = text.trim();

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: trimmed
    })
  });

  if (!response.ok) {
    let errorMessage = `API request failed with status: ${response.status}`;
    try {
      const errData = await response.json();
      if (errData && errData.error) {
        errorMessage = errData.error;
      }
    } catch (_) {
      // Fallback to HTTP status if body is not JSON
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  // Normalize sentiment to uppercase (e.g. POSITIVE, NEGATIVE, NEUTRAL, MIXED)
  const normalizedSentiment = (data.sentiment || 'POSITIVE').toUpperCase();

  // Decimal scores from API (e.g. 0.92, 0.01)
  const confidence = typeof data.confidence === 'number' ? data.confidence : 0;
  const positive = typeof data.positive === 'number' ? data.positive : 0;
  const negative = typeof data.negative === 'number' ? data.negative : 0;
  const neutral = typeof data.neutral === 'number' ? data.neutral : 0;
  const mixed = typeof data.mixed === 'number' ? data.mixed : 0;

  return {
    // Direct API attributes
    sentiment: normalizedSentiment,
    confidence: confidence,
    positive: positive,
    negative: negative,
    neutral: neutral,
    mixed: mixed,
    positiveWords: data.positiveWords ?? 0,
    negativeWords: data.negativeWords ?? 0,
    analyzedWords: data.analyzedWords ?? 0,
    totalSentimentWords: data.totalSentimentWords ?? 0,

    // Backward-compatible properties for existing dashboard components
    Sentiment: normalizedSentiment,
    SentimentScore: {
      Positive: positive,
      Negative: negative,
      Neutral: neutral,
      Mixed: mixed
    },

    inputText: trimmed,
    analyzedAt: new Date().toISOString(),
    rawApiResponse: data
  };
}

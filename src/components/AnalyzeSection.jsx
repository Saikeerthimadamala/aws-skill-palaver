import React, { useState, useRef } from 'react';
import SampleFeedback from './SampleFeedback';
import SentimentResult from './SentimentResult';
import { analyzeSentiment } from '../services/sentimentService';
import { Sparkles, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import '../styles/Analyze.css';
import '../styles/Results.css';

export default function AnalyzeSection({ 
  inputText, 
  setInputText, 
  onAnalysisComplete 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  const MAX_CHARS = 5000;

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setInputText(val);
      if (errorMessage) setErrorMessage('');
    }
  };

  const handleSelectSample = (sampleText) => {
    setInputText(sampleText);
    setErrorMessage('');
  };

  const handleClear = () => {
    setInputText('');
    setErrorMessage('');
    setResult(null);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!inputText || !inputText.trim()) {
      setErrorMessage('Please enter customer feedback before analyzing.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    setResult(null);

    try {
      const data = await analyzeSentiment(inputText);
      setResult(data);
      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
      // Auto-scroll slightly to results if needed
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during sentiment analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="analyze" className="analyze-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-pill">
            <Sparkles size={14} />
            NLP Analyzer
          </span>
          <h2 className="section-title">Analyze Customer Feedback</h2>
          <p className="section-desc">
            Enter customer feedback below and our AWS-powered analyzer will identify the sentiment.
          </p>
        </div>

        <div className="analyze-workspace-container">
          {/* Sample Feedback Shortcuts */}
          <SampleFeedback onSelectSample={handleSelectSample} />

          {/* Validation Error Alert */}
          {errorMessage && (
            <div className="alert-box alert-error">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Main Input Box */}
          <form onSubmit={handleAnalyze} className="input-card">
            <textarea
              className="feedback-textarea"
              placeholder="Example: I am very happy with the product. The quality is excellent and delivery was fast."
              value={inputText}
              onChange={handleTextChange}
              rows={5}
              disabled={isLoading}
              aria-label="Customer feedback input text"
            />

            <div className="input-footer">
              <div className={`char-counter ${inputText.length > 4500 ? 'warning' : ''}`}>
                {inputText.length} / {MAX_CHARS} characters
              </div>

              <div className="input-actions">
                <button
                  type="button"
                  className="btn-clear"
                  onClick={handleClear}
                  disabled={isLoading || !inputText}
                  title="Clear feedback input"
                >
                  <Trash2 size={16} />
                  <span>Clear</span>
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Analyze Sentiment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Loading Visual Placeholder */}
          {isLoading && (
            <div className="loading-box">
              <div className="loading-spinner-wrapper">
                <Loader2 size={28} className="animate-spin" />
              </div>
              <h4 className="loading-title">Processing with AWS Lambda...</h4>
              <p className="loading-subtitle">
                Executing serverless sentiment analysis, computing confidence scores, and classifying emotional polarity.
              </p>
            </div>
          )}

          {/* Result Dashboard */}
          {result && !isLoading && (
            <div ref={resultsRef} className="results-wrapper">
              <SentimentResult result={result} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

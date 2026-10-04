import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import AnalyzeSection from './components/AnalyzeSection';
import InsightsSection from './components/InsightsSection';
import HistorySection from './components/HistorySection';
import HowItWorks from './components/HowItWorks';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import AwsArchitectureModal from './components/AwsArchitectureModal';
import { INITIAL_HISTORY } from './utils/mockData';

const STORAGE_KEY = 'sentify_feedback_history_v1';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to read history from localStorage:', e);
    }
    return INITIAL_HISTORY;
  });

  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage:', e);
    }
  }, [history]);

  // Handle new analysis completed
  const handleAnalysisComplete = (newResult) => {
    if (!newResult) return;

    const sentiment = (newResult.sentiment || newResult.Sentiment || 'POSITIVE').toUpperCase();

    // Convert decimal confidence to percentage (e.g. 0.92 -> 92)
    let confPercent = 0;
    if (newResult.confidence != null) {
      const val = newResult.confidence <= 1 ? newResult.confidence * 100 : newResult.confidence;
      confPercent = (val % 1 === 0) ? Number(val.toFixed(0)) : Number(val.toFixed(1));
    } else if (newResult.SentimentScore) {
      const maxScore = Math.max(
        newResult.SentimentScore.Positive || 0,
        newResult.SentimentScore.Negative || 0,
        newResult.SentimentScore.Neutral || 0,
        newResult.SentimentScore.Mixed || 0
      ) * 100;
      confPercent = (maxScore % 1 === 0) ? Number(maxScore.toFixed(0)) : Number(maxScore.toFixed(1));
    }

    const scores = {
      Positive: newResult.positive ?? newResult.SentimentScore?.Positive ?? 0,
      Negative: newResult.negative ?? newResult.SentimentScore?.Negative ?? 0,
      Neutral: newResult.neutral ?? newResult.SentimentScore?.Neutral ?? 0,
      Mixed: newResult.mixed ?? newResult.SentimentScore?.Mixed ?? 0
    };

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      text: newResult.inputText,
      sentiment: sentiment,
      confidence: confPercent,
      scores: scores,
      timestamp: formattedDate
    };

    setHistory((prev) => [newHistoryItem, ...prev]);
  };

  // Load a text from sample or history into textarea
  const handleLoadText = (text) => {
    setInputText(text);
    const el = document.getElementById('analyze');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleResetDefaultHistory = () => {
    setHistory(INITIAL_HISTORY);
  };

  return (
    <div className="app-container">
      {/* 1. Navbar */}
      <Navbar onOpenArchModal={() => setIsArchModalOpen(true)} />

      <main>
        {/* 2. Hero Section */}
        <Hero onSelectSample={handleLoadText} />

        {/* 3. Statistics Section */}
        <Statistics />

        {/* 4, 5, 6, 7. Analyze Workspace, Sample Feedback, Sentiment Result & Chart */}
        <AnalyzeSection
          inputText={inputText}
          setInputText={setInputText}
          onAnalysisComplete={handleAnalysisComplete}
        />

        {/* 9. Customer Insights (Dynamic from session & aggregate) */}
        <InsightsSection history={history} />

        {/* 8. Recent Analysis History (Stored in localStorage) */}
        <HistorySection
          history={history}
          onLoadText={handleLoadText}
          onClearHistory={handleClearHistory}
          onResetDefaultHistory={handleResetDefaultHistory}
        />

        {/* 11. How It Works Pipeline */}
        <HowItWorks />

        {/* 10. About Amazon Comprehend & Application */}
        <AboutSection onOpenArchModal={() => setIsArchModalOpen(true)} />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Interactive AWS Cloud Architecture Modal */}
      <AwsArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />
    </div>
  );
}

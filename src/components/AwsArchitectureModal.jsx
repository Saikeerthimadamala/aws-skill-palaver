import React from 'react';
import { X, Cloud, Terminal, ArrowRight, CheckCircle2, Shield, Copy, Check, Cpu, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AwsArchitectureModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const lambdaCode = `import json

# AWS Lambda Function (Python 3.11)
# Implements serverless customer feedback sentiment analysis logic

def lambda_handler(event, context):
    try:
        # 1. Parse incoming request from API Gateway
        body = json.loads(event.get('body', '{}'))
        text = body.get('text', '').strip()

        if not text:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST'
                },
                'body': json.dumps({'error': 'Please enter customer feedback.'})
            }

        # 2. Custom Sentiment Analysis Algorithm executed inside AWS Lambda
        # Evaluates word polarity, counts sentiment keywords, and calculates scores
        # (Used because Amazon Comprehend is restricted in AWS Academy lab permissions)
        result = analyze_sentiment(text)

        # 3. Return standardized response
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({
                'sentiment': result['sentiment'],
                'confidence': result['confidence'],
                'positive': result['positive'],
                'negative': result['negative'],
                'neutral': result['neutral'],
                'mixed': result['mixed'],
                'positiveWords': result['positiveWords'],
                'negativeWords': result['negativeWords'],
                'analyzedWords': result['analyzedWords'],
                'totalSentimentWords': result['totalSentimentWords']
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lambdaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalDialogStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#fffbeb', padding: 8, borderRadius: 8, color: '#ff9900' }}>
              <Cloud size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                AWS Cloud Architecture Blueprint
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Serverless Pipeline: React ➔ API Gateway ➔ AWS Lambda (Sentiment Logic)
              </p>
            </div>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>
            <X size={20} />
          </button>
        </div>

        {/* Pipeline Diagram */}
        <div style={pipelineDiagramStyle}>
          <div style={pipelineNodeStyle}>
            <span style={pipelineBadgeStyle}>Frontend</span>
            <strong>React + Vite</strong>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>User Interface</span>
          </div>
          <ArrowRight size={18} color="#2563eb" />
          <div style={pipelineNodeStyle}>
            <span style={pipelineBadgeStyle}>API Layer</span>
            <strong>API Gateway</strong>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Live /analyze Endpoint</span>
          </div>
          <ArrowRight size={18} color="#2563eb" />
          <div style={{ ...pipelineNodeStyle, borderColor: '#ff9900', background: '#fffdf5' }}>
            <span style={{ ...pipelineBadgeStyle, background: '#fff3cd', color: '#b7791f' }}>Compute & AI</span>
            <strong style={{ color: '#232f3e' }}>AWS Lambda</strong>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Custom Sentiment Logic</span>
          </div>
          <ArrowRight size={18} color="#2563eb" />
          <div style={pipelineNodeStyle}>
            <span style={{ ...pipelineBadgeStyle, background: '#ecfdf5', color: '#059669' }}>Output</span>
            <strong>Sentiment Result</strong>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Scores & Word Metrics</span>
          </div>
        </div>

        {/* Active Production Endpoint & Note */}
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-main)' }}>
            Active Production Endpoint:
          </h4>
          <div style={{
            background: '#f1f5f9',
            padding: '10px 14px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: '#0f172a',
            wordBreak: 'break-all',
            marginBottom: '10px'
          }}>
            POST https://t01kz93tzg.execute-api.us-east-1.amazonaws.com/analyze
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            <strong>Academic Note:</strong> In this AWS Academy project environment, sentiment analysis is executed directly 
            within AWS Lambda using custom NLP classification logic, as Amazon Comprehend is restricted under student lab permissions.
          </p>
        </div>

        {/* Code Snippet Box */}
        <div style={{ position: 'relative', background: '#0f172a', borderRadius: 8, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'monospace' }}>
              lambda_function.py
            </span>
            <button
              onClick={handleCopyCode}
              style={{
                color: '#94a3b8',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <pre style={{ margin: 0, color: '#38bdf8', fontSize: '0.8rem', fontFamily: 'monospace', maxHeight: 200, overflowY: 'auto' }}>
            {lambdaCode}
          </pre>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <button className="btn-primary" onClick={onClose} style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline styles for high-fidelity modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.6)',
  backdropFilter: 'blur(4px)',
  zIndex: 2000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16
};

const modalDialogStyle = {
  background: '#ffffff',
  borderRadius: 16,
  maxWidth: 780,
  width: '100%',
  padding: 28,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const modalHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 16,
  borderBottom: '1px solid #e2e8f0',
  marginBottom: 20
};

const closeButtonStyle = {
  background: '#f1f5f9',
  border: 'none',
  borderRadius: 8,
  padding: 6,
  color: '#64748b',
  cursor: 'pointer'
};

const pipelineDiagramStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  background: '#f8fafc',
  padding: 16,
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  marginBottom: 20,
  overflowX: 'auto'
};

const pipelineNodeStyle = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  padding: '10px 14px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  minWidth: 120,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
};

const pipelineBadgeStyle = {
  fontSize: '0.68rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: '2px 6px',
  borderRadius: 4,
  background: '#eff6ff',
  color: '#2563eb',
  marginBottom: 4
};

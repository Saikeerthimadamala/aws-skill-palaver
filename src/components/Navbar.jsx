import React, { useState } from 'react';
import { Sparkles, Menu, X, Cloud, Terminal } from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar({ onOpenArchModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand */}
        <a href="#home" className="nav-brand" onClick={closeMobileMenu}>
          <div className="brand-icon-wrapper">
            <Sparkles size={20} />
          </div>
          <span className="brand-text">
            Sentify<span className="brand-dot">.</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            <li><a href="#home" className="nav-link active">Home</a></li>
            <li><a href="#analyze" className="nav-link">Analyze</a></li>
            <li><a href="#history" className="nav-link">History</a></li>
            <li><a href="#insights" className="nav-link">Insights</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
          </ul>
        </nav>

        {/* Right side AWS Badge */}
        <div className="nav-right">
          {onOpenArchModal && (
            <button 
              className="aws-arch-btn" 
              onClick={onOpenArchModal}
              title="View AWS API Architecture"
            >
              <Terminal size={14} />
              <span>AWS Pipeline</span>
            </button>
          )}

          <div className="aws-badge" title="Powered by AWS Lambda & API Gateway">
            <span className="aws-badge-dot"></span>
            <Cloud size={15} color="#ff9900" />
            <span>AWS Serverless</span>
          </div>

          <button 
            className="mobile-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#home" className="mobile-nav-link" onClick={closeMobileMenu}>Home</a></li>
          <li><a href="#analyze" className="mobile-nav-link" onClick={closeMobileMenu}>Analyze</a></li>
          <li><a href="#history" className="mobile-nav-link" onClick={closeMobileMenu}>History</a></li>
          <li><a href="#insights" className="mobile-nav-link" onClick={closeMobileMenu}>Insights</a></li>
          <li><a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>About</a></li>
        </ul>
        {onOpenArchModal && (
          <button 
            className="btn-secondary" 
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
            onClick={() => {
              closeMobileMenu();
              onOpenArchModal();
            }}
          >
            <Terminal size={16} />
            <span>View AWS Cloud Architecture</span>
          </button>
        )}
      </div>
    </header>
  );
}

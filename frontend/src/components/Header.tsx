import React, { useState } from 'react';
import { Menu, X, Target } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'skills', label: 'Skills' },
    { id: 'discover', label: 'Discover' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'compare', label: 'Compare' },
    { id: 'saved', label: 'Saved' }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo">
            <Target size={28} color="var(--color-primary)" />
            <span className="header-title">Career Path Finder</span>
          </div>

          <nav className="header-nav desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'nav-link--active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="header-nav mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'nav-link--active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

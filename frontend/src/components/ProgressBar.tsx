import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage = true,
  variant = 'primary',
  size = 'md'
}) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-wrapper">
      {(label || showPercentage) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && <span className="progress-percentage">{percentage}%</span>}
        </div>
      )}
      <div className={`progress-bar progress-bar--${size}`}>
        <div 
          className={`progress-fill progress-fill--${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

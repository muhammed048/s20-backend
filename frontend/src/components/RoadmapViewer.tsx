import React, { useState } from 'react';
import { Zap, DollarSign, Shield, Clock, Target, CheckCircle, TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import './RoadmapViewer.css';

interface RoadmapViewerProps {
  selectedRole: any;
  selectedJob?: any;
}

export const RoadmapViewer: React.FC<RoadmapViewerProps> = ({ 
  selectedRole,
  selectedJob 
}) => {
  const [selectedPath, setSelectedPath] = useState<'fast_path' | 'cheap_path' | 'safe_path'>('fast_path');
  
  const displayData = selectedJob || selectedRole;
  
  if (!displayData) {
    return (
      <div className="roadmap-viewer">
        <Card className="empty-state">
          <p className="text-center text-secondary">
            Select a job to view its personalized learning roadmap
          </p>
        </Card>
      </div>
    );
  }
  
  // Check if we have learning paths from backend
  if (!selectedJob?.learning_paths) {
    return (
      <div className="roadmap-viewer">
        <Card className="empty-state">
          <h3>Roadmap Not Available</h3>
          <p className="text-secondary">
            Learning paths are only available for jobs analyzed through skill matching.
          </p>
          <p className="text-secondary" style={{ marginTop: '1rem' }}>
            Go back to the Discover section and analyze your skills to see personalized roadmaps.
          </p>
        </Card>
      </div>
    );
  }
  
  const paths = selectedJob.learning_paths;
  const currentPath = paths[selectedPath];
  
  // Path configuration for styling
  const pathConfigs = {
    fast_path: {
      icon: <Zap size={24} />,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      label: 'Fast Track'
    },
    cheap_path: {
      icon: <DollarSign size={24} />,
      color: '#10b981',
      bgColor: '#d1fae5',
      label: 'Budget-Friendly'
    },
    safe_path: {
      icon: <Shield size={24} />,
      color: '#3b82f6',
      bgColor: '#dbeafe',
      label: 'Safe & Steady'
    }
  };
  
  return (
    <div className="roadmap-viewer">
      {/* Header */}
      <div className="section-header">
        <h2>{selectedJob.title} - Learning Roadmap</h2>
        <p className="text-secondary">
          Choose your learning strategy based on your situation
        </p>
      </div>
      
      {/* Current Match Card */}
      <Card className="match-summary-card">
        <div className="match-summary-content">
          <div>
            <h4>Current Match</h4>
            <p className="text-secondary">Based on your existing skills</p>
          </div>
          <div className="match-percentage-large">
            {selectedJob.match_percentage}%
          </div>
        </div>
        <ProgressBar value={selectedJob.match_percentage} />
      </Card>
      
      {/* Path Selection Cards - Fixed onClick */}
      <div className="path-selector-grid">
        {Object.entries(paths).map(([pathKey, pathData]: [string, any]) => {
          const config = pathConfigs[pathKey as keyof typeof pathConfigs];
          const isSelected = selectedPath === pathKey;
          
          return (
            <div 
              key={pathKey}
              className={`path-selection-card ${isSelected ? 'path-selection-card--selected' : ''}`}
              onClick={() => setSelectedPath(pathKey as any)}
              style={{
                borderColor: isSelected ? config.color : '#e5e7eb',
                backgroundColor: isSelected ? config.bgColor : 'white',
                cursor: 'pointer'
              }}
            >
              <Card>
                <div className="path-card-icon" style={{ color: config.color }}>
                  {config.icon}
                </div>
                <h3 className="path-card-title">{pathData.name}</h3>
                <p className="path-card-description">{pathData.description}</p>
                
                <div className="path-card-stats">
                  <div className="path-stat">
                    <Clock size={16} />
                    <span>{pathData.estimated_time}</span>
                  </div>
                  <div className="path-stat">
                    <Target size={16} />
                    <span>{pathData.match_gain}</span>
                  </div>
                </div>
                
                <div className="path-final-match">
                  <span className="text-sm text-secondary">Target Match:</span>
                  <span className="final-match-value">{pathData.target_match}</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      
      {/* Selected Path Details */}
      <Card className="path-details-card">
        <div className="path-details-header">
          <div className="path-details-title-section">
            <div className="path-icon-large" style={{ color: pathConfigs[selectedPath].color }}>
              {pathConfigs[selectedPath].icon}
            </div>
            <div>
              <h3>{currentPath.name}</h3>
              <p className="text-secondary">{currentPath.description}</p>
            </div>
          </div>
          <Badge variant="primary">{currentPath.estimated_time}</Badge>
        </div>
        
        {/* Learning Steps */}
        <div className="learning-steps-section">
          <h4> Your Learning Plan</h4>
          
          {currentPath.skills && currentPath.skills.length > 0 ? (
            <div className="learning-steps-list">
              {currentPath.skills.map((skill: any, idx: number) => (
                <Card key={idx} className="learning-step-card">
                  <div className="step-number-badge">Step {idx + 1}</div>
                  
                  <div className="step-content">
                    <div className="step-header-row">
                      <h5 className="step-skill-name">{skill.skill}</h5>
                      <div className="step-badges">
                        <Badge variant={
                          skill.type === 'one-hop' ? 'success' : 
                          skill.type === 'two-hop' ? 'warning' : 
                          'default'
                        }>
                          {skill.type === 'one-hop' ? 'Easy Win' : 
                           skill.type === 'two-hop' ? 'Medium' : 
                           'New Skill'}
                        </Badge>
                        <Badge>{skill.learning_time}h</Badge>
                      </div>
                    </div>
                    
                    <p className="step-reason">{skill.reason}</p>
                    
                    <div className="step-impact">
                      <TrendingUp size={16} color="#10b981" />
                      <span className="impact-text">+{skill.gain}% match boost</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p className="text-secondary">No additional skills needed - you're already a strong match!</p>
            </Card>
          )}
        </div>
        
        {/* Pros & Cons */}
        <div className="pros-cons-section">
          <div className="pros-section">
            <h4> Advantages</h4>
            <ul className="pros-list">
              {currentPath.pros.map((pro: string, idx: number) => (
                <li key={idx}>{pro}</li>
              ))}
            </ul>
          </div>
          
          <div className="cons-section">
            <h4> Trade-offs</h4>
            <ul className="cons-list">
              {currentPath.cons.map((con: string, idx: number) => (
                <li key={idx}>{con}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Progress Preview */}
        <div className="progress-preview-section">
          <h4>Expected Outcome</h4>
          <div className="progress-comparison">
            <div className="progress-before">
              <span className="progress-label">Current</span>
              <div className="progress-value-large">{currentPath.current_match}</div>
              <ProgressBar value={selectedJob.match_percentage} />
            </div>
            
            <div className="progress-arrow">
              <span style={{ fontSize: '2rem' }}>→</span>
            </div>
            
            <div className="progress-after">
              <span className="progress-label">After Learning</span>
              <div className="progress-value-large">{currentPath.target_match}</div>
              <ProgressBar value={parseInt(currentPath.target_match)} />
            </div>
          </div>
          
          <div className="total-improvement">
            <CheckCircle size={20} color="#10b981" />
            <span className="improvement-text">
              <strong>{currentPath.match_gain}</strong> improvement in {currentPath.estimated_time}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
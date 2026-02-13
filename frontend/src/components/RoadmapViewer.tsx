import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { CareerRole, RoadmapPath } from '../types/schema';
import { ROADMAP_PATHS } from '../data/mockData';
import './RoadmapViewer.css';

interface RoadmapViewerProps {
  selectedRole: CareerRole | null;
}

export const RoadmapViewer: React.FC<RoadmapViewerProps> = ({ selectedRole }) => {
  const [selectedPath, setSelectedPath] = useState<'fast' | 'budget' | 'safe'>('fast');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  if (!selectedRole) {
    return (
      <div className="roadmap-viewer">
        <Card className="empty-state">
          <p className="text-center text-secondary">
            Select a role from the Discover section to view its roadmap
          </p>
        </Card>
      </div>
    );
  }

  const paths = ROADMAP_PATHS[selectedRole.id] || [];
  const currentPath = paths.find(p => p.type === selectedPath);

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getProgress = () => {
    if (!currentPath) return 0;
    return (completedSteps.size / currentPath.steps.length) * 100;
  };

  const getPathDescription = (type: 'fast' | 'budget' | 'safe') => {
    if (type === 'fast') return 'Aggressive timeline with intensive learning. Quickest path to entry.';
    if (type === 'budget') return 'Self-study and free resources. Lower cost, more time required.';
    return 'Gradual transition while continuing current work. Balanced risk and stability.';
  };

  const getStepIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      course: '📚',
      project: '💻',
      certification: '🎓',
      internship: '🏢',
      networking: '🤝',
      'job-search': '🎯',
      'exam-prep': '📝'
    };
    return iconMap[type] || '📌';
  };

  const getEffortColor = (effort: 'low' | 'medium' | 'high') => {
    if (effort === 'high') return 'error';
    if (effort === 'medium') return 'warning';
    return 'success';
  };

  const actionPlanSteps = currentPath?.steps.slice(0, 3) || [];

  return (
    <div className="roadmap-viewer">
      <div className="section-header">
        <h2>Roadmap: {selectedRole.name}</h2>
        <p className="text-secondary">
          Choose your path and track your progress
        </p>
      </div>

      <Card className="path-selector-card">
        <div className="path-tabs">
          <button
            className={`path-tab ${selectedPath === 'fast' ? 'path-tab--active' : ''}`}
            onClick={() => setSelectedPath('fast')}
          >
            <TrendingUp size={20} />
            <div>
              <div className="path-tab-title">Fast Track</div>
              <div className="path-tab-subtitle">6-8 months</div>
            </div>
          </button>
          <button
            className={`path-tab ${selectedPath === 'budget' ? 'path-tab--active' : ''}`}
            onClick={() => setSelectedPath('budget')}
          >
            <span style={{ fontSize: '20px' }}>💰</span>
            <div>
              <div className="path-tab-title">Budget-Friendly</div>
              <div className="path-tab-subtitle">12-18 months</div>
            </div>
          </button>
          <button
            className={`path-tab ${selectedPath === 'safe' ? 'path-tab--active' : ''}`}
            onClick={() => setSelectedPath('safe')}
          >
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <div>
              <div className="path-tab-title">Safe & Steady</div>
              <div className="path-tab-subtitle">18-24 months</div>
            </div>
          </button>
        </div>
        <p className="path-description text-secondary">
          {getPathDescription(selectedPath)}
        </p>
      </Card>

      {currentPath && (
        <>
          <Card className="progress-card">
            <h4>Your Progress</h4>
            <ProgressBar 
              value={getProgress()} 
              label={`${completedSteps.size} of ${currentPath.steps.length} steps completed`}
              variant="success"
              size="lg"
            />
          </Card>

          <div className="action-plan-section">
            <h3>90-Day Action Plan</h3>
            <Card>
              <div className="action-steps">
                {actionPlanSteps.map((step, index) => (
                  <div key={step.id} className="action-step">
                    <div className="action-step-number">{index + 1}</div>
                    <div className="action-step-content">
                      <div className="action-step-header">
                        <span className="action-step-icon">{getStepIcon(step.type)}</span>
                        <h5>{step.title}</h5>
                      </div>
                      <div className="action-step-meta">
                        <Badge size="sm">{step.type}</Badge>
                        <span className="text-sm text-secondary">
                          <Clock size={14} /> {step.duration}
                        </span>
                        <Badge size="sm" variant={getEffortColor(step.effortLevel)}>
                          {step.effortLevel} effort
                        </Badge>
                      </div>
                    </div>
                    <button
                      className="step-checkbox"
                      onClick={() => toggleStep(step.id)}
                    >
                      {completedSteps.has(step.id) ? (
                        <CheckCircle size={24} color="var(--color-success)" />
                      ) : (
                        <Circle size={24} color="var(--color-border-dark)" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="full-roadmap-section">
            <h3>Complete Roadmap</h3>
            <div className="roadmap-steps">
              {currentPath.steps.map((step, index) => (
                <Card 
                  key={step.id} 
                  className={`roadmap-step ${completedSteps.has(step.id) ? 'roadmap-step--completed' : ''}`}
                  hover
                >
                  <div className="step-number-badge">
                    Step {index + 1}
                  </div>
                  <div className="step-content">
                    <div className="step-header">
                      <span className="step-icon">{getStepIcon(step.type)}</span>
                      <h4 className="step-title">{step.title}</h4>
                    </div>
                    <div className="step-meta">
                      <Badge size="sm">{step.type}</Badge>
                      <span className="text-sm text-secondary">
                        <Clock size={14} /> {step.duration}
                      </span>
                      <Badge size="sm" variant={getEffortColor(step.effortLevel)}>
                        {step.effortLevel} effort
                      </Badge>
                    </div>
                    {step.prerequisites.length > 0 && (
                      <div className="step-prerequisites">
                        <span className="uppercase-label">Prerequisites:</span>
                        <span className="text-sm text-secondary">
                          Steps {step.prerequisites.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    className="step-complete-btn"
                    onClick={() => toggleStep(step.id)}
                  >
                    {completedSteps.has(step.id) ? (
                      <><CheckCircle size={20} /> Completed</>
                    ) : (
                      <><Circle size={20} /> Mark Complete</>
                    )}
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {!currentPath && (
        <Card className="empty-state">
          <p className="text-center text-secondary">
            No roadmap available for this role yet
          </p>
        </Card>
      )}
    </div>
  );
};

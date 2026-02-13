import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from './Card';
import { Slider } from './Input';
import { Button } from './Button';
import { Badge } from './Badge';
import { Skill, SkillCategory } from '../types/schema';
import { SKILL_CATEGORIES, SKILLS_BY_CATEGORY } from '../data/mockData';
import './SkillsSection.css';

interface SkillsSectionProps {
  onComplete: (skills: Skill[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onComplete }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<SkillCategory>>(new Set(['tech']));
  const [skills, setSkills] = useState<Skill[]>(() => {
    const initialSkills: Skill[] = [];
    Object.entries(SKILLS_BY_CATEGORY).forEach(([category, skillNames]) => {
      skillNames.forEach((name, index) => {
        initialSkills.push({
          id: `${category}-${index}`,
          name,
          category: category as SkillCategory,
          confidence: 0,
          interest: null
        });
      });
    });
    return initialSkills;
  });

  const toggleCategory = (category: SkillCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const updateSkill = (skillId: string, updates: Partial<Skill>) => {
    setSkills(skills.map(skill => 
      skill.id === skillId ? { ...skill, ...updates } : skill
    ));
  };

  const getCategorySkills = (category: SkillCategory) => {
    return skills.filter(skill => skill.category === category);
  };

  const handleSubmit = () => {
    const completedSkills = skills.filter(s => s.confidence > 0);
    onComplete(completedSkills);
  };

  return (
    <div className="skills-section">
      <div className="section-header">
        <h2>Skills Assessment</h2>
        <p className="text-secondary">
          Rate your confidence in different skills across multiple domains
        </p>
      </div>

      <div className="skills-categories">
        {Object.entries(SKILL_CATEGORIES).map(([categoryKey, categoryName]) => {
          const category = categoryKey as SkillCategory;
          const isExpanded = expandedCategories.has(category);
          const categorySkills = getCategorySkills(category);
          const completedCount = categorySkills.filter(s => s.confidence > 0).length;

          return (
            <Card key={category} className="category-card">
              <button
                className="category-header"
                onClick={() => toggleCategory(category)}
              >
                <div className="category-info">
                  <h3 className="category-title">{categoryName}</h3>
                  <span className="category-count">
                    {completedCount} / {categorySkills.length} completed
                  </span>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isExpanded && (
                <div className="skills-list">
                  {categorySkills.map(skill => (
                    <div key={skill.id} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <Slider
                        value={skill.confidence}
                        onChange={(value) => updateSkill(skill.id, { confidence: value })}
                        showValue
                      />
                      <div className="skill-interests">
                        <button
                          className={`interest-btn ${skill.interest === 'love' ? 'interest-btn--active' : ''}`}
                          onClick={() => updateSkill(skill.id, { interest: skill.interest === 'love' ? null : 'love' })}
                        >
                          Love this
                        </button>
                        <button
                          className={`interest-btn ${skill.interest === 'curious' ? 'interest-btn--active' : ''}`}
                          onClick={() => updateSkill(skill.id, { interest: skill.interest === 'curious' ? null : 'curious' })}
                        >
                          Curious
                        </button>
                        <button
                          className={`interest-btn ${skill.interest === 'not-interested' ? 'interest-btn--active' : ''}`}
                          onClick={() => updateSkill(skill.id, { interest: skill.interest === 'not-interested' ? null : 'not-interested' })}
                        >
                          Not interested
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="section-actions">
        <Button size="lg" onClick={handleSubmit}>
          Analyze My Skills & Discover Roles
        </Button>
      </div>
    </div>
  );
};

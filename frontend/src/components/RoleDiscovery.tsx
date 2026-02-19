import React, { useState } from 'react';
import { Star, Briefcase, TrendingUp, Clock, DollarSign, Filter } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Select } from './Input';
import { ProgressBar } from './ProgressBar';
import { CareerRole, Domain } from '../types/schema';
import { MOCK_ROLES } from '../data/mockData';
import './RoleDiscovery.css';

interface RoleDiscoveryProps {
  onSelectRole: (role: CareerRole) => void;
  savedRoles: string[];
  onToggleSave: (roleId: string) => void;
}

export const RoleDiscovery: React.FC<RoleDiscoveryProps> = ({ 
  onSelectRole, 
  savedRoles,
  onToggleSave 
}) => {

  const [roles] = useState<CareerRole[]>(MOCK_ROLES);
  const [sortBy, setSortBy] = useState<string>('fitScore');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [filterGrowth, setFilterGrowth] = useState<string>('all');

  const sortOptions = [
    { value: 'fitScore', label: 'Highest Fit' },
    { value: 'growth', label: 'Highest Growth' },
    { value: 'salary', label: 'Highest Salary' },
    { value: 'time', label: 'Shortest Timeline' }
  ];

  const domainOptions = [
    { value: 'all', label: 'All Domains' },
    { value: 'Tech & Computing', label: 'Tech & Computing' },
    { value: 'Business & Management', label: 'Business & Management' },
    { value: 'Design & Creative', label: 'Design & Creative' },
    { value: 'Law & Policy', label: 'Law & Policy' },
    { value: 'Commerce & Finance', label: 'Commerce & Finance' }
  ];

  const growthOptions = [
    { value: 'all', label: 'All Growth Levels' },
    { value: 'high', label: 'High Growth' },
    { value: 'medium', label: 'Medium Growth' },
    { value: 'low', label: 'Low Growth' }
  ];

  const filteredAndSortedRoles = roles
    .filter(role => filterDomain === 'all' || role.domain === filterDomain)
    .filter(role => filterGrowth === 'all' || role.growthPotential === filterGrowth)
    .sort((a, b) => {
      if (sortBy === 'fitScore') return b.fitScore - a.fitScore;
      if (sortBy === 'salary') return b.salaryBand - a.salaryBand;
      return 0;
    });

  const getLevelColor = (level: 'low' | 'medium' | 'high') => {
    if (level === 'high') return 'success';
    if (level === 'medium') return 'warning';
    return 'default';
  };

  return (
    <div className="role-discovery">
      <div className="section-header">
        <h2>Career Roles for You</h2>
        <p className="text-secondary">
          Discover roles that match your skills and interests
        </p>
      </div>

      <Card className="filters-card">
        <div className="filters">
          <Select
            label="Sort by"
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
          <Select
            label="Filter by Domain"
            value={filterDomain}
            onChange={setFilterDomain}
            options={domainOptions}
          />
          <Select
            label="Filter by Growth"
            value={filterGrowth}
            onChange={setFilterGrowth}
            options={growthOptions}
          />
        </div>
      </Card>

      <div className="roles-grid">
        {filteredAndSortedRoles.map(role => (
          <Card key={role.id} className="role-card" hover>
            <div className="role-header">
              <div>
                <h3 className="role-title">{role.name}</h3>
                <Badge variant="primary">{role.domain}</Badge>
              </div>
              <button
                className={`save-btn ${savedRoles.includes(role.id) ? 'save-btn--active' : ''}`}
                onClick={() => onToggleSave(role.id)}
              >
                <Star size={20} fill={savedRoles.includes(role.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="role-description">{role.description}</p>

            <div className="role-fit">
              <span className="uppercase-label">Fit Score</span>
              <ProgressBar value={role.fitScore} variant="success" size="md" />
            </div>

            <div className="role-metrics">
              <div className="metric">
                <TrendingUp size={16} />
                <span className="metric-label">Growth</span>
                <Badge variant={getLevelColor(role.growthPotential)}>
                  {role.growthPotential}
                </Badge>
              </div>
              <div className="metric">
                <Clock size={16} />
                <span className="metric-label">Timeline</span>
                <span className="metric-value">{role.timeToTransition}</span>
              </div>
              <div className="metric">
                <DollarSign size={16} />
                <span className="metric-label">Salary</span>
                <span className="metric-value">
                  {'₹'.repeat(role.salaryBand)}
                </span>
              </div>
            </div>

            <div className="role-industries">
              <span className="uppercase-label">Industries</span>
              <div className="industries-list">
                {role.industries.slice(0, 3).map((industry, idx) => (
                  <Badge key={idx} size="sm">{industry}</Badge>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              fullWidth
              icon={<Briefcase size={16} />}
              onClick={() => onSelectRole(role)}
              disabled={role.fitScore>=90}
            >
              {role.fitScore >= 90? "Already Qualified": "View Roadmap"}
            </Button>
          </Card>
        ))}
      </div>

      {filteredAndSortedRoles.length === 0 && (
        <Card className="empty-state">
          <p className="text-center text-secondary">
            No roles match your current filters. Try adjusting your criteria.
          </p>
        </Card>
      )}
    </div>
  );
};

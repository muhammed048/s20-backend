import React, { useState } from 'react';
import { Card } from './Card';
import { Input, Select } from './Input';
import { Button } from './Button';
import { UserProfile } from '../types/schema';
import './ProfileSection.css';

interface ProfileSectionProps {
  onComplete: (profile: UserProfile) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ onComplete }) => {
  const [profile, setProfile] = useState<UserProfile>({
    currentStatus: 'college',
    education: '',
    fieldOfStudy: [],
    specialization: '',
    location: '',
    workStyle: 'remote'
  });

  const statusOptions = [
    { value: 'school', label: 'School Student' },
    { value: 'college', label: 'College Student' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'professional', label: 'Working Professional' },
    { value: 'switcher', label: 'Career Switcher' }
  ];

  const workStyleOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile);
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Your Profile</h2>
        <p className="text-secondary">
          Tell us about your current situation and goals
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-grid">
            <Select
              label="Current Status"
              value={profile.currentStatus}
              onChange={(value) => setProfile({ ...profile, currentStatus: value as UserProfile['currentStatus'] })}
              options={statusOptions}
              required
            />

            <Input
              label="Education"
              value={profile.education}
              onChange={(value) => setProfile({ ...profile, education: value })}
              placeholder="e.g., BTech CSE, BCom, MBBS"
              required
            />

            <Input
              label="Field of Study"
              value={profile.fieldOfStudy.join(', ')}
              onChange={(value) => setProfile({ ...profile, fieldOfStudy: value.split(',').map(s => s.trim()) })}
              placeholder="e.g., Computer Science, Finance"
              helper="Separate multiple fields with commas"
            />

            <Input
              label="Specialization"
              value={profile.specialization}
              onChange={(value) => setProfile({ ...profile, specialization: value })}
              placeholder="e.g., Machine Learning, Marketing"
            />

            <Input
              label="Location"
              value={profile.location}
              onChange={(value) => setProfile({ ...profile, location: value })}
              placeholder="e.g., India, United States"
              required
            />

            <Select
              label="Preferred Work Style"
              value={profile.workStyle}
              onChange={(value) => setProfile({ ...profile, workStyle: value as UserProfile['workStyle'] })}
              options={workStyleOptions}
              required
            />
          </div>

          <div className="form-actions">
            <Button type="submit" size="lg">
              Continue to Skills Assessment
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

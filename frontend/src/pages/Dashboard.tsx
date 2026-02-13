import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ProfileSection } from '../components/ProfileSection';
import { SkillsSection } from '../components/SkillsSection';
import { RoleDiscovery } from '../components/RoleDiscovery';
import { RoadmapViewer } from '../components/RoadmapViewer';
import { UserProfile, Skill, CareerRole } from '../types/schema';
import { JobResults } from '../components/JobResults';
import { normalizeSkillName } from '../utils/skillMapping';
import './Dashboard.css';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [savedRoles, setSavedRoles] = useState<string[]>([]);

  // New State for API
  const [jobResults, setJobResults]= useState<any[]>([]);
  const [loading, setLoading]= useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setActiveSection('skills');
  };

  // updated for calling backend API
  const handleSkillsComplete = async (skills: Skill[]) => {
    setUserSkills(skills);
    setLoading(true);
    setError(null);

    //Transform AND normalize skill names
    const skillNames = skills
      .filter(skill => skill.confidence > 0)
      .map(skill => normalizeSkillName(skill.name))  // Map to backend names
      .filter((skill): skill is string => skill !== null)  // Remove unmapped skills
      .filter((skill, index, self) => self.indexOf(skill) === index);  // Remove duplicates

    // THIS CHECK - Prevent empty submissions
    if (skillNames.length === 0) {
      setError("Please rate at least one skill before continuing!");
      setLoading(false);
      return;  // Don't call API
    }


  console.log("Original skills:", skills.map(s => s.name));
  console.log("Normalized skills:", skillNames);


    console.log("Sending skills to backend:", skillNames);
    try{
      const response = await fetch(`http://localhost:5000/api/v1/match-jobs`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ skills: skillNames})
      });

      if(!response.ok){
        throw new Error(`API error: ${response.status}`);
      }

      const data= await response.json();
      console.log("recieved data from backend", data);
      setJobResults(data);
      setActiveSection('discover');
    } catch(err){
      console.log("Error fetching job matches: ", err);
      setError("Failed to fetch job matches. Pls Try again");
    } finally {
      setLoading(false);
    }

  };

  const handleSelectRole = (role: CareerRole) => {
    setSelectedRole(role);
    setActiveSection('roadmap');
  };

  const handleToggleSave = (roleId: string) => {
    setSavedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection onComplete={handleProfileComplete} />;
      
      case 'skills':
        return(
          <>
            {error &&(
              <div className='error-banner'>{error}</div>
            )}
            <SkillsSection onComplete={handleSkillsComplete} />;
          </>
        )
      
      case 'discover':
        if (loading){
         return(
          <div className='loading-state'>
            <h2>Analyzing your Skills</h2>
            <p className='text-secondary'>Finding the best job matches for you</p>
          </div>
         );
        }
        if(error){
            return(
              <div className='error-state'>
                <h2>Oops! Something went wrong</h2>
                <p className='text-secondary'>{error}</p>
                <button onClick={() => setActiveSection('skills')}>
                  Try Again
                </button>
              </div>
            );
        }

        return (
          // updated for api data
          <JobResults
            jobs={jobResults}
            savedRoles={savedRoles}
            onToggleSave={handleToggleSave}
            onViewRoadmap={handleSelectRole}
          />
        );
      
      case 'roadmap':
        return <RoadmapViewer selectedRole={selectedRole} />;
      
      case 'compare':
        return (
          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>Role Comparison</h2>
              <p className="text-secondary">
                Compare multiple roles side-by-side to make informed decisions
              </p>
              <p className="text-tertiary">Coming soon...</p>
            </div>
          </div>
        );
      
      case 'saved':
        return (
          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>Saved Roles</h2>
              <p className="text-secondary">
                View and manage your saved career paths with progress tracking
              </p>
              <p className="text-tertiary">
                You have {savedRoles.length} saved role(s)
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      
      <main className="dashboard-main">
        <div className="container">
          <div className="section fade-in">
            {renderSection()}
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <div className="container">
          <p className="text-center text-secondary text-sm">
            Career Path Finder - Your guide to discovering the perfect career path
          </p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import '../App.css';

function JobRepo({ results }) {
    const [showLowMatches, setLowMatches]= useState(false);

    if (!results || Object.keys(results).length === 0) return null;

    const allEntries = Object.entries(results);

    //seperate data
    const mainMatch = allEntries.filter(([_, data])=> data.match_percentage >= 10);
    const lowMatch = allEntries.filter(([_, data])=> data.match_percentage < 10);

  // 1. Convert object to entries and Filter out < 10% match (removes 0% noise)
  const filteredResults = Object.entries(results).filter(
    ([title, data]) => data.match_percentage >= 10
  );
  // Convert results object into an array for mapping
//   const jobEntries = Object.entries(results);
//   const filteredResults= jobEntries.filter(opp => opp.match_percentage >= 10);

  return (
    <div className="job-container">
        
        <div className='card-grid'>
            {mainMatch.map(([jobTitle, data]) => {
                const percentage=data.match_percentage;
                const isDirectMatch= percentage>=75;

                return(
                    <div key={jobTitle} className={`opportunity-card ${isDirectMatch ? 'direct-match' : ''}`}>
                        {/* Header Area */}
                        <div className="card-header">
                        <h3>{jobTitle}</h3>
                        {isDirectMatch && <span className="match-badge">Top Match</span>}
                        </div>
                        {/* Progress Bar */}
                        <div className="progress-container">
                        <div className="progress-labels">
                            <span>Match Quality</span>
                            <span className="percentage">{percentage}%</span>
                        </div>
                        <div className="progress-track">
                            <div 
                            className="progress-fill" 
                            style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        </div>

                        {/* Path Recommendations from your data */}
                        {(data.one_hop_paths.length > 0 || data.two_hop_paths.length > 0) && (
                        <div className="tip-box">
                            <label>Learning Tip</label>
                            {data.one_hop_paths.map((p, i) => (
                            <p key={`one-${i}`}>
                                You know <strong>{p.from}</strong>, so <strong>{p.missing_skill}</strong> will be easy!
                            </p>
                            ))}
                            {data.two_hop_paths.map((p, i) => (
                            <p key={`two-${i}`} className="bridge-text">
                                Bridge: {p.from} → {p.via} → <strong>{p.missing_skill}</strong>
                            </p>
                            ))}
                        </div>
                        )}


                    </div>
                );
            })}
        </div>
            {/* Low Match Toggle Section */}
            {lowMatch.length > 0 && (
                <div className="low-match-section">
                <button 
                    className="toggle-btn" 
                    onClick={() => setLowMatches(!showLowMatches)}
                >
                    {showLowMatches ? '▼' : '▶'} Show roles with large skill gaps ({lowMatch.length})
                </button>

                {showLowMatches && (
                    <div className="low-match-list">
                    {lowMatch.map(([jobTitle, data]) => (
                        <div key={jobTitle} className="low-match-row">
                        <span className="low-match-title">{jobTitle}</span>
                        <span className="low-match-pct">{data.match_percentage}% Match</span>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            )}
    </div>

  );
}

export default JobRepo;
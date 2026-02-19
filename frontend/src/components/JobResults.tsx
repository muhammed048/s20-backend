import React, {useState} from "react";
import { Star, Briefcase, TrendingUp, Clock, DollarSign } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Select } from "./Input";
import { ProgressBar } from "./ProgressBar";
import './RoleDiscovery.css';

interface JobResultsProps{
    jobs: any[];
    savedRoles: string[];
    onToggleSave: (roleId: string) => void;
    onViewRoadmap?: (job: any)=> void;
}

export const JobResults: React.FC<JobResultsProps> = ({
    jobs,
    savedRoles,
    onToggleSave,
    onViewRoadmap
}) => {

    const handleViewRoadmap = (job: any)=>{
        if(onViewRoadmap){
            onViewRoadmap(job);
        }
    }
    const [sortBy, setSortBy]= useState<string>('match');
    const [filterMatch, setFilterMatch]= useState<string>('all');

    const matchOptions= [
        {value: 'all', label: 'All Matches'},
        {value: 'high', label: 'High Medium (70%)'},
        {value: 'medium', label: 'Medium Match (40-70%)'},
        {value: 'low', label: 'Low Match (<40%)'}
    ];

    const sortOptions= [
        {value: 'match', label: 'Highest Match'},
        {value: 'title', label: 'Job Title'}
    ];

    const filteredAndSortedJobs= jobs
        .filter(job =>{
            if (filterMatch==='all') return true;
            if (filterMatch==='high') return job.match_percentage >= 70;
            if (filterMatch==='medium') return job.match_percentage >= 40 && job.match_percentage <70;
            if (filterMatch==='low') return job.match_percentage <40;
            return true;
        })
        .sort((a,b) => {
            if (sortBy === 'main') return b.match_percentage - a.match_percentage;
            if (sortBy === 'title') return a.title.localeCompare(b.title);
            return 0;
        });

    const getGrowthPotential = (matchPercentage: number) => {
        if(matchPercentage >= 70) return 'high';
        if(matchPercentage >= 40) return 'medium';
        return 'low';
    };

    const getLevelColor = (level: 'low' | 'medium' | 'high') => {
        if( level==='high') return 'success';
        if(level=='medium') return 'warning';
        return 'default';
    };

    const getTimeToTransition = (learningTips: any[]) => {
        if(!learningTips || learningTips.length ===0)return 'Ready now';
        
        const highPriorityCount= learningTips.filter(t => t.priority === "high").length;
        const mediumPriorityCount= learningTips.filter(t => t.priority === "medium").length;

        if(highPriorityCount === 0 && mediumPriorityCount === 0) return 'Ready now';
        if(highPriorityCount <= 1) return '1-3 months';
        if(highPriorityCount <= 2) return '3-6 months';
        return '6-12';
    };

    const getSalaryBand = (matchPercentage: number) => {
        if(matchPercentage >= 70) return 3;
        if(matchPercentage >= 40) return 2;
        return 1;
    };

    const getPriorityColor = (priority: string) =>{
        if (priority === 'high') return 'success';
        if (priority === 'medium') return 'warning';
        return 'default';
    };

    return(
        <div className="role-discovery">
            <div className="section-header">
                <h2>Your Job Matches</h2>
                <p className="text-secondary">
                    Discover Oppurtunities based on your skills and learn what to improve
                </p>
            </div>
            <Card className="filters-card">
                <div className="filters">
                    <Select 
                        label="Sort By"
                        value={sortBy}
                        onChange={setSortBy}
                        options={sortOptions}
                    />
                    <Select
                        label="Filter By Match"
                        value={filterMatch}
                        onChange={setFilterMatch}
                        options={matchOptions}
                    />
                </div>
            </Card>

            <div className="roles-grid">
                {filteredAndSortedJobs.map(job => {
                    const isTopMatch = job.match_percentage > 75;
                    const growthPotential = getGrowthPotential(job.match_percentage);
                    const timeToTransition = getTimeToTransition(job.learning_tips || []);
                    const salaryBand = getSalaryBand(job.match_percentage);

                    return(
                        <Card key={job.id} className={`role-card ${isTopMatch ? 'direct-match' : ''}`} hover>
                            <div className="role-header">
                                <div>
                                    <h3 className="role-title">{job.title}</h3>
                                    <Badge variant="primary">Tech & computing</Badge>
                                </div>
                                <button
                                    className={`save-btn ${savedRoles.includes(job.id) ? 'save-btn--active': ''}`}
                                    onClick={() => onToggleSave(job.id)}
                                >
                                    <Star size={20} fill={savedRoles.includes(job.id) ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                            
                            {/* learing-tips as description */}
                            {job.learning_tips && job.learning_tips.length > 0 &&(
                                <div className="learning-tips-section">
                                    <p className="role-description">
                                        <strong>Top Recommendation: </strong>{job.learning_tips[0].message}
                                    </p>

                                    {job.learning_tips.length > 1 &&(
                                        <details className="more-tips">
                                            <summary className="tips-summary">
                                                View {job.learning_tips.length -1} more learing tips{job.learning_tips.lenght > 2 ? 's': ''}
                                            </summary>
                                            <div className="tips-list">
                                                {job.learning_tips.slice(1).map((tip: any,idx: number) =>(
                                                    <div key={idx} className="tip-item">
                                                        <Badge variant={getPriorityColor(tip.priority)} size="sm">
                                                            {tip.priority}
                                                        </Badge>
                                                        <span className="tip-text">{tip.message}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    )}
                                </div>
                            )}

                            <div className="role-fit">
                                <span className="uppercase-label">Match Score</span>
                                <ProgressBar value={job.match_percentage} variant="success" size="md"/>
                            </div>

                            <div className="role-metrics">
                                <div className="metric">
                                    <TrendingUp size={16}/>
                                    <span className="metric-label">Potential</span>
                                    <Badge variant={getLevelColor(growthPotential)}>
                                        {growthPotential}
                                    </Badge>
                                </div>
                                <div className="metric">
                                    <Clock size={16}/>
                                    <span className="metric-label">Timeline</span>
                                    <span className="metric-value">{timeToTransition}</span>
                                </div>
                                <div className="metric">
                                    <DollarSign size={16}/>
                                    <span className="metric-label">Salary</span>
                                    <span className="metric-value">
                                        {'₹'.repeat(salaryBand)}
                                    </span>
                                </div>
                            </div>
                            {/* Skills to Learn */}
                            {(job.one_hop_paths?.length > 0 || job.two_hop_paths?.length > 0 || job.direct_missing?.length > 0) && (
                                <div className="role-industries">
                                <span className="uppercase-label">Skills to Learn</span>
                                <div className="industries-list">
                                    {job.one_hop_paths?.slice(0, 2).map((path: any, idx: number) => (
                                    <Badge key={`one-${idx}`} size="sm" variant="success">
                                        {path.missing_skill}
                                    </Badge>
                                    ))}
                                    {job.two_hop_paths?.slice(0, 1).map((path: any, idx: number) => (
                                    <Badge key={`two-${idx}`} size="sm" variant="warning">
                                        {path.missing_skill}
                                    </Badge>
                                    ))}
                                    {job.direct_missing?.slice(0, 2).map((skill: string, idx: number) => (
                                    <Badge key={`missing-${idx}`} size="sm">
                                        {skill}
                                    </Badge>
                                    ))}
                                </div>
                                </div>
                            )}

                            {/* disable view roadmap btn if value null */}
                            {job.learning_paths &&(
                                job.learning_paths.fast_path?.skills?.length>0 ||
                                job.learning_paths.cheap_path?.skills?.length>0 ||
                                job.learning_paths.safe_path?.skills?.length>0
                            ) ? (
                            <Button 
                                variant="outline" 
                                fullWidth
                                icon={<Briefcase size={16} />}
                                onClick={() => handleViewRoadmap(job)}
                            >
                                View Roadmap
                            </Button>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '1rem',
                                    background: '#f0fdf4',
                                    borderRadius: '0.375rem',
                                    border: '1px solid #d1fae5',
                                    color: '#166534',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}>
                                    You're already qualified! ({job.match_percentage}%)
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            {filteredAndSortedJobs.length === 0 && (
            <Card className="empty-state">
            <p className="text-center text-secondary">
                No jobs match your current filters. Try adjusting your criteria.
            </p>
            </Card>
            )}
        </div>
    );
};

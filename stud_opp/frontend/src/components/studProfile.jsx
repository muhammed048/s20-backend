import { useState } from 'react';
import SkillSelector from './skillSelector';
import JobRepo from './jobRepo';

function StudentProf() {
    const [studSkill, setStudSkill]= useState([]);
    const [jobResults, setJobResults] = useState(null);
    const [loading, setLoading] = useState(false);
    // 1. Create a state to store the results from Flask

    const analyzeSkills = async () => {
        if(studSkill.length === 0){
            alert("Please select atLeast one Skill");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/match-jobs`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ skills: studSkill })
            });

            const data = await response.json();
            
            // 2. Save the data into our state
            setJobResults(data); 
            console.log("Data received:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style={{ padding: '20px' }}>
            <h2>Job Matches</h2>

            <SkillSelector onSelectionChange={(updateList)=>setStudSkill(updateList)} />
            
            <button 
            onClick={analyzeSkills} 
            className="btn-primary" 
            style={{ padding: '10px 20px', backgroundColor: '#1d72e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                {loading ? "Analyzing..." : "Analyze Skills"}
            </button>

      <hr style={{ margin: '30px 0', border: '0.5px solid #eee' }} />
      {jobResults && <JobRepo results={jobResults} />}
    </div>
    );
}

export default StudentProf;
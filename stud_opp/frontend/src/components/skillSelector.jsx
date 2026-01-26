import { useState } from "react";

function SkillSelector({ onSelectionChange }){
    const availableSkills=["html","css","javascript","react","python","sql"];
    const [selected, setSelected]= useState([]);

    const toggleSkill = (skill)=>{
        let updated;
        if(selected.includes(skill)){
            updated=selected.filter(s => s!==skill);
        }else{
            updated=[...selected,skill];
        }
        setSelected(updated);
        // notify parent component skill toggled
        onSelectionChange(updated);
    };

    return(
        <div className="skill-container" style={{ marginBottom: '20px' }}>
      <p style={{ fontSize: '14px', color: '#666' }}>Select your skills:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {availableSkills.map(skill => {
            const isSelected= selected.includes(skill);
            return(
                <div key={skill} onClick={() => toggleSkill(skill)}
                style={{
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '20px', // Rounded Rectangle
                border: '1px solid',
                borderColor: isSelected ? '#3b82f6' : '#e5e7eb',
                backgroundColor: isSelected ? '#3b82f6' : 'white',
                color: isSelected ? 'white' : '#374151',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}>
                {skill} {isSelected && '✓'}
                </div>
            );
        })}
        </div>
        </div>
    );

}

export default SkillSelector
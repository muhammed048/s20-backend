"""
High-level matching logic and job analysis.
"""

from config import SKILL_GRAPH
from scoring import compute_match_score, find_one_hop_match, find_two_hop_match, calculate_skill_impact
from paths import generate_all_paths


def normalize_skills(skills):
    """Convert skill list to normalized dict."""
    return {skill.strip().lower(): 1 for skill in skills}


def analyze_job_match(student_skills, job_data):
    """
    Analyze how well student matches a job.
    
    Args:
        student_skills: dict of student skills
        job_data: dict with job info including required_skills
    
    Returns:
        dict with match analysis
    """
    required_skills = job_data.get('required_skills', {})
    
    # Validate and clean required skills
    if not isinstance(required_skills, dict):
        required_skills = {}
    
    required_skills = {
        k: v for k, v in required_skills.items() 
        if isinstance(v, (int, float)) and v > 0
    }
    
    # Initialize result
    result = {
        "id": job_data.get('id', ''),
        "title": job_data.get('title', 'Unknown Job'),
        "match_percentage": 0,
        "direct_missing": [],
        "one_hop_paths": [],
        "two_hop_paths": []
    }
    
    total_weight = sum(required_skills.values())
    if total_weight == 0:
        return result
    
    # Calculate match score
    result["match_percentage"] = round(compute_match_score(student_skills, required_skills))
    
    # Identify skill gaps
    for required_skill, weight in required_skills.items():
        if required_skill in student_skills:
            continue  # Student has it
        
        # Check one-hop
        found, _, from_skill = find_one_hop_match(required_skill, student_skills, SKILL_GRAPH)
        if found:
            result["one_hop_paths"].append({
                "missing_skill": required_skill,
                "from": from_skill
            })
            continue
        
        # Check two-hop
        found, _, from_skill, via_skill = find_two_hop_match(required_skill, student_skills, SKILL_GRAPH)
        if found:
            result["two_hop_paths"].append({
                "missing_skill": required_skill,
                "from": from_skill,
                "via": via_skill
            })
            continue
        
        # No connection found
        result["direct_missing"].append(required_skill)
    
    return result


def generate_learning_tips(job_match):
    """Generate simple learning tips (backward compatible)."""
    tips = []
    
    for path in job_match.get("one_hop_paths", [])[:3]:
        tips.append({
            "skill": path["missing_skill"],
            "message": f"Learn {path['missing_skill'].title()} to bridge your {path['from'].title()} skills",
            "priority": "high",
            "estimated_effort": "medium",
            "reason": "one-hop"
        })
    
    for path in job_match.get("two_hop_paths", [])[:2]:
        tips.append({
            "skill": path["missing_skill"],
            "message": f"Learn {path['via'].title()} first, then {path['missing_skill'].title()}",
            "priority": "medium",
            "estimated_effort": "high",
            "reason": "two-hop"
        })
    
    return tips[:3]


def generate_learning_paths(job_match, student_skills, required_skills):
    """
    Generate comprehensive learning paths.
    
    Args:
        job_match: result from analyze_job_match
        student_skills: student's current skills
        required_skills: job requirements
    
    Returns:
        dict with fast_path, cheap_path, safe_path
    """
    current_match = job_match["match_percentage"]
    
    # Collect skill gaps with deduplication
    seen_skills = set()
    skill_gaps = []
    
    # One-hop skills
    for path in job_match.get("one_hop_paths", []):
        skill_name= path["missing_skill"]
        if skill_name not in seen_skills:
            seen_skills.add(skill_name)
            skill_gaps.append({
                "skill": skill_name,
                "difficulty": "easy",
                "weight": required_skills.get(path["missing_skill"], 1),
                "learning_time": 20,
                "type": "one-hop"
            })
    
    # Two-hop skills
    for path in job_match.get("two_hop_paths", []):
        if path["missing_skill"] not in seen_skills:
            seen_skills.add(path["missing_skill"])
            skill_gaps.append({
                "skill": path["missing_skill"],
                "difficulty": "medium",
                "weight": required_skills.get(path["missing_skill"], 1),
                "learning_time": 40,
                "type": "two-hop"
            })
    
    # Direct missing
    for skill in job_match.get("direct_missing", []):
        if skill not in seen_skills:
            seen_skills.add(skill)
            skill_gaps.append({
                "skill": skill,
                "difficulty": "hard",
                "weight": required_skills.get(skill, 1),
                "learning_time": 60,
                "type": "no-connection"
            })
    
    # Calculate impact for each skill
    skill_impacts = [
        calculate_skill_impact(gap, student_skills, required_skills, current_match)
        for gap in skill_gaps
    ]
    
    # Generate all paths
    return generate_all_paths(skill_impacts, student_skills, required_skills, current_match)


def compute_score(student_skills, job_list):
    """
    Main function: Match student against all jobs.
    
    Args:
        student_skills: normalized dict of skills
        job_list: list of job dicts from API
    
    Returns:
        list of job matches sorted by percentage
    """
    results = []
    
    for job in job_list:
        print(f"Analyzing job: {job.get('title', 'Unknown')}")
        
        required_skills = job.get('required_skills', {})
        if not isinstance(required_skills, dict):
            required_skills = {}
        
        required_skills = {
            k: v for k, v in required_skills.items() 
            if isinstance(v, (int, float)) and v > 0
        }
        
        # Analyze match
        job_match = analyze_job_match(student_skills, job)
        
        # Add learning tips (simple)
        try:
            job_match["learning_tips"] = generate_learning_tips(job_match)
        except Exception as e:
            print(f"Error generating tips: {e}")
            job_match["learning_tips"] = []
        
        # Add learning paths (advanced)
        try:
            job_match["learning_paths"] = generate_learning_paths(job_match, student_skills, required_skills)
        except Exception as e:
            print(f"Error generating paths: {e}")
            job_match["learning_paths"] = None
        
        results.append(job_match)
    
    # Sort by match percentage
    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results
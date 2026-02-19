"""
Learning path generation for different strategies.
"""

from scoring import compute_match_score, calculate_skill_impact


def generate_fast_path(skill_impacts, student_skills, required_skills, current_match):
    """
    Fast Path: Maximum efficiency (impact per hour)
    Strategy: High-impact skills with best time investment
    """
    sorted_skills = sorted(skill_impacts, key=lambda x: -x["efficiency"])
    
    selected = []
    temp_skills = student_skills.copy()
    cumulative_match = current_match
    total_time = 0
    target = max(70, current_match + 15)
    
    for skill_data in sorted_skills:
        if cumulative_match >= target or len(selected) >= 3:
            break
        
        # Add skill cumulatively
        temp_skills[skill_data["skill"]] = 1
        new_match = compute_match_score(temp_skills, required_skills)
        actual_gain = new_match - cumulative_match
        
        selected.append({
            "skill": skill_data["skill"],
            "gain": round(actual_gain, 1),
            "learning_time": skill_data["learning_time"],
            "type": skill_data["type"],
            "reason": f"+{round(actual_gain, 1)}% gain in {skill_data['learning_time']}h"
        })
        
        cumulative_match = new_match
        total_time += skill_data["learning_time"]
    
    return {
        "name": "Fast Path ⚡",
        "description": "Highest efficiency skills for quick results",
        "estimated_time": f"{total_time}h (~{max(1, total_time // 20)} weeks)",
        "current_match": f"{current_match}%",
        "target_match": f"{round(cumulative_match)}%",
        "match_gain": f"+{round(cumulative_match - current_match)}%",
        "skills": selected,
        "pros": ["Maximum efficiency", "Quick results", "High ROI"],
        "cons": ["May skip foundations", "Intensive pace"]
    }


def generate_cheap_path(skill_impacts, student_skills, required_skills, current_match):
    """
    Cheap Path: Minimum time investment
    Strategy: Lowest effort to reach baseline eligibility
    """
    sorted_skills = sorted(skill_impacts, key=lambda x: (x["learning_time"], -x["efficiency"]))
    
    selected = []
    temp_skills = student_skills.copy()
    cumulative_match = current_match
    total_time = 0
    target = max(65, current_match + 10)
    
    for skill_data in sorted_skills:
        if cumulative_match >= target or len(selected) >= 2:
            break
        
        if skill_data["difficulty"] == "hard":
            continue
        
        temp_skills[skill_data["skill"]] = 1
        new_match = compute_match_score(temp_skills, required_skills)
        actual_gain = new_match - cumulative_match
        
        selected.append({
            "skill": skill_data["skill"],
            "gain": round(actual_gain, 1),
            "learning_time": skill_data["learning_time"],
            "type": skill_data["type"],
            "reason": f"+{round(actual_gain, 1)}% in just {skill_data['learning_time']}h"
        })
        
        cumulative_match = new_match
        total_time += skill_data["learning_time"]
    
    return {
        "name": "Cheap Path 💰",
        "description": "Minimum time for eligibility",
        "estimated_time": f"{total_time}h (~{max(1, total_time // 20)} weeks)",
        "current_match": f"{current_match}%",
        "target_match": f"{round(cumulative_match)}%",
        "match_gain": f"+{round(cumulative_match - current_match)}%",
        "skills": selected,
        "pros": ["Least time", "Low commitment", "Quick entry"],
        "cons": ["Lower final match", "Narrow skill base"]
    }


def generate_safe_path(skill_impacts, student_skills, required_skills, current_match):
    """
    Safe Path: Foundation-first comprehensive approach
    Strategy: Build strong base with connected skills
    """
    type_priority = {"one-hop": 1, "two-hop": 2, "no-connection": 3}
    sorted_skills = sorted(skill_impacts, key=lambda x: (type_priority[x["type"]], -x["efficiency"]))
    
    selected = []
    temp_skills = student_skills.copy()
    cumulative_match = current_match
    total_time = 0
    target = max(80, current_match + 20)
    
    for skill_data in sorted_skills:
        if cumulative_match >= target or len(selected) >= 4:
            break
        
        temp_skills[skill_data["skill"]] = 1
        new_match = compute_match_score(temp_skills, required_skills)
        actual_gain = new_match - cumulative_match
        
        selected.append({
            "skill": skill_data["skill"],
            "gain": round(actual_gain, 1),
            "learning_time": skill_data["learning_time"],
            "type": skill_data["type"],
            "reason": f"+{round(actual_gain, 1)}% - {skill_data['type']} connection"
        })
        
        cumulative_match = new_match
        total_time += skill_data["learning_time"]
    
    return {
        "name": "Safe Path 🛡️",
        "description": "Comprehensive foundation-first",
        "estimated_time": f"{total_time}h (~{max(1, total_time // 20)} weeks)",
        "current_match": f"{current_match}%",
        "target_match": f"{round(cumulative_match)}%",
        "match_gain": f"+{round(cumulative_match - current_match)}%",
        "skills": selected,
        "pros": ["Strong foundation", "High success rate", "Interview-ready"],
        "cons": ["Longer timeline", "More effort"]
    }


def generate_all_paths(skill_impacts, student_skills, required_skills, current_match):
    """
    Generate all three learning paths.
    
    Returns:
        dict with fast_path, cheap_path, safe_path
    """
    return {
        "fast_path": generate_fast_path(skill_impacts, student_skills, required_skills, current_match),
        "cheap_path": generate_cheap_path(skill_impacts, student_skills, required_skills, current_match),
        "safe_path": generate_safe_path(skill_impacts, student_skills, required_skills, current_match)
    }
from config import SKILL_GRAPH

def find_one_hop_match(required_skill, student_skills, graph):
    best_weight=0
    best_from= None

    for student_skill in student_skills:
        neighbours= graph.get(student_skill, {})
        if required_skill in neighbours:
            edge_weight= neighbours[required_skill]
            if edge_weight > best_weight:
                best_weight= edge_weight
                best_from= student_skill
    return (best_weight > 0, best_weight, best_from)

def find_two_hop_match(required_skill, student_skills, graph):

    for student_skill in student_skills:
        neighbours= graph.get(student_skill, {})
        for intermediate_skill in neighbours:
            intermediate_neighbours=  graph.get(intermediate_skill, {})
            if required_skill in intermediate_neighbours:
                total_wt = intermediate_neighbours[required_skill] * neighbours[intermediate_skill]
                return (True, total_wt, student_skill, intermediate_skill)
    return (False, 0, None, None)

def compute_match_score(student_skill, required_skills, graph= SKILL_GRAPH):
    total_weight= sum(required_skills.values())
    if total_weight==0:
        return 0
    score=0
    
    for required_skill, weight in required_skills.items():
        #Direct Match
        if required_skill in student_skill:
            score+= weight
            continue

        #one-hop 
        found, one_hop_weight, _= find_one_hop_match(required_skill, student_skill, graph)
        if found:
            score += weight * one_hop_weight
            continue

        #two_hop
        found, two_hop_weight,_,_ = find_two_hop_match(required_skill, student_skill, graph)
        if found:
            score += weight* two_hop_weight
        
    match_percentage= (score / total_weight) * 100
    return round(match_percentage, 1)
    

def calculate_skill_impact(skill_data, student_skills, required_skills, current_match):
    """
    Calculate the impact of learning a specific skill.
    
    Args:
        skill_data: dict with skill metadata
        student_skills: current skills
        required_skills: job requirements
        current_match: current match percentage
    
    Returns:
        dict with impact analysis
    """
    skill_name= skill_data["skill"]
    new_match= simulate_skill_addition(skill_name, student_skills, required_skills)
    impact = new_match - current_match
    efficiency = impact / skill_data["learning_time"] if skill_data["learning_time"] > 0 else 0

    return{
        "skill": skill_name,
        "impact": round(impact, 1),
        "learning_time": skill_data["learning_time"],
        "efficiency": round(efficiency,3),
        "difficulty": skill_data["difficulty"],
        "type": skill_data["type"],
        "weight": skill_data.get("weight", 1)
    }

def simulate_skill_addition(skill_to_add, student_skills, required_skills):
    """
    Calculate what match % would be if student learned one more skill.
    
    Args:
        skill_to_add: string (e.g., "react")
        student_skills: current skills dict
        required_skills: job requirements dict
    
    Returns:
        float: new match percentage
    """
    temp_skills= student_skills.copy()
    temp_skills[skill_to_add]=1
    return compute_match_score(temp_skills, required_skills)

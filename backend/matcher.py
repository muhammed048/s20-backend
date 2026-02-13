from config import SKILL_GRAPH

#noramlise keys
def normalize_skills(skills):
  return {skill.strip().lower(): 1 for skill in skills}

def generate_learning_tip(job_entry, st_skills):
  tips =[]

  if job_entry.get("one_hop_paths"):
    for path in job_entry["one_hop_paths"]:
      tips.append({
        "skill": path["missing_skill"],
        "reason": "one-hop",
        "message": f"You know {path['missing_skill']} so {path['from']} will be easy",
        "priority": "high",
        "estimated_effort": "medium"
      })

  #two-hop
  if job_entry.get("two_hop_paths"):
    for path in job_entry["one_hop_paths"]:
      tips.append({
        "skill": path["missing_skill"],
        "reason": "two-hop",
        "message": f"Learn {path['via'].title()} first, then {path['missing_skill'].title()} from your {path['from'].title()} knowledge",
        "priority": "medium ",
        "estimated_effort": "high"
      })

  #direct_missing
  if job_entry.get("direct_missing"):
    for skill in job_entry["direct_missing"]:
      tips.append({
        "skill":skill,
        "reason": "no-connection",
        "message": f"Consider Learning {skill.title()} -It's required but unrelated to your current skills",
        "priority": "low",
        "estimaed_effort": "high"
      })
  return tips[:3] #top 3 tips

def compute_score(st_skills,job_list):
  result=[]

  for x in job_list:
      print("checking for job:",x['title'])
      required_skills= x.get('required_skills',{})

      #validating required skills
      if not isinstance(required_skills,dict):
         required_skills={}
      
      #filtering non-numeric weights
      required_skills = {
        k: v for k, v in required_skills.items() 
        if isinstance(v, (int, float)) and v > 0
      }

      job_entry={
         "id": x.get('id',''),
         "title": x.get('title', 'Unknown Job'),
         "match_percentage": 0,
         "direct_missing": [],
         "one_hop_paths": [],
         "two_hop_paths": []
      }

      total_wt=sum(required_skills.values())
      score=0

      if total_wt==0:
        result.append(job_entry)
        continue

      for key1, value1 in required_skills.items():
        #direct match checking
          if key1 in st_skills.keys():
            score+=value1
            continue #move to next required skill
          else:
            #check for one-hop (50% weight)
            best_weight=0
            best_one_hop=None
            for stud_skill in st_skills:
              neighbours= SKILL_GRAPH.get(stud_skill,{})
              if key1 in neighbours:
                edge_weight= neighbours[key1]
                if edge_weight > best_weight:
                   best_weight=edge_weight
                   best_one_hop=stud_skill
            
            if best_one_hop:
                score+=value1 * best_weight
                job_entry["one_hop_paths"].append({
                    "missing_skill": key1,
                    "from": best_one_hop
                })
                continue

            found_two_hop=False
            for stud_skill in st_skills:
                if found_two_hop:
                  break
                neighbours= SKILL_GRAPH.get(stud_skill,{})
                for nbr in neighbours:
                  if key1 in SKILL_GRAPH.get(nbr,{}):
                    score+=value1 * SKILL_GRAPH[stud_skill][nbr] * SKILL_GRAPH[nbr][key1]

                    job_entry["two_hop_paths"].append({
                          "missing_skill": key1,
                          "from": stud_skill,
                          "via": nbr
                    })

                    found_two_hop=True
                    break
            if found_two_hop:
               continue
            job_entry["direct_missing"].append(key1)
      #calculate match score
      match_percentage=(score/total_wt)*100
      job_entry["match_percentage"]=round(match_percentage)

      #add learning tip
      try:
        job_entry["learning_tips"]= generate_learning_tip(job_entry, st_skills)
      except Exception as e:
        print(f"Error generating tips for {job_entry['title']}: {e}")
        job_entry["learning_tips"] = []

      result.append(job_entry)
      #sort according to mathc-percentage
  result.sort(
    key=lambda x: x["match_percentage"],
    reverse=True
  )
  return result


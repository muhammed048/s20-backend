from flask import Flask, request, jsonify
from flask_cors import CORS
import requests


graph = {
    "html": {"css": 0.9, "javascript": 0.6},
    "css": {"html": 0.9},
    "javascript": {"html": 0.6, "react": 0.8},
    "react": {"javascript": 0.8},
    "python": {"sql": 0.7},
    "sql": {"python": 0.7}
}

def compute_score(st_skills,job_list):
  result={}

  for x in job_list:
      print("checking for job:",x['title'])

      job_title= x['title']
      required_skills= x.get('required_skills',{})

      result[job_title]={
         "id":x['id'],
          "match_percentage": 0,
      "direct_missing": [],
      "one_hop_paths": [],
      "two_hop_paths": []
      }
      total_wt=sum(required_skills.values())
      score=0

      if total_wt==0:
        continue
      for key1, value1 in required_skills.items():
        #direct match checking
          if key1 in st_skills.keys():
            score+=value1
            continue #move to next required skill
          else:
            result[job_title]["direct_missing"].append(key1)
            #check for one-hop (50% weight)
            found_one_hop=False

            for stud_skill in st_skills:
              neighbours= graph.get(stud_skill,{})
              if key1 in neighbours:
                score+=value1 * 0.5
                result[job_title]["one_hop_paths"].append({
                    "missing_skill": key1,
                    "from": stud_skill
                })

                found_one_hop=True
                break
            if found_one_hop:
              continue
            #check for two hop
            found_two_hop=False
            for stud_skill in st_skills:
                neighbours= graph.get(stud_skill,{})
                for nbr in neighbours:
                  if key1 in graph.get(nbr,{}):
                    score+=value1 * 0.25

                    result[job_title]["two_hop_paths"].append({
                          "missing_skill": key1,
                          "from": stud_skill,
                          "via": nbr
                    })

                    found_two_hop=True
                    break
                if found_two_hop:
                  break
      #calculate match score
      match_percentage=(score/total_wt)*100
      result[job_title]["match_percentage"]=round(match_percentage)

  return result


app=Flask(__name__)
CORS(app)

MOCK_API_URL="https://695fe55d7f037703a815232a.mockapi.io/stud/jobList"


@app.route('/match-jobs', methods=['POST'])

def matchJob():
    try:
        #fetches studeent skils
        data = request.json
        stud_skills = set(skill.lower() for skill in data.get('skills', []))
        st_skill={skill : 1 for skill in stud_skills}
        
        # 1. Flask fetches from MockAPI
        response = requests.get(MOCK_API_URL)
        job_list= response.json()
        return compute_score(st_skill,job_list)

    except Exception as e:
        print(f"Error: {e}")
        # return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
        


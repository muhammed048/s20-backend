from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

from config import MOCK_API_URL
from matcher import normalize_skills, compute_score

app=Flask(__name__)
CORS(app)

@app.route('/api/v1/match-jobs', methods=['POST'])

def matchJob():
    try:
        #fetches studeent skils
        data = request.get_json(silent=True) or {}
        if not data or "skills" not in data:
           return jsonify({"error": "Student_skill is required"}), 400
        # stud_skills = set(skill.lower() for skill in data.get('skills', []))
        raw_skills= data.get("skills",[])

        if not isinstance(raw_skills,list):
           return jsonify({"error":"Skills must be an array"}), 400
        
        st_skill= normalize_skills(raw_skills)
        
        try:
        # 1. Flask fetches from MockAPI
          response = requests.get(MOCK_API_URL, timeout=5)
          response.raise_for_status()
          job_list= response.json()
        except requests.exceptions.RequestException as e:
            print(f"MockAPI Error: {e}")
            return jsonify({"error": "Failed to fetch jobs from external API"}), 503
        except ValueError:
            print("MockAPI returned invalid JSON")
            return jsonify({"error": "Invalid response from job API"}), 503
           
        #check for empty jobList
        if not job_list or not isinstance(job_list,list):
           return jsonify({"error": "No JOb available"}), 503
        
        final_result= jsonify(compute_score(st_skill,job_list))
        return final_result

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "Internal Server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
        


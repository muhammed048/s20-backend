from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

from config import MOCK_API_URL
from matcher import normalize_skills, compute_score

app = Flask(__name__)
CORS(app)


@app.route('/api/v1/match-jobs', methods=['POST'])
def match_jobs():
    """Main endpoint for job matching."""
    try:
        # Get student skills
        data = request.get_json(silent=True) or {}
        if not data or "skills" not in data:
            return jsonify({"error": "Skills are required"}), 400
        
        raw_skills = data.get("skills", [])
        if not isinstance(raw_skills, list):
            return jsonify({"error": "Skills must be an array"}), 400
        
        student_skills = normalize_skills(raw_skills)
        
        # Fetch jobs
        try:
            response = requests.get(MOCK_API_URL, timeout=5)
            response.raise_for_status()
            job_list = response.json()
        except requests.exceptions.RequestException as e:
            print(f"MockAPI Error: {e}")
            return jsonify({"error": "Failed to fetch jobs"}), 503
        except ValueError:
            return jsonify({"error": "Invalid job data"}), 503
        
        if not job_list or not isinstance(job_list, list):
            return jsonify({"error": "No jobs available"}), 503
        
        # Compute matches
        results = compute_score(student_skills, job_list)
        return jsonify(results)
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
# Skill 2 Opportunity Mapper
## A project by Sandbox Scholars
The purpose of this web application is to fetch skills and opportunity data from job listing sites and provide the users with an insight of which skill they are supposed to learn and which roadmap they should pick. 

This repository is dedicated for the backend of the project which includes database management, data processing, and features related to the website. Python is used for the development of the backend.

# Skill-to-Job Matching System

A React + Flask application that analyzes a student's skills and suggests
relevant job roles along with match scores and learning path recommendations.

<img width="1361" height="627" alt="image" src="https://github.com/user-attachments/assets/b5b3da8a-5894-45e6-988b-f0564f5b9533" />


---

## 🧠 Core Idea

The system models **skills and jobs as a weighted relationship graph**.

- Student skills act as input nodes
- Job roles require specific skill sets with importance weights
- A matching score is computed based on overlap and weights
- Missing but related skills are suggested as learning paths

---

## 🏗 Architecture Overview

Frontend (React)
- Collects student skills from UI
- Sends skill list to backend
- Displays job match scores and learning tips

Backend (Flask)
- Fetches job data from MockAPI
- Compares student skills with job-required skills
- Computes match percentage
- Returns ranked job list with learning suggestions

MockAPI
- Acts as a temporary job database
- Provides job roles and required skill structures

---

## 🔁 Data Flow

1. User selects skills in React UI
2. React sends selected skills to Flask (`/match-jobs`)
3. Flask fetches job list from MockAPI
4. Matching algorithm calculates:
   - Match score
   - Missing skills
   - Learning tips
5. Flask sends processed results back to React
6. React renders job cards with match bars

---

## 📦 Job Data Structure (MockAPI)

```json
[
  {
    "title": "Backend Intern",
    "required_skills": {
      "python": 3,
      "flask": 2,
      "sql": 2,
      "git": 1,
      "docker": 1
    },
    "id": "1"
  }
]


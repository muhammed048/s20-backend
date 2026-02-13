# Skill 2 Opportunity Mapper
## A project by Sandbox Scholars

The purpose of this web application is to analyze a student's skills and provide personalized job recommendations along with actionable learning paths. Unlike traditional job boards, our system uses a **graph-based skill relationship model** to identify not just direct matches, but also skills that can be easily learned based on what you already know.

This repository contains both the **backend** (Python/Flask) and **frontend** (React/TypeScript) for the integrated MVP.

---

## Project Overview

**Skill 2 Opportunity Mapper** bridges the gap between what students know and what jobs require by:
- Analyzing skill overlap with job requirements
- Computing intelligent match scores (0-100%)
- Suggesting learning paths based on skill relationships
- Prioritizing skills by learning difficulty (one-hop, two-hop connections)

<img width="1070" height="634" alt="image" src="https://github.com/user-attachments/assets/66e8d02d-1ff1-4bef-950b-d151dbfaaf6d" />

---
## 🧠 Core Algorithm

The system models **skills as a weighted directed graph**:
```
HTML ←→ CSS (0.9 weight)
HTML ←→ JavaScript (0.6 weight)
JavaScript ←→ React (0.8 weight)
Python ←→ SQL (0.7 weight)
```

### Matching Logic:
- **Direct Match**: Student has the exact skill → 100% weight
- **One-Hop Match**: Student has a related skill (e.g., knows JavaScript → can learn React easily) → Weighted by edge strength
- **Two-Hop Match**: Skill reachable through intermediate skill → Product of two edge weights
- **No Match**: Skill has no connection to student's skillset → Flagged as "additional learning needed"

### Example:
```
Student skills: [HTML, CSS]
Job requires: [HTML, CSS, React, Node.js]
Match calculation:
✅ HTML: Direct match (100%)
✅ CSS: Direct match (100%)
🟡 React: One-hop via JavaScript (weighted)
🔴 Node.js: Two-hop or no connection
```

---
## 🏗 Architecture

### **Frontend (React + TypeScript)**
- User profile and skills assessment
- Interactive skill rating interface
- Job results with match visualization
- Personalized learning roadmap viewer

### **Backend (Flask + Python)**
- RESTful API (`/api/v1/match-jobs`)
- Graph-based matching algorithm
- Learning tip generation (high/medium/low priority)
- Integration with MockAPI for job data

### **Data Source**
- MockAPI serves as temporary job database
- Easily replaceable with real job listing APIs

---

## 🔁 Data Flow
```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React UI  │ ──────> │ Flask API   │ ──────> │  MockAPI    │
│             │  POST   │             │  GET    │             │
│ (Skills In) │ /match  │ (Algorithm) │ /jobs   │ (Job Data)  │
└─────────────┘         └─────────────┘         └─────────────┘
       ▲                       │
       │                       │
       └───────────────────────┘
         Ranked Jobs + Learning Tips
```

**Step-by-step:**
1. User rates their skills in the React UI
2. Frontend sends skill array to Flask `/api/v1/match-jobs`
3. Flask fetches job listings from MockAPI
4. Matching algorithm computes:
   - Match percentage
   - One-hop learning paths (easy wins)
   - Two-hop learning paths (medium effort)
   - Direct missing skills (harder to acquire)
5. Flask returns ranked jobs sorted by match score
6. React displays job cards with:
   - Progress bars showing match quality
   - Learning tips with priority levels
   - Personalized roadmaps

---

## 📦 Data Structures

### **API Request** (Frontend → Backend)
```json
{
  "skills": ["html", "css", "javascript"]
}
```

### **Job Data** (MockAPI)
```json
[
  {
    "id": "1",
    "title": "Backend Intern",
    "required_skills": {
      "python": 3,
      "flask": 2,
      "sql": 2,
      "git": 1,
      "docker": 1
    }
  }
]
```

### **API Response** (Backend → Frontend)
```json
[
  {
    "id": "1",
    "title": "Frontend Developer",
    "match_percentage": 75,
    "learning_tips": [
      {
        "skill": "react",
        "message": "Learn React to bridge your JavaScript skills",
        "priority": "high",
        "estimated_effort": "medium",
        "reason": "one-hop"
      }
    ],
    "one_hop_paths": [
      {
        "missing_skill": "react",
        "from": "javascript"
      }
    ],
    "two_hop_paths": [],
    "direct_missing": ["node.js", "mongodb"]
  }
]
```

---

## 🚀 Setup & Installation

### **Prerequisites**
- Python 3.8+
- Node.js 16+
- npm or yarn

### **Backend Setup**
```bash
# Navigate to backend
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

Backend runs on `http://localhost:5000`

### **Frontend Setup**
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Run development server
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 📁 Project Structure
```
skill-2-opportunity-mapper/
├── backend/
│   ├── app.py              # Flask routes & API endpoints
│   ├── matcher.py          # Core matching algorithm
│   ├── config.py           # Skill graph & constants
│   ├── requirements.txt    # Python dependencies
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── JobResults.tsx
│   │   │   ├── RoadmapViewer.tsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   └── Dashboard.tsx
│   │   ├── utils/
│   │   │   └── skillMapping.ts
│   │   └── ...
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Backend | Python 3, Flask, Flask-CORS |
| Styling | CSS3, Lucide Icons |
| Data Source | MockAPI (temporary) |
| State Management | React Hooks |

---

## 🎨 Key Features

### ✨ **Smart Skill Matching**
- Graph-based relationship detection
- Weighted scoring system
- Considers skill transferability

### 📊 **Personalized Learning Paths**
- Priority-based recommendations (high/medium/low)
- Effort estimation (easy/medium/hard)
- Step-by-step roadmaps

### 🎯 **Interactive UI**
- Skill confidence sliders
- Real-time match visualization
- Collapsible learning tips

### 🚦 **Match Quality Indicators**
- 70%+ = High match (green)
- 40-70% = Medium match (yellow)
- <40% = Low match (gray)

## 📄 License

MIT License - See LICENSE file for details

---

## 🐛 Known Limitations

- Skill graph is manually curated (limited coverage)
- MockAPI has rate limits
- Skill names must match graph keys exactly
- No user authentication in MVP
- Limited to predefined job data

---
## 🧠 Core Algorithm

The system models **skills as a weighted directed graph**:

**Built with ❤️ by Sandbox Scholars**

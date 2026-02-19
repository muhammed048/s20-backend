# Skill 2 Opportunity Mapper
## A project by Sandbox Scholars

The purpose of this web application is to analyze a student's skills and provide personalized job recommendations along with actionable learning paths. Unlike traditional job boards, our system uses a **graph-based skill relationship model** to identify not just direct matches, but also skills that can be easily learned based on what you already know.

This repository contains both the **backend** (Python/Flask) and **frontend** (React/TypeScript) for the integrated MVP.

---

## 🎯 Project Overview

**Skill 2 Opportunity Mapper** helps students and job seekers by:
- Analyzing skill overlap with job requirements using graph-based algorithms
- Computing intelligent match scores (0-100%)
- Suggesting three strategic learning paths based on different priorities
- Providing actionable, prioritized learning recommendations
       <img width="1070" height="634" alt="image" src="https://github.com/user-attachments/assets/66e8d02d-1ff1-4bef-950b-d151dbfaaf6d" />
       

### Key Innovation: Graph-Based Skill Relationships

<img width="1346" height="634" alt="image" src="https://github.com/user-attachments/assets/6db850e0-b20f-4d4f-8ede-3fba1afdac40" />

<img width="981" height="627" alt="image" src="https://github.com/user-attachments/assets/e52fe781-1799-4f16-b39b-efa8931eee8a" />


Unlike traditional keyword matching, our system understands that skills are related:
```
HTML ←→ CSS (0.9 connection strength)
JavaScript ←→ React (0.8 connection strength)
Python ←→ SQL (0.7 connection strength)
```

This allows us to suggest skills that leverage what you already know!

---

## 🧠 The Algorithm

### Three Types of Skill Matches:

**1. Direct Match (100% credit)**
```
You have: JavaScript
Job needs: JavaScript
Result: Full credit
```

**2. One-Hop Match (Partial credit based on connection strength)**
```
You have: JavaScript (0.8 connected to React)
Job needs: React
Result: 80% credit - Easy to learn!
```

**3. Two-Hop Match (Product of connection strengths)**
```
You have: HTML (0.6→JavaScript→0.8→React)
Job needs: React
Result: 48% credit - Medium difficulty
```

### Three Learning Paths:

Each job gets three personalized roadmaps:

| Path | Strategy | Best For |
|------|----------|----------|
| **⚡ Fast Path** | Highest efficiency (impact per hour) | Quick job entry, tight deadlines |
| **💰 Cheap Path** | Minimum time investment | Limited study time, side learning |
| **🛡️ Safe Path** | Foundation-first, comprehensive | Career change, long-term growth |

**Real Math, Not Fake Estimates:**
- Each path uses **cumulative simulation** to calculate real score deltas
- Skills are added progressively and impact is recalculated at each step
- No hardcoded percentage guesses - everything is derived from the graph

---

## 🚀 Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

Backend runs on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file (use .env.example as template)
cp .env.example .env

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
│   ├── matcher.py          # High-level matching logic
│   ├── scoring.py          # Core scoring algorithms
│   ├── paths.py            # Learning path generation
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
│   ├── .env.example
│   └── README.md
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite |
| **Backend** | Python 3, Flask, Flask-CORS |
| **Styling** | CSS3, Custom Components |
| **Data Source** | MockAPI (temporary) |
| **State Management** | React Hooks |
| **Architecture** | RESTful API, Graph-based algorithms |

---

## 📊 API Documentation

### POST `/api/v1/match-jobs`

**Request:**
```json
{
  "skills": ["html", "css", "javascript"]
}
```

**Response:**
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
        "estimated_effort": "medium"
      }
    ],
    "learning_paths": {
      "fast_path": {
        "name": "Fast Path ⚡",
        "estimated_time": "60h (~3 weeks)",
        "skills": [
          {
            "skill": "react",
            "gain": 15.2,
            "learning_time": 40,
            "reason": "+15.2% gain in 40h"
          }
        ],
        "pros": ["Maximum efficiency", "Quick results"],
        "cons": ["May skip foundations"]
      },
      "cheap_path": {...},
      "safe_path": {...}
    },
    "one_hop_paths": [...],
    "two_hop_paths": [...],
    "direct_missing": [...]
  }
]
```

---

## ✨ Key Features

### **Smart Skill Matching**
- Graph-based relationship detection
- Weighted scoring system
- Considers skill transferability

### **Personalized Learning Paths**
- Three strategic approaches (Fast, Cheap, Safe)
- Real cumulative impact calculation
- Priority-based recommendations (high/medium/low)
- Effort estimation per skill

### **Interactive UI**
- Skill confidence sliders
- Real-time match visualization
- Collapsible learning tips
- Three-path roadmap comparison

### **Match Quality Indicators**
- 70%+ = High match (green) - Ready to apply
- 40-70% = Medium match (yellow) - Some learning needed
- <40% = Low match (gray) - Significant skill gap

---

## 🎨 User Flow

1. **Profile Setup** → User enters basic information
2. **Skills Assessment** → Rate confidence in various skills (0-100%)
3. **Job Matching** → Backend analyzes and returns ranked matches
4. **View Results** → See jobs sorted by match percentage
5. **Explore Roadmap** → Click any job to see three learning paths
6. **Choose Path** → Compare Fast/Cheap/Safe strategies
7. **Start Learning** → Follow step-by-step recommendations

---

## 🔮 Future Enhancements

- [ ] User authentication & profile persistence
- [ ] Integration with real job APIs (LinkedIn, Indeed)
- [ ] Expanded skill graph (100+ skills)
- [ ] Machine learning for dynamic skill relationships
- [ ] Progress tracking & goal setting
- [ ] Resource recommendations (courses, tutorials)
- [ ] PDF export of learning roadmaps
- [ ] Community-driven skill graph updates
- [ ] Job application tracking
- [ ] Skill endorsements from peers


## 🐛 Known Limitations

- Skill graph is manually curated (limited to ~20 core skills currently)
- MockAPI has rate limits (production would use dedicated database)
- Skill names must match graph keys (case-insensitive)
- No user authentication in MVP
- Limited to predefined job data

---

## 🤝 Contributing

This is a student project, but suggestions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details


## 🙏 Acknowledgments

- Graph algorithm inspiration from academic research on skill transferability
- UI design patterns from modern job platforms
- Community feedback from beta testers


---

**Built with ❤️ by Sandbox Scholars**

*Empowering students to bridge the gap between education and employment*

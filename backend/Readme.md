# Backend - Job Matching API

Flask-based REST API for skill-to-job matching with graph-based algorithms.

## Quick Start
```bash
pip install -r requirements.txt
python app.py
```

Server runs on `http://localhost:5000`

## File Structure
```
backend/
├── app.py           # Flask routes and API endpoints
├── matcher.py       # High-level matching logic
├── scoring.py       # Core scoring functions (one-hop, two-hop)
├── paths.py         # Learning path generation (Fast, Cheap, Safe)
├── config.py        # Skill graph and constants
└── requirements.txt # Python dependencies
```

## Skill Graph

The algorithm uses a weighted directed graph:
```python
SKILL_GRAPH = {
    "html": {"css": 0.9, "javascript": 0.6},
    "css": {"html": 0.9},
    "javascript": {"html": 0.6, "react": 0.8},
    "react": {"javascript": 0.8},
    "python": {"sql": 0.7},
    "sql": {"python": 0.7}
}
```

Weights represent connection strength (0.0 to 1.0).

## Adding New Skills

Edit `config.py`:
```python
SKILL_GRAPH = {
    # ... existing skills ...
    "new_skill": {"related_skill": 0.8},
}
```

## API Endpoints

### POST `/api/v1/match-jobs`

Match user skills against available jobs.

**Request:**
```json
{
  "skills": ["html", "css", "javascript"]
}
```

**Response:**
Returns array of job matches sorted by percentage (highest first).

## Environment Variables

- `MOCK_API_URL` - External job API endpoint (in config.py)

## Testing
```bash
# Test with curl
curl -X POST http://localhost:5000/api/v1/match-jobs \
  -H "Content-Type: application/json" \
  -d '{"skills": ["html", "css"]}'
```

## Architecture

1. **app.py** - Handles HTTP requests, validation
2. **matcher.py** - Orchestrates matching logic
3. **scoring.py** - Pure functions for score calculation
4. **paths.py** - Generates three learning strategies
5. **config.py** - Configuration and data

Clean separation of concerns for easy testing and maintenance.

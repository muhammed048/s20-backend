# API Contract – Student Job Matching Backend

## Endpoint
POST /match-jobs

## Description
Calculates job match percentage and learning paths based on student skills
using a weighted skill graph.

---

## Request Body
```json
{
  "student_skills": {
    "html": 1,
    "css": 1,
    "javascript": 1
  }
}
```
## Success Response (200)
```json
{
  "Frontend Developer": {
    "match_percentage": 72.5,
    "direct_missing": ["react"],
    "one_hop_paths": [
      {
        "missing_skill": "react",
        "from": "javascript"
      }
    ],
    "two_hop_paths": []
  }
}
```
## Matching Logic

Direct skill match → 100% weight

One-hop related skill → 50% weight

Two-hop related skill → 25% weight

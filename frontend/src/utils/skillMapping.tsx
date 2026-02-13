
export const SKILL_NAME_MAP: Record<string, string[]>={
    // Tech skills
  "html": ["html", "html5"],
  "css": ["css", "css3", "styling"],
  "javascript": ["javascript", "js", "programming fundamentals"],
  "react": ["react", "reactjs", "react.js"],
  "python": ["python", "programming fundamentals"],
  "sql": ["sql", "database", "mysql", "postgresql"],

  // Add more mappings as needed
  "java": ["java", "programming fundamentals"],
  "c++": ["c++", "cpp", "programming fundamentals"],
  "node": ["nodejs", "node.js", "node", "backend development"],
  "mongodb": ["mongodb", "nosql", "database"],
  "git": ["git", "version control", "github"],
  
  // Design skills
  "figma": ["figma", "ui design", "design tools"],
  "photoshop": ["photoshop", "adobe photoshop", "graphic design"],
  
  // Soft skills - map to closest tech equivalent or ignore
  "communication": [],
  "teamwork": [],
  "problem solving": ["programming fundamentals"]
};

// Function to normalize skill names
export function normalizeSkillName(skillName: string): string | null {
  const lowercaseName = skillName.toLowerCase().trim();
  
  // Check if it's already a valid backend skill
  for (const [backendSkill, frontendVariants] of Object.entries(SKILL_NAME_MAP)) {
    if (frontendVariants.includes(lowercaseName)) {
      return backendSkill;
    }
  }
  
  // If no mapping found, try to extract common tech terms
  if (lowercaseName.includes('html')) return 'html';
  if (lowercaseName.includes('css')) return 'css';
  if (lowercaseName.includes('javascript') || lowercaseName.includes('js')) return 'javascript';
  if (lowercaseName.includes('react')) return 'react';
  if (lowercaseName.includes('python')) return 'python';
  if (lowercaseName.includes('sql')) return 'sql';

  return null;
}
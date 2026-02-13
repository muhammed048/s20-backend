// schema.ts
export interface UserProfile {
  currentStatus: 'school' | 'college' | 'graduate' | 'professional' | 'switcher';
  education: string;
  fieldOfStudy: string[];
  specialization: string;
  location: string;
  workStyle: 'remote' | 'hybrid' | 'onsite';
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  confidence: number; // 0-100
  interest: 'love' | 'curious' | 'not-interested' | null;
}

export type SkillCategory = 
  | 'tech' 
  | 'business' 
  | 'law' 
  | 'medicine' 
  | 'psychology' 
  | 'arts' 
  | 'design' 
  | 'commerce' 
  | 'stem' 
  | 'vocational';

export interface Preferences {
  priorities: CareerPriority[];
  timeHorizon: '<1year' | '1-3years' | '3-5years' | '5+years';
  riskTolerance: 'low' | 'medium' | 'high';
}

export type CareerPriority = 
  | 'high-salary' 
  | 'work-life-balance' 
  | 'social-impact' 
  | 'creativity' 
  | 'research' 
  | 'leadership' 
  | 'stability' 
  | 'remote' 
  | 'travel';

export interface CareerRole {
  id: string;
  name: string;
  description: string;
  domain: Domain;
  industries: string[];
  fitScore: number; // 0-100
  confidenceLevel: 'low' | 'medium' | 'high';
  growthPotential: 'low' | 'medium' | 'high';
  educationIntensity: 'low' | 'medium' | 'high';
  salaryBand: 1 | 2 | 3;
  timeToTransition: '<1year' | '1-3years' | '3-5years' | '5+years';
  riskLevel: 'low' | 'medium' | 'high';
}

export type Domain = 
  | 'Tech & Computing'
  | 'Business & Management'
  | 'Law & Policy'
  | 'Medicine & Health'
  | 'Psychology & Social Sciences'
  | 'Arts & Humanities'
  | 'Design & Creative'
  | 'Commerce & Finance'
  | 'STEM & Research'
  | 'Vocational & Professional';

export interface RoadmapPath {
  type: 'fast' | 'budget' | 'safe';
  steps: RoadmapStep[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  type: 'course' | 'project' | 'certification' | 'internship' | 'networking' | 'job-search' | 'exam-prep';
  duration: string;
  effortLevel: 'low' | 'medium' | 'high';
  prerequisites: string[];
  completed: boolean;
}

export interface SavedRole {
  role: CareerRole;
  selectedPath: 'fast' | 'budget' | 'safe';
  progress: number; // 0-100
  priority: number;
}

export interface DomainInfo {
  name: Domain;
  description: string;
  exampleDegrees: string[];
  exampleRoles: string[];
  workStyles: string[];
}

export interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

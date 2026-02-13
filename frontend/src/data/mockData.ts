import { CareerRole, DomainInfo, RoadmapPath, Skill, SkillCategory } from '../types/schema';

export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  tech: 'Tech & Computing',
  business: 'Business & Management',
  law: 'Law & Policy',
  medicine: 'Medicine & Health',
  psychology: 'Psychology & Social Sciences',
  arts: 'Arts & Humanities',
  design: 'Design & Creative',
  commerce: 'Commerce & Finance',
  stem: 'STEM & Research',
  vocational: 'Vocational & Professional'
};

export const SKILLS_BY_CATEGORY: Record<SkillCategory, string[]> = {
  tech: [
    'Programming Fundamentals',
    'Data Structures & Algorithms',
    'Web Development',
    'Mobile Development',
    'AI/ML Basics',
    'Data Analysis',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Database Management'
  ],
  business: [
    'Marketing Strategy',
    'Sales & Negotiation',
    'Financial Analysis',
    'Business Strategy',
    'Operations Management',
    'Product Management',
    'Project Management',
    'Business Analytics',
    'Market Research',
    'Leadership'
  ],
  law: [
    'Legal Research',
    'Contract Drafting',
    'Corporate Law Basics',
    'Constitutional Law',
    'Policy Analysis',
    'Compliance & Regulation',
    'Legal Writing',
    'Litigation Basics',
    'Intellectual Property',
    'International Law'
  ],
  medicine: [
    'Medical Terminology',
    'Patient Communication',
    'Clinical Research',
    'Public Health Basics',
    'Healthcare Management',
    'Anatomy & Physiology',
    'Diagnostic Skills',
    'Medical Ethics',
    'Emergency Care',
    'Preventive Medicine'
  ],
  psychology: [
    'Counseling Skills',
    'Research Methods',
    'Statistical Analysis',
    'Behavioral Analysis',
    'Organizational Psychology',
    'Child Psychology',
    'Clinical Psychology',
    'Cognitive Psychology',
    'Social Psychology',
    'Therapy Techniques'
  ],
  arts: [
    'Creative Writing',
    'Literature Analysis',
    'Art History',
    'Philosophy',
    'Foreign Languages',
    'Public Speaking',
    'Critical Thinking',
    'Cultural Studies',
    'Music Theory',
    'Performance Arts'
  ],
  design: [
    'Graphic Design',
    'UI/UX Design',
    'Visual Design',
    'Motion Design',
    'Typography',
    'Color Theory',
    'Design Thinking',
    'Prototyping',
    'User Research',
    'Branding'
  ],
  commerce: [
    'Accounting Principles',
    'Taxation Basics',
    'Financial Modeling',
    'Investment Analysis',
    'Risk Management',
    'Auditing',
    'Cost Accounting',
    'Financial Reporting',
    'Portfolio Management',
    'Corporate Finance'
  ],
  stem: [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Statistics',
    'Lab Techniques',
    'Scientific Writing',
    'Research Design',
    'Data Visualization',
    'Environmental Science'
  ],
  vocational: [
    'Teaching & Training',
    'Hospitality Management',
    'Event Planning',
    'Journalism',
    'Content Creation',
    'Photography',
    'Video Production',
    'Culinary Arts',
    'Tourism Management',
    'Customer Service'
  ]
};

export const MOCK_ROLES: CareerRole[] = [
  {
    id: '1',
    name: 'Software Engineer',
    description: 'Design, develop, and maintain software applications using various programming languages and frameworks.',
    domain: 'Tech & Computing',
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce'],
    fitScore: 92,
    confidenceLevel: 'high',
    growthPotential: 'high',
    educationIntensity: 'medium',
    salaryBand: 3,
    timeToTransition: '1-3years',
    riskLevel: 'low'
  },
  {
    id: '2',
    name: 'Product Manager',
    description: 'Define product vision, strategy, and roadmap while coordinating cross-functional teams to deliver successful products.',
    domain: 'Business & Management',
    industries: ['Technology', 'Consumer Goods', 'Finance', 'SaaS'],
    fitScore: 85,
    confidenceLevel: 'high',
    growthPotential: 'high',
    educationIntensity: 'medium',
    salaryBand: 3,
    timeToTransition: '1-3years',
    riskLevel: 'medium'
  },
  {
    id: '3',
    name: 'UX/UI Designer',
    description: 'Create intuitive and visually appealing user interfaces through research, wireframing, prototyping, and testing.',
    domain: 'Design & Creative',
    industries: ['Technology', 'Design Agencies', 'E-commerce', 'Media'],
    fitScore: 88,
    confidenceLevel: 'high',
    growthPotential: 'high',
    educationIntensity: 'medium',
    salaryBand: 2,
    timeToTransition: '1-3years',
    riskLevel: 'low'
  },
  {
    id: '4',
    name: 'Data Scientist',
    description: 'Analyze complex data sets using statistical methods and machine learning to extract insights and drive decision-making.',
    domain: 'Tech & Computing',
    industries: ['Technology', 'Finance', 'Healthcare', 'Consulting'],
    fitScore: 78,
    confidenceLevel: 'medium',
    growthPotential: 'high',
    educationIntensity: 'high',
    salaryBand: 3,
    timeToTransition: '1-3years',
    riskLevel: 'medium'
  },
  {
    id: '5',
    name: 'Corporate Lawyer',
    description: 'Advise businesses on legal matters, draft contracts, ensure compliance, and represent clients in negotiations.',
    domain: 'Law & Policy',
    industries: ['Law Firms', 'Corporate', 'Finance', 'Consulting'],
    fitScore: 72,
    confidenceLevel: 'medium',
    growthPotential: 'medium',
    educationIntensity: 'high',
    salaryBand: 3,
    timeToTransition: '3-5years',
    riskLevel: 'low'
  },
  {
    id: '6',
    name: 'Marketing Manager',
    description: 'Develop and execute marketing strategies to promote products, build brand awareness, and drive customer engagement.',
    domain: 'Business & Management',
    industries: ['Technology', 'Consumer Goods', 'Media', 'Retail'],
    fitScore: 81,
    confidenceLevel: 'high',
    growthPotential: 'medium',
    educationIntensity: 'low',
    salaryBand: 2,
    timeToTransition: '<1year',
    riskLevel: 'low'
  },
  {
    id: '7',
    name: 'Clinical Psychologist',
    description: 'Assess, diagnose, and treat mental health conditions through therapy and evidence-based interventions.',
    domain: 'Psychology & Social Sciences',
    industries: ['Healthcare', 'Private Practice', 'Education', 'Corporate'],
    fitScore: 68,
    confidenceLevel: 'medium',
    growthPotential: 'medium',
    educationIntensity: 'high',
    salaryBand: 2,
    timeToTransition: '3-5years',
    riskLevel: 'medium'
  },
  {
    id: '8',
    name: 'Financial Analyst',
    description: 'Analyze financial data, create models, and provide recommendations for investment and business decisions.',
    domain: 'Commerce & Finance',
    industries: ['Finance', 'Banking', 'Consulting', 'Corporate'],
    fitScore: 75,
    confidenceLevel: 'medium',
    growthPotential: 'medium',
    educationIntensity: 'medium',
    salaryBand: 2,
    timeToTransition: '1-3years',
    riskLevel: 'low'
  },
  {
    id: '9',
    name: 'Content Strategist',
    description: 'Plan, create, and manage content that aligns with business goals and engages target audiences across channels.',
    domain: 'Vocational & Professional',
    industries: ['Media', 'Technology', 'Marketing', 'Publishing'],
    fitScore: 84,
    confidenceLevel: 'high',
    growthPotential: 'medium',
    educationIntensity: 'low',
    salaryBand: 2,
    timeToTransition: '<1year',
    riskLevel: 'low'
  },
  {
    id: '10',
    name: 'Research Scientist',
    description: 'Conduct scientific research, design experiments, analyze results, and publish findings in academic journals.',
    domain: 'STEM & Research',
    industries: ['Academia', 'Pharmaceuticals', 'Government', 'R&D Labs'],
    fitScore: 70,
    confidenceLevel: 'medium',
    growthPotential: 'medium',
    educationIntensity: 'high',
    salaryBand: 2,
    timeToTransition: '3-5years',
    riskLevel: 'medium'
  }
];

export const ROADMAP_PATHS: Record<string, RoadmapPath[]> = {
  '1': [ // Software Engineer
    {
      type: 'fast',
      steps: [
        {
          id: 'f1',
          title: 'Complete intensive coding bootcamp (12 weeks)',
          type: 'course',
          duration: '3 months',
          effortLevel: 'high',
          prerequisites: [],
          completed: false
        },
        {
          id: 'f2',
          title: 'Build 3-4 portfolio projects showcasing full-stack skills',
          type: 'project',
          duration: '2 months',
          effortLevel: 'high',
          prerequisites: ['f1'],
          completed: false
        },
        {
          id: 'f3',
          title: 'Prepare for technical interviews (LeetCode, System Design)',
          type: 'course',
          duration: '1 month',
          effortLevel: 'high',
          prerequisites: ['f1'],
          completed: false
        },
        {
          id: 'f4',
          title: 'Apply to 50+ companies, network with engineers',
          type: 'job-search',
          duration: '2 months',
          effortLevel: 'high',
          prerequisites: ['f2', 'f3'],
          completed: false
        }
      ]
    },
    {
      type: 'budget',
      steps: [
        {
          id: 'b1',
          title: 'Learn programming fundamentals via freeCodeCamp & YouTube',
          type: 'course',
          duration: '3 months',
          effortLevel: 'medium',
          prerequisites: [],
          completed: false
        },
        {
          id: 'b2',
          title: 'Complete Harvard CS50 (free online)',
          type: 'course',
          duration: '3 months',
          effortLevel: 'medium',
          prerequisites: ['b1'],
          completed: false
        },
        {
          id: 'b3',
          title: 'Build 5+ personal projects using free resources',
          type: 'project',
          duration: '4 months',
          effortLevel: 'medium',
          prerequisites: ['b2'],
          completed: false
        },
        {
          id: 'b4',
          title: 'Contribute to open-source projects on GitHub',
          type: 'project',
          duration: '3 months',
          effortLevel: 'medium',
          prerequisites: ['b3'],
          completed: false
        },
        {
          id: 'b5',
          title: 'Network in tech communities and apply for junior roles',
          type: 'job-search',
          duration: '3 months',
          effortLevel: 'medium',
          prerequisites: ['b4'],
          completed: false
        }
      ]
    },
    {
      type: 'safe',
      steps: [
        {
          id: 's1',
          title: 'Enroll in part-time Computer Science degree or online program',
          type: 'course',
          duration: '6 months',
          effortLevel: 'low',
          prerequisites: [],
          completed: false
        },
        {
          id: 's2',
          title: 'Take evening coding classes while working current job',
          type: 'course',
          duration: '6 months',
          effortLevel: 'low',
          prerequisites: [],
          completed: false
        },
        {
          id: 's3',
          title: 'Build side projects on weekends',
          type: 'project',
          duration: '9 months',
          effortLevel: 'low',
          prerequisites: ['s1'],
          completed: false
        },
        {
          id: 's4',
          title: 'Transition to tech-adjacent role in current company',
          type: 'job-search',
          duration: '3 months',
          effortLevel: 'low',
          prerequisites: ['s2'],
          completed: false
        },
        {
          id: 's5',
          title: 'Apply for junior developer positions',
          type: 'job-search',
          duration: '4 months',
          effortLevel: 'medium',
          prerequisites: ['s3', 's4'],
          completed: false
        }
      ]
    }
  ],
  '3': [ // UX/UI Designer
    {
      type: 'fast',
      steps: [
        {
          id: 'f1',
          title: 'Complete intensive UX/UI bootcamp',
          type: 'course',
          duration: '3 months',
          effortLevel: 'high',
          prerequisites: [],
          completed: false
        },
        {
          id: 'f2',
          title: 'Build comprehensive portfolio with 5+ case studies',
          type: 'project',
          duration: '2 months',
          effortLevel: 'high',
          prerequisites: ['f1'],
          completed: false
        },
        {
          id: 'f3',
          title: 'Network with designers and attend design events',
          type: 'networking',
          duration: '1 month',
          effortLevel: 'medium',
          prerequisites: [],
          completed: false
        },
        {
          id: 'f4',
          title: 'Apply to design roles and prepare portfolio presentations',
          type: 'job-search',
          duration: '2 months',
          effortLevel: 'high',
          prerequisites: ['f2', 'f3'],
          completed: false
        }
      ]
    },
    {
      type: 'budget',
      steps: [
        {
          id: 'b1',
          title: 'Learn design fundamentals via free resources (Coursera, YouTube)',
          type: 'course',
          duration: '2 months',
          effortLevel: 'medium',
          prerequisites: [],
          completed: false
        },
        {
          id: 'b2',
          title: 'Practice with free design tools (Figma, Canva)',
          type: 'project',
          duration: '3 months',
          effortLevel: 'medium',
          prerequisites: ['b1'],
          completed: false
        },
        {
          id: 'b3',
          title: 'Redesign existing products as portfolio pieces',
          type: 'project',
          duration: '4 months',
          effortLevel: 'medium',
          prerequisites: ['b2'],
          completed: false
        },
        {
          id: 'b4',
          title: 'Offer pro-bono design work to nonprofits',
          type: 'internship',
          duration: '3 months',
          effortLevel: 'medium',
          prerequisites: ['b3'],
          completed: false
        }
      ]
    },
    {
      type: 'safe',
      steps: [
        {
          id: 's1',
          title: 'Take online design courses on weekends',
          type: 'course',
          duration: '4 months',
          effortLevel: 'low',
          prerequisites: [],
          completed: false
        },
        {
          id: 's2',
          title: 'Start design side projects gradually',
          type: 'project',
          duration: '6 months',
          effortLevel: 'low',
          prerequisites: ['s1'],
          completed: false
        },
        {
          id: 's3',
          title: 'Build portfolio website showcasing work',
          type: 'project',
          duration: '2 months',
          effortLevel: 'low',
          prerequisites: ['s2'],
          completed: false
        },
        {
          id: 's4',
          title: 'Look for internal design opportunities at current company',
          type: 'job-search',
          duration: '3 months',
          effortLevel: 'low',
          prerequisites: ['s3'],
          completed: false
        }
      ]
    }
  ]
};

export const DOMAIN_INFO: DomainInfo[] = [
  {
    name: 'Tech & Computing',
    description: 'Build software, analyze data, and solve technical challenges using computers and technology.',
    exampleDegrees: ['Computer Science', 'Information Technology', 'Software Engineering', 'Data Science'],
    exampleRoles: ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Cybersecurity Analyst'],
    workStyles: ['Mostly remote-friendly', 'Office or hybrid', 'Collaborative teams']
  },
  {
    name: 'Business & Management',
    description: 'Lead teams, develop strategies, and drive business growth across various industries.',
    exampleDegrees: ['Business Administration', 'MBA', 'Marketing', 'Management'],
    exampleRoles: ['Product Manager', 'Marketing Manager', 'Business Analyst', 'Operations Manager'],
    workStyles: ['Mix of office and remote', 'Client-facing', 'Team leadership']
  },
  {
    name: 'Design & Creative',
    description: 'Create visual experiences, solve design problems, and craft user-centered solutions.',
    exampleDegrees: ['Graphic Design', 'Interaction Design', 'Fine Arts', 'Visual Communication'],
    exampleRoles: ['UX/UI Designer', 'Graphic Designer', 'Creative Director', 'Motion Designer'],
    workStyles: ['Remote-friendly', 'Studio/agency work', 'Freelance opportunities']
  },
  {
    name: 'Law & Policy',
    description: 'Advise on legal matters, ensure compliance, and shape public policy.',
    exampleDegrees: ['Law (LLB/JD)', 'Public Policy', 'Legal Studies', 'Political Science'],
    exampleRoles: ['Corporate Lawyer', 'Policy Analyst', 'Legal Consultant', 'Compliance Officer'],
    workStyles: ['Primarily office-based', 'Client interaction', 'Research-intensive']
  },
  {
    name: 'Commerce & Finance',
    description: 'Manage finances, analyze investments, and drive economic decision-making.',
    exampleDegrees: ['Finance', 'Accounting', 'Economics', 'BCom', 'CFA'],
    exampleRoles: ['Financial Analyst', 'Investment Banker', 'Accountant', 'Risk Manager'],
    workStyles: ['Office-based', 'Fast-paced', 'Analytical work']
  },
  {
    name: 'Medicine & Health',
    description: 'Provide healthcare, conduct medical research, and improve public health outcomes.',
    exampleDegrees: ['MBBS', 'Nursing', 'Public Health', 'Healthcare Management'],
    exampleRoles: ['Doctor', 'Healthcare Manager', 'Public Health Specialist', 'Medical Researcher'],
    workStyles: ['Hospital/clinic settings', 'Field work', 'Shift-based']
  },
  {
    name: 'Psychology & Social Sciences',
    description: 'Understand human behavior, provide mental health support, and conduct social research.',
    exampleDegrees: ['Psychology', 'Sociology', 'Social Work', 'Counseling'],
    exampleRoles: ['Clinical Psychologist', 'HR Specialist', 'Counselor', 'Social Researcher'],
    workStyles: ['Mix of office and field', 'One-on-one client work', 'Research-focused']
  },
  {
    name: 'Arts & Humanities',
    description: 'Explore culture, literature, history, and human expression through creative and analytical work.',
    exampleDegrees: ['Literature', 'History', 'Philosophy', 'Languages', 'Fine Arts'],
    exampleRoles: ['Writer', 'Educator', 'Curator', 'Translator', 'Researcher'],
    workStyles: ['Flexible', 'Independent work', 'Academic settings']
  },
  {
    name: 'STEM & Research',
    description: 'Conduct scientific research, solve complex problems, and advance knowledge in science and math.',
    exampleDegrees: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Environmental Science'],
    exampleRoles: ['Research Scientist', 'Lab Technician', 'Statistician', 'Environmental Analyst'],
    workStyles: ['Lab-based', 'Academic institutions', 'Research-intensive']
  },
  {
    name: 'Vocational & Professional',
    description: 'Develop practical skills for specialized careers in media, hospitality, and professional services.',
    exampleDegrees: ['Journalism', 'Hospitality Management', 'Event Management', 'Media Studies'],
    exampleRoles: ['Journalist', 'Event Manager', 'Teacher', 'Content Creator', 'Photographer'],
    workStyles: ['Varied schedules', 'Client-facing', 'Project-based']
  }
];

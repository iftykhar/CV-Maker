export type SectionType =
  | 'header'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'custom';

export interface HeaderData {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1–5
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface CustomData {
  content: string;
}

export type SectionData =
  | HeaderData
  | ExperienceEntry[]
  | EducationEntry[]
  | Skill[]
  | Project[]
  | Certification[]
  | Language[]
  | CustomData;

export interface CVSection {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  data: SectionData;
}

export type CVThemeName = 'classic' | 'modern' | 'minimal';

export interface CVTheme {
  name: CVThemeName;
  accentColor: string;
}

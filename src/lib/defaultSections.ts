import {
  CVSection,
  SectionType,
  HeaderData,
  ExperienceEntry,
  EducationEntry,
  Skill,
  Project,
  Certification,
  Language,
  CustomData,
} from '@/types/cv';

const uid = () =>
  typeof crypto !== 'undefined'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export function createDefaultSection(type: SectionType): CVSection {
  const id = uid();

  switch (type) {
    case 'header':
      return {
        id,
        type: 'header',
        title: 'Personal Info',
        visible: true,
        data: {
          name: 'Alex Johnson',
          jobTitle: 'Senior Full-Stack Engineer',
          email: 'alex.johnson@email.com',
          phone: '+1 (555) 234-5678',
          location: 'San Francisco, CA',
          linkedin: 'linkedin.com/in/alexjohnson',
          website: 'alexjohnson.dev',
          summary:
            'Passionate full-stack engineer with 6+ years of experience building scalable, high-performance web applications. Proven track record of leading cross-functional teams and delivering complex products from concept to production. Expert in React, Node.js, and cloud architecture.',
        } as HeaderData,
      };

    case 'experience':
      return {
        id,
        type: 'experience',
        title: 'Work Experience',
        visible: true,
        data: [
          {
            id: uid(),
            company: 'Stripe',
            role: 'Senior Software Engineer',
            startDate: '2022-03',
            endDate: '',
            current: true,
            location: 'San Francisco, CA',
            bullets: [
              'Architected a real-time fraud detection pipeline processing 10M+ transactions/day with sub-50ms latency',
              'Led migration of legacy monolith to microservices, reducing deployment time by 75%',
              'Mentored 4 junior engineers through bi-weekly 1:1s and hands-on code reviews',
              'Implemented canary deployments that reduced production incidents by 60%',
            ],
          },
          {
            id: uid(),
            company: 'Airbnb',
            role: 'Software Engineer II',
            startDate: '2019-07',
            endDate: '2022-02',
            current: false,
            location: 'San Francisco, CA',
            bullets: [
              'Built core search ranking features impacting 150M+ monthly active users',
              'Optimized React rendering pipeline, improving Time-to-Interactive by 40%',
              'Developed internal A/B testing framework adopted by 12 product teams',
            ],
          },
          {
            id: uid(),
            company: 'Datadog',
            role: 'Software Engineer',
            startDate: '2018-01',
            endDate: '2019-06',
            current: false,
            location: 'New York, NY',
            bullets: [
              'Delivered observability features for the logging platform used by 20K+ enterprises',
              'Reduced dashboard load time from 8s to 1.2s via virtualized rendering and lazy loading',
            ],
          },
        ] as ExperienceEntry[],
      };

    case 'education':
      return {
        id,
        type: 'education',
        title: 'Education',
        visible: true,
        data: [
          {
            id: uid(),
            school: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2014-08',
            endDate: '2018-05',
            gpa: '3.85',
            location: 'Berkeley, CA',
          },
        ] as EducationEntry[],
      };

    case 'skills':
      return {
        id,
        type: 'skills',
        title: 'Technical Skills',
        visible: true,
        data: [
          { id: uid(), name: 'React', category: 'Frontend', level: 5 },
          { id: uid(), name: 'TypeScript', category: 'Languages', level: 5 },
          { id: uid(), name: 'Next.js', category: 'Frontend', level: 5 },
          { id: uid(), name: 'Node.js', category: 'Backend', level: 4 },
          { id: uid(), name: 'Python', category: 'Languages', level: 4 },
          { id: uid(), name: 'Go', category: 'Languages', level: 3 },
          { id: uid(), name: 'PostgreSQL', category: 'Databases', level: 4 },
          { id: uid(), name: 'Redis', category: 'Databases', level: 4 },
          { id: uid(), name: 'GraphQL', category: 'Backend', level: 4 },
          { id: uid(), name: 'Docker', category: 'DevOps', level: 4 },
          { id: uid(), name: 'Kubernetes', category: 'DevOps', level: 3 },
          { id: uid(), name: 'AWS', category: 'DevOps', level: 4 },
        ] as Skill[],
      };

    case 'projects':
      return {
        id,
        type: 'projects',
        title: 'Projects',
        visible: true,
        data: [
          {
            id: uid(),
            name: 'OpenMetrics Dashboard',
            description:
              'Real-time observability platform for distributed systems with live charts, anomaly detection, and custom alerting. Handles 1B+ data points per day.',
            technologies: ['React', 'D3.js', 'WebSocket', 'Go', 'ClickHouse'],
            link: 'openmetrics.io',
            github: 'github.com/alexj/openmetrics',
          },
          {
            id: uid(),
            name: 'AI Code Review Bot',
            description:
              'GitHub bot that leverages GPT-4 to perform automated code reviews, detect security vulnerabilities, and suggest refactoring opportunities.',
            technologies: ['Python', 'OpenAI API', 'GitHub Actions', 'FastAPI'],
            link: '',
            github: 'github.com/alexj/ai-review-bot',
          },
        ] as Project[],
      };

    case 'certifications':
      return {
        id,
        type: 'certifications',
        title: 'Certifications',
        visible: true,
        data: [
          {
            id: uid(),
            name: 'AWS Solutions Architect – Professional',
            issuer: 'Amazon Web Services',
            date: '2023-08',
            link: 'aws.amazon.com/certification',
          },
          {
            id: uid(),
            name: 'Google Professional Cloud Developer',
            issuer: 'Google Cloud',
            date: '2022-11',
            link: 'cloud.google.com/certification',
          },
        ] as Certification[],
      };

    case 'languages':
      return {
        id,
        type: 'languages',
        title: 'Languages',
        visible: true,
        data: [
          { id: uid(), name: 'English', proficiency: 'Native' },
          { id: uid(), name: 'Spanish', proficiency: 'Fluent' },
          { id: uid(), name: 'French', proficiency: 'Intermediate' },
        ] as Language[],
      };

    case 'custom':
      return {
        id,
        type: 'custom',
        title: 'Additional Information',
        visible: true,
        data: {
          content:
            'Open source contributor (500+ GitHub stars). Speaker at JSConf 2023 & ReactSF 2022. Volunteer coding mentor at Code.org. Interests: distributed systems, compilers, and competitive programming.',
        } as CustomData,
      };

    default:
      throw new Error(`Unknown section type: ${type}`);
  }
}

export const DEFAULT_SECTIONS: CVSection[] = [
  createDefaultSection('header'),
  createDefaultSection('experience'),
  createDefaultSection('education'),
  createDefaultSection('skills'),
];

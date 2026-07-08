export const profile = {
  name: "Guruprasad Shinde",
  roleTag: "Portfolio 2026",
  roles: ["AI Engineer", "Full Stack Developer", "Problem Solver"],
  headlinePrefix: "Building",
  headlineHighlight: "Intelligent",
  headlineSuffix: "Digital Experiences.",
  subtitle:
    "B.Tech Computer Science Engineering (AI & ML) student at KIT College of Engineering, building AI systems, full-stack applications, and digital products that solve real-world problems.",
  stats: [
    { value: "08", label: "Projects" },
    { value: "05", label: "Skills" },
    { value: "15+", label: "Technologies" },
    { value: "9.76", label: "CGPA" },
  ],
  email: "guruprasadshinde80@gmail.com",
  phone: "+91 xxxxxxxxxx",
  github: "Guru2025-KIT",
  githubUrl: "https://github.com/Guru2025-KIT",
  linkedin: "gurushinde",
  linkedinUrl: "https://linkedin.com/in/gurushinde",
};

export const about = {
  headline: ["Designed with Purpose.", "Built with Intelligence."],
  paragraphs: [
    "I am a B.Tech Computer Science Engineering (AI & ML) student at KIT College of Engineering with a CGPA of 9.76.",
    "My passion lies in Artificial Intelligence, Machine Learning, and Full Stack Development.",
    "I enjoy solving real-world problems through technology and building products that create meaningful impact.",
    "From disaster management systems to AI healthcare applications and personal finance solutions, I focus on building practical, scalable, and user-centric software.",
  ],
};

// Full project data (Featured Projects, with case-study detail pages) now lives in ./projects.ts
export { projects, type Project } from "./projects";

export type SkillGroup = {
  label: string;
  mono: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  { label: "Programming", mono: "lang", skills: ["C", "C++", "Python", "Java", "JavaScript"] },
  { label: "Web", mono: "web", skills: ["HTML", "CSS", "React", "Node.js"] },
  { label: "AI & ML", mono: "ml", skills: ["Machine Learning", "Data Analysis", "Feature Engineering"] },
  { label: "Tools", mono: "ops", skills: ["Git", "GitHub", "Jupyter Notebook"] },
  { label: "AI", mono: "llm", skills: ["OpenAI", "Gemini", "Prompt Engineering"] },
];

export const achievements = [
  {
    title: "Winner — CodeCure AI Bio Hackathon",
    org: "IIT BHU",
  },
  {
    title: "Top 5 Finalist — ToxiScan Project",
    org: "CodeCure AI Hackathon",
  },
  {
    title: "Selected — i2i Innovation Program",
    org: "COEP",
  },
  {
    title: "₹10,000 Innovation Funding",
    org: "i2i COEP",
  },
];

export const experience = {
  title: "Academic Projects and Hands-on Learning",
  points: [
    "AI and ML projects",
    "Full-stack application development",
    "React user interfaces",
    "Data preprocessing",
    "Model evaluation",
    "Git and GitHub collaboration",
  ],
};

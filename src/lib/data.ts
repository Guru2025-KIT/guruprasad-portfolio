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
    { value: "50+", label: "Skills" },
    { value: "15+", label: "Technologies" },
    { value: "9.5", label: "CGPA" },
  ],
  email: "guruprasadshinde80@gmail.com",
  phone: "+91 9579785859",
  github: "Guru2025-KIT",
  githubUrl: "https://github.com/Guru2025-KIT",
  linkedin: "gurushinde",
  linkedinUrl: "https://linkedin.com/in/gurushinde",
};

export const about = {
  headline: ["Designed with Purpose.", "Built with Intelligence."],
  paragraphs: [
    "I am a B.Tech Computer Science Engineering (AI & ML) student at KIT College of Engineering with a CGPA of 9.5.",
    "My passion lies in Artificial Intelligence, Machine Learning, and Full Stack Development.",
    "I enjoy solving real-world problems through technology and building products that create meaningful impact.",
    "From disaster management systems to AI in Education applications and personal finance solutions, I focus on building practical, scalable, and user-centric software.",
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
  {
    label: "AI & Machine Learning",
    mono: "aiml",
    skills: ["Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "Graph Neural Networks (GNNs)", "scikit-learn", "PyTorch", "RDKit", "spaCy", "NetworkX", "Pandas", "NumPy"]
  },
  {
    label: "Full-Stack Web Development",
    mono: "web",
    skills: ["React", "Next.js", "Node.js", "Express", "FastAPI", "NestJS", "Tailwind CSS", "Bootstrap", "Prisma ORM"]
  },
  {
    label: "Programming Languages",
    mono: "lang",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "C", "Java", "SQL"]
  },
  {
    label: "Databases & Cloud",
    mono: "db",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase Firestore", "Neo4j", "SQLite"]
  },
  {
    label: "GenAI & LLMs",
    mono: "genai",
    skills: ["OpenAI API", "Gemini API", "Groq Cloud", "Anthropic Claude", "Llama 3", "Prompt Engineering", "RAG Systems"]
  },
  {
    label: "Tools & DevOps",
    mono: "ops",
    skills: ["Git", "GitHub", "Docker", "Docker Compose", "Nginx", "Vercel", "Railway", "Apache Airflow", "MLflow"]
  }
];

export const achievements = [
  {
    title: "Top 5 Finalist — CodeCure AI Bio Hackathon",
    org: "IIT BHU",
    proof: "/certificates/IIT_BHU.jpeg",
    description: "Achieved a Top 5 position in the national bio-inspired AI hackathon for developing ToxiScan, an AI molecular toxicity prediction platform."
  },
  {
    title: "Participant — Hyperspace Hackathon",
    org: "Hack2Skills",
    proof: "/certificates/Hack2Skills.png",
    description: "Recognized for participating and demonstrating innovation at the Hyperspace Hackathon."
  },
  {
    title: "Selected — i2i Innovation Program",
    org: "COEP",
    proof: "/certificates/i2i-finalist.png",
    description: "Admitted into the prestigious College of Engineering Pune (COEP) innovation program for personal finance project MoneyNext."
  },
  {
    title: "Winner — CodeSangram Hackathon",
    org: "KIT College of Engineering",
    proof: "/certificates/CodeSangram_Winner.pdf",
    description: "Awarded first place in the college-level hackathon CodeSangram for developing innovative technology solutions."
  },
  {
    title: "Semi Finalist — ET Gen AI Hackathon",
    org: "ET-AI",
    proof: "/certificates/ET_AI_Hackathon_2026_Certificate.pdf",
    description: "Reached the semi-final stage in the ET Gen AI national hackathon, showcasing innovative AI agent implementations."
  },
  {
    title: "Academic & Professional Excellence — Hacknovate 7.0",
    org: "ABESIT",
    proof: "/certificates/GuruprasadShinde.png",
    description: "Participated and recognized for excellence in the 36-hour international hackathon Hacknovate 7.0 organized by ABESIT."
  },
  {
    title: "AIML Internship Selection",
    org: "Software Internship",
    proof: "/certificates/Offer_Letter-1.pdf",
    description: "Selected for a specialized Artificial Intelligence and Machine Learning (AI/ML) internship to build advanced predictive systems."
  }
];

export const experience = {
  title: "Academic Projects and Hands-on Learning",
  points: [
    "Hybrid ML & Rule-Based Systems",
    "ATS Resume Score Optimization",
    "Real-time Web Sockets & APIs",
    "Deterministic Pathway Algorithms",
    "Vector Embeddings & NLP Pipelines",
    "Interactive Data Visualizations",
    "Active Learning & Model Pipelines",
    "Collaborative Git/GitHub Workflows",
  ],
};

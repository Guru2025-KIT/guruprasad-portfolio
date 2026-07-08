// ============================================================================
// FEATURED PROJECTS — full data model
// ============================================================================
// "tier" controls visual treatment on the homepage Projects section:
//   "major" -> all 5 main projects (PRAGATI, ToxiScan, MoneyNext, SHINE, SAHAYATA)
//              — shown together at equal card size
//   "minor" -> 3 smaller builds (SkillGap, EarthPath, Pravaha AI) — compact cards
//
// Each project also has a full case-study page at /projects/[slug] built from
// the same record (see `detail` below) — clicking a homepage card navigates there.
//
// LINK NOTE: where a live demo or GitHub repo wasn't provided, `isPlaceholder`
// is set to true and the URL intentionally points to a path that won't resolve.
// Swap these for the real URL once deployed — search for `isPlaceholder: true`.
//
// IMAGE NOTE: each project shows exactly one screenshot (on its homepage card
// and as the single hero image on its detail page). To swap a screenshot,
// replace the file in /public/images/projects/<slug>/ and update the `src`
// below — keep the array at exactly one entry.

export type ProjectLink = {
  url: string;
  isPlaceholder: boolean; // true = dummy link, will 404 until you update it
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  order: number;
  tier: "major" | "minor";
  name: string;
  oneLiner: string; // shown on the homepage card
  tagline: string; // shown at top of detail page, slightly longer
  accent: "blue" | "amber" | "violet" | "green" | "rose" | "cyan";
  badge?: string; // achievement/recognition badge shown on card + detail
  team?: string[]; // collaborators, if any
  role?: string; // your specific role on the team
  highlights: string[]; // 3-4 short bullets shown on the homepage card
  tech: string[]; // shown on card (short list) and detail (full list)
  github: ProjectLink;
  live: ProjectLink;
  hasRealScreenshots: boolean;
  images: ProjectImage[]; // exactly one entry when hasRealScreenshots is true, else empty
  detail: {
    simpleExplanation: string[]; // plain-words paragraphs — "what is this, really"
    problem: string; // the problem it solves, in simple words
    howItWorks: string[]; // step-by-step in plain words
    keyFeatures: { title: string; description: string }[];
    techStackFull: { layer: string; items: string[] }[];
    metrics?: { label: string; value: string }[]; // optional stat chips
  };
};

export const projects: Project[] = [
  // ==========================================================================
  // 1. PRAGATI — major
  // ==========================================================================
  {
    slug: "pragati",
    order: 1,
    tier: "major",
    name: "PRAGATI",
    oneLiner: "Campus Placement Intelligence System — from first year to first offer.",
    tagline:
      "An AI-powered placement preparation platform that unifies resume analysis, daily DSA practice, aptitude prep, AI mock interviews, and placement analytics into one system.",
    accent: "violet",
    badge: "B.Tech CSE (AI & ML) · KIT's College of Engineering, Kolhapur",
    team: [
      "Dhanvantri Panjwani",
      "Shahu Mangalekar",
      "Aishwarya Shelke",
      "Guruprasad Shinde",
    ],
    role: "Full-stack development & system architecture",
    highlights: [
      "AI resume analysis with ATS scoring & skill-gap pathway",
      "200+ real LeetCode problems with daily streak tracking",
      "Voice-based AI mock interviews with live feedback",
      "Faculty & admin dashboards with placement analytics",
    ],
    tech: ["React", "Node.js", "MongoDB", "Python FastAPI", "Docker", "Groq AI"],
    github: {
      url: "https://github.com/Guru2025-KIT/PRAGATI-career-readiness-platform",
      isPlaceholder: false,
    },
    live: {
      url: "https://pragati-career-readiness-platform.vercel.app/",
      isPlaceholder: false,
    },
    hasRealScreenshots: true,
    images: [
      { src: "/images/projects/pragati/01-home.webp", alt: "PRAGATI landing page", caption: "Landing page — \"From First Year to First Offer\"" },
    ],
    detail: {
      simpleExplanation: [
        "Think of PRAGATI as one home for everything a student needs before placements — instead of bouncing between LeetCode for coding, IndiaBix for aptitude, a random YouTube video for interview tips, and a WhatsApp group for company info, it's all in one dashboard that actually knows who you are and what you're weak at.",
        "The standout piece is SkillPath AI: you upload your resume and paste a job description, and it tells you exactly how \"ATS-ready\" your resume is, which skills you're missing for that specific job, and in what order you should learn them — not a generic course list, but a phased plan that respects what depends on what (you can't skip straight to Kubernetes before knowing Docker, for example).",
        "On top of that, it gives you a daily coding problem so you build a streak instead of cramming the week before placements, lets you practice mock interviews by literally talking to an AI interviewer that asks follow-up questions, and gives faculty a dashboard to see which students are falling behind — across the whole department, not just their own class.",
      ],
      problem:
        "Students preparing for campus placements juggle 5-6 different apps — one for coding, one for aptitude, one for resume checking, one for interview practice — and nobody (not the student, not the faculty) gets a single clear picture of how placement-ready a student actually is.",
      howItWorks: [
        "Student signs up and uploads their resume on first login.",
        "They paste a target job description into SkillPath AI, which parses the resume, scores it against the JD section-by-section, and finds every skill gap.",
        "Gaps get ranked by importance and turned into a phased learning pathway (Critical Foundations → Core Competency → Role Proficiency → Advanced Mastery) using a dependency graph, so prerequisites always come before advanced topics.",
        "Each day, the system assigns 3 real LeetCode problems (Easy/Medium/Hard) and tracks a solve streak with badges at 7, 30, and 100 days.",
        "For interview practice, the student picks a round type (HR, Technical, System Design, GD, etc.) and talks to an AI interviewer persona that asks dynamic follow-up questions and grades the response.",
        "Faculty and admins get a separate dashboard showing department-wide ATS trends, skill-gap heatmaps, and which students need extra attention — plus tools to post placement drives and announcements.",
      ],
      keyFeatures: [
        { title: "SkillPath AI Resume Analysis", description: "Parses a resume PDF, compares it to a job description, and produces an ATS score broken down across keyword match, section presence, quantified achievements, action verbs, and length/density." },
        { title: "Dependency-Aware Learning Pathway", description: "Skill gaps are scored on importance, market demand, and how many other gaps they unlock, then ordered with a topological sort so foundational skills always come before advanced ones." },
        { title: "Daily DSA + Streaks", description: "200+ real LeetCode problems with direct links, a daily assignment system, and a consecutive-day streak tracker with milestone badges." },
        { title: "AI Mock Interviews", description: "Voice-capable mock interviews with multiple AI interviewer personas (HR recruiter, senior engineer, FAANG interviewer, startup founder) that ask dynamic follow-ups and generate a graded report." },
        { title: "Group Discussion Simulator", description: "Real-time GD practice with AI participants — tracks speaking time, filler words, interruptions, and off-topic drift, then reports on communication and leadership signals." },
        { title: "Faculty & Admin Analytics", description: "Department-wide ATS trends, skill-gap heatmaps, at-risk student flagging, placement drive management, and broadcast announcements." },
      ],
      techStackFull: [
        { layer: "Frontend", items: ["React 18", "Context API", "CSS-in-JS"] },
        { layer: "Backend", items: ["Node.js 18", "Express 4", "JWT Auth", "Helmet", "express-rate-limit"] },
        { layer: "Database", items: ["MongoDB 6 (Mongoose ODM)"] },
        { layer: "ML Service", items: ["Python 3.10", "FastAPI", "spaCy", "NumPy", "scikit-learn", "NetworkX"] },
        { layer: "Resume Parser", items: ["Java 17", "Spring Boot", "Apache Tika"] },
        { layer: "AI Providers", items: ["Groq (llama-3.1-8b-instant)", "Google Gemini", "Anthropic Claude"] },
        { layer: "Infrastructure", items: ["Docker", "Docker Compose", "Nginx"] },
      ],
      metrics: [
        { label: "DSA Problems", value: "200+" },
        { label: "Aptitude Questions", value: "2,000+" },
        { label: "Companies Profiled", value: "15+" },
        { label: "User Roles", value: "3" },
      ],
    },
  },

  // ==========================================================================
  // 2. ToxiScan — flagship, most important
  // ==========================================================================
  {
    slug: "toxiscan",
    order: 2,
    tier: "major",
    name: "ToxiScan",
    oneLiner: "AI-powered drug toxicity prediction from a compound name or SMILES string.",
    tagline:
      "A hybrid ML + rule-based engine that predicts whether a chemical compound is toxic in under 50ms — built and placed Top 5 at IIT BHU's CodeCure AI Hackathon.",
    accent: "green",
    badge: "Top 5 — IIT BHU CodeCure AI Hackathon · Team HackOS",
    team: ["Dhanvantri Panjwani", "Guruprasad Shinde", "Harshvardhan Sathe", "Pratiksha Bhaskare"],
    role: "Backend & API development",
    highlights: [
      "Voting ensemble (RF + ExtraTrees + LogisticReg) on real Tox21 data",
      "50+ structural alert rules catch toxicants ML alone misses",
      "Batch screening for up to 200 compounds at once",
      "74% accuracy, 0.79 ROC-AUC, sub-50ms inference",
    ],
    tech: ["Python", "FastAPI", "React", "RDKit", "scikit-learn"],
    github: {
      url: "https://github.com/Guru2025-KIT/Toxiscan",
      isPlaceholder: false,
    },
    live: {
      url: "https://toxiscan-mvp-pending-deployment.guruprasadshinde.dev",
      isPlaceholder: true,
    },
    hasRealScreenshots: true,
    images: [
      { src: "/images/projects/toxiscan/01-molecular-scan.jpg", alt: "ToxiScan molecular scan interface showing a toxic prediction", caption: "Molecular Scan — SMILES input, live 2D structure, and a Toxic verdict with confidence breakdown" },
    ],
    detail: {
      simpleExplanation: [
        "ToxiScan answers one question: \"is this chemical compound dangerous?\" — you type in a compound's name (like \"benzene\") or its SMILES code (a text format chemists use to describe molecule structure), and it tells you Toxic or Non-Toxic, with a confidence score and the reasons why.",
        "What makes it more trustworthy than a typical ML demo is that it doesn't rely on the model alone. Pure machine learning trained on the Tox21 dataset is good at catching toxicity from 12 specific biological assays, but it completely misses compounds like benzene, cyanide, or carbon monoxide — these are toxic through totally different mechanisms (like binding to your blood's hemoglobin) that the training data never covers. So ToxiScan adds a second, rule-based layer: 50+ hand-coded structural alert patterns plus an exact lookup table of known toxicants, and takes whichever signal — ML or rules — is more confident.",
        "It also explains itself: every prediction comes with the top 3 molecular features that drove the score (like LogP or molecular weight), so it's not just a black-box yes/no.",
      ],
      problem:
        "Predicting whether a new or unfamiliar chemical compound is toxic normally requires lab testing that takes time and money. Existing ML toxicity models trained on benchmark datasets like Tox21 also have blind spots — they miss well-known toxicants that don't trigger the specific biological assays in their training data.",
      howItWorks: [
        "User types a compound name (looked up via the PubChem API) or pastes a SMILES string directly.",
        "RDKit validates the SMILES and computes a 2048-bit Morgan ECFP4 fingerprint plus 20 physicochemical descriptors (molecular weight, LogP, TPSA, etc.) — 2,068 features total.",
        "A voting ensemble of Random Forest (weight 3x), ExtraTrees (weight 2x), and Logistic Regression (weight 1x) — all trained on the real 7,823-compound Tox21 dataset — produces an ML toxicity probability.",
        "In parallel, a structural alert engine checks the molecule against 50+ SMARTS toxicophore patterns and an exact lookup table of 20 known toxicants (benzene, cyanide, heavy metals, etc.).",
        "The final score is the maximum of the ML probability and the rule-based alert confidence — a fail-safe approach so a known toxicant never slips through just because Tox21's assays don't cover it.",
        "Result is shown with a risk level (Low/Medium/High), the top 3 descriptors driving the score, and which structural alerts (if any) fired.",
      ],
      keyFeatures: [
        { title: "Hybrid Voting Ensemble", description: "RandomForest + ExtraTrees + Logistic Regression soft-voted with an F1-maximised classification threshold (0.45), trained on real Tox21 data with oversampling to handle class imbalance." },
        { title: "Structural Alert Engine", description: "50+ SMARTS-pattern toxicophore rules plus an exact lookup table for known toxicants the Tox21 assays don't cover — final score is max(ML, alerts), a fail-safe design used in production cheminformatics tools." },
        { title: "Compound Name → SMILES", description: "Type a common name like \"aspirin\" or \"benzene\" and the PubChem REST API resolves it to a canonical SMILES string automatically." },
        { title: "2D Structure Viewer", description: "Live SVG rendering of the molecule's 2D structure for every prediction." },
        { title: "Batch Screening", description: "Upload up to 200 compounds at once and export results as CSV — useful for screening a whole candidate list in one pass." },
        { title: "Explainability", description: "Every prediction returns the top 3 RDKit descriptors driving the ML score plus plain-language descriptions of any structural alerts that fired." },
      ],
      techStackFull: [
        { layer: "Frontend", items: ["React 18", "Vite"] },
        { layer: "Backend", items: ["FastAPI", "Uvicorn"] },
        { layer: "ML Model", items: ["RandomForest", "ExtraTrees", "Logistic Regression — soft voting ensemble"] },
        { layer: "Cheminformatics", items: ["RDKit (Morgan ECFP4 fingerprints, 20 physicochemical descriptors, SMARTS alerts)"] },
        { layer: "External API", items: ["PubChem REST API (name → SMILES lookup)"] },
        { layer: "Deployment", items: ["Docker", "Docker Compose", "Nginx"] },
      ],
      metrics: [
        { label: "Accuracy", value: "74.38%" },
        { label: "ROC-AUC", value: "0.79" },
        { label: "Inference Time", value: "<50ms" },
        { label: "Alert Rules", value: "50+" },
      ],
    },
  },

  // ==========================================================================
  // 3. MoneyNext — mega
  // ==========================================================================
  {
    slug: "moneynext",
    order: 3,
    tier: "major",
    name: "MoneyNext",
    oneLiner: "India's first income-adaptive personal finance platform — free forever for low-income users.",
    tagline:
      "A personal finance platform that gives every Indian a money-management experience built for their actual income level, from daily-wage tracking to estate planning.",
    accent: "blue",
    badge: "Selected — i2i COEP Innovation Program · ₹10,000 funding",
    team: ["Guruprasad Shinde", "Harshvardhan Sathe", "Dhanvantri Panjwani"],
    role: "Frontend architecture & income-tier UX",
    highlights: [
      "3 distinct dashboards: Low / Middle / High income tiers",
      "Free forever for users earning under ₹30,000/month",
      "22 features — voice expense in Hindi, EMI optimizer, estate planning",
      "₹10,000 innovation funding at i2i COEP",
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    github: {
      url: "https://github.com/Guru2025-KIT/MoneyNext",
      isPlaceholder: false,
    },
    live: {
      url: "https://moneynext-mvp-pending-deployment.guruprasadshinde.dev",
      isPlaceholder: true,
    },
    hasRealScreenshots: true,
    images: [
      { src: "/images/projects/moneynext/01-hero.webp", alt: "MoneyNext landing page showing net worth dashboard", caption: "Landing page — \"Financial Wellness for Every Indian\"" },
    ],
    detail: {
      simpleExplanation: [
        "Most finance apps are built for people who already have savings to manage. MoneyNext starts from a different question: someone earning ₹20,000 a month and someone earning ₹2,00,000 a month don't need the same app — they don't even need the same features.",
        "So instead of one dashboard for everyone, MoneyNext gives you one of three completely different experiences depending on your income: if you're under ₹30,000/month, you get a free-forever app focused on daily spending limits, voice-logged expenses in Hindi, and government scheme eligibility (PM-KISAN, Ayushman Bharat). If you're in the middle tier, you get EMI optimizers, a credit score simulator, and tax-saving tools. If you're high-income, you get estate planning and multi-account net-worth tracking.",
        "The idea is financial inclusion by design — 82% of Indians earn under ₹50,000/month, but almost every fintech app in the market is built and priced for the other 18%.",
      ],
      problem:
        "Personal finance apps in India are almost universally designed for affluent, banked users with stable formal income — leaving the majority of Indians, who earn modest or irregular income, with tools that don't match their actual financial reality or language.",
      howItWorks: [
        "User signs up and declares (or the system infers) their monthly income bracket.",
        "Based on the bracket, they're routed to one of three dashboards — Low (/dashboard/low), Middle (/dashboard/middle), or High (/dashboard/high) — each with a completely different feature set.",
        "Low-income users get micro-savings challenges (₹10/day), SMS auto-capture of bank transaction messages, daily spending caps, and a government scheme eligibility checker — entirely free.",
        "Middle-income users unlock an EMI true-cost calculator, a credit score simulator showing how specific actions move their score, a retirement SIP planner, and tax-harvesting suggestions.",
        "High-income users get estate planning with nominee management, multi-account net worth consolidation, and an 80C/80D/80G tax optimizer.",
        "All tiers share core budgeting, goal-tracking, and expense-analytics infrastructure underneath — the difference is which modules are surfaced and how the UI is framed.",
      ],
      keyFeatures: [
        { title: "Income-Adaptive UI", description: "Three structurally different dashboard experiences (Low / Middle / High) rather than one UI with hidden premium features." },
        { title: "Free Forever for Low-Income Users", description: "Anyone earning under ₹30,000/month gets full access to micro-savings, expense tracking, and government scheme tools at zero cost, permanently." },
        { title: "Localized for India", description: "Voice-logged expenses in Hindi (\"Bees rupay chai\"), SMS auto-capture from bank messages, and a built-in government scheme eligibility checker." },
        { title: "EMI & Credit Tools", description: "An EMI optimizer that reveals the real total cost of a loan, plus a credit score simulator showing point-by-point impact of specific financial actions." },
        { title: "Estate & Tax Planning", description: "For high earners: net worth dashboards, nominee management, charitable-giving tax calculations, and an 80C/80D/80G optimizer." },
      ],
      techStackFull: [
        { layer: "Frontend", items: ["Next.js 14", "TypeScript", "Tailwind CSS", "Radix UI"] },
        { layer: "Backend", items: ["Node.js", "NestJS", "Prisma ORM"] },
        { layer: "Database", items: ["PostgreSQL 15", "Redis 7"] },
        { layer: "DevOps", items: ["Docker", "Vercel", "Railway"] },
      ],
      metrics: [
        { label: "Features", value: "22" },
        { label: "Income Tiers", value: "3" },
        { label: "Lines of Code", value: "15,000+" },
        { label: "Components", value: "50+" },
      ],
    },
  },

  // ==========================================================================
  // 4. SHINE — mega
  // ==========================================================================
  {
    slug: "shine",
    order: 4,
    tier: "major",
    name: "SHINE",
    oneLiner: "JARVIS-style AI dashboard that predicts which students are about to drop out — before they do.",
    tagline:
      "An AI-powered student dropout prediction and counseling system with an Iron Man HUD aesthetic, giving mentors real-time risk diagnostics and intervention tools.",
    accent: "cyan",
    team: ["Harshvardhan Sathe", "Guruprasad Shinde"],
    role: "Backend integration & data pipeline",
    highlights: [
      "XGBoost-based dropout risk scoring with SHAP explainability",
      "Iron Man / JARVIS-inspired real-time HUD dashboard",
      "Bulk batch upload for instant diagnostic scans",
      "AI chatbot for mentor and student academic queries",
    ],
    tech: ["React 19", "Node.js", "Python", "FastAPI", "XGBoost", "SHAP"],
    github: {
      url: "https://github.com/HarshSATHE001/Shine-",
      isPlaceholder: false,
    },
    live: {
      url: "https://shine-mvp-pending-deployment.guruprasadshinde.dev",
      isPlaceholder: true,
    },
    hasRealScreenshots: true,
    images: [
      { src: "/images/projects/shine/01-dashboard.webp", alt: "SHINE Authentication screen", caption: "Authentication Screen — Secure login to student analytics portal" },
    ],
    detail: {
      simpleExplanation: [
        "SHINE tries to catch a problem early that usually only gets noticed late: a student quietly losing momentum and eventually dropping out. Instead of mentors finding out after the fact, SHINE scores every student's dropout risk using a trained ML model and surfaces the high-risk ones on a dashboard styled like a sci-fi command console — deliberately, so checking on students feels less like paperwork and more like running diagnostics.",
        "A mentor can upload a whole batch's data at once and instantly see who's trending toward risk, what's driving that score (thanks to SHAP, which explains *why* the model flagged someone, not just that it did), and then schedule and track actual counseling interventions for them.",
        "There's also a built-in AI chatbot so students and mentors can just ask questions about academic standing in plain language instead of digging through reports.",
      ],
      problem:
        "Student dropout is usually identified reactively — after attendance or grades have already collapsed — by which point intervention is much harder. Mentors also lack a fast way to see real-time risk across an entire batch at once.",
      howItWorks: [
        "Mentor uploads student data (attendance, grades, engagement signals) individually or in bulk.",
        "An XGBoost model scores each student's dropout risk and SHAP values explain which factors are driving that specific score.",
        "The HUD dashboard surfaces high-risk students in real time, styled around an Iron Man / JARVIS aesthetic for at-a-glance batch monitoring.",
        "Mentors schedule and track counseling \"protocols\" (interventions) for flagged students directly from the dashboard.",
        "An AI chatbot answers ad-hoc questions from mentors or students about academic standing.",
        "Automated XLSX reports summarize risk distribution across the batch for record-keeping.",
      ],
      keyFeatures: [
        { title: "AI Dropout Prediction", description: "XGBoost-based risk scoring trained on student academic and engagement data, with SHAP for per-student explainability." },
        { title: "Ironman HUD Dashboard", description: "Real-time batch monitoring styled as a high-tech command console, built with Recharts for live data visualization." },
        { title: "Batch Diagnostic Scans", description: "Upload large datasets for instant bulk risk scoring across an entire student batch." },
        { title: "Protocol Management", description: "Schedule, assign, and track counseling interventions for at-risk students." },
        { title: "AI Chatbot", description: "Conversational assistant for mentors and students to query academic standing and risk factors." },
        { title: "Automated Reporting", description: "One-click XLSX report generation summarizing risk distribution for administrative records." },
      ],
      techStackFull: [
        { layer: "Frontend", items: ["Vite", "React 19", "Tailwind CSS", "Lucide Icons", "Recharts"] },
        { layer: "Backend", items: ["Node.js", "Express", "SQLite"] },
        { layer: "AI Service", items: ["Python", "FastAPI", "XGBoost", "SHAP"] },
        { layer: "Deployment", items: ["Docker", "Nginx"] },
      ],
    },
  },

  // ==========================================================================
  // 5. SAHAYATA — mega
  // ==========================================================================
  {
    slug: "sahayata",
    order: 5,
    tier: "major",
    name: "SAHAYATA",
    oneLiner: "Multilingual AI disaster relief platform — report a disaster in your own language, get help faster.",
    tagline:
      "A disaster relief decision-support system that lets citizens report emergencies in regional languages and gives authorities a real-time, structured view for faster resource allocation.",
    accent: "rose",
    role: "Backend, translation pipeline & admin dashboard",
    highlights: [
      "Multilingual reporting — Hindi, Marathi, Tamil, Bengali, Telugu & more",
      "Automatic language detection and translation",
      "Real-time Firebase backend for live authority visibility",
      "Severity classification to prioritize response resources",
    ],
    tech: ["Python", "Firebase Firestore", "Google Translate API"],
    github: {
      url: "https://github.com/Guru2025-KIT/SAHAYATA-Disaster-Relief-Reource-Allocation-Decision-Support-System",
      isPlaceholder: false,
    },
    live: {
      url: "https://sahayata-disaster-relief-reource-0653.onrender.com/",
      isPlaceholder: false,
    },
    hasRealScreenshots: true,
    images: [
      { src: "/images/projects/sahayata/01-emergency-contacts.webp", alt: "SAHAYATA admin dashboard with live disaster map and quick actions", caption: "Admin dashboard — active reports, resources, volunteers, and live disaster map" },
    ],
    detail: {
      simpleExplanation: [
        "During a disaster, the biggest early problem usually isn't a lack of help — it's a lack of clear, fast information. People report emergencies in whatever language they speak, reports come in scattered and unstructured, and authorities can't easily see the full picture in real time.",
        "SAHAYATA fixes the language and structure problem specifically: a citizen reports a disaster in Hindi, Marathi, Tamil, Bengali, Telugu, or several other languages, and the system automatically detects the language, translates it to English, classifies how severe it is, and tags it with a location — all before it ever reaches a human responder.",
        "Authorities then see everything centralized and structured in one real-time dashboard, instead of getting a flood of disconnected messages in different languages that each need manual translation and triage.",
      ],
      problem:
        "During disasters, citizen reports arrive in many regional languages, unstructured and scattered, making it hard for authorities to get fast, centralized, real-time visibility — which delays resource allocation when speed matters most.",
      howItWorks: [
        "A citizen submits a disaster report in whatever language they're comfortable with.",
        "The system automatically detects the language of the report.",
        "The report is translated into English using Google Translate (via deep-translator), while the original text is preserved for traceability.",
        "The disaster type and severity (Low / Medium / High) are extracted and structured.",
        "The structured report — original + translated text, location, severity — is stored in real time in Firebase Firestore.",
        "Authorities access a live admin dashboard showing active reports, affected areas, resource allocation, and volunteer status, and can run AI-assisted resource allocation across villages.",
      ],
      keyFeatures: [
        { title: "Multilingual Reporting", description: "Citizens report in Hindi, Marathi, Tamil, Bengali, Telugu, and more, with automatic language detection — no need to know English." },
        { title: "Real-Time Translation", description: "Every report is translated into English automatically while the original text is preserved for auditability." },
        { title: "Severity Classification", description: "Reports are tagged Low / Medium / High severity so authorities can prioritize the most critical situations first." },
        { title: "Live Admin Dashboard", description: "Real-time view of active reports, affected areas, resources allocated, active volunteers, and a live disaster map." },
        { title: "AI Resource Allocation", description: "One-click AI-assisted allocation of rescue teams, medical aid, and supplies based on incoming report data." },
        { title: "Data Transparency", description: "Both original and translated versions of every report are stored, maintaining a full audit trail." },
      ],
      techStackFull: [
        { layer: "Backend", items: ["Python 3.13"] },
        { layer: "Database", items: ["Google Firebase Firestore (real-time)"] },
        { layer: "Translation", items: ["Google Translate via deep-translator", "Firebase Admin SDK"] },
        { layer: "Architecture", items: ["Cloud-ready, scalable for large-scale disaster events"] },
      ],
    },
  },

  // ==========================================================================
  // 6. SkillGap — minor
  // ==========================================================================
  {
    slug: "skillgap",
    order: 6,
    tier: "minor",
    name: "SkillGap",
    oneLiner: "From resume to roadmap, instantly — fully deterministic, zero black-box AI.",
    tagline:
      "Upload a resume and a job description, get a transparent, dependency-aware learning pathway in under 3 seconds — no LLM in the core pipeline, every score traceable to a formula.",
    accent: "amber",
    badge: "Submitted — ARTPARK CodeForge Hackathon · Team HackOS",
    team: ["Guruprasad Shinde", "Harshvardhan Sathe", "Dhanvantri Panjwani"],
    highlights: [
      "135 skills, 400+ aliases, fully deterministic NLP scoring",
      "NetworkX dependency graph with topological sort",
      "Zero hallucination — every course link hardcoded & verified",
      "10-tab dashboard: pathway, ATS, jobs, interview prep & more",
    ],
    tech: ["FastAPI", "React", "spaCy", "NetworkX"],
    github: {
      url: "https://github.com/Guru2025-KIT/SkillGap",
      isPlaceholder: false,
    },
    live: {
      url: "https://skillgap-mvp-pending-deployment.guruprasadshinde.dev",
      isPlaceholder: true,
    },
    hasRealScreenshots: false,
    images: [],
    detail: {
      simpleExplanation: [
        "SkillGap is the more \"laboratory-grade\" sibling of PRAGATI's SkillPath module — built specifically to prove that you don't need an LLM to do this well. Every single number it shows you — your ATS score, your skill gap score, your job-fit percentage — comes from an explicit formula written in plain Python, not a model's guess.",
        "You upload a resume and a job description, and within 3 seconds it tells you exactly which skills you're missing, in what order to learn them (respecting prerequisites — it won't tell you to learn React before JavaScript), how your resume scores against an actual ATS-style evaluation, and which of 12 job roles you're realistically ready for right now.",
        "Because nothing is generated by an LLM, every course link is real and manually verified, and the 'Reasoning' tab shows the exact math behind every score — useful for a hackathon judge, and just as useful for a student who wants to trust the result.",
      ],
      problem:
        "Corporate and academic onboarding usually relies on one-size-fits-all training — over-training people who already know the material, under-supporting beginners who get dropped into advanced content, and giving no transparent reasoning for either.",
      howItWorks: [
        "Resume and job description are parsed (PDF/DOCX/TXT) and normalized while preserving skill-critical characters like + and # (so C++ and C# survive cleanly).",
        "An alias-based matcher (135 canonical skills, 400+ aliases, longest-match-first) extracts skills from both documents and infers proficiency from years-of-experience patterns and context keywords.",
        "A gap score is computed per skill: (required level − current level) × 2.5 × importance weight, capped at 10.",
        "A NetworkX dependency graph connects prerequisite skills to advanced ones, topologically sorted so the pathway never asks you to learn something before its prerequisite.",
        "Gaps are binned into four phases (Core Foundations → Skill Consolidation → Role Proficiency → Advanced Mastery) and matched to a hand-verified course catalog.",
        "In parallel, an ATS score (5 weighted dimensions), a weekly learning calendar, and job-fit percentages against 12 curated roles are computed — all deterministic, all explained in a dedicated Reasoning tab.",
      ],
      keyFeatures: [
        { title: "Deterministic Gap Scoring", description: "gap_score = (required_level − current_level) × 2.5 × importance_weight — every number traceable, no LLM involved." },
        { title: "Dependency-Aware Pathway", description: "NetworkX directed graph + topological sort guarantees prerequisites are always taught before advanced skills." },
        { title: "ATS Score Simulation", description: "5-dimension scoring (keyword match, section presence, quantified achievements, action verbs, length/density) mirroring how real ATS systems evaluate resumes." },
        { title: "Job Fit Matching", description: "Matches resume skills against 12 curated role profiles with direct apply links to LinkedIn, Naukri, and Indeed." },
        { title: "Full Reasoning Trace", description: "Every API response includes a reasoning_trace object explaining the exact formulas and graph statistics behind every score." },
        { title: "Zero Hallucination", description: "All 37 course resources are hardcoded and manually verified — the system never invents a course link." },
      ],
      techStackFull: [
        { layer: "Backend", items: ["FastAPI 0.111", "spaCy 3.7 (en_core_web_sm)", "NetworkX 3.3", "scikit-learn", "pandas"] },
        { layer: "Frontend", items: ["React 18.3", "React Router", "Recharts", "react-dropzone"] },
        { layer: "Infrastructure", items: ["Docker Compose", "Nginx"] },
      ],
      metrics: [
        { label: "Skills Catalog", value: "135" },
        { label: "Verified Courses", value: "37" },
        { label: "Job Categories", value: "18" },
        { label: "Analysis Time", value: "<3s" },
      ],
    },
  },

  // ==========================================================================
  // 7. EarthPath — minor
  // ==========================================================================
  {
    slug: "earthpath",
    order: 7,
    tier: "minor",
    name: "EarthPath",
    oneLiner: "An ET Money-style financial mentor app, built from scratch as a learning project.",
    tagline:
      "A personal money-mentor application exploring investment guidance and financial planning UX patterns, inspired by apps like ET Money.",
    accent: "green",
    highlights: [
      "Investment & savings mentor-style UX",
      "Built as a hands-on exploration of fintech UX patterns",
    ],
    tech: ["React", "Node.js"],
    github: {
      url: "https://github.com/Guru2025-KIT/ArthPath-ET-Money-Mentor-App",
      isPlaceholder: false,
    },
    live: {
      url: "https://earthpath-mvp-pending-deployment.guruprasadshinde.dev",
      isPlaceholder: true,
    },
    hasRealScreenshots: false,
    images: [],
    detail: {
      simpleExplanation: [
        "EarthPath (ArthPath) is a smaller, focused project built to study and recreate the kind of financial-mentor experience apps like ET Money provide — a simplified way to think about where your money should go, beyond just tracking what you've already spent.",
        "It's a more contained exploration project compared to MoneyNext: same broad space (Indian personal finance), but a tighter scope, built specifically to practice replicating a polished fintech UX pattern end-to-end.",
      ],
      problem:
        "Understanding good fintech UX patterns — like how apps such as ET Money guide users toward better financial decisions — is best learned by building a working version yourself, not just by studying screenshots.",
      howItWorks: [
        "Built as a focused React + Node.js application exploring investment-mentor UX flows.",
        "Serves as a practical exploration of the design and interaction patterns common in modern Indian fintech apps.",
      ],
      keyFeatures: [
        { title: "Mentor-Style Guidance UX", description: "Explores how to present financial guidance in an approachable, mentor-like interface rather than a raw data dashboard." },
      ],
      techStackFull: [
        { layer: "Frontend", items: ["React"] },
        { layer: "Backend", items: ["Node.js"] },
      ],
    },
  },

  // ==========================================================================
  // 8. PravahaAI — minor
  // ==========================================================================
  {
    slug: "pravahaai",
    order: 8,
    tier: "minor",
    name: "Pravaha AI",
    oneLiner: "Sustainable molecular discovery platform — compressing catalyst research from years to weeks.",
    tagline:
      "An end-to-end AI platform using Graph Neural Networks and Bayesian Optimization to accelerate discovery of clean-energy catalysts, like converting CO₂ into methanol.",
    accent: "green",
    badge: "AI for Bharat Hackathon 2025 · Sustainable Energy Track",
    highlights: [
      "SchNet & DimeNet++ GNNs for catalyst property prediction",
      "Bayesian optimization to find optimal experiments in 10-20 tries",
      "Immutable SHA-256 audit trail for government compliance",
      "Active learning loop — improves with every wet-lab result",
    ],
    tech: ["PyTorch", "FastAPI", "React", "PostgreSQL", "Neo4j"],
    github: {
      url: "https://github.com/Guru2025-KIT/PravahaAI",
      isPlaceholder: false,
    },
    live: {
      url: "https://pravahaai.netlify.app/",
      isPlaceholder: false,
    },
    hasRealScreenshots: false,
    images: [],
    detail: {
      simpleExplanation: [
        "India spends roughly ₹12 lakh crore a year importing crude oil. One promising way to cut that down is converting CO₂ — a greenhouse gas — into methanol fuel, but finding the right chemical catalyst to make that reaction efficient normally takes 5-10 years and hundreds of crores of lab experiments, mostly trial and error.",
        "Pravaha AI sits between the idea and the lab experiment: you describe a candidate molecule, and within about 2 seconds it predicts key chemical properties (like how strongly it would bind to a reaction surface), explains *why* it predicts that using attribution techniques, and then suggests which experiment to actually run next in the lab to learn the most — using Bayesian optimization to narrow down good catalysts in 10-20 real experiments instead of 100+.",
        "It's built around real scientific datasets (Meta AI's Open Catalyst Project, QM9, ESM-2 protein models) rather than synthetic data, and includes a government-compliance-ready audit trail since this kind of tool is meant to eventually support real national research infrastructure.",
      ],
      problem:
        "Discovering effective catalysts for clean-energy reactions like CO₂-to-methanol conversion currently takes 5-10 years and enormous cost using traditional trial-and-error chemistry, slowing down India's clean energy transition.",
      howItWorks: [
        "A researcher inputs a candidate molecule as a SMILES string.",
        "SchNet (for adsorption energy) and DimeNet++ (for activation barrier) — graph neural networks trained on the Open Catalyst Project's 267,719 DFT calculations — predict key reaction properties in about 2 seconds.",
        "Integrated Gradients attribution explains which molecular features drove the prediction (explainable AI, not a black box).",
        "A Bayesian optimizer (BoTorch, Gaussian Process surrogate) suggests the next most informative experiment to run in the wet lab, converging on good catalysts in 10-20 experiments instead of 100+.",
        "When a researcher uploads a real wet-lab result, an Airflow pipeline checks for model drift and automatically retrains and promotes an improved model if it beats the current one — an active learning loop that gets smarter with every experiment.",
        "Every prediction and model change is logged in a SHA-256 hash-chained audit trail designed to meet Indian government AI governance requirements.",
      ],
      keyFeatures: [
        { title: "GNN Property Prediction", description: "SchNet and DimeNet++ graph neural networks predict adsorption energy and activation barrier for candidate catalyst molecules in ~2 seconds." },
        { title: "Explainable Predictions", description: "Integrated Gradients attribution shows exactly which molecular features (e.g. bond polarity, lone-pair geometry) drove each prediction." },
        { title: "Bayesian Experiment Planning", description: "BoTorch-based Bayesian optimization picks the next lab experiment most likely to improve results, cutting experiment count by 5-10x." },
        { title: "Active Learning Loop", description: "Wet-lab results automatically feed back into drift detection and model retraining via Airflow, so the AI improves with real-world use." },
        { title: "Government-Compliant Audit Trail", description: "Immutable SHA-256 hash-chained logging, 7-year retention, and CSV export designed to meet MeitY AI governance guidelines." },
        { title: "Enzyme Engineering Support", description: "ESM-2 650M protein language model support for zero-shot mutation scoring in biofuel/enzyme-related research." },
      ],
      techStackFull: [
        { layer: "ML Service", items: ["PyTorch 2.1 (CUDA 12.1)", "SchNet", "DimeNet++", "ESM-2 650M", "BoTorch"] },
        { layer: "Backend", items: ["FastAPI", "SQLAlchemy"] },
        { layer: "Frontend", items: ["React 18"] },
        { layer: "Databases", items: ["PostgreSQL 16", "Neo4j (knowledge graph)", "Redis 7"] },
        { layer: "MLOps", items: ["MLflow", "Apache Airflow"] },
        { layer: "Infrastructure", items: ["Docker Compose", "Nginx"] },
      ],
      metrics: [
        { label: "Training Data", value: "267,719 DFT calcs" },
        { label: "Inference Time", value: "~2s" },
        { label: "Experiments Needed", value: "10–20" },
      ],
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

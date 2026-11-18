export const person = {
  name: 'Kaji Sadman Sakib',
  role: 'Software Engineer',
  company: 'BJIT',
  location: 'Dhaka',
  email: 'kazisadmansakib@gmail.com',
  phoneDisplay: '+880 1878 900625',
  phoneHref: 'tel:+8801878900625',
  github: 'https://github.com/ssakib04',
  githubLabel: 'github.com/ssakib04',
  linkedin: 'https://www.linkedin.com/in/kajisadmansakib',
  linkedinLabel: 'linkedin.com/in/kajisadmansakib',
  cv: `${import.meta.env.BASE_URL}Kaji_Sadman_Sakib_CV.pdf`,
  site: 'https://ssakib04.github.io/portfolio/',
} as const

export const nav = [
  { href: '#about', id: 'about', label: 'About', index: '02' },
  { href: '#experience', id: 'experience', label: 'Experience', index: '03' },
  { href: '#projects', id: 'projects', label: 'Projects', index: '04' },
  { href: '#skills', id: 'skills', label: 'Skills', index: '05' },
  { href: '#education', id: 'education', label: 'Education', index: '06' },
  { href: '#contact', id: 'contact', label: 'Contact', index: '07' },
] as const

export const summary = {
  quote: 'Turning data into products people actually use.',
  lead: 'AI/ML engineer who builds recommendation, clustering, and retrieval-augmented generation systems in Python. Software Engineer at BJIT, designing LLM agent tooling with the Model Context Protocol — tool calling and multi-step LLM agent workflows.',
  support:
    'A CSE degree, and hands-on machine learning across internships and industry roles. Focused on taking models from experiment to production and delivering measurable impact on real-world, large-scale data.',
} as const

export type Role = {
  index: string
  dates: string
  title: string
  org: string
  origin?: string
  points: readonly string[]
}

export const roles: readonly Role[] = [
  {
    index: '01',
    dates: 'Jul 2026 – Present',
    title: 'Software Engineer',
    org: 'BJIT',
    origin: 'Began as AI Trainee',
    points: [
      'Build applied AI in a professional engineering team: a custom Model Context Protocol (MCP) server and client, Streamlit apps, and multi-step LLM agent workflows.',
      'Collaborate through Git, technical discussions, and code reviews, developing production-minded engineering practices.',
    ],
  },
  {
    index: '02',
    dates: 'Feb 2025 – Aug 2025',
    title: 'Web Developer (Intern to Developer)',
    org: 'BritSync Internationals',
    points: [
      'Enhanced the AICEO AI assistant with Python and API integrations; promoted from intern to developer.',
      'Automated data pipelines, lead extraction, and outreach with n8n and Make.com, powering data dashboards.',
      'Built internal tools with React.js.',
    ],
  },
  {
    index: '03',
    dates: 'Oct 2024 – Dec 2024',
    title: 'Machine Learning Intern',
    org: 'Prodigy InfoTech',
    points: [
      'Delivered three machine learning projects end to end: K-Means customer segmentation, regression-based house price prediction, and MediaPipe gesture recognition.',
    ],
  },
  {
    index: '04',
    dates: '2025 – Present',
    title: 'Freelance Web & Brand Developer',
    org: 'Fizo, Hakkani & others',
    points: [
      'Delivered brand identity and Framer websites for clients, managing scope and delivery independently.',
    ],
  },
]

export type ProjectLink = { href: string; label: string }

export type Project = {
  index: string
  year: string
  name: string
  title: string
  stack: readonly string[]
  points: readonly string[]
  links: readonly ProjectLink[]
}

export const projects: readonly Project[] = [
  {
    index: '01',
    year: '2026',
    name: 'Sift',
    title: 'AI-Powered Recruitment Platform',
    stack: ['AI Agents', 'Docker'],
    points: [
      'Built an AI-powered recruitment platform covering the hiring workflow end to end: chatbot-assisted job creation, job posting to social media, and candidate intake via email applications or CV upload.',
      'Implemented platform-hosted video interviews with live transcription.',
      'Developed AI-driven candidate evaluation that analyzes CVs and interview transcripts to judge fit for the role.',
      'Designed an AI interviewer agent that conducts interviews autonomously when no human recruiter is present.',
    ],
    links: [{ href: 'https://github.com/ssakib04/sift', label: 'github.com/ssakib04/sift' }],
  },
  {
    index: '02',
    year: '2026',
    name: 'Amazon Marketplace',
    title: 'Product Intelligence Platform',
    stack: ['Python', 'Recommendation System', 'RAG', 'HDBSCAN'],
    points: [
      'Built an end-to-end platform unifying recommendation, clustering, and retrieval-augmented generation question answering over Amazon marketplace data.',
      'Developed personalized product recommendations and HDBSCAN density-based clustering to uncover market segments without fixing cluster counts.',
      'Implemented a RAG layer that lets users ask natural-language questions about products and markets and receive grounded answers.',
    ],
    links: [
      {
        href: 'https://github.com/ssakib04/Amazon-Marketplace-Product-Intelligence-Platform',
        label: 'github.com/ssakib04/Amazon-Marketplace-Product-Intelligence-Platform',
      },
    ],
  },
  {
    index: '03',
    year: '2026',
    name: 'LangWorks',
    title: 'Custom MCP Client / Server',
    stack: ['Python', 'FastMCP', 'Streamlit', 'LLM Tool Calling'],
    points: [
      'Built a custom Model Context Protocol (MCP) server and client — SSE transport, cloud-ready — with a Streamlit UI, enabling an LLM to discover and call custom tools end to end.',
      'Prototyped LLM agent workflows covering tool calling, conditional routing, parallel execution, and chatbot memory.',
    ],
    links: [
      { href: 'https://github.com/ssakib04/LangWorks', label: 'github.com/ssakib04/LangWorks' },
      {
        href: 'https://github.com/ssakib04/custom_mcp_server',
        label: 'github.com/ssakib04/custom_mcp_server',
      },
    ],
  },
  {
    index: '04',
    year: '2024–2025',
    name: 'Earlier',
    title: 'Projects',
    stack: [],
    points: [
      'Built a PDF Q&A system (RAG) with the OpenAI API for document question answering.',
      'Built Hand Gesture Detection with MediaPipe for real-time human–computer interaction.',
    ],
    links: [],
  },
]

export const skillGroups = [
  {
    title: 'Machine Learning & Data',
    items: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'Pandas',
      'NumPy',
      'SQL',
      'Feature Engineering',
      'Model Evaluation',
      'K-Means',
      'HDBSCAN',
      'Recommendation Systems',
      'Computer Vision',
    ],
  },
  {
    title: 'LLMs & AI Agents',
    items: [
      'Large Language Models (LLMs)',
      'Retrieval-Augmented Generation (RAG)',
      'AI Agents',
      'Tool Calling',
      'Model Context Protocol (MCP)',
      'FastMCP',
      'OpenAI API',
      'LangChain',
      'LangGraph',
      'LLM Workflows',
    ],
  },
  {
    title: 'Engineering & Deployment',
    items: [
      'REST APIs',
      'API Integrations',
      'Docker',
      'Git',
      'Linux',
      'Streamlit',
      'Cloud Deployment',
      'n8n',
      'Make.com',
    ],
  },
] as const

export const education = {
  degree: 'B.Sc. in Computer Science and Engineering',
  school: 'BRAC University, Dhaka',
  dates: '2019 – 2024',
  points: [
    'CGPA 3.52/4.00',
    "VC's List (2 semesters), Dean's List (1 semester)",
    'Relevant coursework: Machine Learning, Web Development',
  ],
} as const

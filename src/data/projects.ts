
import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    name: "Multi-Agent Adaptive Learning Platform",
    category: ["AI/ML", "Full Stack"],
    summary:
      "An inclusive learning platform concept for children aged 4–14, designed to personalize reading, phonics, and educational activities.",
    problem:
      "Children have different learning needs and progress at different rates, so fixed learning paths may not provide the right level of support.",
    solution:
      "A proposed multi-agent platform that coordinates personalized learning activities, adapts learning paths, and supports progress monitoring.",
    features: [
      "Planned reading, phonics, speech, writing, and memory activities",
      "Multi-agent orchestration for adaptive learning paths",
      "Proposed rewards, progress tracking, and parent dashboard",
    ],
    tech: ["AI Agents", "React", "TypeScript", "Node.js"],
    status: "Concept / Design",
    statusNote:
      "Developed as a project concept for INCLUCODE 2026. The complete implementation and deployment have not been verified.",
  },
  {
    name: "Exam Guard",
    category: ["AI/ML", "Full Stack"],
    summary:
      "An AI-assisted examination authentication system designed to support identity verification, attendance, and seating workflows.",
    problem:
      "Manual examination verification can be time-consuming and may not adequately prevent impersonation.",
    solution:
      "A proposed verification workflow using facial embeddings and live-face matching alongside examination administration features.",
    features: [
      "Facial embedding extraction and similarity-based matching",
      "Live-face verification workflow",
      "Attendance management and automated seat allocation",
    ],
    tech: [
      "Python",
      "OpenCV",
      "InsightFace",
      "Node.js",
      "Express.js",
      "MySQL",
    ],
    status: "Mini Project",
    statusNote:
      "The project was documented as a mini project. Reported accuracy figures should only be published if supported by your evaluation results.",
  },
  {
    name: "Campus Placement Management System",
    category: ["Full Stack"],
    summary:
      "A web application concept for organizing campus recruitment, internship opportunities, student applications, and placement activities.",
    problem:
      "Students and placement teams need a centralized workflow for discovering opportunities and tracking application progress.",
    solution:
      "A role-based web application for managing opportunity listings, application statuses, and placement-related events.",
    features: [
      "Job and internship listings",
      "Student and administrator access",
      "Application status tracking",
      "Placement and webinar management",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    status: "Web Application Project",
    statusNote:
      "Describes the intended application scope. Deployment status and all listed features should be verified against the current implementation.",
  },
]

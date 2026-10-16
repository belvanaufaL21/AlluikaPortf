/*
 * Case-study structure for each role. Every project page follows the structure of
 * the role (or, for multi-role projects, of each role tab).
 *
 * To fill a part, add a section to the project in js/data.js:
 *   { role: "uiux", slot: "research", body: "What you did...", image / shot / code optional }
 * `role` can be left out on single-role projects. `heading` is optional; the
 * structure's heading is used by default.
 *
 * Empty parts are hidden from visitors. Open a project with &draft in the URL
 * (for example project.html?p=flicknfit&draft) to see every part, filled or not.
 */
window.TEMPLATES = {
  uiux: [
    { key: "problem", heading: "The problem", hint: "Who the users are, what pain they have, and why it matters to the business. One clear problem statement." },
    { key: "role", heading: "My role & team", hint: "Your role, who you worked with (PM, devs, other designers), timeline and tools." },
    { key: "research", heading: "Research", hint: "Methods you used (interviews, surveys, competitor review, analytics) and who you talked to." },
    { key: "insights", heading: "Key insights", hint: "What you learned: personas, pain points, journey map, and the 'How might we' questions that guided the design." },
    { key: "flows", heading: "User flows & information architecture", hint: "How the product is organised and the main paths users take. Show the flow diagram or sitemap." },
    { key: "wireframes", heading: "Wireframes", hint: "Low-fidelity layouts and the options you explored before going visual." },
    { key: "design", heading: "Visual design", hint: "Final high-fidelity screens, the design system or components, and the reasoning behind key choices." },
    { key: "testing", heading: "Usability testing & iteration", hint: "How you tested with users, what you found, and what you changed because of it (before / after)." },
    { key: "outcome", heading: "Outcome", hint: "Results: metrics, feedback, launch status, awards or registrations." },
    { key: "learnings", heading: "What I learned", hint: "What you would do differently and what this project taught you." }
  ],

  sa: [
    { key: "context", heading: "Business context", hint: "The organisation, the business problem and the goal of the system." },
    { key: "role", heading: "Stakeholders & my role", hint: "Who the stakeholders were, your role, and how you worked with business and engineering." },
    { key: "elicitation", heading: "Requirements gathering", hint: "How you collected requirements: interviews, workshops, observation, document review." },
    { key: "asis", heading: "Current process (as-is)", hint: "How things worked before, with the as-is process or flow and its pain points." },
    { key: "requirements", heading: "Requirements", hint: "Functional and non-functional requirements, use cases or user stories, business rules." },
    { key: "modelling", heading: "System design & models", hint: "Architecture, ERD, DFD, use case, activity and sequence diagrams. Show the key diagrams." },
    { key: "tobe", heading: "Proposed solution (to-be)", hint: "The improved process or system and how it solves the problem." },
    { key: "validation", heading: "Validation & handover", hint: "Traceability, reviews, UAT support, sign-off and documentation (SRS, manuals) handed to the team." },
    { key: "outcome", heading: "Outcome", hint: "What changed for the business or the team: time saved, errors reduced, adoption." },
    { key: "learnings", heading: "What I learned", hint: "Lessons about analysis, communication or the domain." }
  ],

  pbd: [
    { key: "context", heading: "Context & opportunity", hint: "The company, the product, and the opportunity or problem you were working on." },
    { key: "role", heading: "My role", hint: "Your responsibilities and who you worked with (sales, engineering, management, clients)." },
    { key: "market", heading: "Market & competitor research", hint: "Market size or trends, competitor benchmark, and what it showed." },
    { key: "customers", heading: "Customer insights", hint: "Who the customers are, their needs, and how you learned them." },
    { key: "strategy", heading: "Strategy & value proposition", hint: "Positioning, value proposition, business model or pricing, and the decisions you recommended." },
    { key: "backlog", heading: "Requirements & backlog", hint: "PRD, user stories, acceptance criteria and how you prioritised them (MoSCoW, RICE)." },
    { key: "gtm", heading: "Go-to-market & sales enablement", hint: "Launch plan, sales decks, product demos, training material for sales or customers." },
    { key: "metrics", heading: "Results & metrics", hint: "KPIs you tracked and what moved: revenue, adoption, deals, time to market." },
    { key: "learnings", heading: "What I learned", hint: "Lessons about the market, customers or working across teams." }
  ],

  qa: [
    { key: "context", heading: "Product under test", hint: "What the product does, who uses it, and the modules or platforms you tested." },
    { key: "scope", heading: "Scope & my role", hint: "What was in and out of scope, your role, team size and timeline." },
    { key: "strategy", heading: "Test strategy", hint: "Test levels and types (functional, regression, UAT), techniques (black-box, use case, boundary values) and how you chose priorities." },
    { key: "planning", heading: "Test plan", hint: "Entry and exit criteria, environments, test data, schedule and risks." },
    { key: "design", heading: "Test design", hint: "Test scenarios and cases, traceability to requirements, and one sample test case." },
    { key: "execution", heading: "Test execution", hint: "Test cycles, regression passes, and the tools you used (JIRA, spreadsheets, Playwright screenshots)." },
    { key: "defects", heading: "Defects found", hint: "Sample bug reports with steps, expected vs actual, severity and priority; how defects were tracked to closure." },
    { key: "metrics", heading: "Results & metrics", hint: "Test cases executed, pass rate, defects by severity, coverage, and the impact on the release." },
    { key: "learnings", heading: "What I learned", hint: "What you would improve in the process next time." }
  ],

  webdev: [
    { key: "goal", heading: "Goal", hint: "What the site or app does, who it's for, and what success looks like." },
    { key: "role", heading: "My role & stack", hint: "What you built (frontend, backend, full-stack) and the tech stack: languages, frameworks, database, APIs." },
    { key: "architecture", heading: "Architecture", hint: "How the parts fit together: client, server, database, third-party services. A diagram helps." },
    { key: "features", heading: "Key features", hint: "The main features you built, with screenshots." },
    { key: "challenges", heading: "Technical challenges", hint: "Hard problems you solved and how, with a short code snippet if useful." },
    { key: "quality", heading: "Performance, accessibility & testing", hint: "Lighthouse scores, responsiveness, accessibility, and how you tested the code." },
    { key: "deploy", heading: "Deployment", hint: "Hosting, CI/CD, environments and how updates are released." },
    { key: "outcome", heading: "Results & links", hint: "Live link, repository, usage numbers or feedback." },
    { key: "learnings", heading: "What I learned", hint: "What you would build differently and what you learned technically." }
  ]
};

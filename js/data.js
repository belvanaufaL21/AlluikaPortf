/*
 * All portfolio content lives here. Edit this file to change text, add projects
 * or swap images; the pages render from it.
 *
 * Images: `cover` and section `image` values are Unsplash photo IDs (placeholders).
 * To use your own file instead, put it in assets/img/ and use the path, e.g.
 * "assets/img/flicknfit-cover.jpg".
 */
window.PORTFOLIO = {
  person: {
    name: "Muhammad Ghaziveda Belvanaufal",
    short: "Belvanaufal",
    headline: "UI/UX · System Analyst · Product · QA · Web Dev",
    email: "mgbelvanaufal@gmail.com",
    linkedin: "https://www.linkedin.com/in/mghazivedabelvanaufal/",
    instagram: "https://www.instagram.com/belvanauvfal/",
    location: "Bandung, Indonesia",
    // The role shown first under "All" in Selected Work.
    primaryRole: "uiux"
  },

  roles: [
    {
      id: "uiux",
      name: "UI/UX Designer",
      short: "UI/UX",
      color: "#d9382b",
      blurb: "User flows, information architecture and interface design for web and mobile, from the first wireframe to high-fidelity screens."
    },
    {
      id: "sa",
      name: "System Analyst",
      short: "System Analyst",
      color: "#d9382b",
      blurb: "Turning how a system works into documents people can build and test against: system architecture, functional topology, ERDs and process docs."
    },
    {
      id: "pbd",
      name: "Product Business & Development",
      short: "Product & BizDev",
      color: "#d9382b",
      blurb: "Market research, platform benchmarking and Gherkin-format backlogs, so business, engineering and QA share one definition of done."
    },
    {
      id: "qa",
      name: "QA Engineer",
      short: "QA",
      color: "#d9382b",
      blurb: "Black-box and use-case testing against specs, designs and business rules, plus research into using LLMs to write test scenarios."
    },
    {
      id: "webdev",
      name: "Website Developer",
      short: "Web Dev",
      color: "#d9382b",
      blurb: "Building and shipping for the web: a full-stack LLM tool with Python evaluation pipelines and a JIRA integration."
    }
  ],

  projects: [
    {
      id: "stasiun-cahaya",
      title: "Stasiun Cahaya",
      roles: ["qa", "uiux"],
      org: "Celiium Studio, client: PT. Stasiun Cahaya Logistik",
      period: "Aug 2026 - Present",
      summary: "Testing a multi-role operations platform for a freight-forwarding and container depot company.",
      tags: ["Use Case Testing", "Black-Box Testing", "Regression", "Data Consistency"],
      device: "browser",
      cover: "assets/img/projects/stasiun-cahaya-cover.webp",
      intro: "An internal platform that runs the day-to-day of a container depot: Gate In/Out, maintenance & repair (MNR), Finance, Trucking and a Client Portal, each used by a different team.",
      stats: [
        ["5", "operational modules tested"],
        ["21", "activity diagrams used as the test reference"]
      ],
      tools: ["Use Case Testing", "Black-Box Testing", "Activity Diagrams"],
      sections: [
        {
          heading: "Use case testing",
          body: "I manually tested all five modules with Use Case Testing, validating each flow against the 21 source activity diagrams (AD01 to AD21) and the feature spec. Testing against the diagrams, not just the screens, surfaced both functional defects and problems in the underlying data model.",
          image: "1586281380349-632531db7ed4"
        },
        {
          heading: "Data consistency",
          body: "The modules share data: a record created at the gate eventually lands in Finance. I ran a data-driven black-box audit across modules and flagged Finance records (invoices, totals and principals) that had drifted out of sync with their source.",
          image: "1454165804606-c3d57bc86b40"
        },
        {
          heading: "Regression",
          body: "As fixes landed, I ran iterative regression passes against the business rules most likely to break: multi-currency auto-detection, party-breakdown calculations, and route/tariff structures."
        }
      ]
    },
    {
      id: "506-trans",
      title: "506 Trans",
      roles: ["qa", "uiux"],
      org: "Celiium Studio, client: 506 Trans",
      period: "Aug - Sep 2026",
      summary: "QA for a bus & fleet rental service: a customer booking app and the admin panel behind it.",
      tags: ["Black-Box Testing", "Visual Regression", "Mobile", "Admin Panel"],
      device: "browser",
      cover: "assets/img/projects/506-trans-cover.webp",
      intro: "506 Trans rents out buses and fleet vehicles. Customers book through a mobile app; the team runs drivers, bookings and cash through an admin panel.",
      stats: [
        ["4", "customer-facing mobile flows"],
        ["10", "admin panel pages"],
        ["4", "step booking flow verified end to end"]
      ],
      tools: ["Black-Box Testing", "Playwright"],
      sections: [
        {
          heading: "Screen by screen",
          body: "Every delivered screen was tested against the reference design and functional spec using black-box testing. Playwright screenshots backed each check, giving the team a visual-regression baseline to compare the next build against.",
          image: "1559028012-481c04fa702d"
        },
        {
          heading: "Booking flow",
          body: "I walked the four-step booking flow (Data & Rute → Metode Pembayaran → Menunggu Pembayaran → Invoice), checking that price and down payment recalculate live, countdown timers behave, and the invoice shows the right state for each payment status.",
          image: "1563013544-824ae1b704d3"
        },
        {
          heading: "Admin logic",
          body: "On the admin side, I verified the FIFO driver rotation and the running Petty Cash balance against expected outputs, and flagged the calculation mismatches I found."
        }
      ]
    },
    {
      id: "specweave",
      title: "SpecWeave",
      roles: ["qa", "webdev"],
      org: "PT. Infomedia Nusantara (undergraduate thesis)",
      period: "Jan - Jul 2026",
      summary: "A tool that turns user stories into Gherkin test scenarios with LLMs, and measures how good those scenarios really are.",
      tags: ["LLM", "Gherkin / BDD", "Evaluation", "JIRA"],
      device: "browser",
      cover: "assets/img/projects/specweave-cover.webp",
      intro: "Writing test scenarios by hand is slow. For my thesis I built SpecWeave, a full-stack tool that generates Gherkin scenarios from user stories with four different LLMs, then scores the results against human-written reference test cases.",
      stats: [
        ["4", "LLMs compared"],
        ["32", "test cases designed & executed"],
        ["2", "automatic scoring metrics"]
      ],
      tools: ["OpenRouter API", "Python", "METEOR", "Sentence-BERT", "JIRA"],
      sections: [
        {
          heading: "Four models",
          body: "The tool sends each user story to four LLMs through the OpenRouter API (Llama 3.3 70B, Gemini 2.5 Flash, GPT-4.1 Mini and Claude 4.5 Haiku), so their Gherkin output can be compared side by side.",
          image: "1555066931-4365d14bab8c"
        },
        {
          heading: "Scoring the output",
          body: "Generated scenarios are only useful if they're right. I built Python evaluation pipelines using METEOR and Sentence-BERT that score every AI-generated scenario against reference test cases automatically.",
          image: "1551288049-bebda4e38f71"
        },
        {
          heading: "Testing the tool",
          body: "I designed and manually executed 32 test cases using Use Case Testing, and wrote a test plan covering scope, cases and a Threats to Validity analysis."
        },
        {
          heading: "Into the backlog",
          body: "Generated scenarios export straight into JIRA product backlogs. Along the way I fixed project-state and duplicate-export bugs in that integration."
        }
      ]
    },
    {
      id: "infomedia",
      title: "PT Infomedia Nusantara",
      roles: ["pbd"],
      org: "PT. Infomedia Nusantara",
      period: "Jul 2025 - Jan 2026",
      summary: "Product & Business Development for CRM products: system documentation, market benchmarking, Gherkin backlogs and internal guides.",
      tags: ["Product Documentation", "Backlog Management", "Market Analysis", "User Manual"],
      device: "browser",
      cover: "assets/img/projects/infomedia-cover.webp",
      intro: "PT Infomedia Nusantara, a subsidiary of Telkom Indonesia, provides Business Process Outsourcing through two portfolios: Customer Relationship Management (CRM) and Shared Service Operation (SSO). I worked in Product & Business Development on its CRM products.",
      tools: ["GitBook"],
      sections: [
        {
          heading: "Product documentation",
          body: "I wrote the System Architecture, Functional Topology and Entity Relationship Diagram documentation for CRM products, giving QA and engineering one shared technical reference for test planning.",
          image: "1558494949-ef010cbdcc31"
        },
        {
          heading: "Market & competitor analysis",
          body: "I benchmarked CRM and omnichannel platforms and conducted market research. The findings fed into the quality standards for Infomedia's own products.",
          image: "1460925895917-afdab827c52f"
        },
        {
          heading: "Backlog management",
          body: "I wrote product backlogs and acceptance criteria for management systems in Gherkin. Given / When / Then reads like plain language for business stakeholders and maps directly onto test cases for QA, so everyone reviews the same text.",
          code: "Feature: Ticket assignment\n\n  Scenario: Online agent receives a new ticket\n    Given an agent is marked as online\n    When a customer submits a new ticket\n    Then the ticket is assigned to that agent\n    And the agent is notified",
          codeLabel: "Illustrative example"
        },
        {
          heading: "WhatsApp Business Calling",
          body: "I researched and documented how the WhatsApp Business Calling mechanism works, as a reference for the omnichannel product team."
        },
        {
          heading: "User manual guide",
          body: "I wrote an internal manual guide and published it in GitBook as the team's reference documentation.",
          image: "1434030216411-0b793f4b4173"
        }
      ]
    },
    {
      id: "flicknfit",
      title: "FlicknFit",
      roles: ["uiux"],
      org: "FlicknFit",
      period: "May 2025 - Present",
      summary: "An AI fashion app that recommends outfits for your style and your day, and points you to local brands.",
      tags: ["Information Architecture", "Mobile App", "UI Design", "AI"],
      device: "phone",
      cover: "assets/img/projects/flicknfit-cover.webp",
      intro: "FlicknFit uses AI to recommend outfits tailored to your style and daily needs, quickly and simply. It also recommends local brands, helping them keep growing.",
      tools: ["Figma"],
      sections: [
        {
          heading: "Information architecture",
          body: "Before designing screens, I created the app's information architecture: how features are grouped and how people move between them.",
          image: "1586717791821-3f44a563fa4c"
        },
        {
          heading: "Every feature",
          body: "I designed the interface for all of FlicknFit's features, from outfit recommendations to local brand discovery.",
          image: "1490481651871-ab68de25d43d"
        }
      ]
    },
    {
      id: "movequest",
      title: "MoveQuest",
      roles: ["uiux"],
      org: "MoveQuest",
      period: "Mar - May 2025",
      summary: "A gamified, augmented-reality physical education app that turns screen time into moving time.",
      tags: ["Gamification", "Augmented Reality", "Mobile App", "Testing"],
      device: "phone",
      cover: "assets/img/projects/movequest-cover.webp",
      intro: "An interactive physical education app built on gamification and augmented reality, aimed at reducing passive smartphone addiction through direct experience and active learning.",
      tools: ["Figma"],
      sections: [
        {
          heading: "Design & iterate",
          body: "I designed the application and ran testing rounds, feeding what I learned back into the next iteration.",
          image: "1561070791-2526d30994b5"
        }
      ]
    },
    {
      id: "simpkl",
      title: "SIMPKL",
      roles: ["uiux"],
      org: "Tim SITU",
      period: "Sep 2024 - Jun 2025",
      summary: "An internship management system for vocational students and their supervising teachers, on web and mobile.",
      tags: ["Web App", "Mobile App", "UI Design"],
      device: "browser",
      cover: "1580582932707-520aed937b7b",
      intro: "SIMPKL (Sistem Manajemen Praktik Kerja Lapangan) gives students and their supervising teachers one place to run their internships.",
      tools: ["Figma"],
      sections: [
        {
          heading: "Web + mobile",
          body: "I designed the interface for both the SIMPKL website and its mobile application.",
          image: "1559028012-481c04fa702d"
        }
      ]
    },
    {
      id: "humic-healthcare",
      title: "HUMiC Healthcare",
      roles: ["uiux"],
      org: "CoE HUMiC Engineering, Internship Batch 2",
      period: "Sep - Nov 2024",
      summary: "Healthcare website and mobile app designs, both now registered for copyright.",
      tags: ["User Flow", "Web", "Mobile", "Copyright"],
      device: "browser",
      cover: "assets/img/projects/humic-website.webp",
      intro: "Human Centric Engineering (HUMiC) researches computing, informatics, electronics, robotics, mechanical and biomedical engineering, all aimed at improving human health and well-being.",
      stats: [
        ["2", "copyright registrations"],
        ["2", "platforms: web & mobile"]
      ],
      tools: ["Figma"],
      sections: [
        {
          heading: "User flows",
          body: "I mapped the healthcare user flows for both the website and the mobile app before moving to screens.",
          image: "1581291518857-4e27b48ff24e"
        },
        {
          heading: "Website",
          body: "The admin website for the disease research database. The dashboard tracks uploaded heartbeat records, myocardial infarction and arrhythmia data, and daily uploads, with an activity log of what operators add. Separate pages handle users, diseases, approvals and adding new data.",
          shot: "assets/img/projects/humic-website.webp",
          device: "browser"
        },
        {
          heading: "Mobile app",
          body: "The mobile app opens the same database to everyone: search for a disease, learn what HealthCare is and what it offers, and browse popular diseases with their record counts.",
          shot: "assets/img/projects/humic-mobile.webp",
          device: "phone"
        },
        {
          heading: "Copyright",
          body: "Both designs received a Copyright Registration Letter: one for the healthcare website, one for the mobile application. I also wrote the documentation report for the work."
        }
      ]
    },
    {
      id: "vasabook",
      title: "Vasabook",
      roles: ["uiux"],
      org: "Vasabook",
      period: "Feb 2024 - Aug 2025",
      summary: "A reading app for reading and reviewing books, with groups where teachers and students build literacy together.",
      tags: ["Mobile App", "Literacy", "UI Design"],
      device: "phone",
      cover: "1512820790803-83ca734da794",
      intro: "Vasabook is about reading books, reviewing them, and giving teachers and students a shared space for literacy.",
      tools: ["Figma"],
      sections: [
        {
          heading: "Mobile design",
          body: "I designed the Vasabook mobile application.",
          image: "1434030216411-0b793f4b4173"
        }
      ]
    },
    {
      id: "fresheat",
      title: "FreshEat",
      roles: ["uiux"],
      org: "FreshEat",
      period: "Feb - Jun 2024",
      summary: "Helping restaurants cut food waste by selling unsold food near closing time.",
      tags: ["Wireframing", "Mobile App", "Sustainability"],
      device: "phone",
      cover: "1504674900247-0877df9cc836",
      intro: "Restaurants and eateries throw away food that didn't sell. FreshEat lets them sell it toward the end of operating hours instead.",
      tools: ["Figma"],
      sections: [
        {
          heading: "Wireframe to UI",
          body: "I started with a wireframe concept, then designed the mobile application interface.",
          image: "1581291518857-4e27b48ff24e"
        },
        {
          heading: "Project report",
          body: "I also wrote the project report documenting the work."
        }
      ]
    },
    {
      id: "cleasy",
      title: "Cleasy",
      roles: ["uiux"],
      org: "Cleasy",
      period: "2023",
      summary: "Laundry pick-up and delivery for students, from well-rated laundry places.",
      tags: ["Wireframing", "Mobile App", "On-demand"],
      device: "phone",
      cover: "1517677208171-0bc6725a3e60",
      intro: "Washing clothes is one more chore for busy students. Cleasy picks up and delivers laundry from well-rated laundry places, without the hassle.",
      tools: ["Figma"],
      sections: [
        {
          heading: "Wireframe to UI",
          body: "I created the wireframe concept and designed the mobile application interface.",
          image: "1586717791821-3f44a563fa4c"
        }
      ]
    }
  ],

  experience: [
    { period: "Aug 2026 - Present", title: "QA Engineer", org: "Celiium Studio", note: "Clients: PT. Stasiun Cahaya Logistik, 506 Trans", role: "qa" },
    { period: "Jan - Jul 2026", title: "Fullstack Developer (Thesis)", org: "PT. Infomedia Nusantara", note: "SpecWeave, an LLM-powered Gherkin test scenario generator", role: "webdev" },
    { period: "Jul 2025 - Jan 2026", title: "Product & Business Development", org: "PT. Infomedia Nusantara", note: "CRM documentation, benchmarking, BDD backlogs, internal guides", role: "pbd" },
    { period: "May 2025 - Present", title: "UI/UX Designer", org: "FlicknFit", note: "AI fashion recommendation app", role: "uiux" },
    { period: "Nov 2024 - Dec 2025", title: "Laboratory Assistant · UI/UX Mentor", org: "Chevalier Laboratory SAS", note: "Mentored students on UI/UX methodology and major assignments", role: "uiux" },
    { period: "Sep 2024 - Jan 2025", title: "WordPress Developer", org: "SMKN 15 Bandung", note: "Built and deployed the school website", role: "webdev" },
    { period: "Sep - Nov 2024", title: "UI/UX Designer (Intern)", org: "CoE HUMiC Engineering", note: "Healthcare web & mobile, copyright registered", role: "uiux" },
    { period: "Nov 2023 - Dec 2024", title: "IT Development Staff", org: "IEEE Student Branch Telkom University", note: "Committee, IEEE Innovation Challenge Lite 2024", role: "uiux" }
  ],

  // Championships and awards only, shown next to Education.
  achievements: [
    { year: "2025", title: "2nd Place", text: "UI/UX Design Competition, SITEFEST 4.0" },
    { year: "2025", title: "Finalist", text: "HCI International 2025" }
  ],

  // Shown below Education. Clicking one opens a pop-up with the certificate image(s).
  // Dates follow the certificates themselves.
  certificates: [
    {
      year: "2025", type: "Copyright", title: "Copyright Registration: Healthcare Website",
      issuer: "DJKI, Ministry of Law of Indonesia (CoE HUMiC Engineering Internship)",
      note: "Home addresses hidden for privacy.",
      images: ["assets/certs/copyright-healthcare-web.webp", "assets/certs/copyright-healthcare-web-2.webp"]
    },
    {
      year: "2025", type: "Copyright", title: "Copyright Registration: Healthcare Mobile App",
      issuer: "DJKI, Ministry of Law of Indonesia (CoE HUMiC Engineering Internship)",
      note: "Home addresses hidden for privacy.",
      images: ["assets/certs/copyright-healthcare-mobile.webp", "assets/certs/copyright-healthcare-mobile-2.webp"]
    },
    {
      year: "2025", type: "Bootcamp", title: "React JS Bootcamp", issuer: "WPU Course",
      images: ["assets/certs/wpu-reactjs-bootcamp.webp"]
    },
    {
      year: "2024", type: "Bootcamp", title: "UI-UX Research and Design: Fullstack Intensive Bootcamp, Batch 17", issuer: "MySkill",
      images: ["assets/certs/myskill-uiux-bootcamp-1.webp", "assets/certs/myskill-uiux-bootcamp-2.webp"]
    },
    {
      year: "2024", type: "Speaker", title: "Edumovement: “Figma Fusion: Unlock Your Design Potential”",
      issuer: "IEEE Student Branch Telkom University",
      images: ["assets/certs/edumovement-speaker.webp"]
    },
    {
      year: "2024", type: "Committee", title: "IEEE Innovation Challenge Lite (IICL) 2024",
      issuer: "IEEE Student Branch Telkom University, Competition Handling Division",
      images: ["assets/certs/ieee-iicl-2024.webp"]
    }
  ],

  // Only the group names show on the page; clicking one opens a pop-up with the details.
  skills: [
    {
      group: "Design",
      summary: "From user flows and information architecture to high-fidelity screens and prototypes.",
      items: ["Figma", "Framer", "User Flows", "Information Architecture", "Wireframing", "Prototyping", "Usability Testing"]
    },
    {
      group: "Analyst",
      summary: "Documenting how systems work so teams can build and test against them.",
      items: ["System Architecture", "Functional Topology", "ERD", "Activity Diagrams", "draw.io", "GitBook"]
    },
    {
      group: "Product",
      summary: "Research and backlogs that keep business, engineering and QA aligned.",
      items: ["Market Research", "Benchmarking", "Gherkin / BDD", "Acceptance Criteria", "Product Backlog", "JIRA"]
    },
    {
      group: "QA Testing",
      summary: "Structured manual testing against specs, designs and business rules, plus test tooling.",
      items: ["Black-Box Testing", "White-Box Testing", "Use Case Testing", "Test Case Design", "Test Plans", "UAT", "Regression Testing", "Katalon Studio", "JUnit", "JMeter", "Playwright"]
    },
    {
      group: "Web Development",
      summary: "Building and shipping for the web, from WordPress sites to Python pipelines and API integrations.",
      items: ["Python", "React", "WordPress", "OpenRouter API", "JIRA API", "Railway"]
    }
  ],

  education: [
    {
      level: "University",
      school: "Telkom University",
      degree: "Bachelor of Software Engineering",
      period: "2022 - 2026",
      detail: "GPA 3.55 / 4.00"
    },
    {
      level: "High School",
      school: "Padalarang State High School 2",
      degree: "Mathematics and Natural Sciences",
      period: "2019 - 2022",
      detail: "Grade 91.82"
    }
  ]
};

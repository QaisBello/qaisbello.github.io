/* =====================================================================
   PORTFOLIO REGISTRY
   Every page reads this file. To add a project, add one object to
   PROJECTS and (for a live dashboard) a folder under /data-analytics/.
   ===================================================================== */

window.PROFILE = {
  name: "Qais Adeniji-Bello",
  headline: "Data & AI · Area Manager (Nigeria) at Guthrie AI",
  location: "Yaba, Lagos, Nigeria",
  about: [
    "I work across the data stack: analytics, data science, data engineering and AI. Over 5 years across fintech and product environments, I've focused on turning complex data into clear, actionable insights, and on building the pipelines and tools that keep that data trustworthy.",
    "I currently work at Guthrie AI in a hybrid role spanning data, Glass and Glazing estimating, and Regional Area Management, where I combine data work with operational leadership. I manage detailed RFPs, interpret technical drawings, and deliver accurate cost estimates while also overseeing regional operations, improving data integrity, and aligning reporting across teams.",
    "My estimator experience has strengthened my attention to detail, commercial awareness, and ability to make data-backed decisions under tight deadlines. As a Regional Area Manager, I've led initiatives to standardize metrics, improve workflow efficiency, and bridge the gap between technical teams and business stakeholders."
  ],
  experience: [
    { role: "Area Manager (Nigeria)", org: "Guthrie AI (remote, Philadelphia)", dates: "Sep 2025 – Present", note: "" },
    { role: "Data Analyst / Glass & Glazing Estimator", org: "Guthrie AI (remote, Philadelphia)", dates: "Feb 2025 – Present", note: "" },
    { role: "Data Analyst", org: "PayVantage Limited", dates: "Sep 2022 – Feb 2025", note: "" },
    { role: "Volunteer Data Analyst", org: "One Health Lifesavers", dates: "Aug 2023 – Present", note: "" },
    { role: "ESG Analyst Intern", org: "Marble Capital Limited", dates: "Mar 2022 – Sep 2022", note: "" },
    { role: "Monitoring Officer (Intern)", org: "Lagos State Building Control Agency, Yaba", dates: "Nov 2019 – Feb 2020", note: "" },
    { role: "Construction Site Supervisor Intern", org: "Mc Ahad Shelters", dates: "Jul 2016 – Nov 2019", note: "" }
  ],
  volunteering: [
    { role: "Head of Registration", org: "Guild of Muslim Professionals", dates: "Dec 2019 – Present", note: "Started as a volunteer in research and customer service; promoted in 2023 to run event registrations, improving sign-up efficiency by 20%." },
    { role: "Protocol and Logistics Volunteer (Special Squad)", org: "11th All Africa University Games", dates: "Sep 2024", note: "Managed protocol and logistics, from procurement to on-site coordination, and kept communication flowing between key stakeholders." }
  ],
  education: [
    { role: "B.Sc. Building", org: "University of Lagos", dates: "Jan 2017 – Nov 2024" }
  ],
  certifications: [
    ["Google Business Intelligence", "Coursera", "Apr 2023"],
    ["AWS S3 Basics", "Coursera", "Feb 2023"],
    ["Data Science Orientation", "Coursera", "Jan 2023"],
    ["Data Analytics Virtual Experience", "Quantium", "Jan 2023"],
    ["Data Analytics Consulting Virtual Internship", "KPMG", "Jan 2023"],
    ["Data Analytics and Visualization Virtual Experience", "Accenture", "Jan 2023"],
    ["Excel Skills Virtual Experience", "JPMorgan Chase", "Jan 2023"],
    ["Data Visualisation: Empowering Business with Effective Insights", "Tata Group", "Jan 2023"],
    ["Google Data Analytics Certificate", "Coursera", "Sep 2022"],
    ["Revu Essentials + 4 takeoff and measurement courses", "Bluebeam", "2025"]
  ],
  skills: {
    "Data & analysis": ["SQL", "RDBMS", "Python", "R", "SPSS", "Data cleaning", "Data manipulation", "Data extraction", "A/B testing", "Statistical modelling", "Predictive analytics"],
    "Data engineering": ["Snowflake", "dbt", "Databricks", "BigQuery", "Hightouch", "Data modelling", "Data warehousing", "Microsoft Azure"],
    "BI & visualisation": ["Power BI", "Tableau", "Looker", "Google Analytics", "Excel", "D3.js", "Data storytelling"],
    "Construction & estimating": ["AutoCAD", "Revit", "Logikal", "Bluebeam", "Cost estimating"],
    "Business tools": ["Salesforce", "SharePoint", "Microsoft Power Automate", "Project management"],
    "Leadership": ["Communication", "People management", "Collaboration", "Decision making", "Problem-solving"]
  },
  links: {
    linkedin: "https://www.linkedin.com/in/qais-adeniji-bello/",
    github: "https://github.com/QaisBello",
    email: "qaismoyo19@gmail.com"
  }
};

window.TRACKS = [
  { id: "data-analytics", name: "Data Analytics", path: "data-analytics/index.html", glyph: "bars",
    blurb: "Data cleaning, analysis and live, interactive dashboards. Each dashboard reads its data straight from the project's GitHub repo.",
    coming: ["Operational dashboards for NGOs and small businesses", "Power BI builds with matching DAX and theme kits", "Dashboards that end with recommended actions"] },
  { id: "data-science", name: "Data Science", path: "data-science/index.html", glyph: "scatter",
    blurb: "Models, experiments and the notebooks behind them.",
    coming: ["Predictive models with clear evaluation", "Experiment write-ups: question, method, result", "Reproducible notebooks with cleaned inputs"] },
  { id: "data-engineering", name: "Data Engineering", path: "data-engineering/index.html", glyph: "pipe",
    blurb: "Pipelines that move, clean and model data so dashboards stay fresh.",
    coming: ["Ingestion pipelines from forms, sheets and APIs", "Data models and quality checks", "Scheduled refreshes that feed the live dashboards"] },
  { id: "ai", name: "AI", path: "ai/index.html", glyph: "nodes",
    blurb: "Applied AI: assistants, automations and LLM-powered analysis.",
    coming: ["LLM tools that classify and summarise free text", "AI-assisted data cleaning", "Small, useful assistants built on real workflows"] },
  { id: "engineering", name: "Engineering", path: "engineering/index.html", glyph: "beam",
    blurb: "Building and structural engineering, built as code: structural analysis and building-performance studies.",
    coming: ["An in-browser beam solver (slope-deflection method) with live shear and moment diagrams", "Estimating and takeoff helpers", "Small calculators that check the maths behind a design"] }
];

window.PROJECTS = [
  {
    slug: "lifeblood-ledger",
    track: "data-analytics",
    status: "live",
    title: "Lifeblood Ledger",
    client: "One Health Lifesavers",
    clientLogo: "assets/img/ohls-logo.png",
    summary: "Three campus blood drives in Lagos, cleaned and linked by anonymous donor ID. Follows donors from check-in to whether they came back.",
    headline: "92% promised to come back. 7% did.",
    highlights: [
      ["273", "donor check-ins"],
      ["70%", "able to donate"],
      ["49% vs 6%", "women vs men deferred"]
    ],
    page: "data-analytics/lifeblood-ledger/index.html",
    repo: "QaisBello/One-health-life-savers-blood-ledger",
    branch: "main",
    dataFile: "data/cleaned/fact_responses.csv",
    image: { dark: "assets/img/lifeblood-dark.jpg", light: "assets/img/lifeblood-light.jpg" },
    stack: ["Python", "pandas", "D3.js", "Power BI"],
    date: "2026-10"
  },
  {
    slug: "adidas-sales",
    track: "data-analytics",
    status: "live",
    title: "The 10× Ledger",
    client: "Adidas US sales dataset",
    summary: "An audit of a widely shared sales dataset: 40% of rows are inflated exactly tenfold. Fixing them cuts revenue from $900M to $120M and reverses the channel ranking.",
    headline: "Reported $900M. Actual $120M.",
    highlights: [["$120M", "recomputed revenue"], ["40%", "rows inflated 10×"], ["Online", "true top channel"]],
    page: "data-analytics/adidas-sales/index.html",
    repo: "QaisBello/adidas-sales-dashboard",
    branch: "main",
    dataFile: "data/cleaned/sales_clean.csv",
    image: { dark: "assets/img/adidas-dark.jpg", light: "assets/img/adidas-light.jpg" },
    stack: ["Python", "pandas", "Data auditing", "D3.js"],
    date: "2026-10"
  },
  {
    slug: "world-cup",
    track: "data-analytics",
    status: "live",
    title: "World Cup, by the minute",
    client: "Open data · 1930–2022",
    summary: "Every men's and women's World Cup goal, timed and counted. A goal clock shows 22% of goals come in the last 15 minutes; explore scoring trends, home advantage and any nation's record.",
    headline: "22% of goals in the last 15 minutes.",
    highlights: [["3,637", "goals"], ["22%", "in the last 15'"], ["7 of 30", "hosts won"]],
    page: "data-analytics/world-cup/index.html",
    repo: "QaisBello/world-cup-analysis",
    branch: "main",
    dataFile: "data/cleaned/tournaments.csv",
    rows: 3637,
    rowsLabel: "goals",
    image: { dark: "assets/img/worldcup-dark.jpg", light: "assets/img/worldcup-light.jpg" },
    stack: ["Python", "pandas", "Open data", "D3.js"],
    date: "2026-10"
  },
  {
    slug: "dannys-diner",
    track: "data-analytics",
    status: "live",
    title: "Danny's Diner SQL",
    client: "SQL case study",
    summary: "Ten business questions answered in SQL that runs in your browser. Edit any query and re-run it; every answer is checked against the known results. Rewriting it fixed five mistakes in my first attempt.",
    headline: "SQL you can run, edit and check.",
    highlights: [["10 + 2", "questions"], ["5", "v1 mistakes fixed"], ["0", "installs needed"]],
    page: "data-analytics/dannys-diner/index.html",
    repo: "QaisBello/dannys-diner-sql",
    branch: "main",
    dataFile: "sql/index.json",
    rows: 12,
    rowsLabel: "queries",
    image: { dark: "assets/img/diner-dark.jpg", light: "assets/img/diner-light.jpg" },
    stack: ["SQL", "SQLite", "Window functions", "sql.js"],
    cta: "Open SQL playground",
    date: "2026-10"
  },
  {
    slug: "ab-test-readout",
    track: "data-science",
    status: "live",
    title: "Ship the new page? No.",
    client: "A/B test · 290,584 users",
    summary: "A landing-page experiment read out as a decision: the new page didn't convert better, and a power analysis shows the test was big enough to stop. Includes a planner for sizing the next test.",
    headline: "−0.16 pts, and safe to stop.",
    highlights: [["290,584", "users"], ["p = 0.19", "no real difference"], ["0.34 pts", "smallest detectable lift"]],
    page: "data-science/ab-test-readout/index.html",
    repo: "QaisBello/ab-test-readout",
    branch: "main",
    dataFile: "data/cleaned/summary.json",
    rows: 290584,
    image: { dark: "assets/img/abtest-dark.jpg", light: "assets/img/abtest-light.jpg" },
    stack: ["Python", "SciPy", "statsmodels", "D3.js"],
    cta: "Open live readout",
    date: "2026-10"
  },
  {
    slug: "beam-lab",
    track: "engineering",
    status: "live",
    title: "Beam Lab",
    client: "Structural analysis tool",
    summary: "Continuous-beam analysis by the slope-deflection method, live in the browser: shear, moment and deflection diagrams update as you type. Checked against textbook results; rebuilding it exposed three bugs in my first version.",
    headline: "Live slope-deflection solver.",
    highlights: [["9", "textbook checks"], ["3", "v1 bugs fixed"], ["0", "servers needed"]],
    page: "engineering/beam-lab/index.html",
    repo: "QaisBello/slope-deflection-method",
    branch: "main",
    dataFile: "examples/presets.json",
    rows: 5,
    rowsLabel: "example beams",
    image: { dark: "assets/img/beamlab-dark.jpg", light: "assets/img/beamlab-light.jpg" },
    stack: ["Python", "NumPy", "JavaScript", "D3.js", "CI"],
    cta: "Open Beam Lab",
    date: "2026-10"
  },
  {
    slug: "lifeblood-pipeline",
    track: "data-engineering",
    status: "live",
    title: "Lifeblood Pipeline",
    client: "One Health Lifesavers",
    summary: "The automated pipeline behind Lifeblood Ledger. Form exports go in; clean, anonymised, tested tables come out through GitHub Actions. Personal data is dropped at stage two, and a failed quality gate stops the publish.",
    headline: "Messy exports in, tested tables out.",
    highlights: [["6", "stages"], ["6", "quality gates"], ["0", "PII published"]],
    page: "data-engineering/lifeblood-pipeline/index.html",
    repo: "QaisBello/One-health-life-savers-blood-ledger-elt",
    branch: "main",
    dataFile: "data/published/fact_responses.csv",
    rowsLabel: "published rows",
    image: { dark: "assets/img/pipeline-dark.jpg", light: "assets/img/pipeline-light.jpg" },
    stack: ["Python", "pandas", "YAML", "pytest", "GitHub Actions"],
    cta: "Open the control room",
    date: "2026-10"
  },
  {
    slug: "indoor-air-quality",
    track: "engineering",
    status: "live",
    title: "Breathing Room",
    client: "Building performance field study",
    summary: "Five days of minute-by-minute air readings in a 206-seat lecture theatre, rebuilt from the raw logs. Fixing a monitor clock that ran 16 minutes fast, then measuring ventilation from CO2, shows each student got about 2 L/s of fresh air at full lectures.",
    headline: "A full lecture theatre, measured minute by minute.",
    highlights: [["75%", "minutes above 1,000 ppm CO2"], ["~1.2/h", "air changes"], ["16 min", "clock error fixed"]],
    page: "engineering/indoor-air-quality/index.html",
    repo: "QaisBello/indoor-air-quality",
    branch: "main",
    dataFile: "data/clean/readings.csv",
    rowsLabel: "minutes of readings",
    image: { dark: "assets/img/iaq-dark.jpg", light: "assets/img/iaq-light.jpg" },
    stack: ["Python", "pandas", "NumPy", "D3.js", "pytest"],
    cta: "Open the study",
    date: "2026-10"
  }
];

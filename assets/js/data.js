/* =======================================================================
   ████  SITE CONTENT — edit everything here  ████

   To add a project later: copy one { ... } block inside PROJECTS,
   fill it in, save. The page rebuilds itself. No HTML editing needed.
   These arrays are read by assets/js/main.js (loaded right after this file).
   ======================================================================= */

/* ---- 1. CAREER AS A MEDALLION ARCHITECTURE ------------------------
   Each organisation is a refinement layer, oldest → newest:
   Raw (Bronze) → Cleansed (Silver) → Curated (Gold) → Productized (Platinum).
   `stack` = the skills that flow IN; `output` = the data product that flows OUT.
   Ordered raw → platinum (chronological) so the pipeline reads top to bottom.
   ------------------------------------------------------------------- */
const LAYERS = [
  {
    tier: "Bronze", layer: "Raw",
    when: "Jun 2014 – Nov 2017",
    company: "Marlabs",
    role: "Software Engineer",
    desc: "Delivered data-warehousing, big-data, and IoT solutions across airline, education, and smart-mobility domains — Hadoop pipelines, ETL, and an end-to-end IoT smart-parking system.",
    stack: ["AWS", "Hadoop", "Data Warehousing", "SSIS", "SSRS", "IoT", "Talend"],
    output: { title: "IoT Smart-Parking & DW pipelines", meta: "IoT · Airline · Education", link: "iot-smart-parking" }
  },
  {
    tier: "Silver", layer: "Cleansed",
    when: "Dec 2017 – Jun 2019",
    company: "Brillio",
    role: "Senior Engineer",
    desc: "Built large-scale data-processing pipelines on AWS for real-estate and analytics clients including Realtor.com — from data migration frameworks to recommendation data products.",
    stack: ["PySpark", "Python", "EMR", "Athena", "S3", "Lambda", "Jenkins"],
    output: { title: "Similar-Homes Recommendation Engine", meta: "Realtor.com · Real Estate", link: "similar-homes" }
  },
  {
    tier: "Gold", layer: "Curated",
    when: "Jun 2019 – Dec 2023",
    company: "Utopus Insights",
    role: "Senior Data Engineer I → Data Engineer",
    desc: "Designed scalable streaming and batch pipelines for renewable-energy analytics on AWS and Databricks, powering wind & solar power-forecasting products for asset owners, operators, and power traders.",
    stack: ["PySpark", "Spark Streaming", "Databricks", "Kinesis", "Lambda", "Step Functions", "EventBridge", "API Gateway"],
    output: { title: "Scipher FX — Power Forecasting", meta: "Renewable Energy · Tech Lead", link: "scipher-fx" }
  },
  {
    tier: "Platinum", layer: "Productized",
    when: "Jan 2024 – Present",
    company: "Vestas",
    role: "Senior Data Engineer",
    desc: "Building real-time and batch data platforms for wind-turbine condition monitoring on Azure Databricks — ingesting terabytes of turbine telemetry into clean, analytics-ready datasets in Snowflake for reliability engineers and data scientists.",
    stack: ["PySpark", "Spark Streaming", "Databricks", "Azure DevOps", "Data Factory", "Snowflake"],
    output: { title: "Condition Monitoring Data Product", meta: "Azure Databricks → Snowflake", link: "condition-monitoring" }
  }
];

/* ---- 2. PROJECTS (selected, flagship work) ------------------------ */
const PROJECTS = [
  {
    id: "condition-monitoring",
    when: "2024 – Present · Vestas",
    title: "Condition Monitoring Data Product",
    desc: "End-to-end data platform on Azure Databricks for wind-turbine condition monitoring. High-throughput pipelines ingest raw turbine telemetry and event data, then standardize, quality-check, and curate it — delivering analytics-ready datasets into Snowflake through a single unified data product. Fully orchestrated with version control and CI/CD on Azure DevOps.",
    tags: ["Databricks", "PySpark", "Azure DevOps", "Snowflake"],
    role: "Tech Lead",
    team: "Team of 12"
  },
  {
    id: "scipher-fx",
    when: "Utopus Insights · Renewable Energy",
    title: "Scipher FX — Power Forecasting Platform",
    desc: "Comprehensive wind & solar power-forecasting platform helping renewable asset owners, operators, and power traders make informed decisions. Designed the data-lake architecture and core data models, built scalable pipelines from scratch, and led development of key product modules.",
    tags: ["Data Lake", "PySpark", "AWS", "Forecasting"],
    role: "Tech Lead / SDE I",
    team: "Team of 8"
  },
  {
    id: "similar-homes",
    when: "Brillio · Realtor.com",
    title: "Similar-Homes Recommendation Engine",
    desc: "Recommendation engine for Realtor.com's listings, surfacing comparable homes to drive engagement and agent leads. Built the data pipelines powering home-similarity at scale across millions of property records.",
    tags: ["PySpark", "AWS", "Recommendations", "Real Estate"],
    role: "Developer",
    team: "Team of 9"
  },
  {
    id: "iot-smart-parking",
    when: "2014 – 2017 · Marlabs",
    title: "IoT Smart-Parking & Data Warehousing",
    desc: "Early-career foundation across big data and IoT. Built Hadoop and SSIS/SSRS data-warehousing pipelines for airline and education clients, and designed an end-to-end IoT smart-parking system that streamed live parking-space availability to web and mobile using Raspberry Pi, Arduino and ultrasonic sensors.",
    tags: ["Hadoop", "Data Warehousing", "IoT", "Python", "REST"],
    role: "Software Engineer",
    team: "IoT · Airline · Education"
  }
];

/* ---- 3. STATS (honest — straight from the résumé) ----------------- */
const STATS = [
  { num: "10+",     lbl: "years in data engineering" },
  { num: "8 yrs",   lbl: "PySpark · Databricks" },
  { num: "SnowPro", lbl: "certified associate" },
];

/* ---- 4. SKILLS ---------------------------------------------------- */
const SKILLS = [
  { group: "Big Data & Processing", items: ["PySpark", "Spark Streaming", "Databricks", "Hadoop", "Feature Engineering"] },
  { group: "Cloud — AWS",           items: ["Kinesis", "Lambda", "Step Functions", "EventBridge", "API Gateway", "EMR", "Athena", "S3"] },
  { group: "Cloud — Azure",         items: ["Azure Databricks", "Azure DevOps", "Data Factory"] },
  { group: "Storage & Warehouse",   items: ["Snowflake", "Data Lake", "SQL", "PostgreSQL"] },
  { group: "Languages",             items: ["Python", "SQL", "Lua"] },
  { group: "Engineering & Practices", items: ["Microservices", "Event-Driven Design", "REST APIs", "CI/CD", "TDD", "Clean Code", "Git", "Agile/Scrum"] },
  { group: "Certifications & Education", items: ["SnowPro Associate", "MongoDB Associate", "B.Tech, CSE (2013)"] },
];

/* ---- 4b. PINNED GITHUB REPOS (the 3D crown in the hero) ------------
   Each card links to its repo. Order ≈ how they sit around the ring.     */
const PINNED = [
  { name: "syrupy-pyspark",        lang: "Python",  desc: "PySpark snapshot-testing plugin for pytest",        url: "https://github.com/nirajkmr007/syrupy-pyspark" },
  { name: "pyproject-template",    lang: "Python",  desc: "Production-style scaffold for new Python projects", url: "https://github.com/nirajkmr007/pyproject-template" },
  { name: "ML",                    lang: "Jupyter", desc: "ML algorithms & classic problems from scratch",     url: "https://github.com/nirajkmr007/ML" },
  { name: "AiBuddy",               lang: "C#",      desc: "An AI assistant built in C#",                       url: "https://github.com/nirajkmr007/AiBuddy" },
  { name: "Python",                lang: "Python",  desc: "Python practice & code snippets",                   url: "https://github.com/nirajkmr007/Python" },
  { name: "nirajkmr007.github.io", lang: "Web",     desc: "This portfolio — built & hosted on GitHub Pages",   url: "https://github.com/nirajkmr007/nirajkmr007.github.io" },
];

/* ---- 5. CERTIFICATIONS (shown in the band under the hero) ----------
   `url` is the public credential-verification link; leave it "" if you
   don't have one yet and the card renders without a Verify button.       */
const CERTS = [
  {
    name: "SnowPro Associate",
    track: "Platform Certification",
    issuer: "Snowflake",
    url: "https://achieve.snowflake.com/1640b93c-6f37-4a28-aefb-371406259ff0"
  },
  {
    name: "MongoDB Associate",          /* TODO: confirm exact certification title */
    track: "Certification",
    issuer: "MongoDB",
    url: ""                             /* TODO: add the real credential URL (the one supplied was a 404) */
  },
];

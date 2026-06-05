/* =======================================================================
   ████  SITE CONTENT — edit everything here  ████

   To add a project later: copy one { ... } block inside PROJECTS,
   fill it in, save. The page rebuilds itself. No HTML editing needed.
   These arrays are read by assets/js/main.js (loaded right after this file).
   ======================================================================= */

/* ---- 1. EXPERIENCE (newest first) --------------------------------- */
const EXPERIENCE = [
  {
    when: "Jan 2024 – Present",
    company: "Vestas",
    role: "Senior Data Engineer",
    desc: "Building real-time and batch data platforms for wind-turbine condition monitoring on Azure Databricks — ingesting terabytes of turbine telemetry into clean, analytics-ready datasets in Snowflake for reliability engineers and data scientists.",
    stack: ["PySpark", "Spark Streaming", "Databricks", "Azure DevOps", "Data Factory", "Snowflake"]
  },
  {
    when: "Jun 2019 – Dec 2023",
    company: "Utopus Insights",
    role: "Senior Data Engineer I → Data Engineer",
    desc: "Designed scalable streaming and batch pipelines for renewable-energy analytics on AWS and Databricks, powering wind & solar power-forecasting products for asset owners, operators, and power traders.",
    stack: ["PySpark", "Spark Streaming", "Databricks", "Kinesis", "Lambda", "Step Functions", "EventBridge", "API Gateway"]
  },
  {
    when: "Dec 2017 – Jun 2019",
    company: "Brillio",
    role: "Senior Engineer",
    desc: "Built large-scale data-processing pipelines on AWS for real-estate and analytics clients including Realtor.com — from data migration frameworks to recommendation data products.",
    stack: ["PySpark", "Python", "EMR", "Athena", "S3", "Lambda", "Jenkins"]
  },
  {
    when: "Jun 2014 – Nov 2017",
    company: "Marlabs",
    role: "Software Engineer",
    desc: "Delivered data-warehousing, big-data, and IoT solutions across airline, education, and smart-mobility domains — Hadoop pipelines, ETL, and an end-to-end IoT smart-parking system.",
    stack: ["AWS", "Hadoop", "Data Warehousing", "SSIS", "SSRS", "IoT", "Talend"]
  }
];

/* ---- 2. PROJECTS (selected, flagship work) ------------------------ */
const PROJECTS = [
  {
    when: "2024 – Present · Vestas",
    title: "Condition Monitoring Data Product",
    desc: "End-to-end data platform on Azure Databricks for wind-turbine condition monitoring. High-throughput pipelines ingest raw turbine telemetry and event data, then standardize, quality-check, and curate it — delivering analytics-ready datasets into Snowflake through a single unified data product. Fully orchestrated with version control and CI/CD on Azure DevOps.",
    tags: ["Databricks", "PySpark", "Azure DevOps", "Snowflake"],
    role: "Tech Lead",
    team: "Team of 12"
  },
  {
    when: "Utopus Insights · Renewable Energy",
    title: "Scipher FX — Power Forecasting Platform",
    desc: "Comprehensive wind & solar power-forecasting platform helping renewable asset owners, operators, and power traders make informed decisions. Designed the data-lake architecture and core data models, built scalable pipelines from scratch, and led development of key product modules.",
    tags: ["Data Lake", "PySpark", "AWS", "Forecasting"],
    role: "Tech Lead / SDE I",
    team: "Team of 8"
  },
  {
    when: "Brillio · Realtor.com",
    title: "Similar-Homes Recommendation Engine",
    desc: "Recommendation engine for Realtor.com's listings, surfacing comparable homes to drive engagement and agent leads. Built the data pipelines powering home-similarity at scale across millions of property records.",
    tags: ["PySpark", "AWS", "Recommendations", "Real Estate"],
    role: "Developer",
    team: "Team of 9"
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
  { group: "Certifications & Education", items: ["SnowPro Associate", "B.Tech, CSE (2013)"] },
];

/* ---- 5. TECH STACK ICONS (devicon CDN) --------------------------- */
const STACK = [
  "apachespark/apachespark-original","python/python-original","pandas/pandas-original",
  "numpy/numpy-original","amazonwebservices/amazonwebservices-original-wordmark","azure/azure-original",
  "postgresql/postgresql-original","apachehadoop/apachehadoop-original","jenkins/jenkins-original","git/git-original"
];

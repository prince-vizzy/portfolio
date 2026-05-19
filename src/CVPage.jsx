import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const GREEN = '#1D9E75';
const GREEN_DEEP = '#217522';

const IconEducation = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10L12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
  </svg>
);
const IconBriefcase = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h7a3 3 0 013 3v14a2 2 0 00-2-2H4z" />
    <path d="M20 4h-7a3 3 0 00-3 3v14a2 2 0 012-2h8z" />
  </svg>
);
const IconCertificate = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="5" />
    <path d="M8.5 13l-1.5 7 5-3 5 3-1.5-7" />
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8 10a16 16 0 006 6l1.36-1.36a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 6l10 7 10-7" />
  </svg>
);
const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconWhatsApp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
    <path d="M12.032 2.016c-5.52 0-10 4.48-10 10 0 1.776.464 3.52 1.344 5.04l-1.344 4.944 5.088-1.344c1.44.848 3.088 1.344 4.912 1.344 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.016c-1.664 0-3.264-.464-4.624-1.264l-.336-.192-3.024.816.816-2.992-.208-.336c-.896-1.408-1.376-3.024-1.376-4.64 0-4.608 3.744-8.352 8.352-8.352 4.608 0 8.352 3.744 8.352 8.352 0 4.608-3.744 8.352-8.352 8.352z" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.778-.773 1.778-1.729V1.729C24 .774 23.203 0 22.225 0z" />
  </svg>
);
const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconPuzzle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 00.12-.64l-2-3.46a.5.5 0 00-.6-.22l-2.49 1a7.03 7.03 0 00-1.69-.98l-.38-2.65A.5.5 0 0014 2h-4a.5.5 0 00-.5.42l-.38 2.65c-.61.25-1.17.58-1.69.98l-2.49-1a.5.5 0 00-.6.22l-2 3.46a.5.5 0 00.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 00-.12.64l2 3.46c.14.24.43.34.69.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.05.26.27.42.5.42h4c.23 0 .45-.16.5-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.26.12.55.02.69-.22l2-3.46a.5.5 0 00-.12-.64l-2.11-1.65z" />
  </svg>
);

const Dot = () => (
  <span
    className="inline-block flex-none rounded-full"
    style={{ width: 10, height: 10, background: GREEN, boxShadow: `0 0 0 3px rgba(29,158,117,0.18)` }}
  />
);

const SectionHeader = ({ icon, label }) => (
  <div className="mb-3 md:mb-4">
    <div className="flex items-center gap-2.5 md:gap-3">
      {icon}
      <h2 className="text-lg md:text-2xl font-extrabold tracking-tight text-white">{label}</h2>
    </div>
    <div className="mt-2 h-px w-full" style={{ background: `linear-gradient(90deg, ${GREEN}55, transparent)` }} />
  </div>
);

const SidebarHeader = ({ icon, label }) => (
  <div className="mb-2.5 md:mb-3">
    <div className="flex items-center gap-2.5 md:gap-3">
      {icon}
      <h2 className="text-base md:text-xl font-extrabold tracking-tight text-white">{label}</h2>
    </div>
    <div className="mt-2 h-px w-full" style={{ background: `linear-gradient(90deg, ${GREEN}55, transparent)` }} />
  </div>
);

const ExperienceBlock = ({ title, bullets }) => (
  <div className="relative pl-6">
    <div className="absolute left-0 top-1.5"><Dot /></div>
    <h3 className="text-[15px] font-semibold text-white mb-2">{title}</h3>
    <ul className="space-y-1.5 text-[13px] leading-relaxed text-gray-300 list-disc pl-5 marker:text-[#1D9E75]">
      {bullets.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </div>
);

const EducationItem = ({ degree, school, period }) => (
  <div className="relative pl-6 flex items-start justify-between gap-4">
    <div className="absolute left-0 top-1.5"><Dot /></div>
    <div>
      <h3 className="text-[15px] font-semibold text-white leading-tight">{degree}</h3>
      <p className="text-[13px] italic text-gray-400 mt-0.5">{school}</p>
    </div>
    <span className="text-[12px] text-gray-400 whitespace-nowrap pt-0.5">{period}</span>
  </div>
);

const ReferenceCard = ({ name, school, role, phone, email }) => (
  <div>
    <h3 className="text-base font-bold text-white">{name}</h3>
    <p className="text-[13px] text-gray-300 mt-0.5">{school}</p>
    <p className="text-[12px] italic text-gray-400">{role}</p>
    <div className="mt-3 space-y-1 text-[12px] text-gray-300">
      <p><span className="font-semibold text-white">Phone: </span>{phone}</p>
      <p><span className="font-semibold text-white">Email: </span>{email}</p>
    </div>
  </div>
);

const CVPage = () => {
  const [copiedField, setCopiedField] = useState(null);
  const [isCertOpen, setIsCertOpen] = useState(false);

  useEffect(() => {
    if (!isCertOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsCertOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCertOpen]);

  const handleCopy = async (text, field, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CopiedToast = ({ field, bg = GREEN_DEEP }) =>
    copiedField === field ? (
      <motion.span
        initial={{ opacity: 0, y: 6, scale: 0.85 }}
        animate={{ opacity: 1, y: -6, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.85 }}
        transition={{ duration: 0.2 }}
        style={{ background: bg }}
        className="absolute -top-7 left-1/2 -translate-x-1/2 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap z-20 shadow-lg"
      >
        Copied!
      </motion.span>
    ) : null;

  return (
    <div
      className="mx-auto w-full max-w-[920px] rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
      style={{ background: '#0b0f0d' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[36%_64%]">
        {/* LEFT SIDEBAR */}
        <aside className="relative px-5 py-7 md:px-7 md:py-10" style={{ background: '#0f1411' }}>
          {/* Green corner accent triangle */}
          <div
            aria-hidden
            className="absolute top-0 left-0 pointer-events-none w-[110px] h-[110px] md:w-[170px] md:h-[170px]"
            style={{
              background: GREEN_DEEP,
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              opacity: 0.95,
            }}
          />

          {/* Photo */}
          <div className="relative z-10 flex justify-center">
            <div
              className="rounded-full overflow-hidden border-4 w-[140px] h-[140px] md:w-[200px] md:h-[200px]"
              style={{ borderColor: '#0f1411', boxShadow: '0 8px 24px rgba(0,0,0,0.45)' }}
            >
              <img
                src={assetUrl('/color-image.jpg')}
                alt="Victory Kanake"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name + role */}
          <div className="mt-4 md:mt-6 text-center">
            <h1 className="text-[30px] md:text-[40px] leading-[0.95] font-extrabold tracking-tight" style={{ color: GREEN }}>
              Victory<br />Kanake
            </h1>
            <p className="mt-3 md:mt-4 text-white font-bold text-sm md:text-base">Junior Data Analyst</p>
          </div>

          {/* Contact */}
          <div className="mt-6 md:mt-8">
            <SidebarHeader icon={<IconPhone />} label="Contact" />
            <ul className="mt-4 space-y-2 text-[13px] text-gray-200">
              <li>
                <button
                  onClick={(e) => handleCopy('0710595923', 'phone', e)}
                  className="relative flex items-center gap-3 w-full text-left rounded-md px-2 py-1.5 -ml-2 hover:bg-white/5 transition-colors group"
                >
                  <IconPhone />
                  <span className="group-hover:text-white">+254 710 595 923</span>
                  <AnimatePresence><CopiedToast field="phone" /></AnimatePresence>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleCopy('mwendavictory2@gmail.com', 'email', e)}
                  className="relative flex items-center gap-3 w-full text-left rounded-md px-2 py-1.5 -ml-2 hover:bg-white/5 transition-colors group"
                >
                  <IconMail />
                  <span className="break-all group-hover:text-white">mwendavictory2@gmail.com</span>
                  <AnimatePresence><CopiedToast field="email" /></AnimatePresence>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleCopy('0758985990', 'whatsapp', e)}
                  className="relative flex items-center gap-3 w-full text-left rounded-md px-2 py-1.5 -ml-2 hover:bg-white/5 transition-colors group"
                >
                  <IconWhatsApp />
                  <span className="group-hover:text-white">WhatsApp: 0758985990</span>
                  <AnimatePresence><CopiedToast field="whatsapp" bg="#25D366" /></AnimatePresence>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleCopy('Nairobi, Kenya', 'location', e)}
                  className="relative flex items-center gap-3 w-full text-left rounded-md px-2 py-1.5 -ml-2 hover:bg-white/5 transition-colors group"
                >
                  <IconPin />
                  <span className="group-hover:text-white">Nairobi, Kenya</span>
                  <AnimatePresence><CopiedToast field="location" /></AnimatePresence>
                </button>
              </li>
            </ul>
          </div>

          {/* About Me */}
          <div className="mt-6 md:mt-8">
            <SidebarHeader icon={<IconUser />} label="About Me" />
            <p className="mt-3 text-[13px] leading-relaxed text-gray-300">
              Data Science student at JKUAT with hands-on experience in data
              cleaning, SQL, Python, Power BI, and Excel-based reporting.
              Comfortable building dashboards, writing SQL against relational
              databases, and developing data-driven applications end-to-end.
              Strong interest in applying analytical skills to public-health
              and social-impact data, and eager to support data quality,
              visualization, and information-use work in real-world programmes.
            </p>
          </div>

          {/* Skills */}
          <div className="mt-6 md:mt-8">
            <SidebarHeader icon={<IconPuzzle />} label="Skills" />

            <div className="mt-3 space-y-3 text-[12px] leading-relaxed text-gray-200">
              <div>
                <span className="font-bold" style={{ color: GREEN }}>Programming: </span>
                Python (Pandas, NumPy), SQL, Java, R, JavaScript, TypeScript, Dart (Flutter)
              </div>
              <div>
                <span className="font-bold" style={{ color: GREEN }}>Data Analysis: </span>
                Data cleaning &amp; validation, exploratory data analysis, KPI reporting, descriptive statistics, hypothesis testing, statistical inference
              </div>
              <div>
                <span className="font-bold" style={{ color: GREEN }}>Business Intelligence: </span>
                Power BI, Power Query (ETL), Google Sheets dashboards, dashboard design, Chart.js, Streamlit
              </div>
              <div>
                <span className="font-bold" style={{ color: GREEN }}>Databases: </span>
                SQL (WHERE, GROUP BY, INNER/LEFT JOIN), relational database design, data modeling, SQLite
              </div>
              <div>
                <span className="font-bold" style={{ color: GREEN }}>Tools: </span>
                Excel (PivotTables, conditional formatting, text functions), Google Sheets (QUERY), Git, GitHub Actions, Docker, Vite, Tailwind CSS, AWS
              </div>
              <div>
                <span className="font-bold" style={{ color: GREEN }}>Frameworks &amp; Libraries: </span>
                React, Flask, Scikit-learn, SciPy, NetworkX, ggplot2
              </div>
              <div>
                <span className="font-bold" style={{ color: GREEN }}>Methods: </span>
                Data cleaning &amp; quality checks, table relationships &amp; joins, data aggregation, automation &amp; data pipelines, machine learning &amp; regression, geospatial / GIS analysis, research methods
              </div>
              <div>
                <span className="font-bold" style={{ color: GREEN }}>Spoken Languages: </span>
                English (fluent — spoken &amp; written), Swahili
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/10">
            <div className="flex gap-3 justify-around">
              <div className="relative">
                <button
                  onClick={(e) => handleCopy('victory-mwenda', 'linkedin', e)}
                  aria-label="Copy LinkedIn handle"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0A66C2]/30 transition-all duration-300 hover:scale-110"
                >
                  <IconLinkedin />
                </button>
                <AnimatePresence><CopiedToast field="linkedin" bg="#0A66C2" /></AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={(e) => handleCopy('prince-vizzy', 'github', e)}
                  aria-label="Copy GitHub handle"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/15 transition-all duration-300 hover:scale-110"
                >
                  <IconGithub />
                </button>
                <AnimatePresence><CopiedToast field="github" bg="#333" /></AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={(e) => handleCopy('0758985990', 'whatsapp-social', e)}
                  aria-label="Copy WhatsApp number"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366]/30 transition-all duration-300 hover:scale-110"
                >
                  <IconWhatsApp />
                </button>
                <AnimatePresence><CopiedToast field="whatsapp-social" bg="#25D366" /></AnimatePresence>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#217522] animate-pulse"></span>
              <span className="text-white/80 text-[9px] uppercase tracking-[0.3em]">Available</span>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="px-5 py-7 md:px-8 md:py-10 relative">
          {/* Education */}
          <section>
            <SectionHeader icon={<IconEducation />} label="Education" />
            <div className="mt-4 space-y-5 relative">
              <div
                aria-hidden
                className="absolute left-[4px] top-2 bottom-2 w-px"
                style={{ background: `linear-gradient(180deg, ${GREEN}55, transparent)` }}
              />
              <EducationItem
                degree="Data Science and Analytics"
                school="JKUAT"
                period="2023 - present"
              />
              <EducationItem
                degree="Highschool"
                school="Moi Forces Academy"
                period="2019 - 2022"
              />
            </div>
          </section>

          {/* Experience / Projects */}
          <section className="mt-7 md:mt-10">
            <SectionHeader icon={<IconBriefcase />} label="Experience &amp; Projects" />
            <div className="mt-4 space-y-6 relative">
              <div
                aria-hidden
                className="absolute left-[4px] top-2 bottom-2 w-px"
                style={{ background: `linear-gradient(180deg, ${GREEN}55, transparent)` }}
              />

              <ExperienceBlock
                title="Data Cleaning &amp; Quality Assurance — Academic &amp; self-directed work"
                bullets={[
                  'Cleaned and validated structured datasets using Excel text functions (LEFT, RIGHT, MID, TRIM, LEN) to standardise identifiers and surface inconsistencies.',
                  'Applied conditional formatting to flag data-quality exceptions, anomalies, and trends for review.',
                  'Used Pandas boolean indexing to filter and cleanse datasets, including removing invalid and bounced transactions.',
                ]}
              />

              <ExperienceBlock
                title="Data Visualisation &amp; Dashboard Development — Coursework &amp; projects"
                bullets={[
                  'Built interactive Excel PivotTables and Google Sheets QUERY-based dashboards to summarise and explore data dynamically.',
                  'Developed Power BI dashboards backed by Power Query (ETL) workflows to clean, transform, and prepare data.',
                  'Wrote foundational SQL (WHERE, GROUP BY) to extract and aggregate data for Power BI reports.',
                  'Used Pandas groupby and isin operations to aggregate and filter data ahead of visualisation.',
                ]}
              />

              <ExperienceBlock
                title="Relational Data &amp; Table Integration"
                bullets={[
                  'Combined related datasets using SQL joins (INNER, LEFT) for downstream analysis.',
                  'Integrated multiple tables using Power Query, Excel / Google Sheets lookups, and Pandas merge/concat operations to build unified analytical datasets.',
                ]}
              />

              <ExperienceBlock
                title="Titanic Survival Audit — Interactive analytics dashboard"
                bullets={[
                  'Built a Chart.js dashboard investigating survival trends by age, gender, and class on the 891-passenger Titanic dataset.',
                  'Audited the 62% survival rate of Class 1 passengers and quantified the demographic disparity between male and female survivors.',
                  'Applied chi-square tests, logistic regression, and group comparisons to validate hypotheses about sex, class, and family-size effects.',
                ]}
              />

              <ExperienceBlock
                title="End-to-End Data Pipeline — Social media &amp; mental-health analytics"
                bullets={[
                  'Designed an end-to-end pipeline that transforms raw social-media behavioural logs into a live psychological-health dashboard.',
                  'Implemented six milestones from ingestion to predictive insight using Python, Pandas, and Scikit-learn.',
                  'Containerised the workflow with Docker for reproducible, environment-stable execution.',
                ]}
              />

              <ExperienceBlock
                title="Gender &amp; Heterosexual Partners Study — Statistical research"
                bullets={[
                  'Performed cross-sectional analysis of NSSAL survey data (~1999–2001 vs ~2010–2012) on whether gender is significantly associated with changes in heterosexual partners across the decade.',
                  'Ran non-parametric tests, hypothesis testing, and a negative-binomial regression in R, visualised with ggplot2.',
                  'Produced a research-grade report covering methodology, findings, and limitations.',
                ]}
              />

              <ExperienceBlock
                title="Shii Ngapi — Nairobi matatu transit planner"
                bullets={[
                  'Built a journey planner that finds the fastest route between any two points in Nairobi, with transfer stages, live fare estimates, and route polylines on a live map.',
                  'Implemented a multi-hop routing engine in Python / Flask and integrated Google Maps for geospatial visualisation.',
                ]}
              />

              <ExperienceBlock
                title="M-Pesa Budget Tracker — Mobile budgeting app"
                bullets={[
                  'Built a Flutter / Dart Android app with event-based listeners that intercept M-Pesa SMS notifications in real time, parse transaction details, and auto-categorise spending by merchant.',
                  'Tracked budgets with live charts; persisted all data locally in SQLite for an offline-first, server-less experience.',
                ]}
              />

              <ExperienceBlock
                title="Procurement System with Backend Automation — Personal project"
                bullets={[
                  'Designed and built a relational database to store suppliers, transactions, and procurement records.',
                  'Implemented a Python backend handling core business logic and data flow.',
                  'Integrated APIs and Java-based automation to support system workflows and data exchange.',
                ]}
              />

              <ExperienceBlock
                title="Darts Scoring App — Live two-player scorer"
                bullets={[
                  'Built a React app with 501/301 countdown logic, head-to-head history, saved player suggestions, reactive win probability, set momentum, and checkout statistics.',
                  'Persisted player/session state locally in the browser for a zero-backend experience.',
                ]}
              />
            </div>
          </section>

          {/* Certifications */}
          <section className="mt-7 md:mt-10">
            <SectionHeader icon={<IconCertificate />} label="Certifications" />
            <div className="mt-4 relative pl-6">
              <div className="absolute left-0 top-1.5"><Dot /></div>
              <h3 className="text-[15px] font-semibold text-white leading-tight">
                Mayerfeld Practicum Program<sup>®</sup> — Data Analysis
              </h3>
              <p className="text-[12px] italic text-gray-400 mt-0.5">Mayerfeld Consulting · Issued 2026-05-12</p>
              <p className="text-[12px] text-gray-300 mt-2 leading-relaxed">
                Practicum program in applied data analysis, covering exploratory analysis,
                data cleaning, and reporting workflows.
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); setIsCertOpen(true); }}
                className="inline-flex items-center gap-2 mt-2 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full px-3 py-1 border transition-colors hover:bg-white/5"
                style={{ color: GREEN, borderColor: `${GREEN}55` }}
              >
                View certificate →
              </button>
              <p className="text-[10px] text-gray-500 mt-2 font-mono break-all">
                ID: 3d602561-a927-4007-9f1f-2c79872e0133
              </p>
            </div>
          </section>

          {/* References */}
          <section className="mt-7 md:mt-10">
            <SectionHeader icon={<IconBook />} label="References" />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ReferenceCard
                name="Samuel Adhola"
                school="JKUAT"
                role="Lecturer"
                phone="+254 725 872 811"
                email="Adholasamuel@gmail.com"
              />
              <ReferenceCard
                name="James Mbao"
                school="JKUAT"
                role="Lecturer"
                phone="+254 712 011 062"
                email="Mbaojames@gmail.com"
              />
            </div>
          </section>
        </main>
      </div>

      {/* Certificate popup — anchored to top-right of the viewport */}
      <AnimatePresence>
        {isCertOpen && (
          <>
            <motion.div
              key="cert-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsCertOpen(false)}
              className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              key="cert-popup"
              initial={{ opacity: 0, scale: 0.92, x: 24, y: -16 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, x: 24, y: -16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="fixed z-[210] top-4 right-4 md:top-6 md:right-6 w-[min(92vw,440px)] h-[min(80vh,640px)] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/15 flex flex-col"
              style={{ background: '#0b0f0d', transformOrigin: 'top right' }}
              role="dialog"
              aria-modal="true"
              aria-label="Mayerfeld certificate preview"
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: GREEN }}>Certificate</p>
                  <p className="text-[12px] text-white truncate">Mayerfeld Practicum — Data Analysis</p>
                </div>
                <div className="flex items-center gap-2 flex-none">
                  <a
                    href={assetUrl('/mayerfild.pdf')}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full px-3 py-1 border transition-colors hover:bg-white/5"
                    style={{ color: GREEN, borderColor: `${GREEN}55` }}
                  >
                    Open
                  </a>
                  <button
                    onClick={() => setIsCertOpen(false)}
                    aria-label="Close certificate"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <iframe
                src={`${assetUrl('/mayerfild.pdf')}#toolbar=0&navpanes=0&view=FitH`}
                title="Mayerfeld certificate"
                className="flex-1 w-full border-0 bg-white"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CVPage;

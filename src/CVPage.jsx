import React, { useState } from 'react';
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
              I am a Data Science student with hands-on exposure to data analysis,
              automation, and backend systems. I work with Python, Pandas, Excel,
              SQL, Power BI, and Google Sheets to clean, analyze, and visualize
              data, and to build simple data-driven applications. I am eager to
              keep learning and contribute to real-world data and software projects.
            </p>
          </div>

          {/* Skills */}
          <div className="mt-6 md:mt-8">
            <SidebarHeader icon={<IconPuzzle />} label="Skills" />

            <div className="mt-3">
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-2" style={{ color: GREEN }}>Languages</h4>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'R', 'JavaScript', 'TypeScript', 'React', 'Dart (Flutter)', 'SQL', 'Stata', 'HTML', 'CSS', 'Java', 'C++', 'Rust'].map((s) => (
                  <span key={s} className="text-[11px] text-gray-200 bg-white/5 border border-white/10 rounded-md px-2 py-0.5">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-2" style={{ color: GREEN }}>Tools &amp; Libraries</h4>
              <div className="flex flex-wrap gap-1.5">
                {['Pandas', 'NumPy', 'Scikit-learn', 'SciPy', 'NetworkX', 'ggplot2', 'Flask', 'Chart.js', 'Streamlit', 'SQLite', 'Docker', 'GitHub Actions', 'Power BI', 'Excel', 'Google Sheets', 'Vite', 'Tailwind CSS', 'Google Analytics', 'AWS'].map((s) => (
                  <span key={s} className="text-[11px] text-gray-200 bg-white/5 border border-white/10 rounded-md px-2 py-0.5">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-2" style={{ color: GREEN }}>Core Competencies</h4>
              <ul className="space-y-1 text-[12px] text-gray-200 list-disc pl-5 marker:text-[#1D9E75]">
                <li>Data Cleaning &amp; Validation</li>
                <li>Feature Engineering</li>
                <li>Statistical Inference &amp; Hypothesis Testing</li>
                <li>Machine Learning &amp; Regression</li>
                <li>Data Visualisation</li>
                <li>Database Design &amp; Management</li>
                <li>Geospatial / GIS Analysis</li>
                <li>Data Structures &amp; Algorithms</li>
                <li>Automation &amp; Data Pipelines</li>
                <li>Research Methods &amp; Survey Analysis</li>
                <li>API Design (REST)</li>
              </ul>
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

          {/* Experience */}
          <section className="mt-7 md:mt-10">
            <SectionHeader icon={<IconBriefcase />} label="Experience" />
            <div className="mt-4 space-y-6 relative">
              <div
                aria-hidden
                className="absolute left-[4px] top-2 bottom-2 w-px"
                style={{ background: `linear-gradient(180deg, ${GREEN}55, transparent)` }}
              />

              <ExperienceBlock
                title="Data Cleanup"
                bullets={[
                  'Applied Excel conditional formatting to surface trends, anomalies, and data-quality exceptions.',
                  'Used Excel text functions (LEFT, RIGHT, MID, TRIM, LEN) to standardize and validate structured identifiers.',
                  'Leveraged Pandas boolean indexing to filter and cleanse datasets, including removal of bounced or invalid transactions.',
                ]}
              />

              <ExperienceBlock
                title="Data Visualization and Filtering"
                bullets={[
                  'Experimented with Pandas groupby and isin functions for data aggregation and filtering to support visualizations.',
                  'Built and explored dynamic Excel PivotTables for interactive data summarization.',
                  'Worked with Google Sheets QUERY to transform data and create dynamic dashboards.',
                  'Explored Power Query (ETL) workflows to clean, transform, and prepare data for Power BI visualizations.',
                  'Applied foundational SQL WHERE and GROUP BY clauses to extract and aggregate datasets for Power BI reporting.',
                ]}
              />

              <ExperienceBlock
                title="Table Relationships"
                bullets={[
                  'Explored table relationships using SQL joins (INNER, LEFT) to combine related datasets for analysis.',
                  'Worked with data appending and lookups in Excel and Google Sheets, and Power Query to integrate multiple tables for Power BI reporting.',
                  'Applied Pandas merge and concatenation operations to relate and append datasets for exploratory analysis and visualization.',
                ]}
              />

              <ExperienceBlock
                title="System Development and Automation"
                bullets={[
                  'Built a simple procurement system with basic backend automation in Python, handling core business logic and data flow.',
                  'Designed and created a relational database to store procurement records, suppliers, and transactions.',
                  'Integrated APIs and implemented Java-based automation to support system workflows and data exchange.',
                  'Developed a budgeting mobile app featuring event-based transaction listeners, allowing incoming transactions to be captured, processed, and categorized by the user.',
                ]}
              />
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
    </div>
  );
};

export default CVPage;

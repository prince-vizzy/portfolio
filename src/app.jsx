import React, { useState, useEffect, useRef } from 'react';
import SplitText from './SplitText';
import TiltedCard from './TiltedCard';
import CVOverlay from './CVOverlay';
import Chart from 'chart.js/auto';
import DecryptedText from './DecryptedText';
import ParticleBackground from './ParticleBackground';
import TitanicDashboard from './TitanicDashboard';

// Icons Component
const Icons = {
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  Github: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.992 0-3.956-.503-5.707-1.456l-6.583 1.662zm11.947-21.365c-5.217 0-9.461 4.246-9.461 9.463 0 2.029.643 3.966 1.848 5.564l-1.103 4.029 4.129-1.044c1.536.839 3.268 1.282 5.034 1.283 5.219 0 9.464-4.248 9.466-9.465 0-2.528-.985-4.903-2.775-6.693-1.789-1.791-4.165-2.777-6.688-2.777zm5.2 12.721c-.285-.142-1.684-.831-1.946-.927-.261-.095-.452-.142-.643.142-.191.285-.738.927-.905 1.117-.167.19-.334.214-.619.071-.285-.143-1.204-.444-2.293-1.415-.848-.756-1.42-1.689-1.586-1.974-.167-.285-.018-.439.124-.581.128-.127.285-.332.428-.499.143-.167.19-.285.285-.476.095-.19.048-.356-.024-.499-.071-.142-.643-1.546-.88-2.117-.231-.557-.465-.482-.643-.491-.166-.008-.356-.01-.547-.01-.19 0-.5-.071-.762.214-.261.285-1 0-1 2.45s1.31 4.805 1.493 5.054c.184.249 2.58 3.94 6.249 5.525.873.377 1.554.602 2.083.771.877.279 1.675.239 2.305.145.702-.105 2.146-.877 2.446-1.724.3-0.846.3-1.569.21-1.721-.09-.153-.334-.243-.619-.385z"/>
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.559-8.907.077-.037 2.043-1.003 2.051-1.007l-3.521-6.795-2.142 1.037c-2.73 1.344-3.5 5.253-1.631 8.86 1.871 3.61 5.485 5.762 8.214 4.417l2.141-1.037z"/>
    </svg>
  ),
  Gmail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#EA4335">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.156-3.292 3.94-2.315L12 7.663l8.06-4.521c1.784-.977 3.94.292 3.94 2.315z"/>
    </svg>
  )
};

// Main Portfolio Component
const Portfolio = () => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [showTitanicDashboard, setShowTitanicDashboard] = useState(false);
  const [skillsDecrypted, setSkillsDecrypted] = useState(false);
  const [closeXHovered, setCloseXHovered] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, field, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    document.body.style.overflow = (isCVOpen || showTitanicDashboard) ? 'hidden' : 'unset';
    const timer = setTimeout(() => setSkillsDecrypted(true), 4000);
    return () => clearTimeout(timer);
  }, [isCVOpen, showTitanicDashboard]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setShowTitanicDashboard(false);
        setIsCVOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const skillSections = [
    { title: "Languages", skills: ["Python", "Rust", "JavaScript (React)", "Java", "C++", "SQL"] },
    { title: "Tools & Platforms", skills: ["Excel", "Google Sheets", "Power BI", "Pandas", "Google Analytics", "Streamlit", "AWS"] },
    { title: "Core Competencies", skills: ["Data Structures & Algorithms", "Data Cleaning & Validation", "Database Design & Export", "Automation Systems"] }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#217522] selection:text-white relative font-sans antialiased">

      <ParticleBackground />

      {/* Fixed Profile & Socials */}
      <div className="fixed top-28 left-8 md:left-24 z-50 flex flex-col gap-10 pointer-events-none">
        <div
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
          className={`relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 transition-all duration-700 pointer-events-auto
            ${isProfileHovered ? 'border-[#217522] scale-105 shadow-[0_0_50px_rgba(33,117,34,0.15)]' : 'border-white/10 scale-100'}`}
        >
          <img src="/color-image.jpg" alt="Victory Kanake" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-4 pointer-events-auto">
          {[
            { icon: <Icons.Gmail />, label: "mwendavictory2@gmail.com", color: "#EA4335", hoverBg: "hover:bg-[#EA4335]/20", href: "https://mail.google.com/mail/?view=cm&fs=1&to=mwendavictory2@gmail.com&su=%20Inquiry&body=Hi%20Victory,", isCopy: false },
            { icon: <Icons.Linkedin />, label: "victory mwenda", color: "#0A66C2", hoverBg: "hover:bg-[#0A66C2]/20", href: "https://www.linkedin.com/in/victory-mwenda-2723113aa/", isCopy: false },
            { icon: <Icons.Github />, label: "prince-vizzy", color: "#FFFFFF", hoverBg: "hover:bg-white/20", href: "https://github.com/prince-vizzy", isCopy: false },
            { icon: <Icons.WhatsApp />, label: "0758985990", color: "#25D366", hoverBg: "hover:bg-[#25D366]/20", href: "https://wa.me/254758985990", isCopy: false },
            { icon: <Icons.Phone />, label: "0710595923", color: "#FFFFFF", hoverBg: "hover:bg-white/20", href: "tel:0710595923", isCopy: true, copyText: "0710595923" },
          ].map((social, idx) => (
            social.isCopy ? (
              <button
                key={idx}
                onClick={(e) => handleCopy(social.copyText, social.label, e)}
                className={`group flex items-center w-fit gap-3 rounded-full transition-all duration-300 ${social.hoverBg} hover:pl-4 hover:pr-4 relative`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                  {social.icon}
                </div>
                <span
                  style={{ color: social.color }}
                  className="text-[11px] uppercase tracking-[0.15em] font-medium opacity-80 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
                >
                  {social.label}
                </span>
                {copiedField === social.label && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap animate-fade-in-out">
                    Copied! ✓
                  </span>
                )}
              </button>
            ) : (
              <a
                key={idx}
                href={social.href}
                target={social.href.startsWith('http') || social.href.startsWith('mailto') ? "_blank" : undefined}
                rel="noreferrer"
                className={`group flex items-center w-fit gap-3 rounded-full transition-all duration-300 ${social.hoverBg} hover:pl-4 hover:pr-4`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                  {social.icon}
                </div>
                <span
                  style={{ color: social.color }}
                  className="text-[11px] uppercase tracking-[0.15em] font-medium opacity-80 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
                >
                  {social.label}
                </span>
              </a>
            )
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-8 md:pl-64 py-32 z-10">
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
          <div className="font-bold mb-8 flex items-center justify-center">
            <SplitText
              text="Hello"
              tag="h1"
              className="text-[25vw] md:text-[16vw] leading-none tracking-tighter text-white"
            />
          </div>

          <div className="flex flex-col items-center gap-8 max-w-4xl mt-4">
            <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-400 max-w-2xl mx-auto">
              I am <span className="text-white font-semibold">Victory Kanake</span>,
              a Data Science student with hands-on exposure to data analysis, automation, and backend systems.
            </p>

            <button
              onClick={() => setIsCVOpen(true)}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-[#1D9E75] to-[#15855e] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#1D9E75]/30 transition-all duration-300 transform hover:scale-105"
            >
              📄 View My CV / Resume
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-24">
          {skillSections.map((section, idx) => (
            <div key={idx} className="p-8 border border-white/5 bg-white/[0.01] backdrop-blur-sm rounded-2xl hover:border-[#217522]/30 transition-all duration-500 group">
              <h3 className="text-[9px] uppercase tracking-[0.5em] text-[#217522] font-bold mb-6">
                {!skillsDecrypted ? (
                  <DecryptedText
                    text={section.title}
                    speed={60}
                    maxIterations={15}
                    sequential={true}
                    revealDirection="start"
                    useOriginalCharsOnly={false}
                    animateOn="view"
                    className="text-[#217522]"
                    parentClassName="inline-block"
                    encryptedClassName="opacity-30"
                  />
                ) : section.title}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {section.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="text-xs font-light text-gray-500 group-hover:text-gray-200 transition-colors">
                    {!skillsDecrypted ? (
                      <DecryptedText
                        text={skill}
                        speed={50}
                        maxIterations={12}
                        sequential={false}
                        revealDirection="start"
                        useOriginalCharsOnly={false}
                        animateOn="view"
                        className="text-gray-500 group-hover:text-gray-200"
                        parentClassName="inline-block"
                        encryptedClassName="opacity-30"
                      />
                    ) : skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-40 px-12 md:px-24 md:pl-80 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 border-b border-white/10 pb-8 gap-4">
          <h2 className="text-7xl tracking-tighter font-bold opacity-10 uppercase">Work</h2>
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#217522] font-bold">Featured Project</span>
        </div>

        <div className="flex justify-center">
          {/* Titanic card — opens the dashboard */}
          <div
            className="group cursor-pointer max-w-2xl w-full"
            onClick={() => setShowTitanicDashboard(true)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setShowTitanicDashboard(true)}
            aria-label="Open Titanic Survival Audit dashboard"
          >
            <TiltedCard
              imageSrc="/titanic-viz.png"
              altText="Titanic Survival Audit Dashboard"
              containerHeight="auto"
              imageWidth="100%"
              className="aspect-square w-full"
            />
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <h4 className="text-xl font-light tracking-widest uppercase group-hover:text-[#217522] transition-all">
                  Titanic Survival Audit
                </h4>
                <span className="px-2 py-0.5 border border-[#217522]/30 text-[#217522] text-[8px] uppercase tracking-widest rounded">
                  Data Analysis
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md font-light">
                An interactive dashboard investigating survival trends by age, gender, and class.
                The analysis audits the 62% survival rate of Class 1 passengers and evaluates the
                demographic disparity between male and female survivors.
              </p>
              <div className="flex gap-4 text-[10px] text-gray-600 font-mono">
                <span>[ Chart.js ]</span>
                <span>[ Statistical Analysis ]</span>
                <span>[ Interactive Dashboard ]</span>
              </div>
              {/* Subtle "click to open" hint */}
              <p className="text-[10px] text-[#217522]/60 uppercase tracking-widest group-hover:text-[#217522] transition-colors">
                Click to explore →
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 px-12 border-t border-white/5 flex flex-col items-center gap-10 relative z-10">
        <p className="text-[9px] uppercase tracking-[1em] opacity-20">Victory Kanake — JKUAT 2026</p>
      </footer>

      {/* CV Overlay */}
      <CVOverlay isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} cvUrl="CV.pdf" />

      {/* ── Titanic Dashboard Full-screen Modal ── */}
      {showTitanicDashboard && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(3, 3, 3, 0.97)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            overflowY: 'auto',
            animation: 'titanicFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Fixed X button — always visible while scrolling */}
          <button
            onClick={() => setShowTitanicDashboard(false)}
            onMouseEnter={() => setCloseXHovered(true)}
            onMouseLeave={() => setCloseXHovered(false)}
            aria-label="Close dashboard"
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: closeXHovered ? 'rgba(232,72,85,0.15)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${closeXHovered ? 'rgba(232,72,85,0.5)' : 'rgba(255,255,255,0.14)'}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 60,
              transform: closeXHovered ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg) scale(1)',
              transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              padding: 0,
              fontSize: 0,
            }}
          >
            <span style={{
              position: 'absolute',
              width: '13px', height: '1.5px',
              background: closeXHovered ? '#E84855' : 'rgba(255,255,255,0.65)',
              borderRadius: '2px',
              transform: 'rotate(45deg)',
              transition: 'background 0.2s ease',
            }} />
            <span style={{
              position: 'absolute',
              width: '13px', height: '1.5px',
              background: closeXHovered ? '#E84855' : 'rgba(255,255,255,0.65)',
              borderRadius: '2px',
              transform: 'rotate(-45deg)',
              transition: 'background 0.2s ease',
            }} />
          </button>

          {/* Dashboard content — slides up on enter */}
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '20px 16px 56px',
              animation: 'titanicSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <TitanicDashboard
              onOpenCV={() => {
                setShowTitanicDashboard(false);
                setIsCVOpen(true);
              }}
              onClose={() => setShowTitanicDashboard(false)}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes titanicFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes titanicSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-5px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import CVPage from './CVPage';

const CVOverlay = ({ isOpen, onClose, cvUrl }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-2xl"
          style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
        >

          {/* TOP BAR */}
          <div className="absolute top-0 left-0 w-full p-5 md:p-10 flex justify-between items-center z-[150] pointer-events-none">
            <div className="flex items-center gap-3 md:gap-6 pointer-events-auto">
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                onMouseEnter={() => setCloseHovered(true)}
                onMouseLeave={() => setCloseHovered(false)}
                aria-label="Close CV"
                className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
                style={{
                  background: closeHovered ? 'rgba(232,72,85,0.15)' : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${closeHovered ? 'rgba(232,72,85,0.5)' : 'rgba(255,255,255,0.14)'}`,
                  transform: closeHovered ? 'rotate(90deg) scale(1.08)' : 'rotate(0deg) scale(1)',
                }}
              >
                <span style={{ position: 'absolute', width: 13, height: 1.5, background: closeHovered ? '#E84855' : 'rgba(255,255,255,0.7)', borderRadius: 2, transform: 'rotate(45deg)' }} />
                <span style={{ position: 'absolute', width: 13, height: 1.5, background: closeHovered ? '#E84855' : 'rgba(255,255,255,0.7)', borderRadius: 2, transform: 'rotate(-45deg)' }} />
              </button>
              <div className="hidden md:block w-6 md:w-12 h-[1px] bg-[#217522]"></div>
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.6em] text-white/80 font-bold whitespace-nowrap">
                Victory Kanake CV
              </span>
            </div>
            <div className="pointer-events-auto">
              <a
                href={cvUrl}
                download
                onClick={async (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  try {
                    const resp = await fetch(cvUrl, { cache: 'no-cache' });
                    if (!resp.ok) throw new Error('fetch-failed');
                    const blob = await resp.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Victory_Kanake_CV.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  } catch (err) {
                    // fallback: open in new tab
                    window.open(cvUrl, '_blank');
                  }
                }}
                className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] bg-[#217522] text-white px-4 md:px-8 py-2 md:py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-500 whitespace-nowrap"
              >
                Download PDF
              </a>
            </div>
          </div>

          {/* MAIN VIEWPORT */}
          <div
            className={[
              'relative w-full mx-auto flex justify-center',
              isMobile ? 'px-4 mt-20 mb-20' : 'px-8 mt-24 mb-20',
            ].join(' ')}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.99, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={[
                'relative w-full',
                isMobile
                  ? 'max-h-[78vh] overflow-y-auto'
                  : 'max-w-[920px] max-h-[88vh] overflow-y-auto',
              ].join(' ')}
            >
              <CVPage />
            </motion.div>
          </div>

          {/* CLOSE HINT */}
          <button
            onClick={onClose}
            className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-[150] text-[#217522]/75 hover:text-[#217522] transition-all uppercase text-[8px] tracking-[0.5em] md:tracking-[1em] whitespace-nowrap"
          >
            Close Viewer
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CVOverlay;

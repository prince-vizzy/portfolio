import { motion, AnimatePresence } from 'framer-motion';

const CVOverlay = ({ isOpen, onClose, cvUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          /* Backdrop with a very subtle green tint in the blur */
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-2xl"
        >
          {/* 1. TOP INTERFACE */}
          <div className="absolute top-0 left-0 w-full p-10 md:p-16 flex justify-between items-center z-[150] pointer-events-none">
            
            {/* Top Left: Accent Line + Name */}
            <div className="flex items-center gap-6 pointer-events-auto">
              <div className="w-12 h-[1px] bg-[#217522]"></div> 
              <span className="text-[10px] uppercase tracking-[0.6em] text-white/80 font-bold whitespace-nowrap">
                Victory Kanake CV
              </span>
            </div>

            {/* Top Right: Accent Button */}
            <div className="pointer-events-auto">
              <a 
                href={cvUrl} 
                download 
                className="text-[9px] uppercase tracking-[0.3em] bg-[#217522] text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(33,117,34,0.2)]"
              >
                Download PDF
              </a>
            </div>
          </div>

          {/* 2. THE SEAMLESS VIEWPORT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            /* Subtle green outer glow to ground the document */
            className="relative w-[95%] max-w-4xl h-[88vh] overflow-hidden shadow-[0_0_100px_rgba(33,117,34,0.05)]"
          >
            <iframe 
              src={`${cvUrl}#view=FitW&toolbar=0&navpanes=0&scrollbar=0`} 
              className="absolute border-none outline-none pointer-events-auto"
              style={{ 
                /* The Final Invisible Border Logic */
                width: 'calc(100% + 60px)', 
                height: 'calc(100% + 100px)', 
                top: '-50px', 
                left: '-30px',
                backgroundColor: 'transparent',
                /* Contrast boosted to help the dark CV pop against the blur */
                filter: 'brightness(0.9) contrast(1.1)'
              }}
              title="Victory Kanake CV"
            />
          </motion.div>

          {/* 3. CLOSE HINT */}
          <button 
            onClick={onClose}
            className="absolute bottom-10 z-[150] text-[#217522]/40 hover:text-[#217522] transition-all uppercase text-[8px] tracking-[1em]"
          >
            Close Viewer
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVOverlay;
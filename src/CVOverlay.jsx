import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CVOverlay = ({ isOpen, onClose, cvUrl }) => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, field, e) => {
    e.stopPropagation(); // Prevents the click from closing the overlay
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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

            {/* Top Right: Download Button Only */}
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

          {/* 2. THE SEAMLESS VIEWPORT - PUSHED TO THE LEFT */}
          <div className="relative w-[95%] max-w-6xl mx-auto flex justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.99, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[85%] max-w-4xl h-[88vh] overflow-hidden shadow-[0_0_100px_rgba(33,117,34,0.05)] ml-0 md:ml-8"
            >
              <iframe 
                src={`${cvUrl}#view=FitW&toolbar=0&navpanes=0&scrollbar=0`} 
                className="absolute border-none outline-none pointer-events-auto"
                style={{ 
                  width: 'calc(100% + 60px)', 
                  height: 'calc(100% + 100px)', 
                  top: '-50px', 
                  left: '-30px',
                  backgroundColor: 'transparent',
                  filter: 'brightness(0.9) contrast(1.1)'
                }}
                title="Victory Kanake CV"
              />
            </motion.div>

            {/* 3. RIGHT SIDE - SIMPLIFIED CONTACT PANEL */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:block w-[280px] ml-8 mt-12"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
                <h3 className="text-[#217522] text-sm uppercase tracking-wider mb-4 font-semibold">
                  Contact
                </h3>
                
                <div className="space-y-4">
                  {/* Email - Copy instead of mailto */}
                  <button 
                    onClick={(e) => handleCopy('mwendavictory2@gmail.com', 'email', e)}
                    className="w-full flex items-center gap-3 text-white/80 text-sm hover:text-[#217522] transition-colors group relative"
                  >
                    <svg className="w-4 h-4 text-[#217522] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="group-hover:text-[#217522] truncate">mwendavictory2@gmail.com</span>
                    <AnimatePresence>
                      {copiedField === 'email' && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 0.7, y: -8, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#217522] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap"
                        >
                          Copied! ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Phone - Copy instead of tel */}
                  <button 
                    onClick={(e) => handleCopy('0710595923', 'phone', e)}
                    className="w-full flex items-center gap-3 text-white/80 text-sm hover:text-[#217522] transition-colors group relative"
                  >
                    <svg className="w-4 h-4 text-[#217522] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>0710595923</span>
                    <AnimatePresence>
                      {copiedField === 'phone' && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 0.7, y: -8, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#217522] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap"
                        >
                          Copied! ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* WhatsApp - Copy number instead of redirect */}
                  <button 
                    onClick={(e) => handleCopy('0758985990', 'whatsapp', e)}
                    className="w-full flex items-center gap-3 text-white/80 text-sm hover:text-[#25D366] transition-colors group relative"
                  >
                    <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.032 2.016c-5.52 0-10 4.48-10 10 0 1.776.464 3.52 1.344 5.04l-1.344 4.944 5.088-1.344c1.44.848 3.088 1.344 4.912 1.344 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.016c-1.664 0-3.264-.464-4.624-1.264l-.336-.192-3.024.816.816-2.992-.208-.336c-.896-1.408-1.376-3.024-1.376-4.64 0-4.608 3.744-8.352 8.352-8.352 4.608 0 8.352 3.744 8.352 8.352 0 4.608-3.744 8.352-8.352 8.352zm4.576-6.272c-.256-.128-1.52-.752-1.76-.832-.24-.08-.416-.128-.592.128-.176.256-.688.832-.848 1.008-.16.176-.32.192-.576.064-.256-.128-1.088-.4-2.064-1.28-.768-.688-1.28-1.536-1.44-1.792-.16-.256-.016-.4.112-.528.128-.128.256-.256.384-.384.128-.128.176-.224.256-.384.08-.16.032-.288-.016-.4-.048-.112-.592-1.424-.816-1.952-.208-.512-.416-.448-.576-.448-.16 0-.336-.016-.512-.016-.176 0-.448.064-.688.32-.24.256-.912.896-.912 2.176 0 1.28.928 2.528 1.056 2.688.128.16 1.808 2.832 4.384 3.904.608.256 1.088.416 1.456.528.608.192 1.168.16 1.616.096.496-.064 1.52-.624 1.744-1.232.224-.608.224-1.12.16-1.232-.064-.112-.24-.176-.496-.304z"/>
                    </svg>
                    <span>0758985990</span>
                    <AnimatePresence>
                      {copiedField === 'whatsapp' && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 0.7, y: -8, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap"
                        >
                          Copied! ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Location - Copy instead of navigation */}
                  <button 
                    onClick={(e) => handleCopy('Nairobi, Kenya', 'location', e)}
                    className="w-full flex items-center gap-3 text-white/80 text-sm hover:text-[#217522] transition-colors group relative"
                  >
                    <svg className="w-4 h-4 text-[#217522] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Nairobi, Kenya</span>
                    <AnimatePresence>
                      {copiedField === 'location' && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 0.7, y: -8, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#217522] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap"
                        >
                          Copied! ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                {/* Social Links - Smooth animations for logos */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex gap-4 justify-around">
                    <div className="relative">
                      <button
                        onClick={(e) => handleCopy('victory-mwenda', 'linkedin', e)}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0A66C2]/30 transition-all duration-300 hover:scale-110 relative group"
                      >
                        <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.778-.773 1.778-1.729V1.729C24 .774 23.203 0 22.225 0z" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {copiedField === 'linkedin' && (
                          <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 0.7, y: -12, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0A66C2] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10"
                          >
                            Username copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="relative">
                      <button
                        onClick={(e) => handleCopy('prince-vizzy', 'github', e)}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 relative group"
                      >
                        <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {copiedField === 'github' && (
                          <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 0.7, y: -12, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10"
                          >
                            Username copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="relative">
                      <button
                        onClick={(e) => handleCopy('0758985990', 'whatsapp-social', e)}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366]/30 transition-all duration-300 hover:scale-110 relative group"
                      >
                        <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.032 2.016c-5.52 0-10 4.48-10 10 0 1.776.464 3.52 1.344 5.04l-1.344 4.944 5.088-1.344c1.44.848 3.088 1.344 4.912 1.344 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.016c-1.664 0-3.264-.464-4.624-1.264l-.336-.192-3.024.816.816-2.992-.208-.336c-.896-1.408-1.376-3.024-1.376-4.64 0-4.608 3.744-8.352 8.352-8.352 4.608 0 8.352 3.744 8.352 8.352 0 4.608-3.744 8.352-8.352 8.352z"/>
                        </svg>
                      </button>
                      <AnimatePresence>
                        {copiedField === 'whatsapp-social' && (
                          <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 0.7, y: -12, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10"
                          >
                            Number copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-[#217522] rounded-full animate-pulse"></div>
                    <span className="text-white/50 text-[9px] uppercase tracking-wider">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Close Hint */}
          <button 
            onClick={onClose}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[150] text-[#217522]/40 hover:text-[#217522] transition-all uppercase text-[8px] tracking-[1em] whitespace-nowrap"
          >
            Close Viewer
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVOverlay;
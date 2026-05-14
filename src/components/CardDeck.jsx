import React, { Children, useEffect, useRef } from 'react';

/**
 * CardDeck — vertical "folder" deck.
 * Cards layer on top of each other with a small offset; as the user scrolls,
 * the top card slides up off the viewport revealing the next one.
 *
 * Props:
 *   cardOffset (px)  — vertical offset between stacked cards behind the top
 *   cardScale        — scale-down step per card behind the top (0..1)
 *   maxVisible       — how many cards to keep visible in the back of the stack
 */
const CardDeck = ({ children, cardOffset = 14, cardScale = 0.04, maxVisible = 4 }) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const cards = Children.toArray(children);
  const rafRef = useRef(null);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = container.offsetHeight - vh;
      const scrolled = Math.max(0, -rect.top);
      const progress = totalScrollable > 0
        ? Math.min(scrolled / totalScrollable, 1) * (cards.length - 1)
        : 0;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = i - progress;
        let translateY;
        let scale;
        let opacity;
        let pointerEvents;

        if (pos < 0) {
          // Card has slid up out of view
          translateY = pos * vh;
          opacity = pos < -0.6 ? 0 : 1 + pos * (1 / 0.6);
          pointerEvents = 'none';
        } else {
          // Card is at top (pos≈0) or stacked behind
          translateY = pos * cardOffset;
          scale = 1 - pos * cardScale;
          opacity = pos > maxVisible ? 0 : 1;
          pointerEvents = pos < 0.5 ? 'auto' : 'none';
        }

        el.style.transform = `translate3d(0, ${translateY}px, 0)${scale !== undefined ? ` scale(${scale})` : ''}`;
        el.style.opacity = String(opacity);
        el.style.pointerEvents = pointerEvents;
      });
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [cards.length, cardOffset, cardScale, maxVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="absolute inset-x-0 px-4 flex items-center justify-center will-change-transform"
            style={{
              top: 0,
              bottom: 0,
              zIndex: cards.length - i,
              transformOrigin: 'top center',
            }}
          >
            <div className="w-full max-w-md">{card}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDeck;

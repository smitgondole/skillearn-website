import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('.cursor-pointer') ||
        target?.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
          width: '8px',
          height: '8px',
          backgroundColor: '#38bdf8',
        }}
      />
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-cyan-400/40 transition-all duration-300 ease-out ${
          isHovered
            ? 'w-10 h-10 bg-cyan-500/10 border-cyan-400 scale-125'
            : 'w-6 h-6 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${pos.x - (isHovered ? 20 : 12)}px, ${pos.y - (isHovered ? 20 : 12)}px, 0)`,
        }}
      />
    </>
  );
};

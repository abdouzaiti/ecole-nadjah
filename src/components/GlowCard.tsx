import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '../lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { base: 215, spread: 20 }, // Centered on website's navy/blue hue (215)
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number | null = null;
    
    const updatePointer = (clientX: number, clientY: number) => {
      if (frameId) return;
      
      frameId = requestAnimationFrame(() => {
        if (cardRef.current) {
          cardRef.current.style.setProperty('--x', clientX.toFixed(2));
          cardRef.current.style.setProperty('--xp', (clientX / window.innerWidth).toFixed(2));
          cardRef.current.style.setProperty('--y', clientY.toFixed(2));
          cardRef.current.style.setProperty('--yp', (clientY / window.innerHeight).toFixed(2));
        }
        frameId = null;
      });
    };

    const handleMouseMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ''; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties & Record<string, string | number> = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '2',
      '--backdrop': 'transparent',
      '--backup-border': 'rgba(0, 0, 0, 0.05)',
      '--size': '300',
      '--outer': '1',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative' as const,
    };

    // Add width and height if provided
    if (width !== undefined) {
      const w = typeof width === 'number' ? `${width}px` : width;
      baseStyles.width = w;
      baseStyles['width' as any] = w;
    }
    if (height !== undefined) {
      const h = typeof height === 'number' ? `${height}px` : height;
      baseStyles.height = h;
      baseStyles['height' as any] = h;
    }

    return baseStyles;
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={getInlineStyles()}
      className={cn(
        "rounded-2xl relative shadow-[0_1rem_2rem_-1rem_black] bg-white transition-shadow duration-300",
        !customSize && "grid grid-rows-[1fr_auto] p-4 gap-4",
        !customSize && (!width || !height) && "aspect-[3/4]",
        !customSize && getSizeClasses(),
        className
      )}
    >
      <div data-glow-inner></div>
      {children}
    </div>
  );
};

export { GlowCard };

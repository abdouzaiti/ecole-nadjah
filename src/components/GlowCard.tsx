import React, { useEffect, useRef, ReactNode } from 'react';

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
    let frameId: number;
    const syncPointer = (e: PointerEvent) => {
      if (frameId) cancelAnimationFrame(frameId);
      
      frameId = requestAnimationFrame(() => {
        if (cardRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          
          cardRef.current.style.setProperty('--x', x.toFixed(2));
          cardRef.current.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
          cardRef.current.style.setProperty('--y', y.toFixed(2));
          cardRef.current.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
        }
      });
    };

    window.addEventListener('pointermove', syncPointer);
    return () => {
      window.removeEventListener('pointermove', syncPointer);
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
      '--backdrop': 'rgba(255, 255, 255, 1)',
      '--backup-border': 'rgba(0, 0, 0, 0.05)',
      '--size': '300',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      '--saturation': '70',
      '--lightness': '40',
      '--border-spot-opacity': '1',
      '--bg-spot-opacity': '0.15', 
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 215) calc(var(--saturation, 70) * 1%) calc(var(--lightness, 40) * 1%) / var(--bg-spot-opacity, 0.15)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative' as const,
      willChange: 'background-image',
    };

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        [data-glow]::before,
        [data-glow]::after,
        [data-glow-inner]::before,
        [data-glow-inner]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
          will-change: mask, background-image;
        }
        
        [data-glow]::before,
        [data-glow-inner]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(var(--hue, 215) calc(var(--saturation, 80) * 1%) calc(var(--lightness, 40) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
          );
          filter: brightness(1.5);
        }
        
        [data-glow]::after,
        [data-glow-inner]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
          );
        }
        
        [data-glow] [data-glow-inner] {
          position: absolute;
          inset: 0;
          will-change: filter, opacity;
          opacity: var(--outer, 1);
          border-radius: calc(var(--radius) * 1px);
          border-width: calc(var(--border-size) * 20);
          filter: blur(calc(var(--border-size) * 10));
          background: none;
          pointer-events: none;
          border: none;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        
        [data-glow] > [data-glow-inner]::before {
          content: "";
          position: absolute;
          inset: -10px;
          border-width: 10px;
        }
      ` }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize && (!width || !height) ? 'aspect-[3/4]' : ''}
          rounded-2xl 
          relative 
          grid 
          grid-rows-[1fr_auto] 
          shadow-[0_1rem_2rem_-1rem_black] 
          p-4 
          gap-4 
          ${className}
        `}
      >
        <div data-glow-inner></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard };

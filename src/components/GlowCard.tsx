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

  const getSizeClasses = () => {
    if (customSize) {
      return ''; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties & Record<string, string | number> = {
      '--radius': '14',
      '--border': '2',
      border: '2px solid rgba(0, 0, 0, 0.05)',
      position: 'relative' as const,
    };

    if (width !== undefined) {
      const w = typeof width === 'number' ? `${width}px` : width;
      baseStyles.width = w;
    }
    if (height !== undefined) {
      const h = typeof height === 'number' ? `${height}px` : height;
      baseStyles.height = h;
    }

    return baseStyles;
  };

  return (
    <div
      style={getInlineStyles()}
      className={cn(
        "rounded-2xl relative shadow-lg bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:bg-white/80 border border-white/20 group",
        !customSize && "grid grid-rows-[1fr_auto] p-4 gap-4",
        !customSize && (!width || !height) && "aspect-[3/4]",
        !customSize && getSizeClasses(),
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 pointer-events-none transition-all duration-500" />
      {children}
    </div>
  );
};

export { GlowCard };

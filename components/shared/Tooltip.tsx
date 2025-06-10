import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  glassmorphic?: boolean;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  glassmorphic = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const childRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const calculatePosition = () => {
    if (!childRef.current || !tooltipRef.current) return;

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = childRect.top + scrollTop - tooltipRect.height - 8;
        left = childRect.left + scrollLeft + (childRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = childRect.bottom + scrollTop + 8;
        left = childRect.left + scrollLeft + (childRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = childRect.top + scrollTop + (childRect.height / 2) - (tooltipRect.height / 2);
        left = childRect.left + scrollLeft - tooltipRect.width - 8;
        break;
      case 'right':
        top = childRect.top + scrollTop + (childRect.height / 2) - (tooltipRect.height / 2);
        left = childRect.right + scrollLeft + 8;
        break;
    }

    // Keep tooltip within viewport
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }

    setTooltipPosition({ top, left });
  };

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
      setTimeout(calculatePosition, 0);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
    }

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isVisible]);

  const tooltipClasses = glassmorphic
    ? 'bg-white/20 dark:bg-neutral-bgDark/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-glass'
    : 'bg-neutral-bgLight dark:bg-neutral-bgDark border border-neutral-borderLight dark:border-neutral-borderDark shadow-md';

  const arrowPosition = {
    top: 'bottom-[-5px] left-1/2 transform -translate-x-1/2 border-t-white/20 dark:border-t-neutral-bgDark/40 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-5px] left-1/2 transform -translate-x-1/2 border-b-white/20 dark:border-b-neutral-bgDark/40 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-5px] top-1/2 transform -translate-y-1/2 border-l-white/20 dark:border-l-neutral-bgDark/40 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-5px] top-1/2 transform -translate-y-1/2 border-r-white/20 dark:border-r-neutral-bgDark/40 border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div className="relative inline-block">
      <div
        ref={childRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`fixed z-50 px-3 py-2 text-sm rounded-lg text-neutral-textDark dark:text-neutral-textLight ${tooltipClasses} ${className}`}
          style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
          role="tooltip"
        >
          {content}
          <div className={`absolute w-0 h-0 border-[5px] ${arrowPosition[position]}`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;


import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glassmorphic?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User Avatar", size = 'md', className = '', glassmorphic = true }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  const getInitials = (name: string): string => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
  };

  const glassClasses = glassmorphic ? 'border border-white/20 shadow-glass-sm backdrop-blur-sm bg-white/20 dark:bg-neutral-bgDark/40' : 'bg-gray-300 dark:bg-gray-600';

  return (
    <div className={`rounded-full overflow-hidden ${glassClasses} flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <span className={`font-semibold ${glassmorphic ? 'text-neutral-textDark dark:text-neutral-textLight' : 'text-white'} ${size === 'sm' || size === 'md' ? 'text-sm' : 'text-lg'}`}>
          {getInitials(alt)}
        </span>
      )}
    </div>
  );
};

export default Avatar;

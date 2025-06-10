import React, { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  glassmorphic?: boolean;
  className?: string;
  variant?: 'pills' | 'underline' | 'enclosed';
}

const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  defaultActiveTab,
  onChange,
  glassmorphic = true,
  className = '',
  variant = 'pills',
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || tabs[0]?.id || '');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (defaultActiveTab && defaultActiveTab !== activeTab) {
      setActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab]);

  useEffect(() => {
    // Actualizar el indicador para la variante 'underline'
    if (variant === 'underline' && tabRefs.current[activeTab]) {
      const tabElement = tabRefs.current[activeTab];
      if (tabElement) {
        const { offsetLeft, offsetWidth } = tabElement;
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      }
    }
  }, [activeTab, variant]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // Estilos base para todos los tipos de tabs
  const baseTabClasses = 'flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200';
  
  // Estilos específicos para cada variante
  const variantStyles = {
    pills: {
      container: 'flex p-1 gap-1 rounded-lg',
      tab: (isActive: boolean) => `
        rounded-lg
        ${isActive 
          ? glassmorphic 
            ? 'bg-white/25 dark:bg-primary-DEFAULT/30 text-primary-dark dark:text-white backdrop-blur-md border border-white/20 dark:border-white/10 shadow-glass-sm' 
            : 'bg-primary-DEFAULT/20 dark:bg-primary-DEFAULT/30 text-primary-dark dark:text-white'
          : 'text-neutral-textDark dark:text-neutral-textLight hover:bg-white/15 dark:hover:bg-neutral-textLight/10'}
      `,
      indicator: 'hidden',
    },
    underline: {
      container: 'flex border-b border-neutral-borderLight dark:border-neutral-borderDark',
      tab: (isActive: boolean) => `
        ${isActive 
          ? 'text-primary-DEFAULT dark:text-primary-DEFAULT' 
          : 'text-neutral-textDark dark:text-neutral-textLight hover:text-primary-DEFAULT/70 dark:hover:text-primary-DEFAULT/70'}
      `,
      indicator: 'absolute bottom-0 h-0.5 bg-primary-DEFAULT transition-all duration-200',
    },
    enclosed: {
      container: 'flex',
      tab: (isActive: boolean) => `
        border-b-2 
        ${isActive 
          ? glassmorphic
            ? 'border-t border-l border-r border-white/20 dark:border-white/10 border-b-transparent rounded-t-lg bg-white/20 dark:bg-neutral-bgDark/30 backdrop-blur-sm text-primary-DEFAULT dark:text-primary-DEFAULT'
            : 'border-t border-l border-r border-neutral-borderLight dark:border-neutral-borderDark border-b-transparent rounded-t-lg bg-neutral-bgLight dark:bg-neutral-bgDark text-primary-DEFAULT dark:text-primary-DEFAULT'
          : 'border-b-neutral-borderLight dark:border-b-neutral-borderDark text-neutral-textDark dark:text-neutral-textLight hover:text-primary-DEFAULT/70 dark:hover:text-primary-DEFAULT/70'}
      `,
      indicator: 'hidden',
    },
  };

  const containerClasses = glassmorphic && variant === 'pills'
    ? `${variantStyles[variant].container} backdrop-blur-sm bg-white/10 dark:bg-neutral-bgDark/20 border border-white/10 dark:border-white/5`
    : variantStyles[variant].container;

  return (
    <div className={`relative ${className}`}>
      <div className={containerClasses}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            className={`${baseTabClasses} ${variantStyles[variant].tab(activeTab === tab.id)}`}
            onClick={() => handleTabChange(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {variant === 'underline' && (
        <div 
          className={variantStyles[variant].indicator}
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      )}
    </div>
  );
};

export default TabGroup;

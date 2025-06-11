import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface DynamicGreetingProps {
  baseText: string;
}

const DynamicGreeting: React.FC<DynamicGreetingProps> = ({ baseText }) => {
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState(`¡Hola, ${currentUser?.name}! 👋`);

  const alternativeGreetings = [
    `Hoy es un gran día para innovar, ${currentUser?.name} 👊`,
    `¿Vamos a crear algo increíble, ${currentUser?.name}?`,
    `¡Qué bueno verte por aquí, ${currentUser?.name}!`,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * alternativeGreetings.length);
      setGreeting(alternativeGreetings[randomIndex]);
    }, 2000); // Change greeting after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-textDark dark:text-neutral-textLight mb-2">
        {greeting}
      </h1>
      <h2 className="text-xl md:text-2xl text-primary-DEFAULT dark:text-primary-light">
        {baseText}
      </h2>
    </div>
  );
};

export default DynamicGreeting;

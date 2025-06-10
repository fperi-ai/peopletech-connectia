import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarCard } from './SidebarCard';
import Icon from '../../../components/shared/Icon';

/**
 * Call-to-action component for the Meme Generator
 */
export const MemeCTA: React.FC = () => {
  return (
    <SidebarCard title="Generador de Memes" className="mb-0">
      <div className="text-center">
        <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">
          ¡Crea memes divertidos con IA para compartir!
        </div>
        <Link 
          to="/meme-generator" 
          className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2 rounded-md flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
        >
          <Icon name="pencil" className="w-4 h-4 mr-1.5" /> Crear meme ahora
        </Link>
      </div>
    </SidebarCard>
  );
};

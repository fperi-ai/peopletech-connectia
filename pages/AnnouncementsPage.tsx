
import React from 'react';
import { INITIAL_ANNOUNCEMENTS } from '../constants';
import Button from '../components/shared/Button';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import Icon from '../components/shared/Icon'; // Import Icon

const AnnouncementsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const announcements = INITIAL_ANNOUNCEMENTS; 

  const canCreate = currentUser?.role === UserRole.ADMIN || currentUser?.role === UserRole.MANAGER;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-DEFAULT flex items-center">
            El Altavoz 
            <Icon name="megaphone" className="w-8 h-8 ml-2 text-secondary-DEFAULT transform -rotate-12" />
        </h1>
        {canCreate && <Button leftIcon={<Icon name="plus-circle" className="w-4 h-4"/>}>Nuevo Anuncio</Button>}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Comunicaciones oficiales de People Tech y la compañía. Solo para leer y participar.</p>
      
      {announcements.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">No hay anuncios por el momento.</p>
      )}

      <div className="space-y-6">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-5 border-l-4 border-primary-DEFAULT">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-1 text-neutral-textDark dark:text-neutral-textLight">{ann.title}</h2>
              {ann.isOfficial && <span className="text-xs bg-primary-DEFAULT/20 text-primary-dark dark:text-primary-light px-2 py-1 rounded-full font-medium">OFICIAL</span>}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Publicado por {ann.authorName} - {new Date(ann.timestamp).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-neutral-textDark dark:text-neutral-textLight whitespace-pre-wrap">{ann.content}</p>
            <div className="mt-4 pt-3 border-t border-neutral-borderLight dark:border-neutral-borderDark">
              <Button variant="ghost" size="sm" leftIcon={<Icon name="chat-bubble" className="w-4 h-4" />}>Comentar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;

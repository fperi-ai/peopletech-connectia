import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SidebarCard } from './SidebarCard';
import Icon from '../../../components/shared/Icon';
import Button from '../../../components/shared/Button';

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  isRead: boolean;
}

// Simulated query function
const fetchLatestAnnouncement = async (): Promise<Announcement | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return mocked announcement
  return {
    id: 'ann-' + Date.now(),
    title: 'Nuevas características en ConnectIA',
    content: 'Hemos añadido un nuevo sidebar en el feed para mejorar tu experiencia. ¡Explora todas las novedades!',
    createdAt: Date.now() - 3600000, // 1 hour ago
    isRead: false
  };
};

/**
 * Shows the latest unread announcement from "El Altavoz"
 */
export const AnnouncementCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: announcement, isLoading } = useQuery({
    queryKey: ['sidebar', 'announcement'],
    queryFn: fetchLatestAnnouncement,
    refetchInterval: 60000, // Refetch every 60 seconds
    staleTime: 50000,
  });

  if (!isLoading && !announcement) {
    return null; // No announcements to show
  }

  return (
    <>
      <SidebarCard title="El Altavoz" className="relative">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mt-2"></div>
          </div>
        ) : (
          <>
            {!announcement?.isRead && (
              <span className="absolute top-3 right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                <Icon name="megaphone" className="mr-1 text-primary-DEFAULT" /> 
                {announcement?.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {announcement?.content}
              </p>
              <Button 
                size="sm" 
                variant="ghost" 
                className="mt-2 text-xs"
                onClick={() => setIsModalOpen(true)}
              >
                Leer más
              </Button>
            </div>
          </>
        )}
      </SidebarCard>

      {/* Modal for Announcement (simplified) */}
      {isModalOpen && announcement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="font-bold text-xl mb-2">{announcement.title}</h3>
            <p className="mb-4">{announcement.content}</p>
            <div className="flex justify-end">
              <Button onClick={() => setIsModalOpen(false)}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

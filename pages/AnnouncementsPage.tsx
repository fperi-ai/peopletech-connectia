
import React, { useState } from 'react';
import { INITIAL_ANNOUNCEMENTS } from '../constants';
import Button from '../components/shared/Button';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, Announcement } from '../types';
import Icon from '../components/shared/Icon';
import Modal from '../components/shared/Modal';

const AnnouncementsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [isOfficial, setIsOfficial] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null); 

  const canCreate = currentUser?.role === UserRole.ADMIN || currentUser?.role === UserRole.MANAGER;
  
  // Función para manejar la creación de un nuevo anuncio
  const handleCreateAnnouncement = () => {
    if (!currentUser || !newAnnouncementTitle.trim() || !newAnnouncementContent.trim()) return;
    
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnouncementTitle.trim(),
      content: newAnnouncementContent.trim(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      timestamp: Date.now(),
      isOfficial: isOfficial,
      comments: [],
      reactions: {}
    };
    
    setAnnouncements(prevAnnouncements => [newAnnouncement, ...prevAnnouncements]);
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setIsOfficial(false);
    setIsCreateModalOpen(false);
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setIsOfficial(false);
  };
  
  // Función para añadir comentarios a un anuncio
  const handleAddComment = (announcementId: string) => {
    if (!currentUser || !commentText.trim() || !announcementId) return;
    
    const newComment = {
      id: `comment-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: commentText.trim(),
      timestamp: Date.now()
    };
    
    setAnnouncements(prev => prev.map(ann => {
      if (ann.id !== announcementId) return ann;
      
      return {
        ...ann,
        comments: [...(ann.comments || []), newComment]
      };
    }));
    
    setCommentText('');
    setActiveCommentId(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-DEFAULT flex items-center">
            El Altavoz 
            <Icon name="megaphone" className="w-8 h-8 ml-2 text-secondary-DEFAULT transform -rotate-12" />
        </h1>
        {canCreate && <Button leftIcon={<Icon name="plus-circle" className="w-4 h-4"/>} onClick={() => setIsCreateModalOpen(true)}>Nuevo Anuncio</Button>}
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
            
            {/* Área de reacciones */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['👍', '❤️', '🎉', '👏', '🙌'].map(emoji => {
                const hasReacted = currentUser && ann.reactions && ann.reactions[emoji] ? ann.reactions[emoji].includes(currentUser.id) : false;
                const count = ann.reactions && ann.reactions[emoji] ? ann.reactions[emoji].length : 0;
                
                return (
                  <button
                    key={emoji}
                    onClick={() => {
                      if (!currentUser) return;
                      
                      setAnnouncements(prev => prev.map(a => {
                        if (a.id !== ann.id) return a;
                        
                        const updatedReactions = a.reactions ? { ...a.reactions } : {};
                        if (!updatedReactions[emoji]) updatedReactions[emoji] = [];
                        
                        if (updatedReactions[emoji].includes(currentUser.id)) {
                          updatedReactions[emoji] = updatedReactions[emoji].filter(id => id !== currentUser.id);
                          if (updatedReactions[emoji].length === 0) delete updatedReactions[emoji];
                        } else {
                          updatedReactions[emoji] = [...updatedReactions[emoji], currentUser.id];
                        }
                        
                        return { ...a, reactions: updatedReactions };
                      }));
                    }}
                    className={`px-2 py-1 rounded-full flex items-center gap-1 text-xs ${hasReacted 
                      ? 'bg-primary-DEFAULT/20 text-primary-dark dark:text-primary-light font-medium' 
                      : 'bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight hover:bg-neutral-bgLight/80 dark:hover:bg-neutral-bgDark/80'}`}
                  >
                    {emoji} {count > 0 && count}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-neutral-borderLight dark:border-neutral-borderDark">
              <Button 
                variant="ghost"
                size="sm"
                leftIcon={<Icon name="chat-bubble" className="w-4 h-4" />}
                onClick={() => setActiveCommentId(activeCommentId === ann.id ? null : ann.id)}
              >
                Comentar
              </Button>
            </div>
                
                {/* Formulario de comentarios */}
                {activeCommentId === ann.id && (
                  <div className="mt-3 p-3 bg-neutral-bgLight/50 dark:bg-neutral-bgDark/50 rounded-md">
                    <div className="flex gap-2">
                      <textarea 
                        value={commentText} 
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full text-sm p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded text-neutral-textDark dark:text-neutral-textLight bg-neutral-bgLight dark:bg-neutral-bgDark focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                        placeholder="Escribe tu comentario..."
                        rows={2}
                      />
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleAddComment(ann.id)}
                        disabled={!commentText.trim()}
                        className="self-end"
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                )}
            
            {/* Mostrar comentarios si hay */}
            {ann.comments && ann.comments.length > 0 && (
              <div className="mt-4 pl-6 border-l-2 border-neutral-borderLight dark:border-neutral-borderDark">
                <h3 className="text-sm font-medium text-neutral-textDark dark:text-neutral-textLight mb-2">Comentarios:</h3>
                <div className="space-y-3">
                  {ann.comments.map(comment => (
                    <div key={comment.id} className="bg-neutral-bgLight/50 dark:bg-neutral-bgDark/50 p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-primary-DEFAULT/20 flex items-center justify-center">
                          <span className="text-xs">{comment.authorName.charAt(0)}</span>
                        </div>
                        <p className="text-xs font-medium">{comment.authorName}</p>
                        <span className="text-xs text-gray-500">•</span>
                        <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</p>
                      </div>
                      <p className="text-sm text-neutral-textDark dark:text-neutral-textLight">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    {/* Modal de creación de anuncios */}
    {isCreateModalOpen && (
      <Modal
        isOpen={isCreateModalOpen}
        title="Crear Nuevo Anuncio"
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
      >
        <div className="space-y-4 p-1">
          <div>
            <label htmlFor="announcement-title" className="block text-sm font-medium text-neutral-textDark dark:text-neutral-textLight mb-1">Título</label>
            <input
              type="text"
              id="announcement-title"
              value={newAnnouncementTitle}
              onChange={(e) => setNewAnnouncementTitle(e.target.value)}
              className="w-full p-2 border rounded text-neutral-textDark dark:text-neutral-textLight bg-neutral-bgLight dark:bg-neutral-bgDark border-neutral-borderLight dark:border-neutral-borderDark focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
              placeholder="Título del anuncio"
            />
          </div>
          <div>
            <label htmlFor="announcement-content" className="block text-sm font-medium text-neutral-textDark dark:text-neutral-textLight mb-1">Contenido</label>
            <textarea
              id="announcement-content"
              value={newAnnouncementContent}
              onChange={(e) => setNewAnnouncementContent(e.target.value)}
              rows={5}
              className="w-full p-2 border rounded text-neutral-textDark dark:text-neutral-textLight bg-neutral-bgLight dark:bg-neutral-bgDark border-neutral-borderLight dark:border-neutral-borderDark focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
              placeholder="Escribe aquí el contenido del anuncio..."
            />
          </div>
          {currentUser?.role === UserRole.ADMIN && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isOfficial"
                checked={isOfficial}
                onChange={(e) => setIsOfficial(e.target.checked)}
                className="mr-2 h-4 w-4 text-primary-DEFAULT focus:ring-primary-DEFAULT border-neutral-borderLight dark:border-neutral-borderDark rounded"
              />
              <label htmlFor="isOfficial" className="text-sm text-neutral-textDark dark:text-neutral-textLight">Marcar como anuncio oficial</label>
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateAnnouncement}
              disabled={!newAnnouncementTitle.trim() || !newAnnouncementContent.trim()}
            >
              Publicar Anuncio
            </Button>
          </div>
        </div>
      </Modal>
    )}
  </div>
);
};

export default AnnouncementsPage;

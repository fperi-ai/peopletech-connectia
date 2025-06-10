
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import Avatar from '../shared/Avatar';
import Button from '../shared/Button';
import Icon from '../shared/Icon';

interface PostComposerProps {
  onCreatePost: (content: string, imageUrl?: string, teamId?: string) => void;
  currentUser: User;
  teamId?: string; 
  teamName?: string;
  glassmorphic?: boolean;
}

const PostComposer: React.FC<PostComposerProps> = ({ onCreatePost, currentUser, teamId, teamName, glassmorphic = true }) => {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || imagePreview) {
      onCreatePost(content.trim(), imagePreview || undefined, teamId);
      setContent('');
      setImagePreview(null);
      setIsExpanded(false);
      if(fileInputRef.current) fileInputRef.current.value = ""; 
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsExpanded(true); 
    }
  };

  const handleMemeGenerator = () => {
    navigate('/meme-generator');
  }

  const placeholderText = teamName 
    ? `Escribe algo para tus compañeros de ${teamName}...` 
    : "¿Qué te gustaría compartir hoy?";

  return (
    <div className={`${glassmorphic ? 'glass-card backdrop-blur-md bg-white/20 dark:bg-neutral-bgDark/30 border border-white/20 dark:border-white/10' : 'bg-card-light dark:bg-card-dark'} p-4 rounded-lg shadow-md mb-6`}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <Avatar src={currentUser.avatar} alt={currentUser.name} />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder={placeholderText}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent outline-none resize-none text-neutral-textDark dark:text-neutral-textLight min-h-[40px] data-[expanded=true]:min-h-[80px] transition-all ${glassmorphic ? 'glass-input border-white/20 dark:border-white/10 bg-white/10 dark:bg-neutral-bgDark/20 backdrop-blur-sm' : 'border-neutral-borderLight dark:border-neutral-borderDark bg-neutral-bgLight dark:bg-neutral-bgDark'}`}
            rows={isExpanded ? 3 : 1}
            data-expanded={isExpanded}
            aria-label={placeholderText}
          />
        </div>

        {imagePreview && isExpanded && (
          <div className="mt-3 relative">
            <img src={imagePreview} alt="Preview" className={`max-h-60 rounded-md object-contain border ${glassmorphic ? 'border-white/20 dark:border-white/10' : 'border-neutral-borderLight dark:border-neutral-borderDark'}`} />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                if(fileInputRef.current) fileInputRef.current.value = "";
              }}
              className={`absolute top-1 right-1 ${glassmorphic ? 'bg-black/40 backdrop-blur-sm' : 'bg-black/60'} text-white rounded-full p-0.5 leading-none focus:outline-none focus:ring-2 focus:ring-neutral-bgLight`}
              aria-label="Quitar imagen"
            >
              <Icon name="close" className="w-4 h-4" glassmorphic={glassmorphic} />
            </button>
          </div>
        )}

        {isExpanded && (
            <div className="mt-3 flex justify-between items-center">
            <div className="flex space-x-2">
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => fileInputRef.current?.click()}
                    leftIcon={<Icon name="photo" className="w-4 h-4" glassmorphic={glassmorphic} />}
                    aria-label="Añadir imagen"
                    glassmorphic={glassmorphic}
                >
                    Imagen
                </Button>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleMemeGenerator}
                    leftIcon={<Icon name="face-smile" className="w-4 h-4" glassmorphic={glassmorphic} />}
                    aria-label="Generar meme con IA"
                    glassmorphic={glassmorphic}
                >
                    Meme IA
                </Button>
            </div>
            <Button 
                type="submit" 
                size="sm" 
                disabled={!content.trim() && !imagePreview}
                glassmorphic={glassmorphic}
            >
                Publicar
            </Button>
            </div>
        )}
      </form>
    </div>
  );
};

export default PostComposer;
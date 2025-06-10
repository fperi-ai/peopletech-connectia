
import React, { useState } from 'react';
import { Post, User, Comment as CommentType } from '../../types';
import Avatar from '../shared/Avatar';
import Button from '../shared/Button';
import Icon from '../shared/Icon';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { AVAILABLE_REACTIONS } from '../../constants';

interface PostCardProps {
  post: Post;
  currentUser: User | null;
  onUpdatePost: (updatedPost: Post) => void;
  onDeletePost: (postId: string) => void;
  glassmorphic?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onUpdatePost, onDeletePost, glassmorphic = true }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingPost, setEditingPost] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale: es });

  const handleReaction = (emoji: string) => {
    if (!currentUser) return;
    const updatedReactions = { ...post.reactions };
    if (updatedReactions[emoji]?.includes(currentUser.id)) {
      updatedReactions[emoji] = updatedReactions[emoji].filter(id => id !== currentUser.id);
      if(updatedReactions[emoji].length === 0) delete updatedReactions[emoji];
    } else {
      updatedReactions[emoji] = [...(updatedReactions[emoji] || []), currentUser.id];
    }
    onUpdatePost({ ...post, reactions: updatedReactions });
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;
    const comment: CommentType = {
      id: `comment-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: newComment.trim(),
      timestamp: Date.now(),
    };
    onUpdatePost({ ...post, comments: [...post.comments, comment] });
    setNewComment('');
  };

  const handleEditPost = () => {
    onUpdatePost({ ...post, content: editedContent });
    setEditingPost(false);
  };

  const isAuthorOrAdmin = currentUser && (currentUser.id === post.authorId || currentUser.role === 'Admin');

  return (
    <div className={`${glassmorphic ? 'glass-card backdrop-blur-md bg-white/20 dark:bg-neutral-bgDark/30 border border-white/20 dark:border-white/10' : 'bg-card-light dark:bg-card-dark'} shadow-lg rounded-xl overflow-hidden p-5 transition-all hover:shadow-xl`}>
      <div className="flex items-start space-x-3 mb-3">
        <Avatar src={post.authorAvatar} alt={post.authorName} />
        <div>
          <p className="font-semibold text-neutral-textDark dark:text-neutral-textLight">{post.authorName} 
            {post.authorRole && <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({post.authorRole})</span>}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
        </div>
        {isAuthorOrAdmin && (
            <div className="ml-auto relative">
                {/* Consider replacing '...' with an actual Icon for options menu */}
                <Button variant="ghost" size="sm" onClick={() => setEditingPost(true)} className="px-2 py-1 text-neutral-textDark dark:text-neutral-textLight hover:bg-neutral-textDark/5 dark:hover:bg-neutral-textLight/5">...</Button>
            </div>
        )}
      </div>

      {editingPost ? (
        <div className="mb-3">
            <textarea 
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className={`w-full p-2 border rounded-md text-neutral-textDark dark:text-neutral-textLight focus:ring-primary-DEFAULT focus:border-primary-DEFAULT ${glassmorphic ? 'glass-input border-white/20 dark:border-white/10 bg-white/10 dark:bg-neutral-bgDark/20' : 'border-neutral-borderLight dark:border-neutral-borderDark bg-neutral-bgLight dark:bg-neutral-bgDark'}`}
                rows={3}
            />
            <div className="mt-2 space-x-2">
                <Button size="sm" onClick={handleEditPost}>Guardar</Button>
                <Button size="sm" variant="secondary" onClick={() => { setEditingPost(false); setEditedContent(post.content);}}>Cancelar</Button>
                <Button size="sm" variant="danger" onClick={() => {onDeletePost(post.id); setEditingPost(false);}}>Eliminar Post</Button>
            </div>
        </div>
      ) : (
        <p className="text-neutral-textDark dark:text-neutral-textLight mb-3 whitespace-pre-wrap">{post.content}</p>
      )}


      {post.imageUrl && !editingPost && (
        <div className="mb-3 rounded-lg overflow-hidden border border-neutral-borderLight dark:border-neutral-borderDark">
          <img src={post.imageUrl} alt="Post image" className="w-full object-cover max-h-[400px]" />
        </div>
      )}
      {post.isAiGenerated && <span className="text-xs bg-accent-DEFAULT/20 text-accent-dark dark:text-accent-light px-2 py-0.5 rounded-full mb-2 inline-block">Creado con IA ✨</span>}
      {post.isCorporate && <span className="text-xs bg-primary-DEFAULT/20 text-primary-dark dark:text-primary-light px-2 py-0.5 rounded-full mb-2 inline-block">Anuncio Corporativo 📢</span>}


      <div className={`flex items-center space-x-2 mb-3 pt-2 border-t ${glassmorphic ? 'border-white/10 dark:border-white/5' : 'border-neutral-borderLight dark:border-neutral-borderDark'}`}>
        {AVAILABLE_REACTIONS.map(emoji => (
            <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className={`p-1.5 rounded-full text-lg transition-transform hover:scale-125 ${glassmorphic ? 'hover:bg-white/20 dark:hover:bg-white/10' : 'hover:bg-neutral-textDark/10 dark:hover:bg-neutral-textLight/10'} 
                ${post.reactions[emoji]?.includes(currentUser?.id || '') ? (glassmorphic ? 'bg-primary-DEFAULT/30 dark:bg-primary-light/20 shadow-glass-sm' : 'bg-primary-DEFAULT/20 dark:bg-primary-dark/30') : ''}`}
                title={`Reaccionar con ${emoji}`}
            >
                {emoji} <span className="text-xs ml-0.5">{post.reactions[emoji]?.length || 0}</span>
            </button>
        ))}
        <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="ml-auto text-neutral-textDark dark:text-neutral-textLight">
          Comentarios ({post.comments.length})
        </Button>
      </div>

      {showComments && (
        <div className={`pt-3 border-t ${glassmorphic ? 'border-white/10 dark:border-white/5' : 'border-neutral-borderLight dark:border-neutral-borderDark'}`}>
          {post.comments.map(comment => (
            <div key={comment.id} className={`flex items-start space-x-2 mb-3 p-2 rounded-md ${glassmorphic ? 'glass-comment bg-white/10 dark:bg-white/5 backdrop-blur-sm' : 'bg-neutral-bgLight/50 dark:bg-neutral-bgDark/30'}`}>
              <Avatar src={comment.authorAvatar} alt={comment.authorName} size="sm" />
              <div>
                <span className="font-semibold text-sm text-neutral-textDark dark:text-neutral-textLight">{comment.authorName}</span>
                <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{comment.content}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true, locale: es })}
                </p>
              </div>
            </div>
          ))}
          {currentUser && (
            <form onSubmit={handleAddComment} className="flex items-center space-x-2 mt-2">
              <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-neutral-textDark dark:text-neutral-textLight ${glassmorphic ? 'glass-input border-white/20 dark:border-white/10 bg-white/10 dark:bg-neutral-bgDark/20' : 'border-neutral-borderLight dark:border-neutral-borderDark bg-neutral-bgLight dark:bg-neutral-bgDark'}`}
              />
              <Button type="submit" size="sm" disabled={!newComment.trim()}>Enviar</Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
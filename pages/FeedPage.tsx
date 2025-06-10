
import React, { useState, useEffect } from 'react';
import PostCard from '../components/feed/PostCard';
import PostComposer from '../components/feed/PostComposer';
import { Post, User } from '../types';
import { INITIAL_POSTS, DEMO_USERS, AI_ASSISTANT_NAME, CONNIE_QUOTES } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/shared/Button';
import Icon from '../components/shared/Icon';

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => INITIAL_POSTS.filter(p => !p.teamId));
  const [showNewPostsIndicator, setShowNewPostsIndicator] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && !showNewPostsIndicator) { 
        setShowNewPostsIndicator(true);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [showNewPostsIndicator]);
  
  const handleCreatePost = (newPostContent: string, imageUrl?: string) => { 
    if (!currentUser) return;
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      content: newPostContent,
      imageUrl,
      timestamp: Date.now(),
      reactions: {},
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setShowNewPostsIndicator(false);
  };

  const handleRefreshFeed = () => {
    setPosts(prevPosts => INITIAL_POSTS.filter(p => !p.teamId).sort(() => Math.random() - 0.5));
    setShowNewPostsIndicator(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {showNewPostsIndicator && (
        <div className="mb-4 p-3 bg-primary-DEFAULT/20 text-primary-dark dark:text-primary-light border border-primary-DEFAULT rounded-md flex justify-between items-center">
          <span>Nuevas publicaciones disponibles.</span>
          <Button onClick={handleRefreshFeed} variant="ghost" size="sm">Refrescar</Button>
        </div>
      )}

      {currentUser && <PostComposer onCreatePost={handleCreatePost} currentUser={currentUser} />}
      
      {posts.length === 0 && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <Icon name="face-smile" className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Parece un poco silencioso en el feed global...</p>
          <p className="text-sm">¡Comparte algo para iniciar la conversación! 🤔</p>
        </div>
      )}

      <div className="space-y-6 mt-6">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            currentUser={currentUser} 
            onUpdatePost={(updatedPost) => {
              setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
            }}
            onDeletePost={(postId) => {
               setPosts(posts.filter(p => p.id !== postId));
            }}
          />
        ))}
      </div>

      {posts.length > 0 && (
         <div className="text-center py-10 mt-8 text-gray-500 dark:text-gray-400 border-t border-neutral-borderLight dark:border-neutral-borderDark">
          <Icon name="robot" className="w-10 h-10 mx-auto mb-3 opacity-70" />
          <p className="text-sm">
            {AI_ASSISTANT_NAME} dice: "{CONNIE_QUOTES[Math.floor(Math.random() * CONNIE_QUOTES.length)]}"
          </p>
          { posts.length > 5 && <p className="text-xs mt-1">Has llegado al final del feed global... ¡por ahora!</p>}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
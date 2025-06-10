import React, { useState, useEffect } from 'react';
import PostCard from '../components/feed/PostCard';
import PostComposer from '../components/feed/PostComposer';
import { Post } from '../types';
import { INITIAL_POSTS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/shared/Button';
import Icon from '../components/shared/Icon';
import { FeedSidebar } from '../components/feed/sidebar/FeedSidebar';

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
    setPosts(INITIAL_POSTS.filter(p => !p.teamId).sort(() => Math.random() - 0.5));
    setShowNewPostsIndicator(false);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 pb-32 relative">
      <FeedSidebar />
      <div className="lg:pr-80 transition-all duration-300">
        <div className="my-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center">
            Feed <Icon name="home" className="ml-2 w-7 h-7" />
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Descubre publicaciones y actualizaciones de tu red</p>
        </div>
        {showNewPostsIndicator && (
          <div className="mb-4 p-4 bg-blue-600 dark:bg-blue-500 text-white shadow-lg rounded-lg flex justify-between items-center animate-pulse transform hover:scale-[1.01] transition-all">
            <span className="flex items-center font-bold">
              <Icon name="bell" className="w-5 h-5 mr-2" /> ¡Nuevas publicaciones disponibles!
            </span>
            <Button onClick={handleRefreshFeed} variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-700 dark:hover:bg-white font-bold">Refrescar</Button>
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

        {posts.length > 5 && (
          <div className="text-center py-8 mt-6 text-gray-500 dark:text-gray-400 border-t border-neutral-borderLight dark:border-neutral-borderDark">
            <p className="text-xs">Has llegado al final del feed global... ¡por ahora!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
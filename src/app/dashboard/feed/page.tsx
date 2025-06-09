"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { feedService, Post } from "@/services/feed-service";
import { CreatePostForm } from "@/components/feed/CreatePostForm";
import { PostCard } from "@/components/feed/PostCard";

export default function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Cargar posts al montar el componente
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await feedService.getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Manejar la creación de un nuevo post
  const handleCreatePost = async (content: string, isAnnouncement: boolean, images?: string[]) => {
    if (!user) return;

    try {
      setIsCreatingPost(true);
      const newPost = await feedService.createPost(content, user.id, isAnnouncement, images);
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error("Error al crear el post:", error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  // Manejar el like de un post
  const handleLikePost = async (postId: string) => {
    try {
      await feedService.likePost(postId);
      // No actualizamos el estado aquí porque el componente PostCard maneja su propio estado de likes
    } catch (error) {
      console.error("Error al dar like al post:", error);
    }
  };

  // Manejar el comentario en un post
  const handleCommentPost = async (postId: string, content: string) => {
    if (!user) return;

    try {
      const newComment = await feedService.commentOnPost(postId, content, user.id);
      
      // Actualizar el estado de los posts para incluir el nuevo comentario
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error al comentar en el post:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-6">
      <h1 className="mb-6 text-2xl font-bold">Feed Principal</h1>

      {/* Formulario para crear posts */}
      <div className="mb-6">
        <CreatePostForm onSubmit={handleCreatePost} isLoading={isCreatingPost} />
      </div>

      {/* Lista de posts */}
      <div className="space-y-6">
        {isLoading ? (
          // Estado de carga
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-lg">Cargando publicaciones...</p>
            </div>
          </div>
        ) : posts.length > 0 ? (
          // Mostrar posts
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLikePost}
              onComment={handleCommentPost}
            />
          ))
        ) : (
          // No hay posts
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-lg font-medium">No hay publicaciones aún</p>
            <p className="mt-2 text-muted-foreground">
              ¡Sé el primero en compartir algo con tus compañeros!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

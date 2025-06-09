"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { feedService, Post } from "@/services/feed-service";
import { CreatePostForm } from "@/components/feed/CreatePostForm";
import { PostCard } from "@/components/feed/PostCard";

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);

  // Verificar si el usuario puede crear anuncios
  const canCreateAnnouncement = user?.role === "admin" || user?.role === "manager";

  // Cargar anuncios al montar el componente
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setIsLoading(true);
        const fetchedAnnouncements = await feedService.getAnnouncements();
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        console.error("Error al cargar los anuncios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  // Manejar la creación de un nuevo anuncio
  const handleCreateAnnouncement = async (content: string, isAnnouncement: boolean = true, images?: string[]) => {
    if (!user || !canCreateAnnouncement) return;

    try {
      setIsCreatingAnnouncement(true);
      const newAnnouncement = await feedService.createPost(content, user.id, true, images);
      setAnnouncements([newAnnouncement, ...announcements]);
    } catch (error) {
      console.error("Error al crear el anuncio:", error);
    } finally {
      setIsCreatingAnnouncement(false);
    }
  };

  // Manejar el like de un anuncio
  const handleLikeAnnouncement = async (postId: string) => {
    try {
      await feedService.likePost(postId);
    } catch (error) {
      console.error("Error al dar like al anuncio:", error);
    }
  };

  // Manejar el comentario en un anuncio
  const handleCommentAnnouncement = async (postId: string, content: string) => {
    if (!user) return;

    try {
      const newComment = await feedService.commentOnPost(postId, content, user.id);
      
      // Actualizar el estado de los anuncios para incluir el nuevo comentario
      setAnnouncements(
        announcements.map((announcement) => {
          if (announcement.id === postId) {
            return {
              ...announcement,
              comments: [...announcement.comments, newComment],
            };
          }
          return announcement;
        })
      );
    } catch (error) {
      console.error("Error al comentar en el anuncio:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-6">
      <h1 className="mb-6 text-2xl font-bold">Anuncios Corporativos</h1>

      {/* Formulario para crear anuncios (solo para admin y manager) */}
      {canCreateAnnouncement && (
        <div className="mb-6">
          <CreatePostForm 
            onSubmit={handleCreateAnnouncement} 
            isLoading={isCreatingAnnouncement} 
          />
        </div>
      )}

      {/* Lista de anuncios */}
      <div className="space-y-6">
        {isLoading ? (
          // Estado de carga
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-lg">Cargando anuncios...</p>
            </div>
          </div>
        ) : announcements.length > 0 ? (
          // Mostrar anuncios
          announcements.map((announcement) => (
            <PostCard
              key={announcement.id}
              post={announcement}
              onLike={handleLikeAnnouncement}
              onComment={handleCommentAnnouncement}
            />
          ))
        ) : (
          // No hay anuncios
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-lg font-medium">No hay anuncios corporativos</p>
            <p className="mt-2 text-muted-foreground">
              Los anuncios importantes aparecerán aquí.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

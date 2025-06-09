"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Heart, MessageSquare, Share2, MoreHorizontal } from "lucide-react";
import { Post, Comment } from "@/services/feed-service";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, content: string) => void;
}

export function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localLikes, setLocalLikes] = useState(post.likes);

  const handleLike = () => {
    if (onLike) {
      onLike(post.id);
    }
    
    if (!isLiked) {
      setLocalLikes(prev => prev + 1);
    } else {
      setLocalLikes(prev => Math.max(0, prev - 1));
    }
    
    setIsLiked(!isLiked);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (commentText.trim() && onComment) {
      onComment(post.id, commentText);
      setCommentText("");
    }
  };

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <div className={cn(
      "rounded-lg border bg-card p-4 shadow-sm",
      post.isAnnouncement && "border-primary/30 bg-primary/5"
    )}>
      {/* Cabecera del post */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-muted">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                <span className="text-lg font-medium">
                  {post.author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <p className="font-medium">{post.author.name}</p>
              {post.isAnnouncement && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  Anuncio
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {post.author.role === "admin" 
                ? "Administrador" 
                : post.author.role === "manager" 
                ? "Manager" 
                : "Empleado"} · {formattedDate}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Más opciones">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Contenido del post */}
      <div className="mb-4">
        <p className="whitespace-pre-line text-sm">{post.content}</p>
      </div>

      {/* Imágenes del post */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4 overflow-hidden rounded-md">
          <Image
            src={post.images[0]}
            alt="Imagen adjunta"
            width={600}
            height={400}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Estadísticas e interacciones */}
      <div className="mb-2 flex items-center justify-between border-b pb-2 text-xs text-muted-foreground">
        <div>{localLikes} me gusta</div>
        <div>{post.comments.length} comentarios</div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between border-b pb-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex-1",
            isLiked && "text-red-500"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("mr-1 h-4 w-4", isLiked && "fill-current")} />
          Me gusta
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="mr-1 h-4 w-4" />
          Comentar
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <Share2 className="mr-1 h-4 w-4" />
          Compartir
        </Button>
      </div>

      {/* Sección de comentarios */}
      {showComments && (
        <div className="mt-3">
          {/* Formulario para nuevo comentario */}
          <form onSubmit={handleSubmitComment} className="mb-3 flex">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button 
              type="submit" 
              disabled={!commentText.trim()}
              className="rounded-l-none"
            >
              Enviar
            </Button>
          </form>

          {/* Lista de comentarios */}
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <div className="rounded-md bg-muted/50 p-3">
      <div className="mb-1 flex items-center">
        <div className="mr-2 h-6 w-6 overflow-hidden rounded-full bg-muted">
          {comment.author.avatar ? (
            <Image
              src={comment.author.avatar}
              alt={comment.author.name}
              width={24}
              height={24}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
              <span className="text-xs font-medium">
                {comment.author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-medium">{comment.author.name}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <p className="text-sm">{comment.content}</p>
      <div className="mt-1 flex items-center space-x-2 text-xs text-muted-foreground">
        <button className="hover:text-foreground">Me gusta ({comment.likes})</button>
        <button className="hover:text-foreground">Responder</button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Image, Smile, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

// Esquema de validación para el formulario
const postSchema = z.object({
  content: z
    .string()
    .min(1, "El contenido no puede estar vacío")
    .max(500, "El contenido no puede exceder los 500 caracteres"),
});

type PostFormValues = z.infer<typeof postSchema>;

interface CreatePostFormProps {
  onSubmit: (content: string, isAnnouncement: boolean, images?: string[]) => Promise<void>;
  isLoading?: boolean;
}

export function CreatePostForm({ onSubmit, isLoading = false }: CreatePostFormProps) {
  const { user } = useAuth();
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
    },
  });

  // Función para manejar la selección de imágenes
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // En una aplicación real, aquí subiríamos las imágenes a un servidor
    // y obtendríamos las URLs. Para esta demo, usamos URLs ficticias.
    const newImages = Array.from(files).map(
      (_, index) => `/images/mock-upload-${Date.now()}-${index}.jpg`
    );
    
    setSelectedImages([...selectedImages, ...newImages]);
  };

  // Función para eliminar una imagen seleccionada
  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (data: PostFormValues) => {
    try {
      await onSubmit(data.content, isAnnouncement, selectedImages.length > 0 ? selectedImages : undefined);
      reset();
      setSelectedImages([]);
      setIsAnnouncement(false);
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };

  // Verificar si el usuario puede crear anuncios (solo admin y manager)
  const canCreateAnnouncement = user?.role === "admin" || user?.role === "manager";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="rounded-lg border bg-card p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center">
        <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-primary">
          <div className="flex h-full w-full items-center justify-center text-primary-foreground">
            <span className="text-lg font-medium">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
        </div>
        <p className="font-medium">{user?.name}</p>
      </div>

      <div className="mb-3">
        <textarea
          {...register("content")}
          placeholder="¿Qué quieres compartir hoy?"
          className="min-h-[100px] w-full resize-none rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        {errors.content && (
          <p className="mt-1 text-xs text-destructive">{errors.content.message}</p>
        )}
      </div>

      {/* Previsualización de imágenes seleccionadas */}
      {selectedImages.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative h-24 rounded-md bg-muted">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <Image className="h-8 w-8" />
                <span className="ml-2 text-xs">Imagen {index + 1}</span>
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-1 top-1 rounded-full bg-background p-1 shadow-sm hover:bg-muted"
                aria-label="Eliminar imagen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="image-upload"
            className="flex cursor-pointer items-center rounded-md p-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Image className="mr-1 h-5 w-5" />
            <span>Imagen</span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
          <button
            type="button"
            className="flex items-center rounded-md p-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Smile className="mr-1 h-5 w-5" />
            <span>Emoji</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Opción para crear anuncio (solo para admin y manager) */}
          {canCreateAnnouncement && (
            <label className="flex cursor-pointer items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={isAnnouncement}
                onChange={(e) => setIsAnnouncement(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>Publicar como anuncio</span>
            </label>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </div>
    </form>
  );
}

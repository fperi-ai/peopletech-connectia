"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Mail, Phone, Calendar, Briefcase } from "lucide-react";
import { PostCard } from "@/components/feed/PostCard";
import { feedService, Post } from "@/services/feed-service";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "teams">("posts");
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // En una aplicación real, cargaríamos los posts del usuario desde el servidor
  // Para esta demo, usamos datos mock
  const loadUserPosts = async () => {
    setIsLoading(true);
    try {
      // Simulamos la carga de posts del usuario actual
      const allPosts = await feedService.getPosts();
      const filteredPosts = allPosts.filter(post => post.author.id === user?.id);
      setUserPosts(filteredPosts);
    } catch (error) {
      console.error("Error al cargar los posts del usuario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar posts del usuario al cambiar a la pestaña de posts
  const handleTabChange = (tab: "posts" | "about" | "teams") => {
    setActiveTab(tab);
    if (tab === "posts" && userPosts.length === 0) {
      loadUserPosts();
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-6">
      {/* Cabecera del perfil */}
      <div className="mb-6 overflow-hidden rounded-lg border bg-card shadow-sm">
        {/* Portada */}
        <div className="relative h-48 bg-gradient-to-r from-primary/20 to-primary/40">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 bg-background/80 hover:bg-background"
          >
            <Edit className="mr-1 h-4 w-4" />
            Cambiar portada
          </Button>
        </div>

        {/* Información principal */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-6 h-32 w-32 overflow-hidden rounded-full border-4 border-background bg-muted">
            <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
              <span className="text-4xl font-medium">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Botón de editar perfil */}
          <div className="flex justify-end pt-4">
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Editar perfil
            </Button>
          </div>

          {/* Nombre y cargo */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">
              {user.role === "admin"
                ? "Administrador"
                : user.role === "manager"
                ? "Manager"
                : "Empleado"} en PeopleTech
            </p>
          </div>

          {/* Información de contacto */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              Madrid, España
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-1 h-4 w-4" />
              {user.email}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="mr-1 h-4 w-4" />
              +34 600 123 456
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Se unió en Junio 2023
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4" />
              Departamento de Tecnología
            </div>
          </div>

          {/* Pestañas */}
          <div className="mt-6 border-b">
            <div className="flex space-x-6">
              <button
                className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                  activeTab === "posts"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => handleTabChange("posts")}
              >
                Publicaciones
              </button>
              <button
                className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                  activeTab === "about"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => handleTabChange("about")}
              >
                Sobre mí
              </button>
              <button
                className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                  activeTab === "teams"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => handleTabChange("teams")}
              >
                Mis equipos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido según la pestaña activa */}
      <div className="mt-6">
        {activeTab === "posts" && (
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="mt-4 text-lg">Cargando publicaciones...</p>
                </div>
              </div>
            ) : userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="rounded-lg border bg-card p-8 text-center">
                <p className="text-lg font-medium">No hay publicaciones aún</p>
                <p className="mt-2 text-muted-foreground">
                  Tus publicaciones aparecerán aquí.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Sobre mí</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">Biografía</h3>
                <p className="text-muted-foreground">
                  Profesional apasionado por la tecnología y la innovación. Especializado en desarrollo web y experiencia de usuario.
                </p>
              </div>
              
              <div>
                <h3 className="mb-2 text-lg font-medium">Experiencia</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Desarrollador Senior - PeopleTech</p>
                    <p className="text-sm text-muted-foreground">Junio 2023 - Presente</p>
                    <p className="mt-1 text-sm">
                      Desarrollo de aplicaciones web y móviles para mejorar la experiencia de los empleados.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Desarrollador Frontend - Empresa Anterior</p>
                    <p className="text-sm text-muted-foreground">Enero 2020 - Mayo 2023</p>
                    <p className="mt-1 text-sm">
                      Implementación de interfaces de usuario y mejora de la experiencia de usuario.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 text-lg font-medium">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">React</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Next.js</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">TypeScript</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Tailwind CSS</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">UI/UX</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Accesibilidad Web</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "teams" && (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Mis equipos</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <h3 className="font-medium">Equipo de Desarrollo Frontend</h3>
                <p className="mt-1 text-sm text-muted-foreground">12 miembros</p>
                <div className="mt-3 flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-primary">
                      <div className="flex h-full w-full items-center justify-center text-xs text-primary-foreground">
                        U{i}
                      </div>
                    </div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                    +8
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <h3 className="font-medium">Innovación Digital</h3>
                <p className="mt-1 text-sm text-muted-foreground">8 miembros</p>
                <div className="mt-3 flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-primary">
                      <div className="flex h-full w-full items-center justify-center text-xs text-primary-foreground">
                        U{i}
                      </div>
                    </div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                    +5
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

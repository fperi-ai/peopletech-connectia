"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { 
  Bell, 
  Menu, 
  Moon, 
  Search, 
  Sun, 
  User, 
  LogOut,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { AIAssistantModal } from "@/components/auth/AIAssistantModal";
import { AccessibilityPanel } from "@/components/auth/AccessibilityPanel";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo y título */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/feed" className="flex items-center space-x-2">
            <span className="hidden text-xl font-bold text-primary sm:inline-block">
              PeopleTech ConnectIA
            </span>
            <span className="text-xl font-bold text-primary sm:hidden">
              PT ConnectIA
            </span>
          </Link>
        </div>

        {/* Barra de búsqueda - solo visible en pantallas medianas y grandes */}
        <div className="hidden max-w-md flex-1 px-4 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar en ConnectIA..."
              className="w-full rounded-full border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        {/* Acciones y perfil */}
        <div className="flex items-center space-x-1">
          {/* Botón de búsqueda móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Botón de asistente IA */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAIAssistant(true)}
            aria-label="Asistente IA"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Botón de notificaciones */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          {/* Botón de tema */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Botón de accesibilidad */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
            aria-label="Opciones de accesibilidad"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"></path>
            </svg>
          </Button>

          {/* Menú de usuario */}
          <div className="relative ml-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Menú de usuario"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Menú desplegable de usuario - simplificado para este ejemplo */}
            <div className="absolute right-0 mt-2 hidden w-48 rounded-md border bg-background p-2 shadow-lg">
              <div className="border-b pb-2 pt-1">
                <p className="px-3 text-sm font-medium">{user?.name}</p>
                <p className="px-3 text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Link
                href="/profile"
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                Mi perfil
              </Link>
              <button
                onClick={() => logout()}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm text-red-500 hover:bg-muted"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de notificaciones - simplificado para este ejemplo */}
      {showNotifications && (
        <div className="absolute right-4 top-16 w-80 rounded-md border bg-background p-2 shadow-lg">
          <h3 className="mb-2 px-3 text-sm font-medium">Notificaciones</h3>
          <div className="space-y-1">
            <div className="rounded-md p-3 hover:bg-muted">
              <p className="text-sm">Mario Manager ha comentado en tu publicación</p>
              <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
            </div>
            <div className="rounded-md p-3 hover:bg-muted">
              <p className="text-sm">Has sido añadido al equipo "Innovación Digital"</p>
              <p className="text-xs text-muted-foreground">Hace 2 horas</p>
            </div>
            <div className="rounded-md p-3 hover:bg-muted">
              <p className="text-sm">Nuevo anuncio corporativo disponible</p>
              <p className="text-xs text-muted-foreground">Hace 1 día</p>
            </div>
          </div>
          <div className="mt-2 border-t pt-2">
            <Link
              href="/notifications"
              className="block rounded-md px-3 py-2 text-center text-sm text-primary hover:bg-muted"
            >
              Ver todas las notificaciones
            </Link>
          </div>
        </div>
      )}

      {/* Modales */}
      {showAIAssistant && (
        <AIAssistantModal onClose={() => setShowAIAssistant(false)} />
      )}

      {/* Panel de accesibilidad */}
      {showAccessibilityPanel && (
        <AccessibilityPanel onClose={() => setShowAccessibilityPanel(false)} />
      )}
    </header>
  );
}

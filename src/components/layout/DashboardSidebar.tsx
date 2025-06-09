"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Award, 
  Image, 
  User, 
  Megaphone,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onClick?: () => void;
}

function NavItem({ 
  href, 
  icon, 
  label, 
  isActive, 
  hasSubmenu = false,
  isSubmenuOpen = false,
  onClick 
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-foreground hover:bg-muted"
      )}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span className="flex-1">{label}</span>
      {hasSubmenu && (
        <span className="ml-2">
          {isSubmenuOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      )}
    </Link>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    teams: false,
  });

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager" || isAdmin;

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-3">
          <nav className="space-y-1">
            {/* Feed principal */}
            <NavItem
              href="/feed"
              icon={<Home className="h-5 w-5" />}
              label="Feed principal"
              isActive={pathname === "/feed"}
            />

            {/* Anuncios corporativos - visible para todos */}
            <NavItem
              href="/feed/announcements"
              icon={<Megaphone className="h-5 w-5" />}
              label="Anuncios corporativos"
              isActive={pathname === "/feed/announcements"}
            />

            {/* Equipos */}
            <div>
              <NavItem
                href="#"
                icon={<Users className="h-5 w-5" />}
                label="Equipos"
                isActive={pathname.startsWith("/teams")}
                hasSubmenu={true}
                isSubmenuOpen={openSubmenus.teams}
                onClick={() => toggleSubmenu("teams")}
              />
              
              {openSubmenus.teams && (
                <div className="ml-9 mt-1 space-y-1">
                  <Link
                    href="/teams"
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm",
                      pathname === "/teams"
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    Mis equipos
                  </Link>
                  <Link
                    href="/teams/discover"
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm",
                      pathname === "/teams/discover"
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    Descubrir equipos
                  </Link>
                  
                  {/* Opción solo para managers y admins */}
                  {isManager && (
                    <Link
                      href="/teams/manage"
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm",
                        pathname === "/teams/manage"
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      Gestionar equipos
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Retos */}
            <NavItem
              href="/challenges"
              icon={<Award className="h-5 w-5" />}
              label="Retos ConnectIA"
              isActive={pathname.startsWith("/challenges")}
            />

            {/* Generador de memes */}
            <NavItem
              href="/meme-generator"
              icon={<Image className="h-5 w-5" />}
              label="Generador de memes"
              isActive={pathname.startsWith("/meme-generator")}
            />

            {/* Mi perfil */}
            <NavItem
              href="/profile"
              icon={<User className="h-5 w-5" />}
              label="Mi perfil"
              isActive={pathname.startsWith("/profile")}
            />
          </nav>

          {/* Sección de administración - solo visible para admins */}
          {isAdmin && (
            <div className="mt-8">
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                Administración
              </h3>
              <nav className="space-y-1">
                <NavItem
                  href="/admin/users"
                  icon={<Users className="h-5 w-5" />}
                  label="Gestionar usuarios"
                  isActive={pathname === "/admin/users"}
                />
                <NavItem
                  href="/admin/content"
                  icon={<Megaphone className="h-5 w-5" />}
                  label="Moderar contenido"
                  isActive={pathname === "/admin/content"}
                />
              </nav>
            </div>
          )}
        </div>

        {/* Información del usuario en la parte inferior */}
        <div className="border-t p-4">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-lg font-medium">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">
                {user?.role === "admin"
                  ? "Administrador"
                  : user?.role === "manager"
                  ? "Manager"
                  : "Empleado"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

import { Logo } from "../ui/logo";
import { useAuth } from "../../hooks/auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { demoUsers } from "../../services/auth-service";

// Esquema de validación simplificado
const loginSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormValues = z.infer<typeof loginSchema>;

// Interfaz para usuarios demo
interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function CleanLoginForm() {
  // Estados
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberUser, setRememberUser] = useState(true);
  
  // Hooks de Next.js y autenticación
  const router = useRouter();
  const { login } = useAuth();

  // Configuración de React Hook Form con Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Manejar el envío del formulario
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      if (rememberUser) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Adaptamos la llamada según la interfaz esperada
      await login({ email: data.email, password: data.password });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Usar un usuario demo
  const handleDemoUserClick = (user: DemoUser) => {
    setValue("email", user.email);
    setValue("password", "password123"); // Contraseña ficticia para usuarios demo
  };

  // Cargar email recordado al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
          setValue("email", savedEmail);
        }
      } catch (error) {
        console.error("Error al acceder a localStorage:", error);
      }
    }
  }, [setValue]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-900">
      {/* Cabecera con logo */}
      <header className="flex h-16 items-center justify-center border-b bg-white dark:border-gray-800 dark:bg-gray-950">
        <Logo className="h-8 w-auto" />
      </header>

      {/* Contenedor principal */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2">
          {/* Columna izquierda: Ilustración e información */}
          <div className="hidden flex-col justify-center space-y-6 rounded-lg bg-primary-50 p-8 dark:bg-gray-800/50 md:flex">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                  Bienvenido a PeopleTech ConnectIA
                </h1>
                <p className="mb-8 text-gray-600 dark:text-gray-300">
                  La plataforma integral para gestionar todos tus recursos humanos con la
                  potencia de la inteligencia artificial.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha: Formulario de login */}
          <div className="flex flex-col justify-center">
            <div className="mx-auto w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
              <div>
                <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                  Iniciar sesión
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Accede a tu cuenta para continuar
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Campo de email */}
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Campo de contraseña */}
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Contraseña"
                      {...register("password")}
                      className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {isPasswordVisible ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Opciones adicionales */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberUser}
                      onChange={(e) => setRememberUser(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Recordar usuario
                    </label>
                  </div>
                  <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Botón de inicio de sesión */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>

              {/* Sección de usuarios demo */}
              <div className="mt-8">
                <h3 className="mb-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  Acceso rápido con usuarios demo
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {demoUsers.map((user: DemoUser) => (
                    <Button
                      key={user.id}
                      onClick={() => handleDemoUserClick(user)}
                      variant="outline"
                      className="flex flex-col items-center justify-center p-3 text-xs"
                    >
                      <span className="font-medium">{user.name}</span>
                      <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {user.role === "admin"
                          ? "Administrador"
                          : user.role === "manager"
                          ? "Manager"
                          : "Empleado"}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

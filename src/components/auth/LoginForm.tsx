"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, RefreshCcw, Loader2, HelpCircle, Accessibility, Shield, AlertTriangle } from "lucide-react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";

import { Logo } from "../../components/ui/logo";
import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ConnieAssistant } from "../../components/ui/connie-assistant";
import { CollaborationIllustration } from "../../components/ui/collaboration-illustration";
import { ForgotPasswordModal } from "../auth/ForgotPasswordModal";
import { AIAssistantModal } from "../auth/AIAssistantModal";
import { AccessibilityPanel } from "../auth/AccessibilityPanel";
import ClientOnly from "../../components/client-only";

// Importar datos y tipos desde sus respectivos módulos
import { demoUsers, User } from "../../services/auth-service";
import { motivationalPhrases } from "../../data/motivational-phrases";

// Alias de tipo para mantener compatibilidad con el código existente
type DemoUser = User & { password: string };

// Definición de interfaces y tipos
interface AuthResult {
  success: boolean;
  message?: string;
}

// Tipo inferido para los valores del formulario

// Esquema de validación de formulario Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "Formato de email inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

// Tipo inferido para los valores del formulario
type LoginFormValues = z.infer<typeof loginSchema>;

// Constantes para clases de animación
const buttonLoadingClass = "transition-all duration-500 ease-in-out transform";
const inputFocusClass = "transition-all duration-300 ease-in-out focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-teal-400";
const demoCardClass = "transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md";

export function LoginForm() {
  // Referencias para efectos visuales
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Estados del formulario y autenticación
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  // Estados para modales y paneles
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showAIAssistantModal, setShowAIAssistantModal] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  
  // Estado para frases motivacionales
  const [motivationalPhrase, setMotivationalPhrase] = useState<string>("");
  
  // Estados para nuevas funcionalidades
  const [showConfetti, setShowConfetti] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4: muy débil a muy fuerte
  const [rememberUser, setRememberUser] = useState(true);
  const [lastUsedEmail, setLastUsedEmail] = useState<string>("");
  const [confettiWidth, setConfettiWidth] = useState<number>(0);
  const [confettiHeight, setConfettiHeight] = useState<number>(0);
  
  // Hooks de Next.js y autenticación
  const router = useRouter();
  const { login } = useAuth();
  
  // Configuración de React Hook Form con validación Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Observar los valores del formulario para animaciones y validaciones en tiempo real
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setConfettiWidth(window.innerWidth);
        setConfettiHeight(window.innerHeight);
      };

      // Establecer dimensiones iniciales
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  // Calcular la fortaleza de la contraseña cuando cambia
  useEffect(() => {
    if (!watchPassword) {
      setPasswordStrength(0);
      return;
    }
    
    // Criterios para evaluar la fortaleza
    const hasLowerCase = /[a-z]/.test(watchPassword);
    const hasUpperCase = /[A-Z]/.test(watchPassword);
    const hasNumbers = /[0-9]/.test(watchPassword);
    const hasSpecialChars = /[^A-Za-z0-9]/.test(watchPassword);
    const isLongEnough = watchPassword.length >= 8;
    
    // Calcular puntuación (0-4)
    let strength = 0;
    if (hasLowerCase) strength++;
    if (hasUpperCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;
    if (isLongEnough) strength++;
    
    // Ajustar por longitud mínima
    if (watchPassword.length < 6) {
      strength = Math.min(strength, 1);
    }
    
    setPasswordStrength(strength);
  }, [watchPassword]);
  
  // Cargar el último email recordado al iniciar
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      try {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
          setLastUsedEmail(savedEmail);
          setValue("email", savedEmail);
        }
      } catch (error) {
        console.error("Error al acceder a localStorage:", error);
      }
    }
  }, [setValue]);
  
  // Función para obtener una frase motivacional aleatoria
  const getRandomMotivationalPhrase = (): string => {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[randomIndex];
  };

  // Cargar una frase motivacional aleatoria al montar el componente
  useEffect(() => {
    setMotivationalPhrase(getRandomMotivationalPhrase());
  }, []);

  // Cambiar la frase motivacional cada 15 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationalPhrase(getRandomMotivationalPhrase());
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };
  
  // Función para manejar el envío del formulario
  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    try {
      setIsSubmitting(true);
      setError("");
      setLoginAttempts((prev: number) => prev + 1);
      
      const result = await login(data);
      
      if (result.success) {
        // Guardar el email si la opción de recordar está activada
        if (rememberUser) {
          localStorage.setItem('lastUsedEmail', data.email);
        } else {
          localStorage.removeItem('lastUsedEmail');
        }
        
        // Mostrar animación de éxito y confeti
        setLoginSuccess(true);
        setShowConfetti(true);
        
        // Pequeña pausa para mostrar animación de éxito
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000); // Aumentado a 2 segundos para disfrutar del confeti
      } else {
        // Mensajes de error con humor según el número de intentos
        if (loginAttempts >= 3) {
          setError(result.message || "¿Seguro que trabajas aquí? 🤔 Quizás deberías probar con un usuario demo...");
        } else {
          setError(result.message || "Error al iniciar sesión");
        }
      }
    } catch (err) {
      setError("¡Ups! Algo salió mal. Nuestros hamsters que alimentan los servidores deben estar tomando un descanso 🐹");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para usar un usuario demo
  const handleDemoUserClick = (user: DemoUser): void => {
    setValue("email", user.email);
    setValue("password", user.password);
    
    // Pequeña pausa para que el usuario vea cómo se rellenan los campos
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 500);
  };
  
  // Función para cambiar la frase motivacional manualmente
  const handleChangePhrase = (): void => {
    setMotivationalPhrase(getRandomMotivationalPhrase());
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Header con logo */}
      <header className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          <Logo height={40} className="h-10 w-auto" />
        </div>
      </header>

      {/* Contenido principal */}
      <motion.main 
        className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8 md:flex-row md:items-stretch md:py-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Columna informativa */}
        <div className="mb-8 flex w-full flex-col justify-between rounded-lg bg-white/80 p-6 backdrop-blur-sm dark:bg-gray-800/80 md:mb-0 md:w-1/2 md:rounded-r-none md:p-12">
          <div>
            <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Bienvenido a PeopleTech ConnectIA
            </h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              La red social corporativa que conecta a los profesionales de Inditex con el poder de la Inteligencia Artificial.
            </p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Características principales:
              </h2>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                <li>Conecta con compañeros de toda la organización</li>
                <li>Comparte conocimientos y experiencias</li>
                <li>Participa en retos y actividades</li>
                <li>Genera contenido creativo con IA</li>
                <li>Mantente al día de los anuncios corporativos</li>
              </ul>
            </div>
          </div>
          
          {/* Ilustración de colaboración */}
          <div className="mt-8 flex justify-center">
            <CollaborationIllustration className="h-auto w-4/5 max-w-md" />
          </div>
          
          {/* Frase motivacional con Connie */}
          <div className="mt-8 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 p-4 dark:from-teal-900/30 dark:to-cyan-900/30">
            <div className="flex items-start space-x-3">
              <ConnieAssistant message={motivationalPhrase} size="sm" className="flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-teal-800 dark:text-teal-300">Connie dice:</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">"{motivationalPhrase}"</p>
                <button 
                  onClick={handleChangePhrase}
                  className="mt-2 text-xs text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Nueva frase
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna de formulario */}
        <div className="w-full rounded-lg bg-white shadow-xl dark:bg-gray-800 md:w-1/2 md:rounded-l-none">
          <div className="p-6 md:p-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
              Iniciar sesión
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${inputFocusClass} pl-10 ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-400"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    className={`${inputFocusClass} pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Indicador de fortaleza de contraseña */}
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: watchPassword ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex h-1 flex-1 space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <motion.div
                          key={level}
                          className={`h-full flex-1 rounded ${passwordStrength >= level
                            ? level === 4
                              ? 'bg-green-500'
                              : level === 3
                              ? 'bg-blue-500'
                              : level === 2
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                            : 'bg-gray-200 dark:bg-gray-700'}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.2, delay: level * 0.1 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {passwordStrength === 0 && watchPassword
                        ? 'Muy débil'
                        : passwordStrength === 1
                        ? 'Débil'
                        : passwordStrength === 2
                        ? 'Media'
                        : passwordStrength === 3
                        ? 'Fuerte'
                        : passwordStrength === 4
                        ? '¡Excelente!'
                        : ''}
                    </span>
                  </div>
                </motion.div>
                
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Opción para recordar usuario */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberUser"
                  checked={rememberUser}
                  onChange={(e) => setRememberUser(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="rememberUser"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Recordar mi correo electrónico
                </label>
              </div>

              {error && (
                <motion.div 
                  className="rounded-md bg-red-50 p-3 dark:bg-red-900/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                className={`w-full ${buttonLoadingClass} ${loginSuccess ? "bg-green-600 hover:bg-green-700" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : loginSuccess ? (
                  "Sesión iniciada correctamente"
                ) : (
                  "Iniciar sesión"
                )}
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
                    variant="outline"
                    onClick={() => handleDemoUserClick(user)}
                    className={`flex flex-col items-center justify-center p-3 text-xs ${demoCardClass}`}
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
      </motion.main>

      {/* Botones flotantes para IA y accesibilidad */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <Button
          onClick={() => setShowAIAssistantModal(true)}
          className="rounded-full bg-indigo-600 p-3 shadow-lg hover:bg-indigo-700"
          aria-label="Abrir asistente IA"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
        <Button
          onClick={() => setShowAccessibilityPanel(true)}
          className="rounded-full bg-blue-600 p-3 shadow-lg hover:bg-blue-700"
          aria-label="Abrir panel de accesibilidad"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </div>

      {/* Modales */}
      <ClientOnly>
        {showForgotPasswordModal && (
          <ForgotPasswordModal onClose={() => setShowForgotPasswordModal(false)} />
        )}

        {showAIAssistantModal && (
          <AIAssistantModal onClose={() => setShowAIAssistantModal(false)} />
        )}
      </ClientOnly>

      {/* Panel de accesibilidad */}
      <ClientOnly>
        {showAccessibilityPanel && (
          <AccessibilityPanel onClose={() => setShowAccessibilityPanel(false)} />
        )}
      </ClientOnly>

      {/* Efecto de confeti */}
      <ClientOnly>
        <AnimatePresence>
          {showConfetti && confettiWidth > 0 && confettiHeight > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <ReactConfetti
              width={confettiWidth}
              height={confettiHeight}
              recycle={false}
              numberOfPieces={500}
              gravity={0.2}
              onConfettiComplete={() => setShowConfetti(false)}
            />
          </motion.div>
          )}
        </AnimatePresence>
      </ClientOnly>
    </div>
  );
}

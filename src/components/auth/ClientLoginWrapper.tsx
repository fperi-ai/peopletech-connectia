"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Importar el componente sin SSR
const CleanLoginForm = dynamic(
  () => import("./CleanLoginForm").then((mod) => mod.CleanLoginForm),
  { ssr: false }
);

// Componente de carga mientras se carga el formulario
function LoadingPlaceholder() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando formulario de login...</p>
    </div>
  );
}

export default function ClientLoginWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga para asegurarnos de que se muestre el loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingPlaceholder /> : <CleanLoginForm />;
}

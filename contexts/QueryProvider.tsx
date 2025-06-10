import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Crear una instancia del cliente de consulta
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

/**
 * Proveedor de TanStack Query para toda la aplicación
 */
export const QueryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

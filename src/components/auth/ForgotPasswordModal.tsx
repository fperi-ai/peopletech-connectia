"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authService } from "@/services/auth-service";

// Esquema de validación para el formulario de recuperación de contraseña
const forgotPasswordSchema = z.object({
  email: z.string().email("Introduce un email válido"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordModalProps {
  onClose: () => void;
}

export function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await authService.forgotPassword(data.email);
      setSubmitResult(result);
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Error inesperado al procesar la solicitud",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recuperar contraseña</DialogTitle>
          <DialogDescription>
            Introduce tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
          </DialogDescription>
        </DialogHeader>

        {submitResult ? (
          <div className={`rounded-md p-4 ${
            submitResult.success ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200" : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200"
          }`}>
            <p>{submitResult.message}</p>
            <div className="mt-4 flex justify-end">
              <Button onClick={onClose}>Cerrar</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo electrónico
              </label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="tu@email.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "forgot-email-error" : undefined}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p id="forgot-email-error" className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar instrucciones"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

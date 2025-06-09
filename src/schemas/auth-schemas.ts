import { z } from "zod";

// Esquema de validación para el formulario de login con mensajes de error amigables
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "¡Ups! ¿Te olvidaste del correo?")
    .email("Eso no parece un email válido... ¿Seguro que lo escribiste bien?")
    .refine(
      (email) => email.endsWith("@inditex.com"),
      "¿Seguro que trabajas aquí? 😉 Usa tu correo corporativo @inditex.com"
    ),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria (no te preocupes, no se lo diremos a nadie)")
    .min(6, "¡Muy corta! Tu contraseña necesita al menos 6 caracteres para sentirse segura")
});

// Tipo inferido del esquema para usar en el formulario
export type LoginFormValues = z.infer<typeof loginSchema>;

// Esquema para recuperación de contraseña
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Necesitamos tu email para enviarte el enlace de recuperación")
    .email("Hmm, ese email no parece correcto. ¿Lo revisamos?")
    .refine(
      (email) => email.endsWith("@inditex.com"),
      "Recuerda usar tu correo corporativo @inditex.com"
    )
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

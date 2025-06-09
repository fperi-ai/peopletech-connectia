import { Metadata } from "next";
import ClientLoginForm from "../../components/auth/ClientLoginForm";

export const metadata: Metadata = {
  title: "PeopleTech ConnectIA - Login",
  description: "Accede a la plataforma PeopleTech ConnectIA para gestionar todos tus recursos humanos de manera inteligente.",
};

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <ClientLoginForm />
    </div>
  );
}

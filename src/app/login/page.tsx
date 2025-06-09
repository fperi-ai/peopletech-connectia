import { Metadata } from "next";
import ClientLoginWrapper from "../../components/auth/ClientLoginWrapper";

export const metadata: Metadata = {
  title: "PeopleTech ConnectIA - Login",
  description: "Accede a la plataforma PeopleTech ConnectIA para gestionar todos tus recursos humanos de manera inteligente.",
};

export default function Login() {
  return <ClientLoginWrapper />;
}

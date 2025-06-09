"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AIAssistantModalProps {
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function AIAssistantModal({ onClose }: AIAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy ConnectIA, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simular respuesta del asistente después de un breve retraso
    setTimeout(() => {
      const assistantResponses = [
        "Puedo ayudarte a navegar por PeopleTech ConnectIA. ¿Qué te gustaría saber?",
        "Recuerda que puedes acceder a diferentes funciones según tu rol en la plataforma.",
        "¿Necesitas ayuda con alguna función específica de la plataforma?",
        "Estoy aquí para asistirte con cualquier duda sobre la red social corporativa.",
        "¿Te interesa conocer más sobre los retos o el generador de memes?",
      ];

      const randomResponse = assistantResponses[Math.floor(Math.random() * assistantResponses.length)];

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Asistente ConnectIA</DialogTitle>
          <DialogDescription>
            Tu asistente virtual para ayudarte con PeopleTech ConnectIA
          </DialogDescription>
        </DialogHeader>

        <div className="flex h-[400px] flex-col">
          {/* Área de mensajes */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="mt-1 text-right text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-center rounded-lg bg-muted px-4 py-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Escribiendo...</p>
                </div>
              </div>
            )}
          </div>

          {/* Área de entrada de texto */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

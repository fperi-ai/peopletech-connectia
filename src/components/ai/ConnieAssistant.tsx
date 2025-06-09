"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnieAssistantProps {
  phrase?: string;
  onRefreshPhrase?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "subtle";
}

export function ConnieAssistant({
  phrase = "¡Hola! Soy Connie, tu asistente virtual.",
  onRefreshPhrase,
  size = "md",
  variant = "default"
}: ConnieAssistantProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = () => {
    if (onRefreshPhrase) {
      setIsAnimating(true);
      onRefreshPhrase();
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const sizeClasses = {
    sm: "text-xs p-2",
    md: "text-sm p-3",
    lg: "text-base p-4"
  };

  const variantClasses = {
    default: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
    outline: "border border-teal-300 text-teal-700 dark:border-teal-700 dark:text-teal-300",
    subtle: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-200"
  };

  return (
    <div className={`rounded-lg ${sizeClasses[size]} ${variantClasses[variant]} flex items-start gap-3 shadow-sm`}>
      <div className="flex-shrink-0 mt-1">
        <MessageSquare className="h-5 w-5 text-teal-600 dark:text-teal-400" />
      </div>
      <div className="flex-1">
        <p className={`${isAnimating ? "animate-pulse" : ""}`}>{phrase}</p>
        {onRefreshPhrase && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh} 
            className="mt-2 h-7 px-2 text-xs text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Nueva frase
          </Button>
        )}
      </div>
    </div>
  );
}

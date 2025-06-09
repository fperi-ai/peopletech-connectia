"use client";

import { useState, useEffect } from "react";

export interface AccessibilityPreferences {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  theme: "light" | "dark" | "system";
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  theme: "system",
};

export function useAccessibilityPreferences() {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES);

  // Cargar preferencias al montar el componente
  useEffect(() => {
    const savedPreferences = localStorage.getItem("accessibility_preferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Guardar preferencias cuando cambien
  useEffect(() => {
    localStorage.setItem("accessibility_preferences", JSON.stringify(preferences));
    
    // Aplicar preferencias
    document.documentElement.style.fontSize = `${preferences.fontSize / 16}rem`;
    
    if (preferences.highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
    
    if (preferences.reducedMotion) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
  }, [preferences]);

  const updatePreferences = (newPreferences: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  return {
    preferences,
    updatePreferences,
    resetPreferences,
  };
}

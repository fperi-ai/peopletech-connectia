"use client";

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAccessibilityPreferences } from "../../hooks/useAccessibilityPreferences";

interface AccessibilityPanelProps {
  onClose: () => void;
}

export function AccessibilityPanel({ onClose }: AccessibilityPanelProps) {
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreferences, resetPreferences } = useAccessibilityPreferences();

  const increaseFontSize = () => {
    if (preferences.fontSize < 24) {
      updatePreferences({ fontSize: preferences.fontSize + 1 });
    }
  };

  const decreaseFontSize = () => {
    if (preferences.fontSize > 12) {
      updatePreferences({ fontSize: preferences.fontSize - 1 });
    }
  };

  const resetSettings = () => {
    resetPreferences();
    setTheme("system");
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 rounded-lg border bg-background p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Opciones de accesibilidad</h3>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-muted"
          aria-label="Cerrar panel de accesibilidad"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Tamaño de fuente */}
        <div>
          <label className="mb-2 block text-sm font-medium">Tamaño de texto</label>
          <div className="flex items-center space-x-2">
            <Button
              onClick={decreaseFontSize}
              disabled={preferences.fontSize <= 12}
              size="sm"
              variant="outline"
              aria-label="Reducir tamaño de texto"
            >
              A-
            </Button>
            <div className="flex-1 text-center">
              <span className="text-sm">{preferences.fontSize}px</span>
            </div>
            <Button
              onClick={increaseFontSize}
              disabled={preferences.fontSize >= 24}
              size="sm"
              variant="outline"
              aria-label="Aumentar tamaño de texto"
            >
              A+
            </Button>
          </div>
        </div>

        {/* Tema */}
        <div>
          <label className="mb-2 block text-sm font-medium">Tema</label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => setTheme("light")}
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              className="w-full"
            >
              Claro
            </Button>
            <Button
              onClick={() => setTheme("dark")}
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              className="w-full"
            >
              Oscuro
            </Button>
            <Button
              onClick={() => setTheme("system")}
              variant={theme === "system" ? "default" : "outline"}
              size="sm"
              className="w-full"
            >
              Sistema
            </Button>
          </div>
        </div>

        {/* Alto contraste */}
        <div className="flex items-center justify-between">
          <label htmlFor="high-contrast" className="text-sm font-medium">
            Alto contraste
          </label>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              id="high-contrast"
              checked={preferences.highContrast}
              onChange={() => updatePreferences({ highContrast: !preferences.highContrast })}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          </label>
        </div>

        {/* Reducir movimiento */}
        <div className="flex items-center justify-between">
          <label htmlFor="reduced-motion" className="text-sm font-medium">
            Reducir movimiento
          </label>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              id="reduced-motion"
              checked={preferences.reducedMotion}
              onChange={() => updatePreferences({ reducedMotion: !preferences.reducedMotion })}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          </label>
        </div>

        {/* Botón de restablecer */}
        <Button
          onClick={resetSettings}
          variant="outline"
          className="mt-2 w-full"
        >
          Restablecer ajustes
        </Button>
      </div>
    </div>
  );
}

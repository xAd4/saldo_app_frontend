/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const installedHandler = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Navegadores Chromium (Chrome, Edge) — prompt nativo
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      // Safari, Firefox u otros — guiar al usuario
      alert(
        "Para instalar SaldoApp:\n\n" +
          "• Chrome/Edge: Haz clic en el icono de instalación en la barra de direcciones\n" +
          "• Safari (iOS): Toca 'Compartir' → 'Agregar a pantalla de inicio'\n" +
          "• Firefox: Abre el menú → 'Instalar aplicación'",
      );
    }
  };

  // No renderizar si ya está instalada como app independiente
  if (isInstalled) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center rounded-xl text-emerald-400 hover:text-emerald-300 transition-all duration-200"
      style={{
        padding: "8px 14px",
        gap: 8,
        backgroundColor: "rgba(52, 211, 153, 0.08)",
        border: "1px solid rgba(52, 211, 153, 0.15)",
        fontSize: 13,
        cursor: "pointer",
      }}
      title="Instalar SaldoApp"
    >
      {/* Download icon */}
      <svg
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      <span className="hidden sm:inline">Instalar App</span>
    </button>
  );
}

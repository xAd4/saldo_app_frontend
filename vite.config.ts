import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Se actualiza solo cuando hay cambios
      devOptions: { enabled: true }, // Habilitar PWA en modo desarrollo
      includeAssets: ["pwa-192x192.svg", "pwa-512x512.svg"],
      manifest: {
        name: "SaldoApp",
        short_name: "SaldoApp",
        description: "Aplicación para el control de gastos",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "pwa-512x512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "iconos/apple-touch-icon.png"],
      manifest: {
        name: "INTEGRA — Formación en tecnología para docentes",
        short_name: "INTEGRA",
        description: "Aprender a usar la tecnología en el aula, paso a paso. Funciona sin internet.",
        lang: "es",
        start_url: "/",
        display: "standalone",
        background_color: "#FFFDF7",
        theme_color: "#1D4E89",
        icons: [
          { src: "iconos/icono-192.png", sizes: "192x192", type: "image/png" },
          { src: "iconos/icono-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },
      workbox: {
        // Todo lo que produce el build (HTML, JS, CSS, fuentes, iconos) queda guardado en el equipo.
        globPatterns: ["**/*.{js,css,html,woff,woff2,png,svg,ico}"],
        navigateFallback: "/index.html",
      },
    }),
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});

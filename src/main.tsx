import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import './index.css'

/*
  vite-plugin-pwa (registerType: "autoUpdate") ya revisa si hay una versión
  nueva en cada carga. Como en la sede la app puede quedar abierta muchas
  horas sin recargar, esto agrega una revisión periódica y otra apenas
  vuelve la señal, para que el código (no solo los datos) también se
  actualice solo cuando hay conexión.
*/
const actualizarSW = registerSW({ immediate: true });
setInterval(() => { if (navigator.onLine) actualizarSW(); }, 30 * 60 * 1000);
window.addEventListener("online", () => actualizarSW());

createRoot(document.getElementById("root")!).render(<App />);

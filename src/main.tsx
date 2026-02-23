import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "./App";

// Registrar Service Worker para PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Nueva versión disponible. ¿Actualizar?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App lista para uso offline");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

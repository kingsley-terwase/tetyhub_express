import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ColorProvider } from "@/contexts/color";
import { useAuthStore } from "@/store/auth";

useAuthStore.getState().setAuth({
  user: { name: "Test Seller" },
  token: "fake-token",
  permission: { role_id: 2, subrole_id: null },
});

createRoot(/** @type {HTMLElement} */ (document.getElementById("root"))).render(
  <StrictMode>
    <ColorProvider>
      <App></App>
    </ColorProvider>
  </StrictMode>,
);

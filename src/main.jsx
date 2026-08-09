import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ColorProvider } from "@/contexts/color";
import { useAuthStore } from "@/store/auth";
import AppLoader from "./Utils/AppLoader";

useAuthStore.getState().setAuth({
  user: { name: "Test Seller" },
  token: "fake-token",
  permission: { role_id: 1, subrole_id: 1 },
});

function Root() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Replace this with your real startup work — auth/session check, remote
    // config, font/asset preload, etc. `ready` should flip to true once the
    // app actually has what it needs to render.
    const timer = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* App mounts underneath as soon as it's ready — the loader then
          cross-fades out on top of it instead of leaving a blank gap. */}
      {ready && <App />}
      {showLoader && (
        <AppLoader
          show={!ready}
          onHidden={() => setShowLoader(false)}
          progress={undefined}
        />
      )}
    </>
  );
}

createRoot(/** @type {HTMLElement} */ (document.getElementById("root"))).render(
  <StrictMode>
    <ColorProvider>
      <Root />
    </ColorProvider>
  </StrictMode>,
);

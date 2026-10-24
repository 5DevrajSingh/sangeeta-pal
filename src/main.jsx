import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClinicProvider } from "./context/ClinicContext";
import { ServicesProvider } from "./context/ServicesContext";

import App from "./App.jsx";
import "./styles/theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClinicProvider>
      <ServicesProvider>
        <App />
      </ServicesProvider>
    </ClinicProvider>
  </StrictMode>,
);
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // Asegúrate de que el archivo está bien escrito
import { BudgetProvider } from "./context/BudgetContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>
);
  
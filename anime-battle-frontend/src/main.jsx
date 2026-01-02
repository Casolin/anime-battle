import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CharacterContextProvider } from "./context/CharacterContext.jsx";
import { BattleContextProvider } from "./context/BattleContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CharacterContextProvider>
        <BattleContextProvider>
          <App />
        </BattleContextProvider>
      </CharacterContextProvider>
    </AuthContextProvider>
  </StrictMode>
);

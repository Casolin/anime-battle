import { useState, createContext } from "react";
import { Battle } from "../api/battle.api";

const BattleContext = createContext(null);

export const BattleContextProvider = ({ children }) => {
  const [battleInfo, setBattleInfo] = useState({
    user: "",
    character1Id: "",
    character2Id: "",
    score1: 0,
    score2: 0,
    winner: "",
  });

  const [battleInProgress, setBattleInProgress] = useState(false);

  const startBattle = async (data) => {
    if (battleInProgress) {
      console.log("Battle already in progress");
      return;
    }

    setBattleInProgress(true);

    try {
      const response = await Battle(data);
      if (response && response.battle) {
        setBattleInfo(response);
        return response;
      }

      return null;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    } finally {
      setBattleInProgress(false);
    }
  };
  return (
    <BattleContext.Provider value={{ battleInfo, setBattleInfo, startBattle }}>
      {children}
    </BattleContext.Provider>
  );
};

export default BattleContext;

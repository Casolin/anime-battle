import { useState, createContext } from "react";
import { Battle } from "../api/battle.api";

const BattleContext = createContext(null);

export const BattleContextProvider = ({ children }) => {
  const [battleInfo, setBattleInfo] = useState({
    user: "",
    character1: "",
    character2: "",
  });

  const startBattle = async (data) => {
    try {
      const animebattle = await Battle(data);
      setBattleInfo(animebattle);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <BattleContext.Provider value={(battleInfo, setBattleInfo, startBattle)}>
      {children}
    </BattleContext.Provider>
  );
};

export default BattleContext;

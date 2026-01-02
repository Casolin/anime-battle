import BattleContext from "../context/BattleContext";
import { useContext } from "react";

const useBattles = () => useContext(BattleContext);

export default useBattles;

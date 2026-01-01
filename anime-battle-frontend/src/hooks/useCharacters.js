import CharacterContext from "../context/CharacterContext";
import { useContext } from "react";

const useCharacters = () => useContext(CharacterContext);

export default useCharacters;

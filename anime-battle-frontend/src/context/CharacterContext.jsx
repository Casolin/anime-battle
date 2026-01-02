import { createContext, useState } from "react";
import {
  AddCharacter,
  UserCharacters,
  Characters,
  DeleteCharacter,
} from "../api/character.api";

const CharacterContext = createContext(null);

export const CharacterContextProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEnemyCharacter, setSelectedEnemyCharacter] = useState(null);
  const [characterList, setCharacterList] = useState([]);

  const addNewCharacter = async (newCharacter) => {
    try {
      const addedCharacter = await AddCharacter(newCharacter);
      setSelectedCharacter(addedCharacter);
      setCharacterList((prevList) => [...prevList, addedCharacter]);
    } catch (error) {
      console.error("Error adding character:", error.message);
    }
  };

  const getEnemyCharacters = async () => {
    try {
      const response = await Characters("/enemies");
      setCharacterList(response);
    } catch (error) {
      console.error("Error fetching enemy characters:", error.message);
      setCharacterList([]);
    }
  };

  const deleteCharacter = async (character) => {
    try {
      await DeleteCharacter(character);
    } catch (error) {
      console.error("Error deleting characters:", error.message);
    }
  };

  const getUserCharacter = async (user) => {
    try {
      const userCharacters = await UserCharacters(user);
      setCharacterList(userCharacters);
    } catch (error) {
      console.error("Error fetching user characters:", error.message);
      setCharacterList([]);
    }
  };

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const selectEnemyCharacter = (character) => {
    setSelectedEnemyCharacter(character);
  };

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacter,
        selectedEnemyCharacter,
        characterList,
        setSelectedCharacter,
        setSelectedEnemyCharacter,
        setCharacterList,
        addNewCharacter,
        getEnemyCharacters,
        getUserCharacter,
        selectCharacter,
        selectEnemyCharacter,
        deleteCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;

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
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(false);

  const addNewCharacter = async (newCharacter) => {
    try {
      setLoading(true);
      const addedCharacter = await AddCharacter(newCharacter);
      setSelectedCharacter(addedCharacter);
      setCharacterList((prevList) => [...prevList, addedCharacter]);
    } catch (error) {
      console.error("Error adding character:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCharacterList = async () => {
    try {
      setLoading(true);
      const characters = await Characters();
      setCharacterList(characters);
    } catch (error) {
      console.error("Error fetching characters:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCharacter = async (character) => {
    try {
      setLoading(true);
      await DeleteCharacter(character);
      setCharacterList((prevList) =>
        prevList.filter((item) => item._id !== character._id)
      );
    } catch (error) {
      console.error("Error deleting characters:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserCharacter = async (user) => {
    try {
      setLoading(true);
      const userCharacters = await UserCharacters(user);
      setCharacterList(userCharacters);
    } catch (error) {
      console.error("Error fetching user characters:", error.message);
      setCharacterList([]);
    } finally {
      setLoading(false);
    }
  };

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacter,
        characterList,
        setSelectedCharacter,
        setCharacterList,
        addNewCharacter,
        getCharacterList,
        getUserCharacter,
        selectCharacter,
        deleteCharacter,
        loading,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;

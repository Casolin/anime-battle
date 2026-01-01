import api from "./axios";

export const UserCharacters = async () => {
  try {
    const response = await api.get("/api/characters/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user characters:", error);
    throw error;
  }
};

export const Characters = async () => {
  try {
    const response = await api.get("/api/characters");
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const AddCharacter = async (character) => {
  try {
    const response = await api.post("/api/characters/add", character);
    return response.data;
  } catch (error) {
    console.error("Error adding character:", error);
    throw error;
  }
};

export const DeleteCharacter = async (character) => {
  try {
    const response = await api.delete(
      `/api/characters/delete/${character._id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting character:", error);
    throw error;
  }
};

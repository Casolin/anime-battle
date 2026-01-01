import api from "./axios";

export const UserCharacters = async (user) => {
  try {
    const response = await api.get("/characters/user", { params: { user } });
    return response.data;
  } catch (error) {
    console.error("Error fetching user characters:", error);
    throw error;
  }
};

export const Characters = async () => {
  try {
    const response = await api.get("/characters");
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const AddCharacter = async (character) => {
  try {
    const response = await api.post("/characters/add", character);
    return response.data;
  } catch (error) {
    console.error("Error adding character:", error);
    throw error;
  }
};

export const DeleteCharacter = async (character) => {
  try {
    const response = await api.delete(`/characters/delete/${character._id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting character:", error);
    throw error;
  }
};

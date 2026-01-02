import api from "./axios";

export const Battle = async (battle) => {
  try {
    const response = await api.post("/api/battle", battle);
    return response.data;
  } catch (error) {
    console.error("Error battle", error);
  }
};

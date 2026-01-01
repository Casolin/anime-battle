import Character from "../models/Character.js";

export const createCharacter = async (req, res) => {
  try {
    const character = new Character({
      ...req.body,
      owner: req.user.id,
    });

    await character.save();

    res.status(201).json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCharacters = async (req, res) => {
  try {
    const characters = await Character.find({ owner: req.user.id }).populate(
      "owner",
      "username"
    );
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    res.json({ message: "Character deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

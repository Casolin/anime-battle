import Battle from "../models/Battle.js";
import Character from "../models/Character.js";
import User from "../models/User.js";

const calculateScore = (stats) => {
  return (
    stats.strength * 2 +
    stats.speed * 1.5 +
    stats.skill +
    Math.floor(Math.random() * 20)
  );
};

export const startBattle = async (req, res) => {
  try {
    const { character1Id, character2Id } = req.body;

    if (!character1Id || !character2Id) {
      return res.status(400).json({ message: "Missing character IDs" });
    }

    console.log("Logged user:", req.user.id);
    console.log("Character1Id:", character1Id);
    console.log("Character2Id:", character2Id);

    const character1 = await Character.findOne({
      _id: character1Id,
      owner: req.user.id,
    });

    const character2 = await Character.findById(character2Id);

    if (!character1 || !character2) {
      return res.status(404).json({ message: "Character not found" });
    }

    const score1 = calculateScore(character1.stats);
    const score2 = calculateScore(character2.stats);

    let winner = null;
    let userWon = null;
    score1 > score2
      ? ((winner = character1._id), (userWon = character1.owner))
      : ((winner = character2._id), (userWon = character2.owner));

    const battle = new Battle({
      user: req.user.id,
      character1: character1._id,
      character2: character2._id,
      winner,
      score1,
      score2,
    });

    await battle.save();

    if (winner)
      await User.findByIdAndUpdate(userWon, { $inc: { battleWon: 1 } });

    res.status(201).json({
      message: `${winner} You Won!`,
      battle: {
        id: battle._id,
        character1: character1.name,
        character2: character2.name,
        score1,
        score2,
        winner:
          winner?.toString() === character1._id.toString()
            ? character1.name
            : character2.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

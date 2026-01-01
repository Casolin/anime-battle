import mongoose from "mongoose";

const battleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    character1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: true,
    },

    character2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: true,
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },

    score1: Number,
    score2: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Battle", battleSchema);

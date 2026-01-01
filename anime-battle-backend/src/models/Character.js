import mongoose from "mongoose";

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    stats: {
      strength: { type: Number, required: true, default: 0 },
      speed: { type: Number, required: true, default: 0 },
      skill: { type: Number, default: 0 },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Character", characterSchema);

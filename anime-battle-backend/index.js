import express from "express";
import cors from "cors";
import router from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import characterRouter from "./src/routes/characterRoutes.js";
import battleRouter from "./src/routes/battleRoutes.js";
import connectDB from "./src/config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome, User");
});

app.use("/", router);

app.use("/", userRouter);

app.use("/", characterRouter);

app.use("/", battleRouter);

import "dotenv/config";
app.listen(process.env.PORT, async () => {
  await connectDB();
});

export default app;

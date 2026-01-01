import express from "express";
import cors from "cors";
import router from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import characterRouter from "./routes/characterRoutes.js";
import battleRouter from "./routes/battleRoutes.js";

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

export default app;

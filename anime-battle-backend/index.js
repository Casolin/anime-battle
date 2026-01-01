import express from "express";
import cors from "cors";
import router from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import characterRouter from "./src/routes/characterRoutes.js";
import battleRouter from "./src/routes/battleRoutes.js";
import connectDB from "./src/config/db.js";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", router);
app.use("/api/users", userRouter);
app.use("/api/characters", characterRouter);
app.use("/api/battles", battleRouter);

await connectDB();

export default app;

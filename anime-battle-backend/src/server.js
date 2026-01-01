import app from "./app.js";
import connectDB from "./config/db.js";
import "dotenv/config";
app.listen(process.env.PORT, async () => {
  await connectDB();
});

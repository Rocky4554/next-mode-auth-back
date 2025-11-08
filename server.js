import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API is live ");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Only start a listener locally
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => console.log("Server running on port 5000"));
}

// Export for Vercel
export default app;

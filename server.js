const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const cookieParser = require("cookie-parser");


dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:3000",                  
  "https://auth-next-app-zfoj.vercel.app" 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

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

app.use('/api/auth',authRoutes);
app.use('/api/tasks' ,taskRoutes);

// Export for Vercel
export default app;

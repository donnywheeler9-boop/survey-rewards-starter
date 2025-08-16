import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth.js"; // Import the auth routes
import surveyRoutes from "./src/routes/surveys.js";
import withdrawRoutes from "./src/routes/withdraw.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use the auth routes at /api/auth
app.use("/api/auth", authRoutes);

// Use other routes for surveys and withdrawals
app.use("/api/surveys", surveyRoutes);
app.use("/api/withdraw", withdrawRoutes);

// Default route
app.get("/", (req, res) => res.send("Server is running!"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

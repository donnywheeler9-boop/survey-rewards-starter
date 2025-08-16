import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/auth.js";
import surveyRoutes from "./src/routes/surveys.js";
import withdrawRoutes from "./src/routes/withdraw.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/withdraw", withdrawRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Server is running!"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

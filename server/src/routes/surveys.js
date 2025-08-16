import express from "express";
import { getSurveys, completeSurvey } from "../controllers/surveyController.js";

const router = express.Router();

// Get all surveys
router.get("/", getSurveys);

// Mark survey as completed and add points
router.post("/complete/:id", completeSurvey);

export default router;

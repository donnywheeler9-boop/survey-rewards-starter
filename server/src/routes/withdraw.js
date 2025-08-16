import express from "express";
import { requestWithdraw, getWithdraws } from "../controllers/withdrawController.js";

const router = express.Router();

// Request a withdraw
router.post("/request", requestWithdraw);

// Get all withdraws for a user
router.get("/:userId", getWithdraws);

export default router;

import pool from "../config/db.js";

// Fetch all surveys
export const getSurveys = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM surveys");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
};

// Complete a survey and add points to user
export const completeSurvey = async (req, res) => {
  const surveyId = req.params.id;
  const userId = req.body.userId; // In real app, get from JWT

  try {
    // Check if already completed
    const check = await pool.query(
      "SELECT * FROM user_surveys WHERE user_id=$1 AND survey_id=$2",
      [userId, surveyId]
    );
    if (check.rows.length)
      return res.status(400).json({ error: "Survey already completed" });

    // Mark as completed
    await pool.query(
      "INSERT INTO user_surveys (user_id, survey_id) VALUES ($1, $2)",
      [userId, surveyId]
    );

    // Add points
    const survey = await pool.query("SELECT points FROM surveys WHERE id=$1", [surveyId]);
    const points = survey.rows[0].points || 0;
    await pool.query("UPDATE users SET points = points + $1 WHERE id=$2", [points, userId]);

    res.json({ message: "Survey completed!", pointsAdded: points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to complete survey" });
  }
};

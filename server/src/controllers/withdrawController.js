import pool from "../config/db.js";

// Request withdrawal
export const requestWithdraw = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await pool.query("SELECT points FROM users WHERE id=$1", [userId]);
    if (!user.rows.length) return res.status(400).json({ error: "User not found" });

    if (user.rows[0].points < amount)
      return res.status(400).json({ error: "Insufficient points" });

    // Deduct points
    await pool.query("UPDATE users SET points = points - $1 WHERE id=$2", [amount, userId]);

    // Record withdraw request
    await pool.query(
      "INSERT INTO withdraws (user_id, amount) VALUES ($1, $2)",
      [userId, amount]
    );

    res.json({ message: "Withdraw request successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Withdraw request failed" });
  }
};

// Get all withdraws for a user
export const getWithdraws = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query("SELECT * FROM withdraws WHERE user_id=$1", [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch withdraws" });
  }
};

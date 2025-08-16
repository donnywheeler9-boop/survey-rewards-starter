import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup Controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
    try {
        // Check if the email already exists
            const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
                if (existingUser.rows.length > 0) {
                      return res.status(400).json({ error: "Email already in use" });
                          }

                              const hashed = await bcrypt.hash(password, 10);
                                  const result = await pool.query(
                                        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
                                              [name, email, hashed]
                                                  );
                                                      const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

                                                          res.json({ token, user: result.rows[0] });
                                                            } catch (err) {
                                                                console.error("Error during signup:", err);
                                                                    res.status(500).json({ error: "Signup failed" });
                                                                      }
                                                                      };

                                                                      // Login Controller
                                                                      export const login = async (req, res) => {
                                                                        const { email, password } = req.body;
                                                                          try {
                                                                              const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
                                                                                  if (!user.rows.length) return res.status(400).json({ error: "User not found" });

                                                                                      const match = await bcrypt.compare(password, user.rows[0].password);
                                                                                          if (!match) return res.status(400).json({ error: "Invalid password" });

                                                                                              const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

                                                                                                  res.json({ token, user: { id: user.rows[0].id, name: user.rows[0].name, email } });
                                                                                                    } catch (err) {
                                                                                                        console.error("Error during login:", err);
                                                                                                            res.status(500).json({ error: "Login failed" });
                                                                                                              }
                                                                                                              };
                                                                                                              
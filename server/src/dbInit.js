import fs from "fs";
import pool from "./config/db.js";

const run = async () => {
  try {
    // Drop tables if exist (clean start)
    await pool.query(`
      DROP TABLE IF EXISTS withdraws CASCADE;
      DROP TABLE IF EXISTS user_surveys CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS surveys CASCADE;
    `);
    console.log("✅ Old tables dropped (if any)");

    // Create schema
    const schema = fs.readFileSync("./src/schema.sql", "utf-8");
    await pool.query(schema);
    console.log("✅ Schema created successfully!");

    // Insert seed data
    const seed = fs.readFileSync("./src/seed.sql", "utf-8");
    await pool.query(seed);
    console.log("✅ Seed data inserted successfully!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

run();

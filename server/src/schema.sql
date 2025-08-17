-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Surveys Table
CREATE TABLE IF NOT EXISTS surveys (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    points INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User-Surveys Table (track completions)
CREATE TABLE IF NOT EXISTS user_surveys (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    survey_id INT REFERENCES surveys(id) ON DELETE CASCADE,
    completed_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, survey_id)
);

-- Withdraws Table
CREATE TABLE IF NOT EXISTS withdraws (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount INT NOT NULL,
    requested_at TIMESTAMP DEFAULT NOW()
);
-- Track which surveys a user has completed
CREATE TABLE IF NOT EXISTS user_surveys (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  survey_id INTEGER NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, survey_id)
);


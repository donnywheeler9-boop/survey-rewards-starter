-- Sample Users
INSERT INTO users (name, email, password, points)
VALUES 
('Alice', 'alice@example.com', 'password1', 100),
('Bob', 'bob@example.com', 'password2', 50)
ON CONFLICT DO NOTHING;

-- Sample Surveys
INSERT INTO surveys (title, description, points)
VALUES 
('Survey 1', 'This is the first survey.', 10),
('Survey 2', 'This is the second survey.', 15),
('Survey 3', 'This is the third survey.', 20)
ON CONFLICT DO NOTHING;

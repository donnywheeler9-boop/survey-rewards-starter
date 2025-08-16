import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './db.js';
import { authRequired } from './middleware/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email & password required' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query('insert into users (email, password_hash, name) values ($1,$2,$3) returning id,email,name,role,points',[email,hash,name||null]);
    const user = rows[0];
    const token = jwt.sign({ id:user.id, email:user.email, role:user.role }, process.env.JWT_SECRET, { expiresIn:'7d' });
    res.json({ token, user });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ message:'Email already exists' });
    res.status(500).json({ message:'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message:'Email & password required' });
  try {
    const { rows } = await pool.query('select * from users where email=$1',[email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ message:'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message:'Invalid credentials' });
    const token = jwt.sign({ id:user.id, email:user.email, role:user.role }, process.env.JWT_SECRET, { expiresIn:'7d' });
    res.json({ token, user:{ id:user.id, email:user.email, name:user.name, role:user.role, points:user.points } });
  } catch { res.status(500).json({ message:'Server error' }); }
});

app.get('/api/surveys', authRequired, async (_req, res) => {
  try { const { rows } = await pool.query('select * from surveys where is_active=true order by id desc'); res.json(rows); }
  catch { res.status(500).json({ message:'Server error' }); }
});

app.post('/api/surveys/:id/complete', authRequired, async (req, res) => {
  const surveyId = Number(req.params.id);
  try {
    const { rows: srows } = await pool.query('select reward from surveys where id=$1 and is_active=true',[surveyId]);
    const survey = srows[0]; if (!survey) return res.status(404).json({ message:'Survey not found' });
    await pool.query('begin');
    await pool.query('insert into user_surveys (user_id, survey_id, status) values ($1,$2,$3)',[req.user.id, surveyId, 'completed']);
    await pool.query('update users set points = points + $1 where id=$2',[survey.reward, req.user.id]);
    await pool.query('commit');
    res.json({ message:'Survey completed', reward:survey.reward });
  } catch (e) {
    await pool.query('rollback').catch(()=>{});
    res.status(500).json({ message:'Server error' });
  }
});

app.get('/api/me', authRequired, async (req, res) => {
  try { const { rows } = await pool.query('select id,email,name,role,points from users where id=$1',[req.user.id]); res.json(rows[0]); }
  catch { res.status(500).json({ message:'Server error' }); }
});

app.post('/api/withdraw', authRequired, async (req, res) => {
  const amt = Number(req.body?.amount || 0);
  if (!Number.isInteger(amt) || amt <= 0) return res.status(400).json({ message:'Invalid amount' });
  try {
    const { rows } = await pool.query('select points from users where id=$1',[req.user.id]);
    const points = rows[0]?.points ?? 0;
    if (points < amt) return res.status(400).json({ message:'Insufficient points' });
    await pool.query('begin');
    await pool.query('update users set points = points - $1 where id=$2',[amt, req.user.id]);
    const { rows: w } = await pool.query('insert into withdrawals (user_id, amount, status) values ($1,$2,$3) returning *',[req.user.id, amt, 'pending']);
    await pool.query('commit');
    res.json(w[0]);
  } catch (e) {
    await pool.query('rollback').catch(()=>{});
    res.status(500).json({ message:'Server error' });
  }
});

app.get('/api/withdraws', authRequired, async (req, res) => {
  try { const { rows } = await pool.query('select * from withdrawals where user_id=$1 order by id desc',[req.user.id]); res.json(rows); }
  catch { res.status(500).json({ message:'Server error' }); }
});

app.listen(PORT, () => console.log('API listening on http://localhost:'+PORT));

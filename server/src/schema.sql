create table if not exists users (
  id serial primary key,
  email text unique not null,
  password_hash text not null,
  name text,
  role text default 'user',
  points integer default 0,
  created_at timestamptz default now()
);
create table if not exists surveys (
  id serial primary key,
  title text not null,
  description text,
  reward integer not null default 10,
  is_active boolean default true,
  created_at timestamptz default now()
);
create table if not exists user_surveys (
  id serial primary key,
  user_id integer references users(id) on delete cascade,
  survey_id integer references surveys(id) on delete cascade,
  status text default 'assigned',
  created_at timestamptz default now()
);
create table if not exists withdrawals (
  id serial primary key,
  user_id integer references users(id) on delete cascade,
  amount integer not null,
  status text default 'pending',
  created_at timestamptz default now()
);
insert into surveys (title, description, reward, is_active) values
('Customer Satisfaction Survey','Tell us about your recent purchase',20,true),
('App Feedback Survey','Help us improve app UX',15,true) on conflict do nothing;

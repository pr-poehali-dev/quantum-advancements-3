CREATE TABLE t_p52439955_quantum_advancements.leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
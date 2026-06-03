const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/shops',       require('./routes/shops'));
app.use('/api/reviews',     require('./routes/reviews'));
app.use('/api/mess',        require('./routes/mess'));
app.use('/api/confessions', require('./routes/confessions'));
app.use('/api/notes',       require('./routes/notes'));
app.use('/api/placements',  require('./routes/placements'));

app.get('/', (req, res) => res.json({ message: 'GLA Anything API 🚀' }));

const PORT = process.env.PORT || 5000;

// sync: true   → creates tables if they don't exist
// alter: true  → updates columns if you change a model (safe for dev)
// force: true  → DROPS and recreates everything (dangerous! only use once to reset)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ MySQL connected & tables synced');
    app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err.message);
    console.error('👉 Check your .env file — DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
  });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const trashRoutes = require('./routes/trashRoutes');
app.use('/api/trash', trashRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/u', userRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const routePermissions = require('./routes/routePermissions');
app.use('/api/permissions', routePermissions);

app.get('/', (req, res) => res.send('API Bank Sampah Aktif'));
app.get('/test', (req, res) => res.send('Test OK'));

module.exports = app;

const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { initDb } = require('./db');
const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const bookingRoutes = require('../routes/bookings');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDb();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300
}));

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
    name: 'ocm_admin_session',
    secret: process.env.SESSION_SECRET || 'change_me_in_env',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 1000 * 60 * 60 * 4
    }
}));

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use(authRoutes);
app.use(adminRoutes);
app.use(bookingRoutes);

// Fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${PORT}`);
});

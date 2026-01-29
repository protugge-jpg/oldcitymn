const path = require('path');
const express = require('express');
const { requireAdminSession } = require('../middleware/auth');
const { getDb } = require('../server/db');

const router = express.Router();

router.get('/admin', requireAdminSession, (req, res) => {
    res.redirect('/admin/dashboard');
});

router.get('/admin/dashboard', requireAdminSession, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'server', 'views', 'admin-dashboard.html'));
});

router.get('/api/admin/bookings', requireAdminSession, (req, res) => {
    const db = getDb();
    const { type, from, to } = req.query;

    const filters = [];
    const params = {};

    if (type && ['room', 'trip'].includes(type)) {
        filters.push('bookingType = @type');
        params.type = type;
    }

    if (from) {
        filters.push('date(createdAt) >= date(@from)');
        params.from = from;
    }

    if (to) {
        filters.push('date(createdAt) <= date(@to)');
        params.to = to;
    }

    const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const query = `SELECT * FROM bookings ${whereClause} ORDER BY createdAt DESC`;

    const rows = db.prepare(query).all(params);
    res.json(rows);
});

router.patch('/api/admin/bookings/:id', requireAdminSession, (req, res) => {
    const db = getDb();
    const bookingId = Number(req.params.id);
    const status = String(req.body.status || '').trim();

    const allowedStatuses = ['confirmed', 'completed', 'canceled'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    const update = db.prepare('UPDATE bookings SET status = @status WHERE id = @id');
    const result = update.run({ status, id: bookingId });

    if (result.changes === 0) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    return res.json({ success: true });
});

module.exports = router;

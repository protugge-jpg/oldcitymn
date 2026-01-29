const express = require('express');
const { getDb } = require('../server/db');

const router = express.Router();

function sanitize(input) {
    return String(input || '').trim();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/api/bookings', (req, res) => {
    const bookingType = sanitize(req.body.bookingType);
    const guestName = sanitize(req.body.guestName);
    const guestEmail = sanitize(req.body.guestEmail);
    const guestPhone = sanitize(req.body.guestPhone);
    const amount = Number(req.body.amount || 0);
    const paymentMethod = sanitize(req.body.paymentMethod) || 'online';
    const allowedPaymentMethods = ['online', 'pay_in_person'];
    const paymentStatus = paymentMethod === 'pay_in_person' ? 'pay_on_arrival' : 'paid';

    if (!['room', 'trip'].includes(bookingType)) {
        return res.status(400).json({ error: 'Invalid booking type' });
    }

    if (!guestName || !guestEmail || !guestPhone) {
        return res.status(400).json({ error: 'Guest information is required' });
    }

    if (!isValidEmail(guestEmail)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!allowedPaymentMethods.includes(paymentMethod)) {
        return res.status(400).json({ error: 'Invalid payment method' });
    }

    const db = getDb();
    const createdAt = new Date().toISOString();

    if (bookingType === 'room') {
        const roomType = sanitize(req.body.roomType);
        const checkInDate = sanitize(req.body.checkInDate);
        const checkOutDate = sanitize(req.body.checkOutDate);
        const beds = Number(req.body.beds || 1);

        if (!roomType || !checkInDate || !checkOutDate) {
            return res.status(400).json({ error: 'Room booking details missing' });
        }

        if (!Number.isFinite(beds) || beds < 1) {
            return res.status(400).json({ error: 'Invalid bed count' });
        }

        const stmt = db.prepare(`
            INSERT INTO bookings (
                bookingType, guestName, guestEmail, guestPhone,
                roomType, checkInDate, checkOutDate, beds,
                amount, paymentMethod, paymentStatus, status, createdAt
            ) VALUES (
                @bookingType, @guestName, @guestEmail, @guestPhone,
                @roomType, @checkInDate, @checkOutDate, @beds,
                @amount, @paymentMethod, @paymentStatus, 'confirmed', @createdAt
            )
        `);

        const result = stmt.run({
            bookingType,
            guestName,
            guestEmail,
            guestPhone,
            roomType,
            checkInDate,
            checkOutDate,
            beds,
            amount,
            paymentMethod,
            paymentStatus,
            createdAt
        });

        return res.json({ id: result.lastInsertRowid });
    }

    if (bookingType === 'trip') {
        const tripType = sanitize(req.body.tripType);
        const startDate = sanitize(req.body.startDate);
        const participants = Number(req.body.participants || 1);

        if (!tripType || !startDate) {
            return res.status(400).json({ error: 'Trip booking details missing' });
        }

        if (!Number.isFinite(participants) || participants < 1) {
            return res.status(400).json({ error: 'Invalid group size' });
        }

        const stmt = db.prepare(`
            INSERT INTO bookings (
                bookingType, guestName, guestEmail, guestPhone,
                tripType, startDate, participants,
                amount, paymentMethod, paymentStatus, status, createdAt
            ) VALUES (
                @bookingType, @guestName, @guestEmail, @guestPhone,
                @tripType, @startDate, @participants,
                @amount, @paymentMethod, @paymentStatus, 'confirmed', @createdAt
            )
        `);

        const result = stmt.run({
            bookingType,
            guestName,
            guestEmail,
            guestPhone,
            tripType,
            startDate,
            participants,
            amount,
            paymentMethod,
            paymentStatus,
            createdAt
        });

        return res.json({ id: result.lastInsertRowid });
    }

    return res.status(400).json({ error: 'Invalid request' });
});

module.exports = router;

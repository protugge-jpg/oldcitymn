const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

function sanitize(input) {
    return String(input || '').trim();
}

router.get('/admin/login', (req, res) => {
    if (req.session && req.session.isAdmin) {
        return res.redirect('/admin/dashboard');
    }
    return res.sendFile(path.join(__dirname, '..', 'server', 'views', 'admin-login.html'));
});

router.post('/admin/login', async (req, res) => {
    const username = sanitize(req.body.username);
    const password = sanitize(req.body.password);

    if (!username || !password) {
        return res.redirect('/admin/login?error=1');
    }

    if (!ADMIN_PASSWORD_HASH) {
        return res.status(500).send('Server admin password not configured');
    }

    if (username !== ADMIN_USER) {
        return res.redirect('/admin/login?error=1');
    }

    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isMatch) {
        return res.redirect('/admin/login?error=1');
    }

    req.session.isAdmin = true;
    req.session.adminUser = username;
    return res.redirect('/admin/dashboard');
});

router.post('/admin/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('ocm_admin_session');
        res.redirect('/admin/login');
    });
});

module.exports = router;

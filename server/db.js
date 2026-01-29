const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '..', 'data', 'bookings.db');
let db;

function initDb() {
    db = new Database(dbPath);

    db.prepare(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bookingType TEXT NOT NULL,
            guestName TEXT NOT NULL,
            guestEmail TEXT NOT NULL,
            guestPhone TEXT NOT NULL,
            roomType TEXT,
            tripType TEXT,
            checkInDate TEXT,
            checkOutDate TEXT,
            startDate TEXT,
            participants INTEGER,
            beds INTEGER,
            amount REAL NOT NULL,
            paymentMethod TEXT NOT NULL DEFAULT 'online',
            paymentStatus TEXT NOT NULL DEFAULT 'paid',
            status TEXT NOT NULL DEFAULT 'confirmed',
            createdAt TEXT NOT NULL
        )
    `).run();

    const columns = db.prepare("PRAGMA table_info(bookings)").all();
    const columnNames = new Set(columns.map(column => column.name));

    if (!columnNames.has('paymentMethod')) {
        db.prepare("ALTER TABLE bookings ADD COLUMN paymentMethod TEXT NOT NULL DEFAULT 'online'").run();
    }
}

function getDb() {
    if (!db) {
        initDb();
    }
    return db;
}

module.exports = { initDb, getDb };

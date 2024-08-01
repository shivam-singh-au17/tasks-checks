const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS performance_log (id INTEGER PRIMARY KEY, method TEXT, status INTEGER, duration REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');
});

// Utility to simulate API behavior, same as before
// ...

// Updated simulateApiCall to include method, same as before
// ...

// Performance logging now writes to SQLite instead of console
function logPerformanceToDB(method, status, start) {
    const end = performance.now();
    const stmt = db.prepare('INSERT INTO performance_log (method, status, duration) VALUES (?, ?, ?)');
    stmt.run(method, status, end - start, (err) => {
        if (err) {
            console.error('Error logging performance to DB:', err.message);
        }
    });
    stmt.finalize();
}

// fetchData updated to pass HTTP method
async function fetchData() {
    const start = performance.now();
    const { method } = simulateApiBehavior();
    try {
        const response = await simulateApiCall();
        logPerformanceToDB(method, response.status, start);
        return response;
    } catch (error) {
        logPerformanceToDB(method, error.status, start);
        console.error('API error occurred:', error.message);
        return { data: 'Fallback data', status: error.status };
    }
}

// Usage remains the same
// ...

// At the end, close the database connection
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
});

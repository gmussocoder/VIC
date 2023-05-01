
const sqlite3 = require('sqlite3').verbose();
// The following function inserts a new register in the "jobs" table.
function insertJobId(jobId, modelId) {
    const db = new sqlite3.Database('C:\\Guille\\VIC\\Desarrollo\\example.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.run(`INSERT INTO jobs (job_id, model_id, status) VALUES (?, ?, ?)`,
        [jobId, modelId, 'Training'], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send({ error: 'Internal server error' });
            }
            console.log(`Job ${jobId} inserted into the database.`);
        }
    );
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
};

module.exports = { insertJobId };
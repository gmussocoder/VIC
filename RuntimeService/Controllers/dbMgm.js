// The following function gets the Model for doing inferences in the pitchProcess.
// Receives processPitch like an argument and returns the "modelPath" for searching the model.
const sqlite3 = require('sqlite3').verbose();
function getModel(manifestId) {
    const db = new sqlite3.Database('C:\\Guille\\VIC\\Desarrollo\\ModelandManifestId.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the database.');
    });
    db.get(`SELECT modelPath FROM models WHERE manifestId = ?`, [manifestId], (err, row) => {
        if (err) {
            console.error(err.message);
            console.log(`Error searching model for ${manifestId} in the database.`);
            return res.status(500).send({ error: 'Internal server error' });
        }
        if (!row) {
            res.status(404).json({ error: `Model not found for ${manifestId}` });
            return;
        }
        const modelPath = row.modelPath;
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Closed the database connection.');
        });
        return modelPath;
    });
}

function insertModel(jobId, plcId, result, imageInferencedUrl) {
    const db = new sqlite3.Database('C:\\Guille\\VIC\\Desarrollo\\inferencesResults.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.run(`INSERT INTO models (jobId, plcId, result, imageInferencedUrl) VALUES (?, ?)`, [jobId, plcId, result, imageInferencedUrl], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send({ error: 'Internal server error' });
        }
        console.log(`Model inserted successfully with ID: ${this.lastID}`);
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Closed the database connection.');
        });
    });
};
  
module.exports = { getModel, insertModel };
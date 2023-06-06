// The following function gets the Model for doing inferences in the pitchProcess.
// Receives processPitch like an argument and returns the "modelPath" for searching the model.
const sqlite3 = require('sqlite3').verbose();

function getModel(manifestId) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('C:\\Guille\\VIC\\Desarrollo\\modelAndManifestId.db', (err) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('Connected to the database.');
      });
  
      db.get(`SELECT modelPath FROM modelAndManifestIdTable WHERE manifestId = ?`, [manifestId], (err, row) => {
        if (err) {
          db.close((closeErr) => {
            if (closeErr) {
              console.error(closeErr.message);
            }
            console.log('Closed the database connection.');
          });
          reject(err);
          return;
        }
        if (!row) {
          db.close((closeErr) => {
            if (closeErr) {
              console.error(closeErr.message);
            }
            console.log('Closed the database connection.');
          });
          reject(new Error(`Model not found for ${manifestId}`));
          return;
        }
        const modelPath = row.modelPath;
        db.close((closeErr) => {
          if (closeErr) {
            console.error(closeErr.message);
          }
          console.log('Closed the database connection.');
        });
        resolve(modelPath);
      });
    });
};

function insertJobId(jobId, modelId, imageUrl) {
    const db = new sqlite3.Database('C:\\Guille\\VIC\\Desarrollo\\inferencesJobs.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.run(`INSERT INTO jobs (job_id, model_id, imageUrl, status) VALUES (?, ?, ?)`,
        [jobId, modelId, imageUrl, 'inferencing'], (err) => {
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
  
module.exports = { getModel, insertModel, insertJobId };
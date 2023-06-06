// The following function gets the Model for doing inferences in the pitchProcess.
// Receives processPitch like an argument and returns the "modelPath" for searching the model.
const sqlite3 = require('sqlite3').verbose();
//The following function response the modelPath for a manifestId Visual Inspection Check.
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
// The following function inserts Requests from AdapterService:
function insertJobId(jobId, plcId, modelId, imageUrl, status) {
    const db = new sqlite3.Database('C:\\Guille\\VIC\\Desarrollo\\Jobs.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.run(`INSERT INTO ijobs (job_id, plc_Id, model_id, imageUrl, status) VALUES (?, ?, ?)`,
        [jobId, plcId, modelId, imageUrl, status], (err) => {
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
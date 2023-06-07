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
function insertJobId(jobId, plcId, manifestId, imageUrl, status) {
    const db = new sqlite3.Database('C:\\Guille\\VIC\\Desarrollo\\Jobs.db', (err) => {
        if (err) {
            console.error(err.message);
            dbCode = 4;
        }
        console.log('Connected to the database.');
    });
    db.run(`INSERT INTO ijobs (jobId, plcId, manifestId, imageUrl, status) VALUES (?, ?, ?, ?, ?)`,
        [jobId, plcId, manifestId, imageUrl, status], (err) => {
            if (err) {
                console.error(err.message);
//                return responseObject.status(500).send({ error: 'Internal server error' });
                dbCode = 3;
                return dbCode;
            }
            console.log(`Job ${jobId} inserted into the database.`);
        }
    );
    db.close((err) => {
        if (err) {
            console.error(err.message);
            dbCode = 2;
            return dbCode;
        }
        console.log('Closed the database connection.');
    });
    dbCode = 0;
    return dbCode;
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

// Function to update the results in the "ijobs" table
function updateJobResults(jobId, results) {
  const db = new sqlite3.Database('Jobs.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');

    // Update the results in the "ijobs" table
    const updateQuery = `UPDATE ijobs SET results = ? WHERE jobId = ?`;
    db.run(updateQuery, [JSON.stringify(results), jobId], function (err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Results updated for jobId: ${jobId}`);
      }
    });

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Disconnected from the database.');
    });
  });
};

module.exports = { getModel, insertModel, insertJobId, updateJobResults };
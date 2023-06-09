const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('modelAndManifestId.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');

  // Create table
  db.run(`CREATE TABLE IF NOT EXISTS modelAndManifestIdTable (
    modelPath TEXT,
    manifestId INTEGER,
    results REAL
  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Table modelAndManifestIdTable created.');

    // Insert data
    const modelPath = 'C:/Guille/VIC/Desarrollo/pythonEnv/model/saved_model';
    const manifestId = 2;
    const results = 3.14;

    db.run(`INSERT INTO modelAndManifestIdTable (modelPath, manifestId, results)
      VALUES (?, ?, ?)`, [modelPath, manifestId, results], (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Data inserted.');

      // Close the database connection
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connection closed.');
      });
    });
  });
});

const db2 = new sqlite3.Database('Jobs.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');

  // Create table "ijobs:"
  db2.run(`CREATE TABLE IF NOT EXISTS ijobs (
    jobId TEXT,
    plcId INTEGER,
    manifestId INTEGER,
    imageUrl TEXT,
    status TEXT,
    results TEXT
  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Table ijobs created.');
  });
});
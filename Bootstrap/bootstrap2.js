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
    console.log('Table created.');

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

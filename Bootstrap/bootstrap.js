const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database
const db = new sqlite3.Database('C:\\Guille\\VIC\\Desarrollo\\modelAndManifestId.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');

  // Create the table
  db.run(`CREATE TABLE IF NOT EXISTS ModelandManifestTable (field1 TEXT, field2 INTEGER, field3 REAL)`, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Table created.');

    // Insert the initial row
    const modelPath = 'C:/Guille/VIC/Desarrollo/pythonEnv/model/saved_model';
    const manifestId = 2;
    const results = 3.14;

    db.run(`INSERT INTO ModelandManifestTable (field1, field2, field3) VALUES (?, ?, ?)`, [modelPath, manifestId, results], (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Initial row inserted.');

      // Close the database connection
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
      });
    });
  });
});
//App TM Service
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes');
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
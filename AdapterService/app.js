//AdapterService
const express = require('express');
const app = express();
const port = 4001;
const routes = require('./routes/routes');
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
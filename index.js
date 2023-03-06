const express = require('express');
const PORT = 8000;
const routes = require('./src/routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/auth', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
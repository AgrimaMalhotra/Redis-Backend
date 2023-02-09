const express = require('express');
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/auth');

const app = express();
app.use(express.json());
app.use('/auth', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
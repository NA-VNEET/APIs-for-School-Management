const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/', schoolRoutes); 

app.get('/check', (req, res) => {
  console.log("hii");
  res.send("Check route is working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

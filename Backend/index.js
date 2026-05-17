const express = require('express');
const cors = require('cors');

require('dotenv').config();
const pool = require('./DB');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend działa 🚀"
  });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});
});



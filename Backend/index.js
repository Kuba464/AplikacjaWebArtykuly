import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Backend działa 🚀"
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});
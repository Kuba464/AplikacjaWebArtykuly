const express = require("express");
const cors = require("cors");

require("dotenv").config();

const pool = require("./DB");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend działa 🚀",
  });
});

app.get("/api/articles", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        articles.id,
        title,
        pages_from,
        pages_to,
        publication_date,
        pdf_path,
        extra_file_path,
        category,
        symbol,
        (
          SELECT string_agg(a.name || ' ' || a.surname, ', ' ORDER BY a.id)
          FROM author_articles aa
          JOIN authors a ON aa.id_author = a.id
          WHERE aa.id_article = articles.id
        ) AS authors,
        (
          SELECT string_agg(t.name, ', ' ORDER BY t.name)
          FROM article_tags at
          JOIN tags t ON at.id_tag = t.id
          WHERE at.id_article = articles.id
        ) AS tags
      FROM articles
      LEFT JOIN categories ON id_category = categories.id
      ORDER BY publication_date DESC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});
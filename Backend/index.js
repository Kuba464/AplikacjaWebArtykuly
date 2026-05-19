const express = require("express");
const cors = require("cors");

require("dotenv").config();

const pool = require("./DB");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend lololo działa 🚀",
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
        string_agg(a.name || ' ' || a.surname, ', ' ORDER BY a.id) AS authors
      FROM articles
      LEFT JOIN categories
        ON id_category = categories.id
      LEFT JOIN author_articles aa
        ON aa.id_article = articles.id
      LEFT JOIN authors a
        ON aa.id_author = a.id
      GROUP BY articles.id, category, symbol
      ORDER BY publication_date DESC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// app.get("/api/szukaj", (req, res) => {
//   res.json({
//     message: "SZUKAJ DZIAŁA",
//     q: req.query.q,
//   });
// });

app.get("/api/search", async (req, res) => {
  try {
    const search = req.query.q || "";

    const result = await pool.query(
      `
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
        string_agg(a.name || ' ' || a.surname, ', ' ORDER BY a.id) AS authors
      FROM articles
      LEFT JOIN categories
        ON id_category = categories.id
      LEFT JOIN author_articles aa
        ON aa.id_article = articles.id
      LEFT JOIN authors a
        ON aa.id_author = a.id
      WHERE
        title ILIKE $1
        OR (a.name || ' ' || a.surname) ILIKE $1
      GROUP BY articles.id, category, symbol
      ORDER BY publication_date DESC;
      `,
      [`%${search}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("dzsvsdv");
  console.log(`Server działa na porcie ${PORT}`);
});
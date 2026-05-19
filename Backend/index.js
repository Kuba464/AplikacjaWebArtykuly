const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
app.use("DB/PdfFiles", express.static("DB/PdfFiles"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "pdf") {
      cb(null, "DB/PdfFiles/");
    } else {
      cb(null, "DB/ExtraFiles/");
    }
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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
async function getOrCreateTag(tagName) {
  // Sprawdzamy, czy tag o takiej nazwie już istnieje
  const existing = await pool.query(
    "SELECT id FROM tags WHERE name = $1",
    [tagName]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  // Jeśli nie istnieje, tworzymy nowy i zwracamy jego id
  const inserted = await pool.query(
    "INSERT INTO tags (name) VALUES ($1) RETURNING id",
    [tagName]
  );

  return inserted.rows[0].id;
}

async function getOrCreateAuthor(fullName) {
  // Rozbijamy tekst na imię i nazwisko (np. "Jan Kowalski")
  const parts = fullName.trim().split(" ");
  const name = parts.length > 1 ? parts[0] : "";
  const surname = parts.length > 1 ? parts.slice(1).join(" ") : parts[0];

  // Sprawdzamy czy taki autor już istnieje
  const existing = await pool.query(
    "SELECT id FROM authors WHERE name = $1 AND surname = $2",
    [name, surname]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  // Jeśli nie istnieje, dodajemy go
  const inserted = await pool.query(
    "INSERT INTO authors (name, surname) VALUES ($1, $2) RETURNING id",
    [name, surname]
  );

  return inserted.rows[0].id;
}

app.post(
  "/api/article",

  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "extraFile", maxCount: 1 },
  ]),

  async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.files);

      const {
        title,
        authors,
        tags,
        pages_from,
        pages_to,
        category,
      } = req.body;

      const categoryResult = await pool.query(
        `SELECT id, symbol FROM categories WHERE category = $1`,
        [category]
      );

      if (categoryResult.rows.length === 0) {
        return res.status(400).json({
          error: "Niepoprawna kategoria",
        });
      }

      const categoryId = categoryResult.rows[0].id;
      const symbol = categoryResult.rows[0].symbol;

      const year = new Date(Date.now())
        .getFullYear()
        .toString()
        .slice(-2);

      const countResult = await pool.query(
        `SELECT COUNT(*) FROM articles WHERE id_category = $1`,
        [categoryId]
      );

      const nextNumber = parseInt(countResult.rows[0].count) + 1;

      const paddedNumber = String(nextNumber).padStart(3, "0");

      const pdfFile = req.files.pdf[0];

      const finalPdfName =
        `${symbol}-${year}-${paddedNumber}.pdf`;

      const finalPdfPath = path.join(
        "DB/PdfFiles",
        finalPdfName
      );

      fs.renameSync(pdfFile.path, finalPdfPath);

      let extraFilePath = null;

      if (req.files.extraFile) {
        const file = req.files.extraFile[0];

        const finalExtraName =
          Date.now() + path.extname(file.originalname);

        const finalExtraPath = path.join(
          "DB/ExtraFiles",
          finalExtraName
        );

        fs.renameSync(file.path, finalExtraPath);

        extraFilePath = finalExtraPath;
      }

      const result = await pool.query(
        `INSERT INTO articles
        (title, pages_from, pages_to, id_category, pdf_path, extra_file_path)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`,
        [
          title,
          pages_from,
          pages_to,
          categoryId,
          finalPdfPath,
          extraFilePath,
        ]
      );

      const articleId = result.rows[0].id;

      const parsedAuthors = JSON.parse(authors || "[]");

      for (const author of parsedAuthors) {
        // Skoro z konsoli widać, że 'author' to czysty string (np. "aut 1")
        const authorText = typeof author === "object" ? author.fullName : author;

        if (authorText && authorText.trim() !== "") {
          // 1. Pobierz ID istniejącego autora lub stwórz nowego
          const authorId = await getOrCreateAuthor(authorText.trim());

          // 2. Zapisz powiązanie w tabeli łączącej
          await pool.query(
            "INSERT INTO author_articles (id_author, id_article) VALUES ($1, $2)",
            [authorId, articleId]
          );
        }
      }
      const parsedTags = JSON.parse(tags || "[]");

      for (const tag of parsedTags) {
        const tagText = typeof tag === "object" ? (tag.name || tag.text) : tag;

        // Ignorujemy puste stringi (np. gdy użytkownik dodał pole w formularzu, ale nic nie wpisał)
        if (tagText && tagText.trim() !== "") {
          // Pobieramy ID istniejącego tagu lub tworzymy nowy w bazie
          const tagId = await getOrCreateTag(tagText.trim());

          // Zapisujemy powiązanie artykułu z tagiem w tabeli article_tags
          await pool.query(
            "INSERT INTO article_tags (id_tag, id_article) VALUES ($1, $2)",
            [tagId, articleId]
          );
        }
      }

      res.status(201).json({
        message: "Artykuł dodany pomyślnie",
      });

     // Zmień końcówkę bloku try-catch w swoim app.post na to:
    } catch (err) {
      console.error("DOKŁADNY BŁĄD SERWERA:", err);
      
      // Zwracamy dokładną treść błędu do frontendu, żeby wyświetliła się w konsoli przeglądarki
      res.status(500).json({ 
        error: "Błąd serwera", 
        details: err.message,
        stack: err.stack 
      });
    }
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("dzsvsdv");
  console.log(`Server działa na porcie ${PORT}`);
});
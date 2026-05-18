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

async function getOrCreateKeyword(keyword) {
  const existing = await pool.query(
    "SELECT id FROM keywords WHERE keyword = $1",
    [keyword]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const inserted = await pool.query(
    "INSERT INTO keywords (keyword) VALUES ($1) RETURNING id",
    [keyword]
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
        keywords,
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
        "PdfFiles",
        finalPdfName
      );

      fs.renameSync(pdfFile.path, finalPdfPath);

      let extraFilePath = null;

      if (req.files.extraFile) {
        const file = req.files.extraFile[0];

        const finalExtraName =
          Date.now() + path.extname(file.originalname);

        const finalExtraPath = path.join(
          "ExtraFiles",
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
        await pool.query(
          "INSERT INTO author_articles (id_author, id_article) VALUES ($1, $2)",
          [author.id, articleId]
        );
      }

      const parsedKeywords = JSON.parse(keywords || "[]");

      for (const keyword of parsedKeywords) {
        const keywordId = await getOrCreateKeyword(
          keyword.text || keyword.keyword || keyword
        );

        await pool.query(
          "INSERT INTO article_keywords (id_keyword, id_article) VALUES ($1, $2)",
          [keywordId, articleId]
        );
      }

      res.status(201).json({
        message: "Artykuł dodany pomyślnie",
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Błąd serwera" });
    }
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});
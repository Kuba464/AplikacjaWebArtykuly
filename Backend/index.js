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
app.get('/api/articles', async (req, res) => {
  try {
    const result = await pool.query(`
      select title, pages_from, pages_to, publication_date, pdf_path, extra_file_path, category, symbol, 
        string_agg(a.name || ' ' || a.surname, ', ' order by a.id) as authors
        from articles 
        left join categories 
        on id_category = categories.id
        left join author_articles aa
        on aa.id_article = articles.id
        left join authors a
        on aa.id_author = a.id
        group by articles.id, category, symbol
        order by publication_date desc;
      `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});
});



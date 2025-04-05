// models/bookmark.js
import pool from '../config/database.js';

const Bookmark = {
  async create({ title, url, category }) {
    console.log('Executing create query:', { title, url, category });
    try {
      const result = await pool.query(
        'INSERT INTO bookmarks (title, url, category) VALUES ($1, $2, $3) RETURNING id',
        [title, url, category]
      );
      console.log('Create result:', result.rows[0]);
      return result.rows[0].id;
    } catch (err) {
      console.error('Create Query Error:', err.stack);
      throw err;
    }
  },

  async getAll() {
    console.log('Executing getAll query');
    try {
      const result = await pool.query('SELECT title, url, category FROM bookmarks');
      console.log('GetAll result:', result.rows);
      return result.rows;
    } catch (err) {
      console.error('GetAll Query Error:', err.stack);
      throw err;
    }
  },

  async getByCategory(category) {
    console.log('Executing getByCategory query:', category);
    try {
      const result = await pool.query(
        'SELECT title, url, category FROM bookmarks WHERE category = $1',
        [category]);
        console.log('GetByCategory result:', result.rows);
        return result.rows;
    } catch (err) {
      console.error('GetByCategory Query Error:', err.stack);
      throw err;
    }
  },

  async createBatch(bookmarks) {
    console.log('Executing createBatch query:', bookmarks);
    try {
      const ids = [];
      for (const { title, url, category } of bookmarks) {
        const result = await pool.query(
          'INSERT INTO bookmarks (title, url, category) VALUES ($1, $2, $3) RETURNING id',
          [title, url, category]
        );
        ids.push(result.rows[0].id);
      }
      console.log('CreateBatch result:', ids);
      return ids;
    } catch (err) {
      console.error('CreateBatch Query Error:', err.stack);
      throw err;
    }
  }
};

export default Bookmark;
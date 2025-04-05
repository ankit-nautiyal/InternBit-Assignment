import query from '../config/database.js';

const Bookmark = {
    async create({ title, url, category }) {
        const result = await query(
        'INSERT INTO bookmarks (title, url, category) VALUES ($1, $2, $3) RETURNING id',
        [title, url, category]
        );
        return result.rows[0].id;
    },

    async getAll() {
        const result = await query('SELECT title, url, category FROM bookmarks');
        return result.rows;
    },

    async getByCategory(category) {
        const result = await query(
        'SELECT title, url FROM bookmarks WHERE category = $1',
        [category]
        );
        return result.rows;
    },

    async createBatch(bookmarks) {
        const ids = [];
        for (const { title, url, category } of bookmarks) {
        const result = await query(
            'INSERT INTO bookmarks (title, url, category) VALUES ($1, $2, $3) RETURNING id',
            [title, url, category]
        );
        ids.push(result.rows[0].id);
        }
        return ids;
    }
};

export default Bookmark;
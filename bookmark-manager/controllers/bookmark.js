// controllers/bookmark.js
import Bookmark from '../models/bookmark.js';

const BookmarkController = {
    async createBookmark(req, res) {
        const { title, url, category } = req.body;
        if (!title || !url || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        try {
            const id = await Bookmark.create({ title, url, category });
            res.status(201).json({ id, message: 'Bookmark added' });
        } catch (err) {
        console.error(err);
            console.error('Controller Error:', err.stack); // Detailed logging
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    },

    async getAllBookmarks(req, res) {
        try {
        const bookmarks = await Bookmark.getAll();
        res.json(bookmarks);
        } catch (err) {
        console.error(err);
        console.error('Controller Error:', err.stack); // Detailed logging
        res.status(500).json({ error: 'Database error', details: err.message });
        }
    },

    async getBookmarksByCategory(req, res) {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }
        try {
            const bookmarks = await Bookmark.getByCategory(category);
            res.json(bookmarks);
        } catch (err) {
            console.error('Controller Error:', err.stack); // Detailed logging
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    },

    async createBatchBookmarks(req, res) {
        const bookmarks = req.body;
        if (!Array.isArray(bookmarks) || bookmarks.length === 0) {
        return res.status(400).json({ error: 'Array of bookmarks required' });
        }
        try {
        for (const { title, url, category } of bookmarks) {
            if (!title || !url || !category) {
            return res.status(400).json({ error: 'Missing fields in a bookmark' });
            }
        }
        const ids = await Bookmark.createBatch(bookmarks);
        res.status(201).json({ ids, message: 'Bookmarks added' });
        } catch (err) {
            console.error('Controller Error:', err.stack); // Detailed logging
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    }
};

export default BookmarkController;
// routes/bookmark.js
import express from 'express';
import BookmarkController from '../controllers/bookmark.js';

const router = express.Router();

router.route('/')
  .post(BookmarkController.createBookmark);

router.route('/all')
  .get(BookmarkController.getAllBookmarks);

router.route('/category')
  .get(BookmarkController.getBookmarksByCategory);

router.route('/batch')
  .post(BookmarkController.createBatchBookmarks);

export default router;
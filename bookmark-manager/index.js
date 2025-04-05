// index.js
import 'dotenv/config';
import express from 'express';
import bookmarkRoutes from './routes/bookmark.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/bookmarks', bookmarkRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
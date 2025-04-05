Below is a detailed `README.md` file for your Bookmark Manager project, designed for GitHub. It includes instructions on how to run the project locally and steps to connect to Nhost PostgreSQL without exposing credentials. It’s written in a clear, professional, and beginner-friendly tone, suitable for a public repository.

---

# Bookmark Manager Backend

A simple, scalable REST API backend for managing bookmarks, built with Node.js, Express.js, and Nhost PostgreSQL. This project allows users to save, retrieve, and categorize website bookmarks efficiently. It follows an MVC (Model-View-Controller) architecture for modularity and uses `express.Router` to organize API endpoints.

## Features
- **Add a Bookmark**: Save a single bookmark with a title, URL, and category (`POST /bookmarks`).
- **List All Bookmarks**: Retrieve all saved bookmarks (`GET /bookmarks/all`).
- **Filter by Category**: Fetch bookmarks for a specific category (`GET /bookmarks/category`).
- **Batch Add Bookmarks**: Add multiple bookmarks in one request (`POST /bookmarks/batch`).

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: Nhost PostgreSQL Cloud Service
- **Architecture**: MVC pattern with ES Modules (ESM)

## Prerequisites
Before running the project, ensure you have:
- **Node.js**: Version 20.x or higher (tested with v20.15.1) - [Download](https://nodejs.org/)
- **npm**: Comes with Node.js
- **Nhost Account**: Sign up at [nhost.io](https://nhost.io) to get a PostgreSQL database.
- **Git**: To clone the repository - [Download](https://git-scm.com/)

## How to Run the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/ankit-nautiyal/InternBit-Assignment.git
cd bookmark-manager
```

### 2. Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add your Nhost PostgreSQL connection string:
```
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
PORT=3000
```
- Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your Nhost credentials (see "Connecting to Nhost PostgreSQL" below).
- `PORT` is optional; defaults to 3000 if not specified.

**Note**: Do not commit `.env` to GitHub. It’s already included in `.gitignore`.

### 4. Start the Server
Run the application:
```bash
node index.js
```
You should see:
```
Connected to Nhost PostgreSQL
Server running on port 3000
```
The API will be available at `http://localhost:3000`.

### 5. Test the API
Use a tool like [Postman](https://www.postman.com/) or `curl` to test the endpoints:
- **Add a Bookmark**:
  ```bash
  curl -X POST http://localhost:3000/bookmarks \
  -H "Content-Type: application/json" \
  -d '{"title":"Cool Recipe","url":"https://recipe.com","category":"Food"}'
  ```
  Response: `{"id":1,"message":"Bookmark added"}`

- **Get All Bookmarks**:
  ```bash
  curl http://localhost:3000/bookmarks/all
  ```
  Response: `[{"title":"Cool Recipe","url":"https://recipe.com","category":"Food"}]`

- **Get Bookmarks by Category**:
  ```bash
  curl http://localhost:3000/bookmarks/category?category=Food
  ```
  Response: `[{"title":"Cool Recipe","url":"https://recipe.com"}]`

- **Batch Add Bookmarks**:
  ```bash
  curl -X POST http://localhost:3000/bookmarks/batch \
  -H "Content-Type: application/json" \
  -d '[{"title":"Tech Blog","url":"https://tech.com","category":"Tech"},{"title":"News","url":"https://news.com","category":"News"}]'
  ```
  Response: `{"ids":[2,3],"message":"Bookmarks added"}`

## Connecting to Nhost PostgreSQL

This project uses Nhost’s PostgreSQL Cloud Service as its database. Follow these steps to set it up:

### 1. Sign Up for Nhost
- Go to [nhost.io](https://nhost.io) and sign up using GitHub or email.

### 2. Create a New Project
- In the Nhost Dashboard, click “Create Your First Project.”
- Name your project (e.g., “BookmarkManager”), choose a region, and click “Create Project.”
- Wait a few minutes for the project to initialize.

### 3. Get the Database Connection String
- In the Nhost Dashboard, navigate to the **“Database”** section in the sidebar.
- Look for the PostgreSQL connection string under “Connection Info” or a similar tab. It will look like:
  ```
  postgres://<username>:<password>@<host>:<port>/<database>
  ```
- Copy this string (e.g., `postgres://postgres:aB12cd34ef56gh78@db.xyz123.nhost.run:5432/postgres`).

### 4. Configure the Database Schema
- In the Nhost Dashboard, go to **“Database”** > **“SQL Editor”**.
- Run this SQL to create the `bookmarks` table:
  ```sql
  CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- Click “Run” to execute the query.
- Verify the table exists under **“Data”** > **“bookmarks”**.

### 5. Add the Connection String to `.env`
- Paste the connection string into your `.env` file as `DATABASE_URL` (see Step 3 under "How to Run the Project Locally").
- Do not share this string publicly, as it contains sensitive credentials.

## Project Structure
```
bookmark-manager/
├── config/
│   └── database.js      # Database connection setup
├── models/
│   └── bookmark.js      # Database queries (Model)
├── controllers/
│   └── bookmark.js      # Request handlers (Controller)
├── routes/
│   └── bookmark.js      # API route definitions
├── .env                 # Environment variables (not committed)
├── .gitignore           # Git ignore file
├── index.js             # Main server entry point
├── package.json         # Project metadata and dependencies
└── README.md            # This file
```

## Notes
- **ES Modules**: This project uses ESM (`"type": "module"` in `package.json`), so all imports use `import` syntax.
- **Error Handling**: Basic error handling is implemented; enhance it as needed for production use.
- **Scalability**: The MVC structure makes it easy to add new features (e.g., authentication, tags).

## Contributing
Feel free to fork this repository, submit issues, or create pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (create one if needed).

---

### Notes for You
- **Credentials**: I’ve avoided including any sample credentials, keeping it generic with placeholders.
- **License**: If you want to add a `LICENSE` file, run `npm init -y` (if not already done) and add a simple MIT License text, or skip that section in the README.
- **GitHub**: Replace `https://github.com/your-username/bookmark-manager.git` with your actual repo URL once you push it.

To add this to your project:
1. Create a file named `README.md` in the root directory.
2. Copy-paste the content above.
3. Adjust any paths or details (e.g., repo URL) as needed.

Let me know if you want to tweak it further (e.g., add a deployment section or more details)!

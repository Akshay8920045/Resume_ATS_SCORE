# Resume Analyzer Backend

This is a minimal Node.js + Express backend to support the Ai_Resume_Anlyzer frontend.

Features:
- Upload PDF resumes (POST /api/resumes/analyze)
- Extract PDF text (pdf-parse)
- Call Google Generative Language API (optional, configured via `GLA_API_KEY`)
- Fallback to a mock analyzer if external API fails
- List resumes: GET /api/resumes
- Get resume by id: GET /api/resumes/:id

Quick start

1. Install dependencies

```powershell
cd server
npm install
```

2. Create `.env` (or set env vars):

- `GLA_API_KEY` = your Google Generative Language API key (optional)
- `PORT` = 5000 (optional)

3. Start server

```powershell
npm run dev # requires nodemon
# or
npm start
```

The frontend expects the API at `http://localhost:5000/api` by default. See `client/.env`.

Notes

- Keep your API key secret. Do not commit your `.env` to git.
- This implementation uses an in-memory store (array). Replace with a database for production.
- The exact Google API request/response shape can vary by version -- code falls back to a mock if the response isn't parseable.

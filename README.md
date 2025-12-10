## TinyLink

TinyLink is a take-home friendly URL shortener inspired by bit.ly. It lets you create branded short links, track clicks, and manage redirects from a polished dashboard that is ready for automated grading.

### Features
- **Dashboard** (`/`): create links with optional custom codes, search/filter, inline validation, copy buttons, delete actions, empty/loading/error states.
- **Stats page** (`/code/:code`): deep dive into clicks, timestamps, and quick access to the live short link.
- **Redirects** (`/:code`): HTTP 302 redirect that increments click counters and tracks `last_clicked`.
- **Health check** (`/healthz`): returns `{ ok: true, version, uptime }` for monitoring.
- **REST API**:
  - `POST /api/links` – create link (409 on duplicate code)
  - `GET /api/links` – list links
  - `GET /api/links/:code` – fetch single link
  - `DELETE /api/links/:code` – delete link

### Tech stack
- Next.js App Router (Node runtime) + React 19
- Tailwind CSS v4 (utility-first styling in `globals.css`)
- Neon/Postgres via `pg` Pool (serverless-friendly)
- Client data fetching with `swr`
- Validation with `zod`

### Getting started
1. Copy `.env.example` to `.env.local` and fill in values:
   ```bash
   cp .env.example .env.local
   ```
   - `DATABASE_URL`: Postgres connection string (Neon recommended)
   - `NEXT_PUBLIC_BASE_URL`: public URL (e.g. `https://tinylink-wheat-nine.vercel.app`)
2. Install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```
3. Visit `http://localhost:3000` for the dashboard, `http://localhost:3000/api/healthz` for the health check.

> The first database query automatically ensures the `links` table exists, so a dedicated migration step is optional for quick starts. For production, run the `CREATE TABLE` statement from `lib/db.ts` manually or via your preferred migration tool.

### Deployment notes
- **Vercel**: add `DATABASE_URL` + `NEXT_PUBLIC_BASE_URL` in project settings. Neon works well with the SSL config already included in `lib/db.ts`.
- **Render/Railway**: build with `npm run build`, start with `npm start`.
- Ensure the public URL you deploy to matches `NEXT_PUBLIC_BASE_URL` so copy buttons output the right short link.

### Testing checklist
| Scenario | How to verify |
| --- | --- |
| Health check | `curl https://<host>/api/healthz` returns 200 with JSON body |
| Create link | POST `/api/links` with `{ "url": "https://example.com" }` |
| Duplicate rejection | Repeat POST with a custom `code` to trigger 409 |
| Redirect increments | Open `/:code` repeatedly, stats page updates clicks/last clicked |
| Delete stops redirect | DELETE `/api/links/:code`, then `/:code` returns 404 |

### Deliverables
Please include in your submission:
1. **Production URL** (Vercel/Render/Railway + Neon)
2. **GitHub repository**
3. **Video walkthrough** of the app & code (loom/screen recording)
4. **LLM transcript** (share your ChatGPT/Cursor link)

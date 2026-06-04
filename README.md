# Dynamic PDF Template Management System

A production-oriented full-stack app for managing PDF templates, saving theme and typography settings, previewing documents in real time, generating PDFs with Puppeteer, and downloading generated files.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, Axios, TanStack Query, React Hook Form, Zustand, dnd-kit
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, Puppeteer
- Uploads: Multer with optional Cloudinary storage
- Docs: Swagger/OpenAPI at `/api/docs`
- Tests: Jest and Supertest

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment files:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. Start MongoDB locally or set `MONGODB_URI` to MongoDB Atlas.

4. Seed example templates:

   ```bash
   npm run seed --workspace backend
   ```

5. Run both apps in separate terminals:

   ```bash
   npm run dev:backend
   npm run dev:frontend
   ```

6. Open:

   - Frontend: `http://localhost:5173`
   - Backend health: `http://localhost:5000/api/health`
   - Swagger docs: `http://localhost:5000/api/docs`

## MongoDB Atlas Guide

1. Create an Atlas cluster.
2. Create a database user.
3. Add your IP address or deployment provider IP to Network Access.
4. Copy the Node.js connection string.
5. Set `MONGODB_URI` in `backend/.env` and Render environment variables.

## Cloudinary Guide

Logo upload works locally by saving files in `backend/uploads`. For production Cloudinary storage, set:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

When these values exist, uploads are sent to Cloudinary and the returned secure URL is saved in the configuration.

## Deployment

### Backend on Render

Use `backend/render.yaml` or create a Web Service manually:

- Root directory: `backend`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Required env vars: `NODE_ENV=production`, `MONGODB_URI`, `FRONTEND_URL`, `FRONTEND_URLS`
- Optional env vars: Cloudinary credentials

### Frontend on Vercel

Import the repository and set:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://your-render-service.onrender.com/api`

### Frontend on Netlify

Use the root `netlify.toml` config or create a site manually:

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`
- Environment variable: `VITE_API_URL=https://your-backend-host/api`

### Backend on Railway

Create a Railway service from the `backend` folder:

- Build: Nixpacks
- Start command: `npm start`
- Required env vars: `NODE_ENV=production`, `MONGODB_URI`, `FRONTEND_URL`, `FRONTEND_URLS`
- Optional env vars: Cloudinary credentials

## API Highlights

- `GET /api/templates`
- `GET /api/templates/:id`
- `POST /api/templates`
- `PUT /api/templates/:id`
- `DELETE /api/templates/:id`
- `GET /api/templates/default`
- `POST /api/templates/save`
- `GET /api/templates/configuration`
- `GET /api/templates/configuration/export`
- `POST /api/templates/configuration/import`
- `POST /api/templates/reorder`
- `POST /api/pdf/generate`
- `POST /api/pdf/preview`
- `POST /api/pdf/download`
- `POST /api/upload/logo`

## Testing

```bash
npm run test --workspace backend
npm run test:coverage --workspace backend
```

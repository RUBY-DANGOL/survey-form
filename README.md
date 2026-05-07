# Dynamic Survey Builder

A full-stack survey platform that lets admins build dynamic surveys with conditional logic, collect public responses, and review friendly analytics in a cozy pastel gamer-style UI.

## What This App Does
- Admins build surveys with dynamic questions and optional conditional logic.
- Users fill out surveys at a public link and submit responses.
- Admins view analytics per question.

## Features
- Admin dashboard to create, edit, delete, and manage surveys
- Dynamic question types: text, single choice, multi-select, rating (1-5)
- Conditional logic for showing questions based on previous answers
- Public survey pages with validation and cute success flow
- Analytics dashboard with per-question insights
- RESTful API with MongoDB persistence

## Tech Stack
**Frontend:** React (Vite), JavaScript, Tailwind CSS, React Router, Axios

**Backend:** Node.js, Express.js

**Database:** MongoDB with Mongoose

## Quick Start (Local)

### 1) Backend
1. Go to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file using the example:
   - Copy `backend/.env.example` to `backend/.env`
4. Start the server: `npm run dev`

The backend runs on `http://localhost:5000` by default.

### 2) Frontend
1. Go to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

The frontend runs on `http://localhost:5173` by default.

## How It Works (High Level)
1. Admin creates a survey in the dashboard.
2. Survey structure is stored in MongoDB (`surveys` collection).
3. Public users submit responses via `/survey/:id`.
4. Responses are stored in MongoDB (`responses` collection).
5. Analytics endpoint aggregates responses per question.

## Folder Structure
```
dynamic-survey-builder/
  frontend/
    src/
      api/
      components/
      pages/
      styles/
      utils/
      App.jsx
      main.jsx
    package.json

  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      server.js
    package.json

  README.md
```

## REST API Documentation

### Survey APIs
- `POST /api/surveys`
- `GET /api/surveys`
- `GET /api/surveys/:id`
- `PUT /api/surveys/:id`
- `DELETE /api/surveys/:id`

### Response APIs
- `POST /api/surveys/:id/responses`
- `GET /api/surveys/:id/responses`

### Analytics API
- `GET /api/surveys/:id/analytics`

## Architecture Decisions
- Use a clean separation between controllers, routes, models, and middleware for scalability.
- Store answers as arrays of `{ questionId, value }` to keep responses flexible for dynamic forms.
- Implement conditional logic both on the frontend (rendering) and backend (validation).

## Database Architecture

**Collections**
- `surveys`
- `responses`

**ASCII ER Diagram**
```
   surveys (1)                         responses (many)
   --------------------               ---------------------
   _id (ObjectId)   <---------------  surveyId (ObjectId)
   title                               answers[]
   description                         submittedAt
   questions[]
   createdAt
   updatedAt

   questions[] contains:
      - id
      - type
      - label
      - required
      - options[]
      - condition { questionId, operator, value }

   answers[] contains:
      - questionId
      - value
```

## Request Flow (Simple)
```
Admin UI -> POST /api/surveys -> MongoDB (surveys)
Public UI -> POST /api/surveys/:id/responses -> MongoDB (responses)
Admin UI -> GET /api/surveys/:id/analytics -> aggregated results
```

**Survey Document**
- `_id`: ObjectId
- `title`: string (required)
- `description`: string
- `questions`: array of question objects
- `createdAt`: date
- `updatedAt`: date

**Question Object**
- `id`: string
- `type`: `text | single | multi | rating`
- `label`: string
- `required`: boolean
- `options`: string[] (for `single` and `multi`)
- `condition`: object or null

**Condition Object**
- `questionId`: string
- `operator`: `equals`
- `value`: mixed

**Response Document**
- `_id`: ObjectId
- `surveyId`: ObjectId (references `surveys._id`)
- `answers`: array of answer objects
- `submittedAt`: date

**Answer Object**
- `questionId`: string
- `value`: mixed

## Assumptions
- Single admin role (no authentication in this baseline).
- Surveys are publicly accessible via ID links.
- Conditional logic uses a simple equals operator.

## Trade-offs
- No authentication to keep the demo focused and fast to evaluate.
- Minimal UI iconography without external assets to stay lightweight.

## Known Limitations
- Conditional logic uses exact match only.
- No survey versioning or draft states.
- Basic validation only; no internationalization.

## Future Improvements
- JWT authentication and admin roles
- Rate limiting and spam protection
- Save partial responses
- Survey versioning and revisions
- More advanced logic operators (contains, greater-than)

## Tools Used For Skills
- **Frontend development:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend development:** Node.js, Express.js, Nodemon
- **Database integration:** MongoDB, Mongoose
- **API testing/debugging:** MongoDB Compass, browser dev tools

## Links (Placeholders)
- GitHub repository: [REPLACE_WITH_REPO_URL]
- Live URL: [REPLACE_WITH_LIVE_URL]
- Demo video: [REPLACE_WITH_DEMO_VIDEO_URL]

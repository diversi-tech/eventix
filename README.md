# SmartCart Project

A web application for tracking supermarket items and prices, with an Express.js backend API and React frontend.

## Prerequisites

- Node.js (v14+)
- Yarn
- Git

## Quick Start

### Backend

```bash
# Navigate to backend directory
cd packages/backend

# Install dependencies
yarn install

# Create .env file
echo "PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000" > .env

# Start dev server
yarn dev
```

The backend runs at http://localhost:3001

### Frontend

```bash
# Navigate to frontend directory
cd packages/frontend

# Install dependencies
yarn install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:3001/api" > .env.development

# Start dev server
yarn start
```

The frontend runs at http://localhost:3000

## Development

- Run both backend and frontend servers in separate terminals
- Both servers auto-reload on code changes

## Building for Production

### Backend

```bash
cd packages/backend
yarn build
yarn start  # Run production server
```

### Frontend

```bash
cd packages/frontend
yarn build  # Creates static files in build/ directory
```

## Deployment

### Backend
Deploy to Render.com:
- Build: `cd packages/backend && yarn install && yarn build`
- Start: `cd packages/backend && yarn start`

### Frontend
Deploy to Vercel/Netlify:
- Build: `cd packages/frontend && yarn install && yarn build`
- Output: `packages/frontend/build`
- Set `REACT_APP_API_URL` to production backend URL
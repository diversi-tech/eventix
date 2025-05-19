# Meals and Events Together Project

A web application for creating and sharing events/meals, with an Express.js backend API and React frontend.

## Prerequisites

- Node.js (v22+)
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
echo "SUPABASE_URL=https://bpjdnjpmiaikmswdxqwx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwamRuanBtaWFpa21zd2R4cXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzODQzMjcsImV4cCI6MjA2MTk2MDMyN30.fDU_xsEWQN3r0HosHSeaXiAcckV-1hnhBdXHIooS0B0" >> .env

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

### Backend - Deploying to Render.com
This project uses Render for backend hosting. The deployment process is fully automated:
- All merges to the `main` branch automatically trigger a new deployment
- No manual deployment steps required after initial project setup
- Pull requests automatically create preview deployments

### Frontend - Deploying to Vercel.com
This project uses Vercel for frontend hosting. The deployment process is fully automated:
- All merges to the `main` branch automatically trigger a new deployment
- No manual deployment steps required after initial project setup
- Pull requests automatically create preview deployments

Make sure to set the `REACT_APP_API_URL` environment variable in Vercel to point to your Render backend URL.

## Deployment troubleshooting

The env variables need to be changed in render/vercel.
In render we must make sure not to set NODE_ENV to production because then we don't get the types installed (use `dev` instead)
In vercel we must set the REACT_APP_API_URL manually. For some reason it doesn't take from the .env.production
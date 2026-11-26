# RDV Humanoid Research Platform

A React + Vite research website and interactive demo dashboard for the RDV humanoid robot project.

## Requirements
- Node.js 18.0 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

Vite outputs the production website to `dist/`.

## Deploy on Vercel
Import the GitHub repository into Vercel, or use the already-linked `humanoid` project.

Recommended settings:
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: `./`

If the Vercel project is already connected to this repository, pushing the files to the `main` branch should trigger a deployment automatically.

## Dashboard data status
All dashboard readings in this starter project are illustrative demo data. They are not connected to a physical robot, ROS 2, Gazebo or MuJoCo. Do not cite them as experimental results.

## Planned integration
A later phase can add a secure backend/bridge for ROS 2 and simulation telemetry, with authentication and validation before exposing robot data to the public dashboard.

# Eyesee Native

Native desktop application for Eyesee surveillance system built with Electron + Vite + React + TypeScript.

## Prerequisites

- Node.js 18+ 
- npm or pnpm
- Backend server running (parent project)

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your backend server URL:
```env
VITE_API_BASE_URL=http://your-server-ip:3000
VITE_MEDIAMTX_URL=http://your-server-ip:8889
VITE_MEDIAMTX_API=http://your-server-ip:9997
VITE_MEDIAMTX_RTSP=your-server-ip:8554
VITE_MAPS_URL=http://your-server-ip:8080
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start Vite dev server:
```bash
npm run dev
```

3. In another terminal, start Electron (after Vite is running):
```bash
npm run electron:dev
```

Or use the combined command:
```bash
npm run electron:dev
```

## Building

1. Build the React app:
```bash
npm run build
```

2. Package the Electron app:
```bash
npm run electron:build
```

The installer will be in the `dist` folder.

## Project Structure

```
eyesee-native/
├── electron/          # Electron main process
├── src/
│   ├── components/    # React components
│   ├── pages/         # Route pages
│   ├── routes/        # React Router config
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   ├── store/         # Jotai state management
│   ├── lib/           # Utilities
│   ├── config/        # Configuration
│   └── types/         # TypeScript types
├── public/            # Static assets
└── dist/              # Build output
```

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Desktop**: Electron
- **Routing**: React Router v6
- **State**: Jotai
- **Data Fetching**: React Query
- **Styling**: Tailwind CSS + DaisyUI
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI


## Component Migration

To copy components from the parent project:

1. Run the copy script:
```bash
copy-components.bat
```

2. Follow the refactoring guide:
```bash
# See REFACTORING_GUIDE.md for details
```

Common refactoring needed:
- Remove `"use client"` directives
- Replace `next/navigation` with `react-router-dom`
- Replace `next/image` with `<img>`
- Replace `useSession` with `useAuth`

## Notes

- This app requires a running backend server (the parent Next.js project)
- Authentication is handled via JWT tokens stored in localStorage
- Video streaming uses HLS.js and FLV.js
- CORS is disabled in Electron (`webSecurity: false`) for API calls

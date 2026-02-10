
## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.17
- PNPM >= 9.0.0

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd hono-vite-pnpm-starter

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Development URLs

- **API Server**: http://localhost:8787
- **Web App**: http://localhost:5173
- **API Proxy**: http://localhost:5173/api (proxied to API server)

## 📜 Available Scripts

### Root Level

```bash
pnpm dev          # Start both API and web in development mode
pnpm build        # Build both API and web for production
pnpm start        # Start the API server in production mode
pnpm typecheck    # Run TypeScript checks across all apps
```

### API App (`apps/api`)

```bash
pnpm -C apps/api dev         # Start API in development mode
pnpm -C apps/api build       # Build API for production
pnpm -C apps/api start       # Start API in production mode
pnpm -C apps/api typecheck   # TypeScript check for API
```

### Web App (`apps/web`)

```bash
pnpm -C apps/web dev         # Start web app in development mode
pnpm -C apps/web build       # Build web app for production
pnpm -C apps/web preview     # Preview production build
pnpm -C apps/web typecheck   # TypeScript check for web app
```

## 🛠️ API Endpoints

The API server provides the following endpoints:

- `GET /` → Returns `OK` status
- `GET /hello/:name` → Returns `{ message: "Hello NAME!" }`

### Example Usage

```bash
# Test the API directly
curl http://localhost:8787/hello/World

# Or through the web app proxy
curl http://localhost:5173/api/hello/World
```

## 🏭 Production Deployment

### Build for Production

```bash
pnpm build
```

This will:
1. Compile TypeScript for the API (`apps/api/dist/`)
2. Build the React app for production (`apps/web/dist/`)

### Start Production Server

```bash
pnpm start
```

This starts only the API server. For the web app, you can:
- Serve the built files with any static file server
- Use `pnpm -C apps/web preview` for testing

## 🔧 Configuration

### Environment Variables

Create `.env` files in the respective app directories:

**`apps/api/.env`**
```env
PORT=8787
NODE_ENV=development
```

**`apps/web/.env`**
```env
VITE_API_URL=http://localhost:8787
```

### Proxy Configuration

The web app is configured to proxy `/api` requests to the API server during development. This is configured in `apps/web/vite.config.ts`.

## 📁 Adding New Apps

To add a new app to the monorepo:

1. Create a new directory in `apps/`
2. Add a `package.json` with a name following the pattern `@starter/app-name`
3. The app will automatically be included in the workspace

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hono](https://hono.dev/) - Ultrafast web framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [PNPM](https://pnpm.io/) - Fast, disk space efficient package manager
import { Express } from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupVite(app: Express) {
  if (process.env.NODE_ENV === "production") {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "../dist/public")));
  } else {
    // Development: create Vite server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
  }
}
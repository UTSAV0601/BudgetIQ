import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Express } from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString("en-US", { hour12: false });
  console.log(`${time} [${source}] ${message}`);
}

export async function setupVite(app: Express) {
  const vite = await (await import("vite")).createServer({
    root: path.join(__dirname, "..", "client"),
    server: { middlewareMode: true },
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const distPath = path.join(__dirname, "..", "dist", "public");
  
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}
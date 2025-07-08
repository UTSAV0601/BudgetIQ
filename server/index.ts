import express from "express";
import { createServer } from "http";
import { setupVite } from "./vite.js";
const app = express();
const server = createServer(app);
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Setup Vite for development
await setupVite(app, server);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
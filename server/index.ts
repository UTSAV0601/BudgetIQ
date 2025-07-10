import express from "express";
import { createServer } from "http";
import { setupAuth } from "./oauthAuth.js";
import { setupLocalAuth } from "./localAuth.js";
import { setupVite } from "./vite.js";

const app = express();
const server = createServer(app);

app.use(express.json());

// Setup authentication
await setupAuth(app);
await setupLocalAuth(app);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Setup Vite for development
await setupVite(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
import express from "express";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  await setupVite(app);
} else {
  serveStatic(app);
}

app.listen(port, "0.0.0.0", () => {
  log(`Server running on port ${port}`);
});
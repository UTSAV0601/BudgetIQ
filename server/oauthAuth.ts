import { Express, RequestHandler } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db.js";

const PgSession = connectPgSimple(session);

export async function setupAuth(app: Express) {
  app.use(
    session({
      store: new PgSession({
        pool: pool,
        tableName: "user_sessions",
      }),
      secret: process.env.SESSION_SECRET || "dev-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    })
  );

  // OAuth login route placeholder
  app.post("/api/auth/login", (req, res) => {
    res.json({ message: "OAuth login endpoint" });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).json({ error: "Authentication required" });
  }
};
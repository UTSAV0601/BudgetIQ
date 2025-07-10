import { Express } from "express";
import { db } from "./db.js";
import { users, insertUserSchema } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function setupLocalAuth(app: Express) {
  // Register new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const [newUser] = await db
        .insert(users)
        .values(userData)
        .returning();
      
      req.session.user = { id: newUser.id, email: newUser.email };
      res.json({ user: newUser });
    } catch (error) {
      res.status(400).json({ error: "Registration failed" });
    }
  });

  // Login user  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email } = req.body;
      
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.session.user = { id: user.id, email: user.email };
      res.json({ user });
    } catch (error) {
      res.status(400).json({ error: "Login failed" });
    }
  });
}
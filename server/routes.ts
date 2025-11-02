import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateFortune } from "./openai";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth endpoint to get current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Fortune generation endpoint (works for both authenticated and anonymous users)
  app.post("/api/fortune", async (req: any, res) => {
    try {
      const fortune = await generateFortune();

      const fortuneData = {
        cardName: fortune.cardName,
        fortuneText: fortune.fortuneText,
        cardImage: fortune.cardImage
      };

      // Link fortune to user if authenticated
      const userId = req.isAuthenticated() ? req.user?.claims?.sub : null;

      // Store fortune in database
      await storage.createFortune({
        userId,
        cardName: fortune.cardName,
        fortuneText: fortune.fortuneText,
        cardImage: fortune.cardImage,
        readingType: 'single-card',
        isShared: false,
      });

      res.json(fortuneData);
    } catch (error) {
      console.error("Fortune generation error:", error);
      res.status(500).json({ 
        error: "The spirits are unable to communicate at this time" 
      });
    }
  });

  // Get fortune history (optional, for future enhancement)
  app.get("/api/fortunes", async (req, res) => {
    try {
      const fortunes = await storage.getAllFortunes();
      res.json(fortunes);
    } catch (error) {
      console.error("Error fetching fortunes:", error);
      res.status(500).json({ error: "Failed to retrieve fortune history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

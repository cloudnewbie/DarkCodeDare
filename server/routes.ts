import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateFortune } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Fortune generation endpoint
  app.post("/api/fortune", async (req, res) => {
    try {
      const fortune = await generateFortune();

      const fortuneData = {
        cardName: fortune.cardName,
        fortuneText: fortune.fortuneText,
        cardImage: fortune.cardImage
      };

      // Store fortune in database
      await storage.createFortune({
        userId: null,
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

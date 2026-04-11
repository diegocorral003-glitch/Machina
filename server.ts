import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, useMaps } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY not found");

      const ai = new GoogleGenAI({ apiKey });
      
      let modelName = "gemini-3.1-pro-preview";
      let tools: any[] = [];

      if (useMaps) {
        modelName = "gemini-2.5-flash";
        tools = [{ googleMaps: {} }];
      }

      const chatHistory = history || [];
      const contents = [
        ...chatHistory,
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          tools: tools.length > 0 ? tools : undefined,
        }
      });

      const text = response.text;
      
      // Extract grounding metadata if available
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

      res.json({ text, groundingMetadata });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/generate-video", async (req, res) => {
    try {
      const { prompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY not found");

      const ai = new GoogleGenAI({ apiKey });
      
      // Using Veo model for video generation
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p', // fast-generate supports 720p
            aspectRatio: '16:9'
        }
      });

      // In a real app we would poll, but for this prototype we might just return the operation info
      // or wait a bit. The SDK example shows polling.
      // For simplicity in this turn-based interaction, we'll send back the operation to poll on client or handle basic wait.
      
      res.json({ operation });
    } catch (error: any) {
      console.error("Video error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production (if built)
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

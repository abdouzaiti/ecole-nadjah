import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for ChatBot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, systemInstruction } = req.body;
      let apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

      // Handle placeholder from .env.example or missing key
      if (!apiKey || apiKey === "your_api_key_here" || apiKey === "MY_GEMINI_API_KEY") {
        console.error("GEMINI_API_KEY is not configured or is still a placeholder.");
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured. If you are deploying to Vercel, add it to your Environment Variables. If you are in AI Studio, ensure your API key is configured in the Secrets panel." 
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      if (!response.text) {
        throw new Error("Empty response from AI model");
      }

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Server Chat Error:", error);
      res.status(500).json({ error: error.message || "Failed to get AI response" });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

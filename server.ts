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
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'your_api_key_here') {
        console.error("GEMINI_API_KEY is missing or using placeholder value.");
        return res.status(500).json({ error: "API key not configured on the server." });
      }

      // Ensure messages start with user and follow user-model sequence
      // Gemini expects the first message in multi-turn contents to be from 'user'
      let formattedContents = messages;
      if (Array.isArray(messages) && messages.length > 0 && messages[0].role === 'model') {
        formattedContents = messages.slice(1);
      }

      if (formattedContents.length === 0) {
        return res.status(400).json({ error: "No user messages provided." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: formattedContents,
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
      res.status(500).json({ 
        error: error.message || "Failed to get AI response",
        details: process.env.NODE_ENV !== 'production' ? error.stack : undefined 
      });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: !!process.env.GEMINI_API_KEY });
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

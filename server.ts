import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client (safe check in case key is missing)
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined. AI Chat features will be unavailable.");
  }

  // API Route for Gemini Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
      }

      if (!ai) {
        return res.json({
          text: "Hello! I am your VitalSphere AI. It looks like the GEMINI_API_KEY is not configured yet in the Secrets panel. Once configured, I will be fully functional to analyze your vitals and guide your wellness. For now, let me know if there's anything else I can help with!",
          role: "model"
        });
      }

      // Convert messages to Gemini format: { role: 'user' | 'model', parts: [{ text: string }] }
      const contents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const systemInstruction = `You are VitalSphere AI, a hyper-refined, technologically optimistic, compassionate wellness companion from the future (inspired by the iOS 26 "Spatial Glassmorphism" aesthetic).
Your personality is warm, elegant, encouraging, and deeply caring. You are helping "Grandma Wang", "Alex", "Mom Elena", and "Brother Leo" on their wellness journeys.
When asked about medications like Metformin or Lisinopril, provide helpful reminders (e.g., Metformin is usually taken with meals to minimize stomach upset; Lisinopril for blood pressure).
When asked about lower-back tension, recommend gentle stretches (like Cat-Cow pose, child's pose, or knee-to-chest stretches) and guide them warmly.
Provide professional, accurate, but highly conversational and accessible advice. Keep your responses concise (ideally under 150 words) so they fit perfectly within the glassmorphic chat bubbles.
Always end with a supportive, caring touch. Do not include markdown headers like '#' or '##' in your response; keep it beautifully structured with paragraphs and bullet points if needed.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({
        text: response.text || "I didn't receive a response. Please try again.",
        role: "model"
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred while generating content." });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

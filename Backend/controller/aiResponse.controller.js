import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai";
dotenv.config()
const aiResponse = async (req, res) => {
  const { prompt } = req.body
  try {
    const api = process.env.OPEN_AI_API;
    const apiKey = process.env.OPEN_AI_API_KEY;
    if (!prompt || prompt.trim().length === 0) return res.status(400).json({ status: 400, data: "prompt is required to get doc content" })
   console.log(" hi")
const ai = new GoogleGenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

    console.log(" by ",response.candidates?.[0]?.content.parts?.[0]?.text)

    if (!response) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.candidates?.[0]?.content.parts?.[0]?.text || "⚠️ AI did not return content.";

    return res.status(200).json({
      status: 200,
      data: data,
    });

  } catch (error) {
    console.error("AI generation ", error);
    return res.status(503).json({ status: 503, data: "⚠️ Failed to generate content." });
  }
}
export default aiResponse
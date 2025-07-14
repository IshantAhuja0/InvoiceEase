import dotenv from "dotenv"
dotenv.config()
const aiResponse = async (req, res) => {
  const { prompt } = req.body
  try {
    const api = process.env.OPEN_AI_API;
    const apiKey = process.env.OPEN_AI_API;
    if (!prompt || prompt.trim().length === 0) return res.status(400).json({ status: 400, data: "prompt is required to get doc content" })
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-2.0-flash",
        messages: [
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      status: 200,
      data: data.choices?.[0]?.message?.content || "⚠️ AI did not return content.",
    });

  } catch (error) {
    console.error("AI generation error:", error.message);
    return res.status(503).json({ status: 503, data: "⚠️ Failed to generate content." });
  }
}
export default aiResponse
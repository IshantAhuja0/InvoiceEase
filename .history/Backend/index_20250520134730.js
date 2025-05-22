import express from "express";
import registerUser from "./Routes/RegisterUser.js";
import cors from "cors";
import { connectDB } from "./Mongo/mongo.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Minimal test route
app.get("/", (req, res) => {
  res.send("✅ Server is up");
});

// Main POST route
app.post("/api/register", async (req, res) => {
  console.log("📥 Received register request");
  const { name, email, mobile, password } = req.body;
  try {
    const resp = await registerUser({ name, email, mobile, password });
    if (resp) {
      return res.status(200).send({
        status: 200,
        message: "User registered successfully",
      });
    }
    res.status(400).send({
      status: 400,
      message: "Error occurred while registering",
    });
  } catch (err) {
    console.error("❌ Error in /api/register:", err);
    res.status(500).send({
      status: 500,
      message: "Internal server error",
    });
  }
});

// Connect DB and start server
try {
  console.log("🔁 Connecting to MongoDB...");
  const dbConnection = await connectDB();
  console.log("✅ Connected to DB");

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ Failed to connect to DB or start server:", err);
}

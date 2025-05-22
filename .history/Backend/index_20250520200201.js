import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("✅ Server is up");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });

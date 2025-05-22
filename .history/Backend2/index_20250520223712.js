import express from "express";
import cors from "cors";
import { connectDB } from "./Mongo/mongo.js";
import route from "./Routes/Route.js";
import dontenv from 'dotenv';
dontenv.config();


const app = express();
app.use(cors());
app.use(express.json());
const PORT =  5000;

// Minimal test route
app.get("/", (req, res) => {
  res.send("✅ Server is up");
});

app.use('/', route);

// // Connect DB and start server
connectDB()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  })
})
.catch ((err)=> console.error("❌ Failed to connect to DB or start server:", err))
// // try {
//   console.log("🔁 Connecting to MongoDB...");
//   const dbConnection = await connectDB();
//   console.log("✅ Connected to DB");

//   app.listen(PORT, () => {
//     console.log(`🚀 Server running at http://localhost:${PORT}`);
//   });
// } catch (err) {
//   console.error("❌ Failed to connect to DB or start server:", err);
// }

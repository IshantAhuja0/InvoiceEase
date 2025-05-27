import express from "express";
import cors from "cors";
import { connectDB } from "./Mongo/mongo.js";
import route from "./Routes/Route.js";
import authRoute from "./Routes/authRoute.js";
import verifyJWT from "./Middlewares/verifyJWT.js";
// import dotenv from 'dotenv'
// dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

// Minimal test route
app.get("/", (req, res) => {
  res.send("✅ Server is up");
});

app.use('/', route);
app.use('/', verifyJWT,authRoute);

// Connect DB and start server
 connectDB()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  })
})
.catch ((err)=> console.error("❌ Failed to connect to DB or start server:", err))


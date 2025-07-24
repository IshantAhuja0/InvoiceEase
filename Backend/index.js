import dotenv from 'dotenv'
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { connectDB } from "./Mongo/mongo.js";
import route from "./Routes/Route.js";
import authRoute from "./Routes/authRoute.js";
import verifyJWT from "./Middlewares/verifyJWT.js";
const app = express();
app.use(cors({
  origin: ['https://invoice-ease-iota.vercel.app','http://localhost:5173','https://doc-sprint.vercel.app/'],
  credentials: true               
}));
app.use(express.json());
app.use(cookieParser())
// const PORT = 5000;
const PORT = process.env.PORT||5000;

// Minimal test route
app.get("/", (req, res) => {
  console.log(res)
  res.send("✅ Server is up");
});

app.use('/api', route);
app.get('/api/healthcheck', (req,res)=>{
  res.status(200).send("server is running fine. Health 100%")
});
app.use('/api/protected', verifyJWT,authRoute);

// Connect DB and start server
 connectDB()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  })
})
.catch ((err)=> console.error("❌ Failed to connect to DB or start server:", err))


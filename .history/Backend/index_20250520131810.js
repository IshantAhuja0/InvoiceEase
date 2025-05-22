import express from "express"
import registerUser from "./Routes/RegisterUser.js"
import cors from 'cors'
import { connectDB } from "./Mongo/mongo.js";

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 5000;

app.post('/api/register', async (req, res) => {
  const { name, email, mobile, password } = req.body
  try {
    const resp = registerUser({ name, email, mobile, password })
    if(resp){
      res.send({
        status: 200,
        message: 'user registered successfully'
      })
      return;
    }
    res.send({
      status: 400,
      message: 'error occured while register'
    })
  }
  catch (err) {
    console.log('error occured in backend index.js line 12 ' + err)
    res.send({
      status: 400,
      message: 'error occured while register'
    })
  }
})
try {
  const dbConnection = await connectDB();
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })

} catch (error) {
  console.log('error in listening to port or db connection backend index.js line 35')
}
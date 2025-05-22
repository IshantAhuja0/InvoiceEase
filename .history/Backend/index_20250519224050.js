import express from 'express';
import registerUser from './Routes/RegisterUser';
import cors from 'cors';
import db from 'mongo.js'
const app=express();
app.use(cors());
app.use(express.json())
const PORT =process.env.PORT || 5000;

app.post('/api/register',async (req,res)=>{
  const {name,email,mobile,password}=req.body
  try{
const resp=registerUser({name,email,mobile,password})
  }
  catch(err){
    console.log('error occured in backend index.js line 12 '+err)
  }
})

app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})
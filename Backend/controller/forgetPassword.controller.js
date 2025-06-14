import { getDB } from "../Mongo/mongo.js";
import mailOTP from "../util/mailOTP.js";
function generateSixDigitOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body
    console.log(email)
    if (!email) return res.status(401).json({ status: 401, message: "email is required to reset password" })
    const db = await getDB()
    const collection = db.collection("register_users")
    const userExist = await collection.findOne({ email })
    if (!userExist) return res.status(404).json({ status: 404, message: "user with provided email doesn't exist!register to proceed" })
    console.log(userExist)
    const result = generateSixDigitOTP()
    console.log("1")
    const response = await mailOTP(email, result)
    console.log(response)
    console.log("2")
    return res.status(200).json({ status: 200, data: result, message: "opt generated" })
  } catch (error) {
    return res.status(500).json({ status: 500, message: "failed to generate opd ! Internal sever error", error: error })
  }
}
export { forgetPassword }
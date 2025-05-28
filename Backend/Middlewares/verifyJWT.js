import jwt from "jsonwebtoken";
// import  dotenv  from "dotenv";
// dotenv.config()
const verifyJWT = async (req, res, next) => {
  let token = req.body.token
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Access denied. Token missing.'
    });
  }
  try {
    const decodeToken = jwt.verify(token, "secretKeyInvoice")
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodeToken
    next()
  }
  catch (error) {
    return { valid: false, error: err.message };
  }
}
export default verifyJWT;
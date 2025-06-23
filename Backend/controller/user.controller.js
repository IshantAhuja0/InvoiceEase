import bcrypt from 'bcrypt';
import { getDB } from '../../Backend/Mongo/mongo.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let db = await getDB();
    let collection = db.collection('register_users');
    let result = await collection.findOne({ email });

    if (!result) {
      console.log('User not found!');
      return res.status(401).json({
        status: 401,
        message: "User not found . Invalid email !"
      })
    }

    let matchPassword = await bcrypt.compare(password, result.password);
    if (!matchPassword) {
      console.log("Password doesn't match");
      return res.status(402).json({
        status: 402,
        message: "Password doesn't matched!"
      })
    }
    const payload = {
      name: result.name,
      mobile: result.mobile,
      email: result.email,
      id: result._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    const options = {
      //through these our cookies are only modifiable through backend and can only be accessed not modified in frontend
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    }
    return res.status(200)
      .cookie("accessToken", token, options)
      .send({
        status: 200,
        message: 'Login successful',
        userId: result._id,
        token
      });
  } catch (error) {
    console.log('Error occurred while logging in user:', error);
    res.status(500).send({ status: 500, message: 'Login failed', error: error.message });
  }
};

const checkAlreadyLoginForRegister = async ({ email }) => {
  try {
    let db = await getDB();
    let collection = db.collection('register_users');
    let result = await collection.findOne({ email });

    if (!result) {
      return { status: 404, message: 'User not found, all set for register' };
    }

    return { status: 200, message: 'User exists', userId: result._id };
  } catch (error) {
    console.log('Error occurred in checkLoginForRegister:', error);
    return { status: 500, message: 'Internal server error' };
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).send({
        status: 400,
        message: "All fields are required",
      });
    }

    // Check if user is already registered
    const checkLogin = await checkAlreadyLoginForRegister({ email });

    if (checkLogin.status !== 404) {
      return res.status(409).send({
        status: 409,
        message: 'User is already registered'
      });
    }
    const db = await getDB();
    const collection = db.collection('register_users');

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await collection.insertOne({
      name,
      email,
      mobile,
      password: hashedPassword,
      createdAt: new Date()
    });

    if (!result.acknowledged) {
      console.error("Problem inserting user into DB");
      return res.status(500).send({
        status: 500,
        message: "User not registered, problem while inserting in DB (RegisterUser.js)"
      });
    }

    const payload = {
      name,
      email,
      mobile,
      id: result.insertedId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    const options = {
      //through these our cookies are only modifiable through backend and can only be accessed not modified in frontend
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    }
    return res.status(201)
      .cookie("accessToken", token, options)
      .send({
        status: 201,
        message: "User registered successfully",
        userId: result.insertedId,
        token
      });
  } catch (err) {
    console.error('❌ Error in RegisterUser.js:', err.message);
    return res.status(500).send({
      status: 500,
      message: "Error occurred while registering",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = req.user
    const email = user?.email
    if (!email) {
      return res.status(401).json({ status: 401, message: "user is not logged in" })
    }
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax'
    }
    return res.status(200)
      .clearCookie("accessToken", options)
      .json({ status: 200, message: "User logged out" })

  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal server error.failed to logout user" })

  }
}
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    // Validate input
    if (!email || !newPassword) {
      return res.status(400).json({
        status: 400,
        message: "Email and new password are required to change the password.",
      });
    }
    const db = await getDB();
    const collection = db.collection("register_users");
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(email,newPassword)
    const result = await collection.updateOne(
      { email },
      { $set: { password: hashedPassword } },
    );
    console.log("result : "+result)
    if (result.matchedCount === 0) {
      return res.status(401).json({
        status: 401,
        message: "Provided email is not registered. Please check or register first.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Password updated successfully.",
    });

  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while updating password.",
    });
  }
};

export { login, checkAlreadyLoginForRegister, registerUser, logoutUser, resetPassword };

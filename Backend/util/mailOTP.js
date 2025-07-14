import dotenv from "dotenv"
dotenv.config()
import nodemailer from 'nodemailer'
function mailOTP(email, otp) {
  const autherEmail = process.env.EMAIL
  const key = process.env.EMAIL_KEY
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: autherEmail,
        pass: key, // Gmail App Password
      },
    });

    console.log(email, otp); // ✅ Correct

    const mailOptions = {
      from: autherEmail,
      to: email,
      subject: '🔐 Your OTP for Password Reset - InvoiceEase',
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>OTP Email</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f9fafb;">
    <div style="width: 100%; padding: 20px; box-sizing: border-box;">
      <div style="max-width: 600px; width: 100%; margin: auto; background-color: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="text-align: center; color: #1e3a8a; margin-bottom: 10px;">🔐 Password Reset Request</h2>
        <p style="text-align: center; color: #4b5563; font-size: 16px; margin-bottom: 30px;">
          Use the OTP below to reset your password.
        </p>

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; background-color: #1e40af; color: white; padding: 18px 30px; font-size: 32px; font-weight: bold; letter-spacing: 6px; border-radius: 10px; box-shadow: 0 0 8px rgba(30,64,175,0.3);">
            ${otp}
          </div>
        </div>

        <p style="font-size: 14px; color: #374151; text-align: center; margin-bottom: 24px;">
          ⚠️ This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"/>

        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          Didn’t request a password reset? You can safely ignore this email.
        </p>

        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          This is an automated message from <strong>InvoiceEase</strong>.
        </p>
      </div>
    </div>
  </body>
  </html>
  `,
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
        reject("❌ Oops! There was an issue booking your appointment. Please try again later.");
      } else {
        console.log('Email sent:', info.response);
        resolve("✅ Your appointment has been successfully booked. See you soon!");
      }
    });
  });
}

export default mailOTP;

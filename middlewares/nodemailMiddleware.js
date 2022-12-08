import nodemailer from "nodemailer";
import otpMail from "../mail_templates/OTPMail.js";
import welcomeMail from "../mail_templates/WelcomeMail.js";



export const sendWelcomeEmail = async (email, link) => {

  const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_EMAIL, // generated ethereal user
      pass: process.env.NODEMAILER_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {

    await transporter.sendMail({
      from:  process.env.USER,
      to: email,
      subject: "Welcome to SongHaven",
      html: welcomeMail(link),
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};


export async function sendOtpEmail (email, OTP) {

  const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_EMAIL, // generated ethereal user
      pass: process.env.NODEMAILER_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.sendMail({
      from:  process.env.USER,
      to: email,
      subject: "SongHaven OTP code",
      html: otpMail(OTP),
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

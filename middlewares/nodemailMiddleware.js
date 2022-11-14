import nodemailer from "nodemailer";



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
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas click the link below to verify your account</p>
        <a href="http://${process.env.HOSTNAME}:${process.env.PORT}/user/verifyAccount/${link}"> Click Here</a>
   </div>
    `,
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
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>a request to reset your password has been received.</h2>
        <h4>Please enter the following code in the app to reset your password ✔</h4>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>
   </div>
    `,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

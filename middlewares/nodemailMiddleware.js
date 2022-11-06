import nodemailer from "nodemailer";



const sendEmail = async (email, subject, text,code) => {
  try {
    
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

    await transporter.sendMail({
      from:  process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
export default sendEmail;

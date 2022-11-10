import otpGenerator from "otp-generator";


const generateOTP = () => {
    const OTP_LENGTH = 4;
    const OTP_CONFIG = {
        digits: true,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false
      };

    const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};

export default generateOTP;

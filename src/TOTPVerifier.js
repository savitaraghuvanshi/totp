const jsotp = require("jsotp");
import React from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { readSecret } from "./TOTPDB";

const TOTPVerifier = ({ user ,storageType , period=30}) => {
  if (!user) {
    throw Error("user cant be blank");
  }

  return (
    <OTPInputView
      pinCount={6}
      autoFocusOnLoad
      codeInputFieldStyle={{
        backgroundColor: "#d9d9d9",
        color: "black",
        fontWeight: "900",
        borderRadius: 3,
      }}
      onCodeFilled={(userTotpToken) => verifyTOTP(user, userTotpToken, storageType , period)}
    />
  );
};

const verifyTOTP = async (user, userTotpToken, storageType,period) => {
  let secret = await readSecret(user, storageType);
  alert("Read secret to verify" + secret);
  console.log("Read secret to verify", secret);
  console.log("userTotpToken", userTotpToken);

  if (secret) {
    const verified = jsotp.TOTP(secret, period).verify(userTotpToken);
    alert("TOTP verified ? " + verified);
    console.debug("User", user, "> TOTP verified ? ", verified);
    return verified;
  } else {
    console.log(
      "User",
      user,
      "> No secret found against which we can verify this TOTP"
    );
  }
};

export { verifyTOTP };
export default TOTPVerifier;

const jsotp = require("jsotp");
import React, { useEffect, useState ,View} from "react";
import { readSecret } from "./TOTPDB";
import QRCode from "react-native-qrcode-svg";

const TOTPGenerator = ({ user  , period=30 , storageType ,   QRCodeComponent = (TOTPValue) =>{return QRCodeDefaultComponent(TOTPValue)}}) => {
  const [TOTPValue, setTOTPValue] = useState(null);
  useEffect(() => {
    const setTotp = async () => {
      let totp = await generateTOTPForUser(user, storageType,period);
      alert("generated totp is " + totp);
      let totpData = {
        user: user,
        totp: totp,
      };
      setTOTPValue(JSON.stringify(totpData));
    };
    setTotp();
  }, []);
 return QRCodeComponent(TOTPValue)
};


const QRCodeDefaultComponent = (TOTPValue) => {
  console.log("Default QR Code component rendered:",TOTPValue);
  return TOTPValue && <QRCode value={TOTPValue} ecl="M" size={270} quietZone={20} />
};

const generateTOTPForUser = async (user,storageType,period) => {
  let secret = await readSecret(user, storageType);
  if(secret==null){
    throw Error("No Secret can be retrieved from "+ storageType);
  }
  return  await generateTOTP(secret,period );
};

const generateTOTP = async (secret,period) => {
  const token = jsotp.TOTP(secret, period).now();
  console.log(token);
  return token;
};

export { generateTOTPForUser };
export default TOTPGenerator;

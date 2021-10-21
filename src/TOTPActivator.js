import React, { useEffect, useState } from "react";
import { generateSecret } from "./SecretGenerator";
import QRCode from "react-native-qrcode-svg";
import { readSecret, removeSecret } from "./TOTPDB";
import StorageType from "./StorageType";

const TOTPActivator = ({ user = "NoName", issuer = "Sita", storageType , period }) => {
  const [totpUrl, setTotpUrl] = useState(null);
  useEffect(() => {
    const getTOTPUrl = async () => {
      let secret = await readSecret(user, StorageType.DB);
      if (!secret) {
        secret = await generateSecret(user , true, StorageType.DB);
      }
      console.log("secret used in URL",secret)
      let otpauth_url =
        "otpauth://totp/" + user + "?secret=" + secret + "&issuer=" + issuer + "&period=" + period ;
      console.log("otpauth_url",otpauth_url)
      setTotpUrl(otpauth_url);
    };
    getTOTPUrl();
  }, []);

  return (
    totpUrl && <QRCode value={totpUrl} ecl="M" size={270} quietZone={20} />
  );
};

const disableTOTP = (user,srorageType) => {
  removeSecret(user, srorageType);
};
export { disableTOTP };
export default TOTPActivator;

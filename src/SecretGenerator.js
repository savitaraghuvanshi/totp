import { randomBytes } from "react-native-randombytes";
import base32 from "hi-base32";
import { saveSecret } from "./TOTPDB";
import React, { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import StorageType from "./StorageType";

const SecretGenerator = ({ user }) => {
  const [totpSecret, setTotpSecret] = useState(null);
  useEffect(() => {
    const setSecret = async () => {
      let secret = await generateSecret(user, true, StorageType.CACHE);
      alert("Genearted secret" + secret);
      let secretQRCodeData = {
        user: user,
        secret: secret,
      };
      setTotpSecret(JSON.stringify(secretQRCodeData));
    };
    setSecret();
  }, []);

  return (
    totpSecret && (
      <QRCode value={totpSecret} ecl="M" size={270} quietZone={20} />
    )
  );
};

const generateSecret = async (user, doSave, storageType) => {
  let secret = generateSecretASCII(32, false);
  secret = base32.encode(Buffer(secret)).toString().replace(/=/g, "");
  if (doSave) {
    await saveSecret(user, secret, storageType);
  }
  return secret;
};

const generateSecretASCII = (length, symbols) => {
  var bytes = randomBytes(length || 32);
  var set = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  if (symbols) {
    set += "!@#$%^&*()<>?/[]{},.:;";
  }

  var output = "";
  for (var i = 0, l = bytes.length; i < l; i++) {
    output += set[Math.floor((bytes[i] / 255.0) * (set.length - 1))];
  }
  return output;
};

export { generateSecret };
export default SecretGenerator;

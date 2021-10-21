import React, { useState } from "react";
import { View } from "react-native";
import { RNCamera } from "react-native-camera";
import { cacheData } from "./TOTPCache";

const QrCodeSecretScanner = ({
  onScan = (scannedData) =>
    console.log(
      "This log is in default callback function , onScan param callback function not passed in QrCodeSecretScanner component , scannedData:",
      scannedData
    ),
}) => {
  const [cameraActive, setCameraActive] = useState(true);

  const handleScannedQRCodeData = (event) => {
    console.log("event.data", event.data);
    let json = JSON.parse(event.data);
    console.log("user", json.user);
    console.log("secret", json.secret);
    
    cacheData(json.user, json.secret);

    setCameraActive(false);
    if (event.data) {
      onScan(event.data);
    }
  };

  const camera = () => {
    if (cameraActive === true) {
      return (
        <RNCamera
          style={[{ flex: 1, width: "100%", overflow: "hidden" }]}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          onBarCodeRead={handleScannedQRCodeData}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
        />
      );
    }
  };

  return <View style={{ flex: 1 }}>{camera()}</View>;
};

export default QrCodeSecretScanner;

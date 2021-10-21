import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {TOTPActivator, TOTPVerifier, disableTOTP, SecretGenerator,QrCodeSecretScanner,StorageType,TOTPGenerator} from 'react-native-sita-totp';
import QRCode from "react-native-qrcode-svg";

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: '#841584',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [enableTOTP, setEnableTOTP] = useState(false);
  const [shareSecret, setShareSecret] = useState(false);
  const [shareTOTP, setShareTOTP] = useState(false);
  const [verifyTOTP, setVerifyTOTP] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const [scanTOTPQRCode, setscanTOTPQRCode] = useState(false);

  const period = 300

  const handleScannedQRCodeData = scannedData => {
    //console.log('scannedData is:::::::::::::::', scannedData);
   
  };

  const QRCodeComponent = (TOTPValue) => {
    console.log("custom qr code rendered")
    return TOTPValue && <QRCode value={TOTPValue} ecl="M" size={270} quietZone={20} />
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
    <SafeAreaView>
      <ScrollView>
        <View
          >

        <Section >
            <Button
              onPress={() => setShareSecret(!shareSecret)}
              title="Holder Share Secret"
              color="#008000"
            />
          </Section>

          {shareSecret && (
            <Section>
              <SecretGenerator user="SavitaHolder8"/>
            </Section>
          )}

        <Section>
            <Button
              onPress={() => setscanTOTPQRCode(!scanTOTPQRCode)}
              title="verifier Scan Secret"
              color="#841584"
            />
          </Section>  

          <Section >
            <Button
              onPress={() => setShareTOTP(!shareTOTP)}
              title="Holder Share proof with TOTP"
              color="#008000"
            />
          </Section>

          {shareTOTP && (
            <Section>
              <TOTPGenerator user="SavitaHolder8" period={period} storageType={StorageType.CACHE} QRCodeComponent={QRCodeComponent}/>
            </Section>
          )}

        <Section >
            <Button
              onPress={() => setVerifyTOTP(!verifyTOTP)}
              title="Verifier Verify TOTP with proof"
              color="#841584" 
            />
          </Section>

          {verifyTOTP && ( <Section title="Verifier Verify TOTP with proof">
              <TOTPVerifier user="SavitaHolder8" storageType={StorageType.CACHE} period={period}/>
            </Section>
           )}
          <Section>
            <Button
              onPress={() => setEnableTOTP(!enableTOTP)}
              title="Enable 2 Factor Authentication(DB)"
              color="#0000FF"
            />
          </Section>
          {enableTOTP && (
            <Section title="Scan this qr code from google authenticator">
              <TOTPActivator user="SavitaHolder8" issuer="Sita" period={period}/>
            </Section>
          )}

          {enableTOTP && (
            <Section title="Enter 6 digit TOTP code from google authenticator">
              <TOTPVerifier user="SavitaHolder8" storageType={StorageType.DB} period={period}/>
            </Section>
          )}

          <Section>
            <Button
              onPress={() => {
                disableTOTP('SavitaHolder8',StorageType.DB);
                alert('totp disabled');
              }}
              title="Disable 2 Factor Authentication(DB)"
              color="#0000FF"
              accessibilityLabel="Learn more about this purple button"
            />
          </Section>

          <Section>
            <Button
              onPress={() => {
                disableTOTP('SavitaHolder8',StorageType.CACHE);
                alert('totp disabled');
              }}
              title="Disable 2 Factor Authentication(Cache)"
              color="#0000FF"
              accessibilityLabel="Learn more about this purple button"
            />
          </Section>



        </View>
      </ScrollView>
    </SafeAreaView>

{ scanTOTPQRCode && (
  <QrCodeSecretScanner                  
        onScan={handleScannedQRCodeData}
      />
    )}

    
    </>
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: .5,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

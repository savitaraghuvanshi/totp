# react-native-sita-totp

Time-based One-time Password (TOTP) is a algorithm that generates a one-time password (OTP) which uses the current time as a source of uniqueness
This library has 3 components TOTPActivator , TOTPVerifier , disableTOTP to activate , verify and disable totp respectively .

## Getting started

`$ npm install react-native-sita-totp --save`

### installation

`$ react-native link react-native-sita-totp`

## Usage

```javascript
import {TOTPActivator , TOTPVerifier , disableTOTP} from "react-native-sita-totp"

<TOTPActivator user="SavitaHolder8" issuer="Sita" />
<TOTPVerifier user="SavitaHolder8" />
<Button onPress={() => disableTOTP("SavitaHolder8")} title="Disable 2 Factor Authentication"/>

```
Note : Refer an example project  https://repo.aticloud.aero/blockchain/covid-demo/indicio/sita-totp/tree/master/example/TOTPExample 
// main index.js

import { NativeModules } from 'react-native';
import TOTPActivator, {disableTOTP} from './src/TOTPActivator';
import TOTPVerifier,{verifyTOTP} from './src/TOTPVerifier';
import TOTPGenerator , {generateTOTPForUser} from './src/TOTPGenerator';
import SecretGenerator ,  {generateSecret} from './src/SecretGenerator';
import QrCodeSecretScanner from './src/QrCodeSecretScanner';
import {cacheData} from './src/TOTPCache';
import StorageType from './src/StorageType';


const { SitaTotp } = NativeModules;

export default SitaTotp;
export {TOTPActivator , TOTPVerifier ,verifyTOTP, disableTOTP,generateTOTPForUser,TOTPGenerator,QrCodeSecretScanner,cacheData , SecretGenerator , generateSecret,StorageType};

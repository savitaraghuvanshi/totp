import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataFromCache, cacheData , clearCache } from "./TOTPCache";
import StorageType from './StorageType';

const saveSecret = async (userName, secret, storageType) => {
  return storageType === StorageType.DB ? saveSecretInDB(userName, secret) : cacheData(userName, secret);
};
const saveSecretInDB = async (userName, secret) => {
  await AsyncStorage.setItem(userName, secret);
  console.debug("User", userName, "> Secret saved in DB",secret);
};

const readSecret = async (userName, storageType) => {
  return storageType === StorageType.DB ? readSecretFromDB(userName) : getDataFromCache(userName);
};
const readSecretFromDB = async (userName) => {
  const secret = await AsyncStorage.getItem(userName);
  console.debug("User", userName, "> Secret read from db",secret);
  return secret;
};

const removeSecret = async (userName, storageType) => {
  storageType === StorageType.DB ? await AsyncStorage.removeItem(userName): clearCache(userName)
  console.debug("User", userName, "> Secret removed");
};

export { saveSecret, readSecret, removeSecret };

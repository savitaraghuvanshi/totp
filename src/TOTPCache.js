import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-community/async-storage";

const cacheValidityThresholdInSeconds = 3600; // 1 hour

const cache = new Cache({
  namespace: "SitaCache",
  policy: {
    maxEntries: 50000,
  },
  backend: AsyncStorage,
});

const cacheData = async (key, data) => {
  if (key && data) {
    let cacheObj = {
      data: data,
      timestamp: Date.now(),
    };
    await cache.set(key, cacheObj);
    console.log("Cached data for key", key, cacheObj);
  }
};

const getDataFromCache = async (key) => {
  const cachedObj = await cache.get(key);
  console.log("Got cached data for key", key, cachedObj);
  if (cachedObj && (await isCacheValid(cachedObj))) {
    return cachedObj.data;
  }
};

const clearCache = async (key) => {
  await cache.remove(key)
  console.log('Removed data from cache for key ', key)
};

const isCacheValid = async (cachedObj) => {
  console.log("Checking cache validity ");
  const cacheTimeDurationInSeconds = Math.floor(
    (Date.now() - cachedObj.timestamp) / 1000
  );
  console.log(
    "cacheTimeDurationInSeconds :",
    cacheTimeDurationInSeconds,
    "cacheValidityThresholdInSeconds : ",
    cacheValidityThresholdInSeconds
  );
  if (cacheTimeDurationInSeconds < cacheValidityThresholdInSeconds) {
    console.log("Hurre !!!!! Cache is valid ");
    return true;
  }
  console.log("Sorry !! Cache is NOT valid ");
};

export { cacheData, getDataFromCache , clearCache};

import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../locales/i18n";

export const addToArrayAndStore = async (key, newStrings) => {
  try {
    // Retrieve existing data
    const storedData = await AsyncStorage.getItem(key);
    const existingArray = storedData ? JSON.parse(storedData) : [];

    // Add new strings to the array
    // const updatedArray = [...existingArray, ...newStrings];
    // if (typeof newStrings === "string") {
    existingArray.push(newStrings);
    // }

    // Store updated array back to AsyncStorage
    await AsyncStorage.setItem(key, JSON.stringify(existingArray));

    console.log("Updated Array:", existingArray);
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const getStoredArray = async (key) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Storage cleared!");
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};

export const getArrayLength = async (key) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    const parsedArray = storedData ? JSON.parse(storedData) : [];

    // console.log("Array Length:", parsedArray.length);
    return parsedArray.length;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return 0; // Return 0 in case of an error
  }
};

// Function to store a single variable
export const storeVariable = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Stored ${key}:`, value);
  } catch (error) {
    console.error("Error storing variable:", error);
  }
};

// Function to retrieve the variable
export const getVariable = async (key) => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : 0;
  } catch (error) {
    console.error("Error retrieving variable:", error);
    return null;
  }
};

// Example Usage
// storeVariable("userScore", 42);
// getVariable("userScore").then((value) => console.log("Retrieved:", value));

export const replaceToArrayAndStore = async (key, newStrings) => {
  try {
    // Determine if newStrings is an array; if not, wrap it in an array.
    const newArray = Array.isArray(newStrings) ? newStrings : [newStrings];

    // Directly override the existing AsyncStorage data with the new array.
    await AsyncStorage.setItem(key, JSON.stringify(newArray));

    console.log("New Array Stored:", newArray);
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const setLanguage = async (language) => {
  try {
    await AsyncStorage.setItem("appLanguage", language);
    i18n.changeLanguage(language);
  } catch (error) {
    console.log("Error saving language:", error);
  }
};

export const getLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("appLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      return savedLanguage;
    }
    return i18n.language;
  } catch (error) {
    console.log("Error retrieving language:", error);
  }
};

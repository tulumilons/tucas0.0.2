import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translatedPhrasesPortuguese } from "../phrases/translatedPhrasesPortuguese";
import { phrases } from "../phrases/phrases";
import { styles } from "../styles/styles";
import {
  addToArrayAndStore,
  getStoredArray,
  clearStorage,
  getArrayLength,
  storeVariable,
  getVariable,
} from "../store_data/store_data";
import { audios } from "../audios/phrasesAudios";
import { Audio } from "expo-av";
import { useTranslation } from "react-i18next";
import { getLanguage } from "../store_data/store_data";
import i18n from "../locales/i18n";

const playSound = async (index) => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      // require("../audios/goodMorning.mp3")
      // require("../audios/goodMorning.mp3")
      audios[index]
    );
    await sound.playAsync();

    // Optional: unload the sound when done
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.log("Error playing sound:", error);
  }
};
function Home({ navigation }) {
  const { t } = useTranslation();
  const [phrasesCount, setPhrasesCount] = useState(0);
  const [index, setI] = useState(0); //remove
  const [isResetViewVisible, setIsResetViewVisible] = useState(false);
  const [isResetViewReallyVisible, setIsResetViewReallyVisible] =
    useState(false);

  const { width, height } = Dimensions.get("window");
  const [isDisabled, setIsDisabled] = useState(false);
  const [easyCount, setEasyCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const fetchPhraseCounts = async () => {
        const easy = await getStoredArray("EasyPhrases");
        const medium = await getStoredArray("MediumPhrases");
        const hard = await getStoredArray("HardPhrases");

        setEasyCount(easy.length);
        setMediumCount(medium.length);
        setHardCount(hard.length);
      };

      fetchPhraseCounts();
    }, [])
  );
  // Load the saved index when the component mounts
  useEffect(() => {
    const loadIndex = async () => {
      try {
        const savedIndex = await AsyncStorage.getItem("@index");
        if (savedIndex !== null) {
          setI(parseInt(savedIndex, 10));
        }
      } catch (error) {
        console.error("Error loading index:", error);
      }
    };

    loadIndex();
  }, []);

  // Save the index whenever it changes
  useEffect(() => {
    const saveIndex = async () => {
      try {
        await AsyncStorage.setItem("@index", index.toString());
      } catch (error) {
        console.error("Error saving index:", error);
      }
    };

    saveIndex();
  }, [index]);

  // Load the saved phrasesCount when the component mounts
  useEffect(() => {
    const loadPhrasesCount = async () => {
      const count = await getVariable("@phrasesCount");
      setPhrasesCount(count);
    };

    loadPhrasesCount();
  }, []);

  // Save phrasesCount whenever it changes
  useEffect(() => {
    storeVariable("@phrasesCount", phrasesCount);
  }, [phrasesCount]);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Cleared");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleCloseModalTranslated = () => {
  //   setmodalTranslatedContentVisible(false);
  // };
  const handlePress = async () => {
    // Ensure we’re not exceeding the phrases array
    if (phrasesCount < phrases.length - 1) {
      const currentPhrase = phrases[phrasesCount];
      const currentTranslated = translatedPhrasesPortuguese[phrasesCount];
      const currentAudio = phrasesCount;

      // Retrieve the current stored arrays or default to an empty array
      const storedEasyPhrases = (await getStoredArray("EasyPhrases")) || [];
      const storedTranslated =
        (await getStoredArray("EasyPhrasesTranslatedPortuguese")) || [];

      // Check if the phrase is already included before adding
      if (!storedEasyPhrases.includes(currentPhrase)) {
        addToArrayAndStore("EasyPhrases", currentPhrase);
        addToArrayAndStore(
          "EasyPhrasesTranslatedPortuguese",
          currentTranslated
        );
        addToArrayAndStore("EasyAudios", currentAudio);
        console.log(`Added EasyAudios: ${currentAudio}`);
        console.log("audios before lookup: ", audios);
      } else {
        console.log(`Duplicate detected for EasyPhrase: ${currentPhrase}`);
      }

      // Similarly, perform the check for the translated phrase
      // if (!storedTranslated.includes(currentTranslated)) {
      //   addToArrayAndStore(
      //     "EasyPhrasesTranslatedPortuguese",
      //     currentTranslated
      //   );
      //   console.log(`Added Translated Phrase: ${currentTranslated}`);
      // } else {
      //   console.log(
      //     `Duplicate detected for Translated Phrase: ${currentTranslated}`
      //   );
      // }

      // You can log the stored arrays to verify changes
      getStoredArray("EasyPhrases").then((data) =>
        console.log("Stored EasyPhrases: ", data)
      );
      getStoredArray("EasyPhrasesTranslatedPortuguese").then((data) =>
        console.log("Stored Translated Phrases: ", data)
      );

      // Update state to move to the next phrase
      setPhrasesCount((prevCount) => prevCount + 1);
      const updatedEasy = await getStoredArray("EasyPhrases");
      setEasyCount(updatedEasy.length + 1);
    } else {
      console.log("Completed cycle");
    }
  };

  const addToSectionMedium = async () => {
    // Ensure we’re not exceeding the phrases array
    if (phrasesCount < phrases.length - 1) {
      const currentPhrase = phrases[phrasesCount];
      const currentTranslated = translatedPhrasesPortuguese[phrasesCount];
      const currentAudio = audios[phrasesCount];

      // Retrieve the current stored arrays or default to an empty array
      const storedEasyPhrases = (await getStoredArray("MediumPhrases")) || [];
      const storedTranslated =
        (await getStoredArray("MediumPhrasesTranslatedPortuguese")) || [];

      // Check if the phrase is already included before adding
      if (!storedEasyPhrases.includes(currentPhrase)) {
        addToArrayAndStore("MediumPhrases", currentPhrase);
        addToArrayAndStore(
          "MediumPhrasesTranslatedPortuguese",
          currentTranslated
        );
        addToArrayAndStore("MediumAudios", currentAudio);
        // console.log(`Added EasyPhrase: ${currentPhrase}`);
      } else {
        // console.log(`Duplicate detected for EasyPhrase: ${currentPhrase}`);
        pass;
      }
      // You can log the stored arrays to verify changes
      getStoredArray("MediumPhrases").then((data) =>
        console.log("Stored MediumPhrases: ", data)
      );
      getStoredArray("MediumPhrasesTranslatedPortuguese").then((data) =>
        console.log("Stored Translated Phrases: ", data)
      );

      // Update state to move to the next phrase
      setPhrasesCount((prevCount) => prevCount + 1);
      const updatedEasy = await getStoredArray("MediumPhrases");
      setMediumCount(updatedEasy.length + 1);
    } else {
      console.log("Completed cycle");
    }
  };

  const addToSectionHard = async () => {
    // Ensure we’re not exceeding the phrases array
    if (phrasesCount < phrases.length - 1) {
      const currentPhrase = phrases[phrasesCount];
      const currentTranslated = translatedPhrasesPortuguese[phrasesCount];
      const currentAudio = audios[phrasesCount];

      // Retrieve the current stored arrays or default to an empty array
      const storedEasyPhrases = (await getStoredArray("HardPhrases")) || [];
      const storedTranslated =
        (await getStoredArray("HardPhrasesTranslatedPortuguese")) || [];

      // Check if the phrase is already included before adding
      if (!storedEasyPhrases.includes(currentPhrase)) {
        addToArrayAndStore("HardPhrases", currentPhrase);
        addToArrayAndStore(
          "HardPhrasesTranslatedPortuguese",
          currentTranslated
        );
        addToArrayAndStore("HardAudios", currentAudio);
        // console.log(`Added EasyPhrase: ${currentPhrase}`);
      } else {
        // console.log(`Duplicate detected for EasyPhrase: ${currentPhrase}`);
        pass;
      }
      // Update state to move to the next phrase
      setPhrasesCount((prevCount) => prevCount + 1);
      const updatedEasy = await getStoredArray("HardPhrases");
      setHardCount(updatedEasy.length + 1);
    } else {
      console.log("Completed cycle");
    }
  };

  const [isTranslatedViewVisible, setIsTranslatedViewVisible] = useState(false);
  return (
    <View style={styles.container}>
      {isResetViewVisible && (
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <ScrollView>
              <Text style={styles.alertText}>{t("confirm_delete_data")}</Text>
            </ScrollView>

            <View style={{ ...styles.buttonContainer, paddingVertical: 5 }}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setIsResetViewVisible(false);
                }}
              >
                <Text style={styles.buttonText}>{t("cancel")}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.buttonContainer, paddingVertical: 5 }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsResetViewVisible(false);
                  setIsResetViewReallyVisible(true);
                }}
              >
                <Text style={styles.buttonText}>{t("confirm")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {isResetViewReallyVisible && (
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <ScrollView>
              <Text style={styles.alertText}>
                {t("really_confirm_delete_data")}
              </Text>
            </ScrollView>

            <View style={{ ...styles.buttonContainer, paddingVertical: 5 }}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setIsResetViewReallyVisible(false);
                }}
              >
                <Text style={styles.buttonText}>{t("cancel")}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.buttonContainer, paddingVertical: 5 }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsResetViewReallyVisible(false);
                  setPhrasesCount(0);
                  clearStorage();
                  setEasyCount(0);
                  setMediumCount(0);
                  setHardCount(0);
                }}
              >
                <Text style={styles.buttonText}>{t("confirm")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={() => setIsResetViewVisible(true)}>
        <Text style={styles.btnReset}>🗑️ {t("reset")}</Text>
      </TouchableOpacity>

      {isTranslatedViewVisible && (
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <ScrollView>
              <Text style={styles.alertText}>
                🇧🇷 {translatedPhrasesPortuguese[phrasesCount]}
              </Text>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsTranslatedViewVisible(false);
                }}
              >
                <Text style={styles.buttonText}>{t("cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Text style={styles.counter}>{`${phrasesCount + 1}/${
        phrases.length
      }`}</Text>
      <TouchableOpacity
        onPress={() => {
          setIsTranslatedViewVisible(true);
          console.log(isTranslatedViewVisible);
        }}
      >
        <Text style={styles.text}>
          {phrasesCount === phrases.length
            ? "Completed cycle"
            : phrases[phrasesCount]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          playSound(phrasesCount);
        }}
      >
        <Text style={styles.btnPlaySound}>{t("play_sound")} 🔊</Text>
      </TouchableOpacity>
      {/* Container having the difficulty section */}
      <View style={styles.btnDifficultyContainer}>
        <TouchableOpacity
          style={styles.btnEasy}
          onPress={() => {
            handlePress();
          }}
          disabled={isDisabled}
        >
          <Text style={styles.btn}>{t("easy_section")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMedium}
          onPress={() => {
            addToSectionMedium();
          }}
        >
          <Text style={styles.btn}>{t("medium_section")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnHard}
          onPress={() => {
            addToSectionHard();
          }}
        >
          <Text style={styles.btn}>{t("hard_section")}</Text>
        </TouchableOpacity>
      </View>

      {/* Container having the difficulty section */}
      <View style={styles.btnDifficultyContainer}>
        <TouchableOpacity
          style={styles.btnEasy}
          onPress={() => {
            navigation.navigate("EasyScreen");
            getStoredArray("EasyPhrases").then((data) =>
              console.log("Stored Array: ", data)
            );
          }}
        >
          <Text style={styles.btn}>{easyCount}</Text>
          {/* <Text style={styles.btn}>{getArrayLength("EasyPhrases")}</Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMedium}
          onPress={() => {
            navigation.navigate("MediumScreen");
          }}
        >
          <Text style={styles.btn}>{mediumCount}</Text>
          {/* <Text style={styles.btn}>{getArrayLength("MediumPhrases")}</Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnHard}
          onPress={() => {
            navigation.navigate("HardScreen");
          }}
        >
          <Text style={styles.btn}>{hardCount}</Text>
          {/* <Text style={styles.btn}>{getArrayLength("HardPhrases")}</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;

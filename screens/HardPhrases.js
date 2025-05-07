import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/styles";
import {
  getArrayLength,
  replaceToArrayAndStore,
  addToArrayAndStore,
} from "../store_data/store_data";
import { audios } from "../audios/phrasesAudios";
import { Audio } from "expo-av";
import { useTranslation } from "react-i18next";
function EasyScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [EasyPhrases, setEasyPhrases] = useState([]);
  const [EasyPhrasesTranslatedPortuguese, setEasyPhrasesTranslatedPortuguese] =
    useState([]);
  const [EasyAudios, setEasyAudios] = useState([]);
  const [visibleCount, setVisibleCount] = useState(50); // Start with 50 items
  const { t } = useTranslation();

  useEffect(() => {
    const getStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("HardPhrases");
        const storedData2 = await AsyncStorage.getItem(
          "HardPhrasesTranslatedPortuguese"
        );
        const storedData3 = await AsyncStorage.getItem("HardAudios");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (Array.isArray(parsedData)) {
            setEasyPhrases(parsedData);
          } else {
            // console.log("Stored data is not an array:", parsedData);
            pass;
          }
        }
        if (storedData2) {
          const parsedData2 = JSON.parse(storedData2);
          if (Array.isArray(parsedData2)) {
            setEasyPhrasesTranslatedPortuguese(parsedData2);
          } else {
            pass;
            // console.log("Stored data is not an array:", parsedData2);
          }
        }
        if (storedData3) {
          const parsedData3 = JSON.parse(storedData3);
          if (Array.isArray(parsedData3)) {
            setEasyAudios(parsedData3);
          } else {
            pass;
            // console.log("Stored data is not an array:", parsedData2);
          }
        }
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };
    getStoredData();
  }, []);

  const playSound = async (index) => {
    const key = EasyAudios[index]; // Get key from EasyAudios
    const audioFile = audios[key]; // Use key to retrieve audio

    if (!audioFile) {
      console.log(EasyAudios);
      console.log("Audio file not found!");
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync(audioFile);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  const [isViewTranslation, setIsViewTranslation] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  return (
    <View style={styles.easyContainer}>
      {/* Custom Modal for Confirmation */}
      {isViewTranslation && (
        <View style={styles.overlay}>
          <View style={styles.easyAlertBox}>
            <ScrollView style={styles.scrollVertical}>
              <Text style={styles.easyListContainerModal}>
                🇧🇷 {EasyPhrasesTranslatedPortuguese[currentIndex]}
              </Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                playSound(currentIndex);
              }}
            >
              <Text style={styles.txtPlayAudio}>{t("play_sound")} 🔊</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.easyCancelButton}
                onPress={() => setIsViewTranslation(false)}
              >
                <Text style={styles.buttonText}>{t("cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <ScrollView style={styles.easyContentScroll}>
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => {
              // Reverse both arrays on sort press
              setEasyPhrases((prev) => [...prev].reverse());
              setEasyPhrasesTranslatedPortuguese((prev) => [...prev].reverse());
              setEasyAudios((prev) => [...prev].reverse());
              setIsReversed((prev) => !prev);
            }}
          >
            <Text style={styles.sortTxt}>
              {isReversed ? t("most_recent") : t("oldest")}
            </Text>
          </TouchableOpacity>
        </View>

        {EasyPhrases.slice(0, visibleCount).map((phrase, index, arr) => (
          <View key={index} style={styles.easyListContainer}>
            <TouchableOpacity
              style={styles.mediumBtn}
              onPress={() => {
                // Extract the items BEFORE updating state
                const currentPhrase = EasyPhrases[index];
                const currentTranslation =
                  EasyPhrasesTranslatedPortuguese[index];
                const currentAudio = EasyAudios[index];

                if (!currentPhrase || !currentTranslation) return; // Avoid errors if index is invalid

                // Update EasyPhrases
                setEasyPhrases((prevPhrases) => {
                  const newPhrases = [...prevPhrases];
                  newPhrases.splice(index, 1); // Remove the item
                  replaceToArrayAndStore("HardPhrases", newPhrases);
                  setVisibleCount(Math.min(visibleCount, newPhrases.length));
                  return newPhrases;
                });

                // Update EasyPhrasesTranslatedPortuguese
                setEasyPhrasesTranslatedPortuguese((prevTranslations) => {
                  const newTranslations = [...prevTranslations];
                  newTranslations.splice(index, 1); // Remove the translation
                  replaceToArrayAndStore(
                    "HardPhrasesTranslatedPortuguese",
                    newTranslations
                  );
                  return newTranslations;
                });

                // Update EasyPhrasesTranslatedPortuguese
                setEasyAudios((prevAudios) => {
                  const newAudios = [...prevAudios];
                  newAudios.splice(index, 1); // Remove the translation
                  replaceToArrayAndStore("HardAudios", newAudios);
                  return newAudios;
                });

                // Add the removed items to MediumPhrases and MediumPhrasesTranslatedPortuguese
                addToArrayAndStore("MediumPhrases", currentPhrase);
                addToArrayAndStore(
                  "MediumPhrasesTranslatedPortuguese",
                  currentTranslation
                );
                addToArrayAndStore("MediumAudios", currentAudio);
              }}
            >
              <Text style={styles.plusIcon}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.easyListText}
              onPress={() => {
                setCurrentIndex(index);
                // Logging to test the reversed translation array
                // console.log(EasyPhrasesTranslatedPortuguese);
                setIsViewTranslation(true);
              }}
            >
              {/* Display reversed numbering: last index first */}
              <Text style={styles.phraseText}>
                {index + 1}: {phrase}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.loadMoreBtn}
        onPress={() =>
          setVisibleCount((prev) => Math.min(prev + 50, EasyPhrases.length))
        }
      >
        <Text style={styles.loadMoreTxt}>
          {t("load_more")} (
          {Math.max(0, Math.min(50, EasyPhrases.length - visibleCount))}{" "}
          {t("remaining")})
        </Text>
      </TouchableOpacity>

      <View style={styles.btnEasyDifficultyContainer}>
        <TouchableOpacity
          style={styles.btnEasy}
          onPress={() => {
            navigation.navigate("EasyScreen");
          }}
        >
          <Text style={styles.btn}>{getArrayLength("EasyPhrases")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMediumHard}
          onPress={() => {
            navigation.navigate("MediumScreen");
          }}
        >
          <Text style={styles.btn}>{getArrayLength("MediumPhrases")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EasyScreen;

const { width, height } = Dimensions.get("window");

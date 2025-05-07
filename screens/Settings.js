import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../styles/styles";
import "./../locales/i18n";
import { useTranslation } from "react-i18next";
import i18n from "./../locales/i18n";
import { getLanguage, setLanguage } from "../store_data/store_data";

function Settings({ navigation }) {
  useEffect(() => {
    getLanguage(); // Runs once on mount
  }, []);
  const { t } = useTranslation();
  const [isResetViewVisible, setIsResetViewVisible] = useState(false);
  return (
    <View style={styles.container}>
      {isResetViewVisible && (
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <ScrollView style={styles.maxScrollHeight}>
              <Text style={styles.alertText}>{t("about_me1")}</Text>
              <Text style={styles.alertText}>{t("about_me2")}</Text>
              <Text style={styles.alertText}>{t("about_me3")}</Text>
              <Text style={styles.alertText}>{t("about_me4")}</Text>
              <Text style={styles.alertText}>{t("about_me5")}</Text>
              <Text style={styles.alertText}>{t("about_me6")}</Text>
            </ScrollView>

            <View style={{ ...styles.buttonContainer, paddingVertical: 5 }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsResetViewVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View>
        <Text style={styles.settingsText}>{t("change_language")}</Text>

        {/* <Text style={styles.settingsText}>Change language:</Text> */}
        <TouchableOpacity
          style={styles.settingsFlagsContainer}
          onPress={() => {
            setLanguage("en");
          }}
        >
          <Text style={styles.settingsFlags}>🇺🇸</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.settingsFlagsContainer}>
          <Text style={styles.settingsFlags}>🇪🇸</Text>
          <Text style={styles.settingsTextFlags}>On</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.settingsFlagsContainer}
          onPress={() => {
            setLanguage("pt");
          }}
        >
          <Text style={styles.settingsFlags}>🇧🇷</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.settingsFlagsContainer}>
          <Text style={styles.settingsFlags}>🇫🇷</Text>
          <Text style={styles.settingsTextFlags}>On</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.settingsFlagsContainer}>
          <Text style={styles.settingsFlags}>🇩🇪</Text>
          <Text style={styles.settingsTextFlags}>On</Text>
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => {
          setIsResetViewVisible(true);
        }}
      >
        <Text style={styles.settingsText}>{t("about_me")} 🙋</Text>
      </TouchableOpacity>
      <Text style={styles.settingsText}>{t("contact_info")}:</Text>
      <Text style={styles.settingsTextBig}>📞 +55 11 958616257</Text>
    </View>
  );
}

export default Settings;

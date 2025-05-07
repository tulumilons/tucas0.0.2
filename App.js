import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import DrawerNavigator from "./navigations/DrawerNavigator";
import Home from "./screens/Home";
import StackNavigator from "./navigations/StackNavigator";
import { enableScreens } from "react-native-screens";
import TabsNavigator from "./navigations/TabNavigator";
import MyTabs from "./navigations/TabNavigator";
enableScreens();
import React, { useState, useRef, useEffect } from "react";
import { Platform } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";
import NetInfo from "@react-native-community/netinfo";
import RNRestart from "react-native-restart";
import { useTranslation } from "react-i18next";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-5530164051322463/3397015021";

export default function App() {
  const { t } = useTranslation();
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected === false) {
      console.log("Not connected");
      Alert.alert(t("no_internet"), t("please_reconnect"), [
        {
          text: t("reload_app"),
          onPress: () => RNRestart.restart(),
        },
      ]);
    } else if (state.isConnected === true) {
      console.log("Connected");
    }
  });
  useEffect(() => {
    unsubscribe();
  });
  return (
    <>
      <NavigationContainer>
        {/* <DrawerNavigator /> */}
        {/* <StackNavigator /> */}
        <MyTabs />
      </NavigationContainer>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </>
  );
}

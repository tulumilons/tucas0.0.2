import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DrawerNavigator from "./navigations/DrawerNavigator";
import Home from "./screens/Home";
import StackNavigator from "./navigations/StackNavigator";
import { enableScreens } from "react-native-screens";
import TabsNavigator from "./navigations/TabNavigator";
import MyTabs from "./navigations/TabNavigator";
enableScreens();
import React, { useState, useRef } from "react";
import { Platform } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-5530164051322463/3397015021";

export default function App() {
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

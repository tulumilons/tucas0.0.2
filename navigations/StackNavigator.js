import React from "react";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import EasyScreen from "../screens/EasyPhrases";
import MediumScreen from "../screens/MediumPhrases";
import HardScreen from "../screens/HardPhrases";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EasyScreen" component={EasyScreen} />
      <Stack.Screen name="MediumScreen" component={MediumScreen} />
      <Stack.Screen name="HardScreen" component={HardScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;

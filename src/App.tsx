import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import useUi from "./contexts/ui/useUi";

import RootNav from "./navigators/RootNav";

import SnackBar from "./components/SnackBar";

const App: React.FC = () => {
  const { theme } = useUi();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={theme.colors.action} />
      <View
        style={{
          height: insets.top,
          width: "100%",
          backgroundColor: theme.colors.action,
        }}
      />
      <RootNav />
      <View
        style={{
          height: insets.bottom,
          width: "100%",
          backgroundColor: theme.colors.action,
        }}
      />
      <SnackBar position="bottom" />
    </NavigationContainer>
  );
};

export default App;

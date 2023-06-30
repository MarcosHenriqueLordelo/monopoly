import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { SnackbarProvider } from "./contexts/snackbar";
import { UiProvider } from "./contexts/ui";
import { UserProvider } from "./contexts/user";
import { FirebaseProvider } from "./contexts/firebase";
import { NavigationContainer } from "@react-navigation/native";

const AppProvider: React.FC<DefaultProps> = ({ children }) => (
  <SafeAreaProvider>
    <NavigationContainer>
      <UiProvider>
        <SnackbarProvider>
          <UserProvider>
            <FirebaseProvider>{children}</FirebaseProvider>
          </UserProvider>
        </SnackbarProvider>
      </UiProvider>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default AppProvider;

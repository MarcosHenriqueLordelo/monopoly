import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

import themeRed from "../../themes/red";
import themeDarkGreen from "../../themes/darkGreen";
import themeOrange from "../../themes/orange";
import themeBlue from "../../themes/blue";
import themePurple from "../../themes/purple";
import themeDarkGray from "../../themes/darkGray";

import defaultLanguage from "../../strings/pt_br";
import getStrings from "../../strings";

import { TOKEN_KEY } from "../../utils/keys";

interface UiContext {
  switchTheme: (name: ThemeName) => void;
  strings: Strings;
  theme: Theme;
  language: string;
  loading: boolean;
  loadingUser: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UiContext = createContext<UiContext>({} as UiContext);

export const UiProvider: React.FC<DefaultProps> = ({ children }) => {
  const [strings, setStrings] = useState<Strings>(defaultLanguage);
  const [theme, setTheme] = useState<Theme>(themeDarkGray);
  const [language, setLanguage] = useState<string>("pt-br");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const loadStoragedData = async () => {
      setLoading(true);

      const language = await AsyncStorage.getItem(`${TOKEN_KEY}:language`);
      const theme = await AsyncStorage.getItem(`${TOKEN_KEY}:theme`);

      if (language !== null) setLanguage(language);
      else setLanguage(Localization.locale);

      if (theme !== null) switchTheme(theme);

      setLoading(false);
    };

    loadStoragedData();
  }, []);

  useEffect(() => {
    setStrings(getStrings(language));
  }, [language]);

  const switchTheme = (name: string) => {
    switch (name) {
      case "blue":
        setTheme(themeBlue);
        break;
      case "darkGray":
        setTheme(themeDarkGray);
        break;
      case "orange":
        setTheme(themeOrange);
        break;
      case "red":
        setTheme(themeRed);
        break;
      case "darkGreen":
        setTheme(themeDarkGreen);
        break;
      case "purple":
        setTheme(themePurple);
        break;
    }

    AsyncStorage.setItem(`${TOKEN_KEY}:theme`, name);
  };

  return (
    <UiContext.Provider
      value={{
        switchTheme,
        strings,
        theme,
        language,
        loading,
        setLoading,
        loadingUser,
        setLoadingUser,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export default UiContext;

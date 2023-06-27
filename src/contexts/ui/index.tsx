import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

import themeLight from "../../themes/light";

import defaultLanguage from "../../strings/pt_br";
import getStrings from "../../strings";

import { TOKEN_KEY } from "../../utils/keys";

interface UiContext {
  strings: Strings;
  theme: Theme;
  language: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UiContext = createContext<UiContext>({} as UiContext);

export const UiProvider: React.FC<DefaultProps> = ({ children }) => {
  const [strings, setStrings] = useState<Strings>(defaultLanguage);
  const [theme, setTheme] = useState<Theme>(themeLight);
  const [language, setLanguage] = useState<string>("pt-br");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadStoragedData = async () => {
      setLoading(true);

      const language = await AsyncStorage.getItem(`${TOKEN_KEY}:language`);

      if (language !== null) setLanguage(language);
      else setLanguage(Localization.locale);

      setLoading(false);
    };

    loadStoragedData();
  }, []);

  useEffect(() => {
    setStrings(getStrings(language));
  }, [language]);

  return (
    <UiContext.Provider
      value={{
        strings,
        theme,
        language,
        loading,
        setLoading,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export default UiContext;

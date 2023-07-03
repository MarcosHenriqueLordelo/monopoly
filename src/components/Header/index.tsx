import React, { useCallback, useMemo, useState } from "react";
import { View, Text, Image } from "react-native";

import useUi from "../../contexts/ui/useUi";
import useUser from "../../contexts/user/useUser";

import userImage from "../../../assets/userImage.png";

import getStyles from "./styles";
import IconButton from "../IconButton";

const Header: React.FC = () => {
  const { theme, strings, switchTheme } = useUi();
  const { user } = useUser();

  const [currentTheme, setCurrentTheme] = useState(0);
  const themes: ThemeName[] = [
    "blue",
    "darkGray",
    "darkGreen",
    "orange",
    "purple",
    "red",
  ];

  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleSwitchTheme = () => {
    let nextTheme: number;
    if (currentTheme === 5) nextTheme = 0;
    else nextTheme = currentTheme + 1;

    switchTheme(themes[nextTheme]);
    setCurrentTheme(nextTheme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={userImage}
          style={styles.userImage}
          resizeMode="contain"
        />
        <IconButton name="palette" onPress={handleSwitchTheme} size={24} />
      </View>
      <Text style={styles.userName}>
        {strings.hello}
        {user?.name}!
      </Text>
    </View>
  );
};

export default Header;

import React from "react";
import { View, Text } from "react-native";

import useUi from "../../contexts/ui/useUi";
import useUser from "../../contexts/user/useUser";

import getStyles from "./styles";

import IconButton from "../IconButton";

interface PropTypes {
  onSettingsPress: () => void;
}

const Header: React.FC<PropTypes> = ({ onSettingsPress }) => {
  const { theme, strings } = useUi();
  const { user } = useUser();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.userImage} />
        <IconButton
          name="settings"
          size={24}
          onPress={onSettingsPress}
          containerSize={48}
        />
      </View>
      <Text style={styles.userName}>
        {strings.hello}
        {user!.name}!
      </Text>
    </View>
  );
};

export default Header;

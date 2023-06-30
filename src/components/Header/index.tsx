import React from "react";
import { View, Text, Image } from "react-native";

import useUi from "../../contexts/ui/useUi";
import useUser from "../../contexts/user/useUser";

import userImage from "../../../assets/userImage.png";

import getStyles from "./styles";

const Header: React.FC = () => {
  const { theme, strings } = useUi();
  const { user } = useUser();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={userImage}
          style={styles.userImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.userName}>
        {strings.hello}
        {user?.name}!
      </Text>
    </View>
  );
};

export default Header;

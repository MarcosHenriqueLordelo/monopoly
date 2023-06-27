import React from "react";
import { TouchableOpacity, Text } from "react-native";

import useUi from "../../contexts/ui/useUi";
import getStyles from "./styles";

interface PropTypes {
  label: string;
  onPress: () => void;
}

const Button: React.FC<PropTypes> = ({ label, onPress }) => {
  const { theme } = useUi();

  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

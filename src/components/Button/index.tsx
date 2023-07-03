import React, { useMemo } from "react";
import { TouchableOpacity, Text } from "react-native";

import useUi from "../../contexts/ui/useUi";
import getStyles from "./styles";

interface PropTypes {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<PropTypes> = ({ label, onPress, disabled }) => {
  const { theme } = useUi();

  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.label, opacity: disabled ? 0.5 : 1 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

import React from "react";
import { TouchableOpacity } from "react-native";
import { ViewStyle } from "../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import useUi from "../contexts/ui/useUi";

interface PropTypes {
  name: keyof typeof MaterialIcon.glyphMap;
  size: number;
  containerSize?: number;
  onPress: () => void;
  style?: ViewStyle;
  color?: string;
}

const IconButton: React.FC<PropTypes> = ({
  containerSize,
  name,
  onPress,
  size,
  style,
  color,
}) => {
  const { theme } = useUi();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: containerSize,
        width: containerSize,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <MaterialIcon
        name={name}
        size={size}
        color={color || theme.colors.fontLight}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

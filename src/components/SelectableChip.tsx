import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ViewStyle } from "../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes";

import useUi from "../contexts/ui/useUi";

interface PropTypes {
  selected?: boolean;
  onPress?: () => void;
  label: string;
  style?: ViewStyle;
}

const SelectableChip: React.FC<PropTypes> = ({
  selected,
  onPress,
  label,
  style,
}) => {
  const { theme } = useUi();

  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: selected ? theme.colors.action : undefined,
        borderWidth: selected ? 1 : 0,
        borderColor: theme.colors.fontLight,
        ...style,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.label,
          color: theme.colors.fontLight,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 32,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,
    },
    label: {
      fontSize: theme.font.body.large.size,
      fontWeight: theme.font.body.large.weight,
      letterSpacing: theme.font.body.large.tracking,
      lineHeight: theme.font.body.large.lineHeight,
      textTransform: "uppercase",
    },
  });

export default SelectableChip;

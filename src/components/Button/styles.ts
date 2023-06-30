import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 40,
      paddingHorizontal: 16,
      borderRadius: 10,
      backgroundColor: theme.colors.action,
      justifyContent: "center",
    },
    label: {
      textTransform: "uppercase",
      color: theme.colors.fontLight,
      fontSize: theme.font.label.large.size,
      fontWeight: theme.font.label.large.weight,
      lineHeight: theme.font.label.large.lineHeight,
      letterSpacing: theme.font.label.large.tracking,
    },
  });

export default getStyles;

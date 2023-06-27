import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    headline: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      color: theme.colors.fontDark,
      textAlign: "center",
    },
    subHeadline: {
      fontSize: theme.font.title.medium.size,
      fontWeight: theme.font.title.medium.weight,
      letterSpacing: theme.font.title.medium.tracking,
      lineHeight: theme.font.title.medium.lineHeight,
      color: theme.colors.fontDark,
      textAlign: "center",
    },
  });

export default getStyles;

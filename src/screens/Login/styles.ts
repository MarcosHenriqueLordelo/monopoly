import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      alignItems: "center",
      padding: 16,
    },
    appLogo: {
      backgroundColor: theme.colors.action,
      width: 100,
      height: 100,
      borderRadius: 100,
      marginBottom: 16,
      marginTop: 32,
    },
    appName: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      textTransform: "uppercase",
      color: theme.colors.fontDark,
    },
    introduction: {
      fontSize: theme.font.body.medium.size,
      fontWeight: theme.font.body.medium.weight,
      letterSpacing: theme.font.body.medium.tracking,
      lineHeight: theme.font.body.medium.lineHeight,
      color: theme.colors.fontDark,
      textAlign: "center",
      marginTop: 32,
    },
    userName: {
      color: theme.colors.action,
      textTransform: "uppercase",
    },
  });

export default getStyles;

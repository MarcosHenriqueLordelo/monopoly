import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 200,
      paddingTop: 20,
      paddingBottom: 28,
      paddingLeft: 16,
      backgroundColor: theme.colors.action,
      justifyContent: "space-between",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    userImage: {
      width: 70,
      height: 70,
      borderRadius: 100,
      backgroundColor: theme.colors.section,
    },
    userName: {
      fontSize: theme.font.headline.medium.size,
      fontWeight: theme.font.headline.medium.weight,
      letterSpacing: theme.font.headline.medium.tracking,
      lineHeight: theme.font.headline.medium.lineHeight,
      color: theme.colors.fontLight,
    },
  });

export default getStyles;

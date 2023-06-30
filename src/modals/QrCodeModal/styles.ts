import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "75%",
      padding: 16,
      backgroundColor: theme.colors.action,
      borderRadius: 10,
      alignItems: "center",
    },
    headerView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      color: theme.colors.fontLight,
      marginBottom: 16,
    },
    description: {
      fontSize: theme.font.body.medium.size,
      fontWeight: theme.font.body.medium.weight,
      letterSpacing: theme.font.body.medium.tracking,
      lineHeight: theme.font.body.medium.lineHeight,
      color: theme.colors.fontLight,
      textAlign: "center",
      marginVertical: 16,
    },
  });

export default getStyles;

import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "75%",
      padding: 16,
      backgroundColor: theme.colors.action,
      borderRadius: 10,
      maxHeight: "60%",
      minHeight: 200,
    },
    headerView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      color: theme.colors.fontLight,
    },
    listItem: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: theme.colors.action,
      marginTop: 8,
    },
    listTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    arrow: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      color: theme.colors.fontLight,
    },
    name: {
      fontSize: theme.font.title.medium.size,
      fontWeight: theme.font.title.medium.weight,
      letterSpacing: theme.font.title.medium.tracking,
      lineHeight: theme.font.title.medium.lineHeight,
      color: theme.colors.fontLight,
    },
  });

export default getStyles;

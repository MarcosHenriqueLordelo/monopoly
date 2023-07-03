import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "75%",
      padding: 16,
      backgroundColor: theme.colors.action,
      borderRadius: 10,
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
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: theme.colors.action,
      marginTop: 8,
      flexDirection: "row",
      justifyContent: "space-between",
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
    position: {
      fontSize: theme.font.display.small.size,
      fontWeight: theme.font.display.small.weight,
      letterSpacing: theme.font.display.small.tracking,
      lineHeight: theme.font.display.small.lineHeight,
      color: theme.colors.fontLight,
    },
  });

export default getStyles;

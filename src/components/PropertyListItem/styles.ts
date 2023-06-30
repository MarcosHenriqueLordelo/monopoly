import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      borderRadius: 10,
      backgroundColor: theme.colors.action,
      padding: 8,
      paddingRight: 16,
      alignSelf: "center",
      width: "89%",
    },
    rowContainer: {
      flexDirection: "row",
    },
    nameLabel: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      color: theme.colors.fontLight,
    },
    infoLabel: {
      fontSize: theme.font.body.medium.size,
      fontWeight: theme.font.body.medium.weight,
      letterSpacing: theme.font.body.medium.tracking,
      lineHeight: theme.font.body.medium.lineHeight,
      color: theme.colors.fontLight,
    },
  });

export default getStyles;

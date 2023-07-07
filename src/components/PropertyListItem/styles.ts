import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
      borderRadius: 10,
      backgroundColor: theme.colors.error,
      alignSelf: "center",
      width: "89%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 8,
      paddingRight: 16,
      backgroundColor: theme.colors.action,
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
    deleteButtonContainer: {
      backgroundColor: "red",
      width: 60,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default getStyles;

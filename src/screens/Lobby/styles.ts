import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    lobbytitle: {
      fontSize: theme.font.display.medium.size,
      fontWeight: theme.font.display.medium.weight,
      letterSpacing: theme.font.display.medium.tracking,
      lineHeight: theme.font.display.medium.lineHeight,
      textTransform: "uppercase",
      alignSelf: "center",
    },
    playersLabel: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      alignSelf: "center",
    },
    playersListContainer: {
      width: "100%",
      padding: 16,
      backgroundColor: theme.colors.section,
      borderRadius: 10,
      marginTop: 16,
    },
    playerListItem: {
      backgroundColor: theme.colors.action,
      padding: 8,
      flexDirection: "row",
      borderRadius: 10,
      marginTop: 16,
      alignItems: "center",
    },
    playerItemLabel: {
      fontSize: theme.font.body.large.size,
      fontWeight: theme.font.body.large.weight,
      letterSpacing: theme.font.body.large.tracking,
      lineHeight: theme.font.body.large.lineHeight,
      color: theme.colors.fontLight,
      marginLeft: 8,
    },
    buttonsView: {
      flexDirection: "row",
      marginTop: 16,
      justifyContent: "space-around",
      width: "100%",
    },
    qrCodeHint: {
      marginTop: 16,
      textAlign: "center",
      fontSize: theme.font.body.large.size,
      fontWeight: theme.font.body.large.weight,
      letterSpacing: theme.font.body.large.tracking,
      lineHeight: theme.font.body.large.lineHeight,
    },
  });

export default getStyles;

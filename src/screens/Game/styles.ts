import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingTop: 32,
    },
    title: {
      fontSize: theme.font.headline.small.size,
      fontWeight: theme.font.headline.small.weight,
      letterSpacing: theme.font.headline.small.tracking,
      lineHeight: theme.font.headline.small.lineHeight,
      marginLeft: 16,
    },
    ballanceValue: {
      fontSize: theme.font.headline.medium.size,
      fontWeight: theme.font.headline.medium.weight,
      letterSpacing: theme.font.headline.medium.tracking,
      lineHeight: theme.font.headline.medium.lineHeight,
      marginLeft: 48,
      marginTop: 16,
    },
    buttonsView: {
      flexDirection: "row",
      marginVertical: 32,
      paddingLeft: 16,
    },
    buttonItem: {
      alignItems: "center",
      marginRight: 16,
    },
    buttonContainer: {
      borderRadius: 100,
      backgroundColor: theme.colors.section,
    },
    buttonLabel: {
      fontSize: theme.font.body.large.size,
      fontWeight: theme.font.body.large.weight,
      letterSpacing: theme.font.body.large.tracking,
      lineHeight: theme.font.body.large.lineHeight,
    },
    scoreboardContainer: {
      borderRadius: 10,
      width: "89%",
      backgroundColor: theme.colors.section,
      flexDirection: "row",
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignSelf: "center",
    },
    scoreboardLabel: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      marginLeft: 16,
    },
    divider: {
      height: 1,
      width: "100%",
      marginTop: 16,
      marginBottom: 32,
      backgroundColor: theme.colors.fontDark,
    },
    rowView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
  });

export default getStyles;

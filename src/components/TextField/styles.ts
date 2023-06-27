import { StyleSheet } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const getStyles = (theme: Theme, modal?: boolean, focused?: boolean) =>
  StyleSheet.create({
    container: {
      width: modal ? "100%" : "80%",
      paddingTop: 26,
      position: "relative",
    },
    backgroundContainer: {
      backgroundColor: modal ? theme.colors.background : theme.colors.section,
      borderRadius: 6,
    },
    textInput: {
      height: 56,
      paddingVertical: 8,
      paddingHorizontal: 16,
      color: theme.colors.fontDark,
      fontSize: theme.font.body.large.size,
      fontWeight: theme.font.body.large.weight,
      letterSpacing: theme.font.body.large.tracking,
      lineHeight: theme.font.body.large.lineHeight,
    },
    label: {
      color: theme.colors.action,
      position: "absolute",
      marginTop: focused ? 12 : 50,
      marginLeft: focused ? 10 : 16,
      zIndex: focused ? 10 : 0,
      fontSize: theme.font.body.large.size,
      fontWeight: theme.font.body.large.weight,
      letterSpacing: theme.font.body.large.tracking,
      lineHeight: theme.font.body.large.lineHeight,
    },
    errorLabel: {
      color: theme.colors.error,
      marginTop: 4,
      marginHorizontal: 16,
      fontSize: theme.font.body.small.size,
      fontWeight: theme.font.body.small.weight,
      letterSpacing: theme.font.body.small.tracking,
      lineHeight: theme.font.body.small.lineHeight,
    },
  });

export default getStyles;

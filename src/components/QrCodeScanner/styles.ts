import { StyleSheet } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-end",
      backgroundColor: "black",
    },
    scanner: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
  });

export default getStyles;

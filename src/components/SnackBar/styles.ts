import { StyleSheet } from "react-native";

const styles = (color?: string) =>
  StyleSheet.create({
    snackBar: {
      position: "absolute",
      width: "100%",
    },
    content: {
      flex: 1,
      flexDirection: "row",
      marginHorizontal: 16,
      marginVertical: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: color || "#000000",
      alignItems: "center",
    },
    message: {
      color: "#FFFFFF",
      fontSize: 16,
      marginLeft: 16,
    },
  });

export default styles;

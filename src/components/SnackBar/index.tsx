import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";

import getStyles from "./styles";

import useSnackbar from "../../contexts/snackbar/useSnackbar";

interface PropTypes {
  position: "top" | "bottom";
}

const SnackBar: React.FC<PropTypes> = ({ position }) => {
  const { message, color, clearMessage } = useSnackbar();

  const [styles, setStyles] = useState(getStyles(color));

  const animatedValue = useRef(new Animated.Value(0));
  const timeout = useRef<NodeJS.Timeout | null>();

  useEffect(() => {
    setStyles(getStyles(color));
  }, [color]);

  useEffect(() => {
    if (message !== undefined) showSnackBar();
  }, [message]);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  });

  const showSnackBar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
      timeout.current = setTimeout(() => {
        hideSnackBar();
      }, 2000);
    });
  };

  const hideSnackBar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    clearMessage();
  };

  return (
    <Animated.View
      style={[
        styles.snackBar,
        {
          [position]: animatedValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 30],
          }),
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

export default SnackBar;

import React, { useEffect, useState } from "react";
import { LayoutAnimation, View, Text, TextInput } from "react-native";

import useUi from "../../contexts/ui/useUi";

import getStyles from "./styles";

interface PropTypes {
  onValueChanged?: (value: string) => void;
  value: string;
  label: string;
  error?: string;
  modal?: boolean;
  mask?: string;
  placeholder?: string;
  password?: boolean;
  selectList?: { label: string; value: any }[];
}

const TextField: React.FC<PropTypes> = ({
  value,
  onValueChanged,
  label,
  error,
  modal,
  placeholder,
  password,
}) => {
  const { theme } = useUi();
  const [focused, setFocused] = useState(value.trim().length > 0);
  const [styles, setStyles] = useState(getStyles(theme, modal, focused));

  useEffect(() => {
    setStyles(getStyles(theme, modal, focused));
  }, [modal, theme, focused]);

  useEffect(() => {
    LayoutAnimation.linear();
  }, [value, focused]);

  const getPlaceholder = (): string => {
    if (focused && placeholder) return placeholder;
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const getCorrectInput = () => {
    return (
      <TextInput
        style={styles.textInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value.trim().length > 0 ? true : false)}
        onChangeText={onValueChanged}
        value={value}
        placeholder={getPlaceholder()}
        placeholderTextColor={theme.colors.fontDark}
        secureTextEntry={password}
        autoComplete="off"
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </Text>
      <View style={styles.backgroundContainer}>{getCorrectInput()}</View>
      {error && (
        <Text style={styles.errorLabel}>
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </Text>
      )}
    </View>
  );
};

export default TextField;

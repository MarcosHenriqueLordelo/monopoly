import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ViewStyle } from '../../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes';

import useUi from '../../contexts/ui/useUi';
import getStyles from './styles';

interface PropTypes {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

const Button: React.FC<PropTypes> = ({
  label,
  onPress,
  disabled,
  containerStyle,
}) => {
  const { theme } = useUi();

  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...containerStyle }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.label, opacity: disabled ? 0.5 : 1 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

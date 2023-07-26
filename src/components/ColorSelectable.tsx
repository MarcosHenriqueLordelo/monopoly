import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import useUi from '../contexts/ui/useUi';

interface PropTypes {
  selected?: boolean;
  onPress?: () => void;
  color: string;
}

const ColorSelectable: React.FC<PropTypes> = ({ selected, onPress, color }) => {
  const { theme } = useUi();

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: color,
        borderWidth: selected ? 1 : 0,
        borderColor: theme.colors.fontLight,
      }}
      onPress={onPress}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 48,
    borderRadius: 100,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default ColorSelectable;

import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';

import ModalContainer from '../ModalContainer';

import getStyles from './styles';

import useUi from '../../contexts/ui/useUi';
import IconButton from '../../components/IconButton';
import ColorSelectable from '../../components/ColorSelectable';
import Button from '../../components/Button';

interface PropTypes {
  open?: boolean;
  onClose: () => void;
}

type themeColors = {
  [key in ThemeName]: string;
};

const ChangeColorModal: React.FC<PropTypes> = ({ open, onClose }) => {
  const { theme, strings, switchTheme } = useUi();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const [selectedTheme, setSelectedTheme] = useState(theme.name);

  useEffect(() => {
    setSelectedTheme(theme.name);
  }, [theme]);

  const themeColors: themeColors = {
    blue: '#2F80ED',
    darkGray: '#737373',
    darkGreen: '#005C53',
    orange: '#F25C05',
    purple: '#730DD9',
    red: '#D90D1E',
  };

  const handleSwitchTheme = (name: ThemeName) => {
    switchTheme(name);
  };

  const renderSelectables = () => {
    //@ts-ignore
    const keys: ThemeName[] = Object.keys(themeColors);

    return keys.map((key) => (
      <ColorSelectable
        key={key}
        color={themeColors[key]}
        onPress={() => handleSwitchTheme(key)}
        selected={selectedTheme === key}
      />
    ));
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.changeColor}</Text>
          <IconButton
            name="close"
            onPress={onClose}
            size={24}
            containerSize={48}
          />
        </View>
        <View style={styles.buttonsContainer}>{renderSelectables()}</View>
        <View style={styles.buttonsContainer}>
          <Button label={strings.confirm} onPress={onClose} />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ChangeColorModal;

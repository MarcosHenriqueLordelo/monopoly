import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import getStyles from './styles';

import useUi from '../../contexts/ui/useUi';

interface PropTypes {
  onPress?: () => void;
  expansable?: boolean;
  title: string;
  description?: string;
}

const ExpansibleListItem: React.FC<PropTypes> = ({
  title,
  description,
  expansable,
  onPress,
}) => {
  const { theme } = useUi();

  const [open, setOpen] = useState(false);

  const styles = useMemo(() => getStyles(theme), [theme]);

  const handlePress = () => {
    if (expansable) setOpen(!open);
    else if (onPress) onPress();
  };

  return (
    <View style={styles.container}>
      <RectButton style={styles.titleContainer} onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
        <MaterialIcon
          name={open ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
          size={24}
          color={theme.colors.fontDark}
        />
      </RectButton>
      {description && open && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </View>
  );
};

export default ExpansibleListItem;

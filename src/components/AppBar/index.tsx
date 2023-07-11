import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import { Action } from '../../models/action';
import useUi from '../../contexts/ui/useUi';
import getStyles from './styles';
import IconButton from '../IconButton';

interface PropTypes {
  leftAction?: Action;
  title: string;
  rightActions?: Action[];
  type?: 'small' | 'medium';
}

const AppBar: React.FC<PropTypes> = ({
  leftAction,
  rightActions,
  title,
  type = 'small',
}) => {
  const { theme } = useUi();

  const styles = useMemo(() => getStyles(theme, type), [theme, type]);

  const renderRightActions = useMemo(
    () =>
      rightActions &&
      rightActions.map((action) => (
        <IconButton
          name={action.name}
          onPress={action.action}
          size={24}
          containerSize={48}
        />
      )),
    [rightActions]
  );

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.rowView}>
          {leftAction && (
            <IconButton
              name={leftAction.name}
              onPress={leftAction.action}
              size={24}
              containerSize={48}
            />
          )}
          {title && type === 'small' && (
            <Text style={styles.title}>{title}</Text>
          )}
        </View>
        <View style={styles.rowView}>{renderRightActions}</View>
      </View>
      {title && type === 'medium' && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default AppBar;

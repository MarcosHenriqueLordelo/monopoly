import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import getStyles from './styles';

import IconButton from '../IconButton';
import Spacer from '../Spacer';

import useUi from '../../contexts/ui/useUi';
import useUser from '../../contexts/user/useUser';

interface PropTypes {
  property: Property;
  onQrCode: (data: ChargeQrCode) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const PropertyListItem: React.FC<PropTypes> = ({
  onEdit,
  onQrCode,
  property,
  onDelete,
}) => {
  const { theme, strings } = useUi();
  const { user } = useUser();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const formatMortgage = (): string => {
    const format = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format;
    return `${strings.mortgage}: ${format(property.mortgage)}`;
  };

  const formatRent = (): string => {
    const format = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format;
    return `${format(property.rent)}`;
  };

  const renderRightAction = () => {
    return (
      <RectButton style={styles.deleteButtonContainer} onPress={onDelete}>
        <MaterialIcon name="delete" size={24} color={theme.colors.fontLight} />
      </RectButton>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightAction}
      containerStyle={styles.container}
      overshootRight={false}
      overshootLeft={false}
    >
      <View style={styles.content}>
        <View>
          <Text style={styles.nameLabel}>{property.name}</Text>
          {/* <Text style={styles.infoLabel}>{formatMortgage()}</Text> */}
          <Text style={styles.infoLabel}>{formatRent()}</Text>
        </View>
        <View style={styles.rowContainer}>
          <IconButton
            name="qr-code"
            onPress={() => onQrCode({ receiver: user!, value: property.rent })}
            size={24}
          />
          <Spacer width={16} />
          <IconButton name="edit" onPress={onEdit} size={24} />
        </View>
      </View>
    </Swipeable>
  );
};

export default PropertyListItem;

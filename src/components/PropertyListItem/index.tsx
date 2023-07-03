import React, { useMemo } from "react";
import { View, Text } from "react-native";
import IconButton from "../IconButton";
import useUi from "../../contexts/ui/useUi";
import getStyles from "./styles";
import Spacer from "../Spacer";
import useUser from "../../contexts/user/useUser";

interface PropTypes {
  property: Property;
  onQrCode: (data: ChargeQrCode) => void;
  onEdit: () => void;
}

const PropertyListItem: React.FC<PropTypes> = ({
  onEdit,
  onQrCode,
  property,
}) => {
  const { theme, strings } = useUi();
  const { user } = useUser();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const formatMortgage = (): string => {
    const format = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format;
    return `${strings.mortgage}: ${format(property.mortgage)}`;
  };

  const formatRent = (): string => {
    const format = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format;
    return `${strings.rent}: ${format(property.rent)}`;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.nameLabel}>{property.name}</Text>
        <Text style={styles.infoLabel}>{formatMortgage()}</Text>
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
  );
};

export default PropertyListItem;

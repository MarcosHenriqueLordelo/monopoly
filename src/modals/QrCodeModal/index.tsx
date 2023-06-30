import React, { useCallback } from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

import ModalContainer from "../ModalContainer";

import getStyles from "./styles";

import Button from "../../components/Button";

import useUi from "../../contexts/ui/useUi";

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  qrCodeData?: ChargeQrCode;
}

const QrCodeModal: React.FC<PropTypes> = ({ open, onClose, qrCodeData }) => {
  const { theme, strings } = useUi();

  const styles = getStyles(theme);

  const handleClose = () => {
    onClose();
  };

  const formatQrCodeString = useCallback(() => {
    if (!qrCodeData) return "";
    return `monopolyapp:charge:${qrCodeData.receiver.id}:${qrCodeData.receiver.name}:${qrCodeData.value}`;
  }, [qrCodeData]);

  const formatDescriptionString = useCallback(() => {
    const format = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format;

    if (!qrCodeData) return "";

    return `${qrCodeData.receiver.name} ${strings.wantsToReceive} ${format(
      qrCodeData.value
    )}`;
  }, [qrCodeData]);

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>{strings.appName}</Text>
        <QRCode
          value={formatQrCodeString()}
          size={175}
          backgroundColor={theme.colors.action}
          color={theme.colors.fontLight}
        />
        <Text style={styles.description}>{formatDescriptionString()}</Text>
        <Button label={strings.goBack} onPress={handleClose} />
      </View>
    </ModalContainer>
  );
};

export default QrCodeModal;

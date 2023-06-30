import React, { useCallback } from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

import ModalContainer from "../ModalContainer";

import getStyles from "./styles";

import Button from "../../components/Button";

import useUi from "../../contexts/ui/useUi";
import useUser from "../../contexts/user/useUser";
import useSnackbar from "../../contexts/snackbar/useSnackbar";
import useFirebase from "../../contexts/firebase/useFirebase";

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  qrCodeData?: ChargeQrCode;
}

const PaymentModal: React.FC<PropTypes> = ({ open, onClose, qrCodeData }) => {
  const { theme, strings } = useUi();
  const { user } = useUser();
  const { showSnackbar } = useSnackbar();
  const { makeTransaction } = useFirebase();

  const styles = getStyles(theme);

  const handleClose = () => {
    onClose();
  };

  const formatDescriptionString = useCallback((): string => {
    if (!qrCodeData) return "";

    return `${qrCodeData.receiver.name} ${strings.wantsToReceive}`;
  }, [qrCodeData]);

  const formatMoney = useCallback((): string => {
    if (!qrCodeData) return "";

    const format = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format;

    return format(qrCodeData.value);
  }, [qrCodeData]);

  const handleMakePayment = useCallback(() => {
    if (qrCodeData && user) {
      const { value, receiver } = qrCodeData;

      if (value === 0) {
        showSnackbar(strings.valueCantBeZero, theme.colors.error);
      } else {
        makeTransaction(user.id, receiver.id, value);
        handleClose();
      }
    }
  }, [qrCodeData, user]);

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>{strings.appName}</Text>
        <Text style={styles.description}>{formatDescriptionString()}</Text>
        <Text style={styles.title}>{formatMoney()}</Text>
        <View style={styles.headerView}>
          <Button label={strings.cancel} onPress={handleClose} />
          <Button label={strings.confirm} onPress={handleMakePayment} />
        </View>
      </View>
    </ModalContainer>
  );
};

export default PaymentModal;

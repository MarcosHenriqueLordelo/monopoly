import React, { useState } from "react";
import { View } from "react-native";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";

import getStyles from "./styles";

import useUi from "../../contexts/ui/useUi";

import IconButton from "../IconButton";

interface PropTypes {
  onQrCodeScanned: (code: string) => void;
  onClose: () => void;
}

const QrCodeScanner: React.FC<PropTypes> = ({ onQrCodeScanned, onClose }) => {
  const [scanned, setScanned] = useState(false);
  const { theme, strings } = useUi();

  const styles = getStyles(theme);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ data, type }) => {
    if (data.includes(strings.appName)) {
      setScanned(true);
      onQrCodeScanned(data.split(":")[1]);
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={styles.scanner}
      />
      <IconButton
        size={24}
        name="close"
        onPress={onClose}
        color={theme.colors.fontLight}
        style={{ margin: 16 }}
      />
    </View>
  );
};

export default QrCodeScanner;

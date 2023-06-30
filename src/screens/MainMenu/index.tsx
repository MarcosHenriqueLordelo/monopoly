import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StackActions, useNavigation } from "@react-navigation/native";

import useUi from "../../contexts/ui/useUi";
import useFirebase from "../../contexts/firebase/useFirebase";
import useSnackbar from "../../contexts/snackbar/useSnackbar";

import getStyles from "./styles";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import QrCodeScanner from "../../components/QrCodeScanner";

const MainMenu: React.FC = () => {
  const { theme, strings } = useUi();
  const { createGame, listenToGame, gameKey } = useFirebase();
  const { showSnackbar } = useSnackbar();
  const navigation = useNavigation();

  const [barCodePermisison, setBarCodePermission] = useState(false);
  const [scanner, setScanner] = useState(false);

  const styles = getStyles(theme);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setBarCodePermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleCreateGame = () => {
    createGame();
    navigation.dispatch(StackActions.push("Game"));
  };

  const handleOpenScanner = () => {
    if (barCodePermisison) setScanner(true);
  };

  const handleQrCodeScanned = (code: string) => {
    if (code.includes("gameid")) {
      listenToGame(code.split(":")[2]);
      navigation.dispatch(StackActions.push("Game"));
    } else {
      showSnackbar(strings.invalidQrCode, theme.colors.error);
    }
  };

  if (scanner)
    return (
      <QrCodeScanner
        onClose={() => setScanner(false)}
        onQrCodeScanned={handleQrCodeScanned}
      />
    );

  return (
    <View style={styles.container}>
      <Header onSettingsPress={() => console.log("pressed")} />
      <View style={styles.content}>
        <Text style={styles.headline}>Bem-vindo ao Monopoly App!</Text>
        <Text style={styles.subHeadline}>Onde você quer ir hoje?</Text>
        <Spacer height={32} />
        <Button label="Criar Partida" onPress={handleCreateGame} />
        <Spacer height={16} />
        <Button label="Entrar em partida" onPress={handleOpenScanner} />
        <Spacer height={16} />
        <Button
          disabled={gameKey === undefined}
          label="Continuar última partida"
          onPress={() => handleQrCodeScanned(`monopolyapp:gameid:${gameKey!}`)}
        />
      </View>
    </View>
  );
};

export default MainMenu;

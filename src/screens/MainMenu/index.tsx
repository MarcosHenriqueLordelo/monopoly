import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import useUi from "../../contexts/ui/useUi";
import useFirebase from "../../contexts/firebase/useFirebase";
import { StackActions, useNavigation } from "@react-navigation/native";

import getStyles from "./styles";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import QrCodeScanner from "../../components/QrCodeScanner";

const MainMenu: React.FC = () => {
  const { theme } = useUi();
  const { createGame, listenToGame, gameKey } = useFirebase();
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
    listenToGame(code);
    navigation.dispatch(StackActions.push("Game"));
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
          onPress={() => handleQrCodeScanned(gameKey!)}
        />
      </View>
    </View>
  );
};

export default MainMenu;

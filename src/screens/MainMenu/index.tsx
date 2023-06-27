import React, { useEffect } from "react";
import { View, Text } from "react-native";

import useUi from "../../contexts/ui/useUi";

import getStyles from "./styles";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";

const MainMenu: React.FC = () => {
  const { theme } = useUi();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Header onSettingsPress={() => console.log("pressed")} />
      <View style={styles.content}>
        <Text style={styles.headline}>Bem-vindo ao Monopoly App!</Text>
        <Text style={styles.subHeadline}>Onde você quer ir hoje?</Text>
        <Spacer height={32} />
        <Button label="Criar Partida" onPress={() => console.log("pressed")} />
        <Spacer height={16} />
        <Button
          label="Entrar em partida"
          onPress={() => console.log("pressed")}
        />
      </View>
    </View>
  );
};

export default MainMenu;

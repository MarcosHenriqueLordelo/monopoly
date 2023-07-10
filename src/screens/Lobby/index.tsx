import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

import useFirebase from "../../contexts/firebase/useFirebase";
import useUi from "../../contexts/ui/useUi";
import useUser from "../../contexts/user/useUser";

import getStyles from "./styles";

import Loading from "../../components/Loading";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import StartGameModal from "../../modals/StartGameModal";

const Lobby: React.FC = () => {
  const { game, getPlayerData, leaveLobby, clearGame, startGame, gameKey } =
    useFirebase();
  const { loading, theme, strings } = useUi();
  const { user } = useUser();
  const navigation = useNavigation();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const [lobbyData, setLobbyData] = useState<User[]>([]);
  const [startGameModal, setStartGameModal] = useState(false);

  useEffect(() => {
    if (!game) return;

    loadLobby(game.lobby);
  }, [game]);

  const loadLobby = async (lobby: string[]) => {
    const dataToPush: User[] = [];

    const promises = lobby.map(async (id) => {
      const playerData = await getPlayerData(id);

      if (playerData) dataToPush.push(playerData);
    });

    await Promise.all(promises);

    setLobbyData([...dataToPush]);
  };

  const renderEmptySpaces = useCallback(() => {
    const emptySpaces = 6 - lobbyData.length;
    const spacesArray: string[] = [];

    for (let i = 0; i < emptySpaces; i++) {
      spacesArray.push(`empty${i}`);
    }

    return spacesArray.map((value) => (
      <View key={value} style={styles.playerListItem}>
        <ActivityIndicator color={theme.colors.fontLight} size="small" />
        <Text style={styles.playerItemLabel}>{strings.waitingForPlayer}</Text>
      </View>
    ));
  }, [lobbyData]);

  const renderFilledSpaces = useCallback(() => {
    return lobbyData.map((player) => (
      <View
        key={player.id}
        style={{ justifyContent: "space-between", ...styles.playerListItem }}
      >
        <Text style={styles.playerItemLabel}>{player.name}</Text>
        {player.id === game?.admin && (
          <MaterialIcon
            name="local-police"
            size={24}
            color={theme.colors.fontLight}
          />
        )}
      </View>
    ));
  }, [lobbyData, game]);

  const onLeaveLobby = () => {
    leaveLobby();
    clearGame();
    navigation.dispatch(StackActions.pop());
  };

  const onStartGame = useCallback(
    (startValue: number) => {
      console.log("value", startValue);
      console.log("lobby", lobbyData);

      if (!lobbyData || lobbyData.length < 2) return;

      startGame(lobbyData, startValue);
    },
    [lobbyData]
  );

  if (loading) return <Loading />;

  if (!loading && !gameKey)
    return (
      <View style={{ ...styles.container, justifyContent: "center" }}>
        <Text style={styles.qrCodeHint}>{strings.opsGameNotFound}</Text>
        <View style={styles.buttonsView}>
          <Button
            label={strings.goBack}
            onPress={() => navigation.dispatch(StackActions.pop())}
          />
        </View>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonsView}>
        <QRCode
          value={`pixplayapp:gameid:${game?.id}`}
          size={175}
          backgroundColor={theme.colors.background}
          color={theme.colors.action}
        />
      </View>
      <Text style={styles.qrCodeHint}>{strings.qrCodeHint}</Text>
      <View style={styles.playersListContainer}>
        <Text style={styles.playersLabel}>{strings.players}</Text>
        {renderFilledSpaces()}
        {renderEmptySpaces()}
      </View>
      <View style={styles.buttonsView}>
        <Button label={strings.leaveLobby} onPress={onLeaveLobby} />
        <Button
          label={strings.startGame}
          disabled={game?.admin !== user?.id || lobbyData.length < 2}
          onPress={() => setStartGameModal(true)}
        />
      </View>
      <Spacer height={32} />
      <StartGameModal
        onClose={() => setStartGameModal(false)}
        open={startGameModal}
        onStartGame={(startValue) => onStartGame(startValue)}
      />
    </ScrollView>
  );
};

export default Lobby;

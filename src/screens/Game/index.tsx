import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import useUi from "../../contexts/ui/useUi";
import getStyles from "./styles";
import Header from "../../components/Header";
import useFirebase from "../../contexts/firebase/useFirebase";
import Loading from "../../components/Loading";
import useUser from "../../contexts/user/useUser";
import IconButton from "../../components/IconButton";
import Spacer from "../../components/Spacer";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

const Game: React.FC = () => {
  const { theme, strings } = useUi();
  const { game } = useFirebase();
  const { user } = useUser();

  const [player, setPlayer] = useState<Player>();

  const styles = getStyles(theme);

  useEffect(() => {
    if (!game || !user) return;

    if (game.players[user.id] !== player) {
      setPlayer(game.players[user.id]);
    }
  }, [game!.players[user!.id], user]);

  return (
    <View style={styles.container}>
      {!player ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Header onSettingsPress={() => console.log("settings pressed")} />
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>{strings.balance}</Text>
            <Text style={styles.ballanceValue}>R$ {player.money}</Text>
            <ScrollView
              style={styles.buttonsView}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.buttonItem}>
                <IconButton
                  name="north"
                  onPress={() => console.log("settings pressed")}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.transfer}</Text>
              </View>
              <View style={styles.buttonItem}>
                <IconButton
                  name="south"
                  onPress={() => console.log("settings pressed")}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.deposit}</Text>
              </View>
              <View style={styles.buttonItem}>
                <IconButton
                  name="qr-code-scanner"
                  onPress={() => console.log("settings pressed")}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.pay}</Text>
              </View>
              <View style={styles.buttonItem}>
                <IconButton
                  name="attach-money"
                  onPress={() => console.log("settings pressed")}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.charge}</Text>
              </View>
              <View style={styles.buttonItem}>
                <IconButton
                  name="history"
                  onPress={() => console.log("settings pressed")}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.history}</Text>
              </View>
              <Spacer width={16} />
            </ScrollView>
            <TouchableOpacity style={styles.scoreboardContainer}>
              <MaterialIcon
                name="leaderboard"
                size={24}
                color={theme.colors.fontDark}
              />
              <Text style={styles.scoreboardLabel}>{strings.scoreboard}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.rowView}>
              <Text style={styles.title}>{strings.myProperties}</Text>
              <IconButton
                name="add"
                onPress={() => console.log("settings pressed")}
                size={32}
                color={theme.colors.fontDark}
                style={{ marginRight: 16 }}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Game;

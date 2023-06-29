import React, { useMemo } from "react";
import { View } from "react-native";

import Lobby from "../screens/Lobby";
import Game from "../screens/Game";

import useFirebase from "../contexts/firebase/useFirebase";

const GameNav: React.FC = () => {
  const { game } = useFirebase();

  const renderScreen = useMemo(() => {
    if (!game) return <Lobby />;
    else if (game.state === "lobby") return <Lobby />;
    else return <Game />;
  }, [game]);

  return <View style={{ flex: 1 }}>{renderScreen}</View>;
};

export default GameNav;

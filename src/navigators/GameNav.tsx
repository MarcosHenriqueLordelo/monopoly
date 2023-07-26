import React, { useMemo } from 'react';
import { View } from 'react-native';

import Lobby from '../screens/Lobby';
import Game from '../screens/Game';

import useFirebase from '../contexts/firebase/useFirebase';
import { useNavigation } from '@react-navigation/native';

const GameNav: React.FC = () => {
  const { game, stopListening } = useFirebase();
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const { routes } = navigation.getState();

      const filtered = routes.filter(({ name }) => name === 'Game');

      if (filtered.length <= 0) stopListening();
    });

    return unsubscribe;
  }, [navigation]);

  const renderScreen = useMemo(() => {
    if (!game) return <Lobby />;
    else if (game.state === 'lobby') return <Lobby />;
    else return <Game />;
  }, [game]);

  return <View style={{ flex: 1 }}>{renderScreen}</View>;
};

export default GameNav;

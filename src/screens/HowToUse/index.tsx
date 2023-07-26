import React, { useMemo } from 'react';
import { View } from 'react-native';

import getStyles from './styles';

import useUi from '../../contexts/ui/useUi';
import { StackActions, useNavigation } from '@react-navigation/native';

import AppBar from '../../components/AppBar';
import ExpansibleListItem from '../../components/ExpansibleListItem';
import { ScrollView } from 'react-native-gesture-handler';

const HowToUse: React.FC = () => {
  const { theme, strings } = useUi();
  const navigation = useNavigation();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleGoBack = () => navigation.dispatch(StackActions.pop());

  return (
    <View style={styles.container}>
      <AppBar
        title={strings.howItWorks}
        leftAction={{ name: 'arrow-back', action: handleGoBack }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExpansibleListItem
          title={strings.usesRealMoney}
          expansable
          description={strings.usesRealMoneyRes}
        />
        <ExpansibleListItem
          title={strings.howToCreateGame}
          expansable
          description={strings.howToCreateGameRes}
        />
        <ExpansibleListItem
          title={strings.canIJoinAStartedGame}
          expansable
          description={strings.canIJoinAStartedGameRes}
        />
        <ExpansibleListItem
          title={strings.canIRejoinTheGame}
          expansable
          description={strings.canIRejoinTheGameRes}
        />
      </ScrollView>
    </View>
  );
};

export default HowToUse;

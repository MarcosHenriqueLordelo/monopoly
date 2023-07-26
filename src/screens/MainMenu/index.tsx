import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StackActions, useNavigation } from '@react-navigation/native';

import useUi from '../../contexts/ui/useUi';
import useUser from '../../contexts/user/useUser';
import useFirebase from '../../contexts/firebase/useFirebase';
import useSnackbar from '../../contexts/snackbar/useSnackbar';

import getStyles from './styles';

import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import QrCodeScanner from '../../components/QrCodeScanner';
import OptionsModal from '../../modals/OptionsModal';
import ChangeColorModal from '../../modals/ChangeColorModal';
import ChangeNameModal from '../../modals/ChangeNameModal';
import AppBar from '../../components/AppBar';

const MainMenu: React.FC = () => {
  const { theme, strings } = useUi();
  const { createGame, listenToGame, gameKey } = useFirebase();
  const { showSnackbar } = useSnackbar();
  const { user } = useUser();
  const navigation = useNavigation();

  const [barCodePermisison, setBarCodePermission] = useState(false);
  const [scanner, setScanner] = useState(false);

  const [optionsModal, setOptionsModal] = useState(false);
  const [changeColorModal, setChangeColorModal] = useState(false);
  const [changeNameModal, setChangeNameModal] = useState(false);

  const styles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setBarCodePermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleCreateGame = () => {
    createGame();
    navigation.dispatch(StackActions.push('Game'));
  };

  const handleOpenScanner = () => {
    if (barCodePermisison) setScanner(true);
  };

  const handleQrCodeScanned = (code: string) => {
    if (code.includes('gameid')) {
      listenToGame(code.split(':')[2]);
      navigation.dispatch(StackActions.push('Game'));
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
      <AppBar
        title={`${strings.hello} ${user?.name}!`}
        rightActions={[
          { name: 'settings', action: () => setOptionsModal(true) },
        ]}
        type="medium"
      />
      <View style={styles.content}>
        <Text style={styles.headline}>{strings.welcome}</Text>
        <Text style={styles.subHeadline}>{strings.whereToGo}</Text>
        <Spacer height={32} />
        <Button label={strings.createGame} onPress={handleCreateGame} />
        <Spacer height={16} />
        <Button label={strings.joinGame} onPress={handleOpenScanner} />
        <Spacer height={16} />
        <Button
          disabled={gameKey === undefined}
          label={strings.continueLastGame}
          onPress={() => handleQrCodeScanned(`pixplayapp:gameid:${gameKey!}`)}
        />
      </View>
      <OptionsModal
        onClose={() => setOptionsModal(false)}
        open={optionsModal}
        onChangeColor={() => {
          setChangeColorModal(true);
          setOptionsModal(false);
        }}
        onChangeName={() => {
          setChangeNameModal(true);
          setOptionsModal(false);
        }}
      />
      <ChangeColorModal
        onClose={() => {
          setChangeColorModal(false);
          setOptionsModal(true);
        }}
        open={changeColorModal}
      />
      <ChangeNameModal
        onClose={() => {
          setChangeNameModal(false);
          setOptionsModal(true);
        }}
        open={changeNameModal}
      />
    </View>
  );
};

export default MainMenu;

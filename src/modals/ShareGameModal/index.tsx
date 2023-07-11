import React, { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import ModalContainer from '../ModalContainer';

import getStyles from './styles';

import Button from '../../components/Button';

import useUi from '../../contexts/ui/useUi';

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  gameId: string;
}

const ShareGameModal: React.FC<PropTypes> = ({ open, onClose, gameId }) => {
  const { theme, strings } = useUi();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>{strings.appName}</Text>
        <QRCode
          value={`pixplayapp:gameid:${gameId}`}
          size={175}
          backgroundColor={theme.colors.action}
          color={theme.colors.fontLight}
        />
        <Text style={styles.description}>{strings.shareGameHelp}</Text>
        <Button label={strings.goBack} onPress={handleClose} />
      </View>
    </ModalContainer>
  );
};

export default ShareGameModal;

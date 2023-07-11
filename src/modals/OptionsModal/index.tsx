import React, { useMemo } from 'react';
import { View, Text, Linking, Share } from 'react-native';

import ModalContainer from '../ModalContainer';

import getStyles from './styles';

import useUi from '../../contexts/ui/useUi';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  onChangeColor: () => void;
  onChangeName: () => void;
  inGame?: boolean;
}

const OptionsModal: React.FC<PropTypes> = ({
  open,
  onClose,
  onChangeColor,
  onChangeName,
  inGame,
}) => {
  const { theme, strings } = useUi();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleShare = () =>
    Share.share({
      message: `${strings.shareText}\nhttps://play.google.com/store/apps/details?id=com.blackholedev.pixplay&pli=1`,
    });

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.options}</Text>
          <IconButton
            name="close"
            onPress={onClose}
            size={24}
            containerSize={48}
          />
        </View>
        {!inGame && (
          <Button
            containerStyle={styles.buttonsContainer}
            label={strings.changeName}
            onPress={onChangeName}
          />
        )}
        <Button
          containerStyle={styles.buttonsContainer}
          label={strings.changeColor}
          onPress={onChangeColor}
        />
        <Button
          containerStyle={styles.buttonsContainer}
          label={strings.howItWorks}
          onPress={() => console.log('teste')}
        />
        <Button
          containerStyle={styles.buttonsContainer}
          label={strings.shareApp}
          onPress={handleShare}
        />
        <Button
          containerStyle={styles.buttonsContainer}
          label={strings.developerInfo}
          onPress={() =>
            Linking.openURL('https://marcoshenriquelordelo.github.io')
          }
        />
      </View>
    </ModalContainer>
  );
};

export default OptionsModal;

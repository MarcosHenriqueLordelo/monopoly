import React, { useMemo, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import ModalContainer from '../ModalContainer';

import getStyles from './styles';

import Button from '../../components/Button';

import useUi from '../../contexts/ui/useUi';
import useSnackbar from '../../contexts/snackbar/useSnackbar';
import useUser from '../../contexts/user/useUser';
import useFirebase from '../../contexts/firebase/useFirebase';

interface PropTypes {
  open?: boolean;
  onClose: () => void;
}

const ChangeNameModal: React.FC<PropTypes> = ({ open, onClose }) => {
  const { theme, strings } = useUi();
  const { showSnackbar } = useSnackbar();
  const { user, saveUserInCache } = useUser();
  const { saveUser } = useFirebase();

  const [inputValue, setInputValue] = useState<string>(user ? user.name : '');

  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleClose = () => {
    setInputValue(user ? user.name : '');
    onClose();
  };

  const handleError = () => {
    let error: string | undefined;

    if (inputValue.trim().length < 1) {
      error = strings.fieldMustBeFilled;

      showSnackbar(error, theme.colors.error);
    }

    return error !== undefined;
  };

  const handleConfirm = () => {
    if (handleError() || !user) return;

    saveUserInCache(inputValue, user.id);
    saveUser(inputValue, user.id);

    onClose();
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.changeName}</Text>
        </View>
        <TextInput
          style={styles.nameInput}
          placeholder="Nome"
          value={inputValue}
          onChangeText={setInputValue}
          autoComplete="off"
        />
        <View style={styles.headerView}>
          <Button label={strings.cancel} onPress={handleClose} />
          <Button label={strings.confirm} onPress={handleConfirm} />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ChangeNameModal;

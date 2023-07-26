import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import ModalContainer from '../ModalContainer';

import getStyles from './styles';

import SelectableChip from '../../components/SelectableChip';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';

import useUi from '../../contexts/ui/useUi';
import useSnackbar from '../../contexts/snackbar/useSnackbar';
import useUser from '../../contexts/user/useUser';
import useFirebase from '../../contexts/firebase/useFirebase';
import Loading from '../../components/Loading';
import IconButton from '../../components/IconButton';

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  property?: Property;
}

type Multiplier = 'M' | 'K' | undefined;

const EditPropertyModal: React.FC<PropTypes> = ({
  open,
  onClose,
  property,
}) => {
  const { theme, strings, loading } = useUi();
  const { showSnackbar } = useSnackbar();
  const { user } = useUser();
  const { updateProperty, deleteProperty } = useFirebase();

  const [name, setName] = useState<string>('');

  const [rent, setRent] = useState<string>('');
  const [rentMult, setRentMult] = useState<Multiplier>();

  const [mortgage, setMortgage] = useState<string>('');
  const [mortgageMult, setMortgageMult] = useState<Multiplier>();

  const rentInputRef = useRef<any>(null);
  const mortgageInputRef = useRef<any>(null);

  const styles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    if (!property) return;
    setName(property.name);

    if (property.rent % 1000 > 1) {
      setRentMult('K');
      setRent(`${property.rent / 1000}`);
    } else if (property.rent % 1000000 > 1) {
      setRentMult('M');
      setRent(`${property.rent / 1000000}`);
    } else {
      setRentMult(undefined);
      setRent(`${property.rent}`);
    }
    if (property.mortgage % 1000 > 1) {
      setMortgageMult('K');
      setMortgage(`${property.mortgage / 1000}`);
    } else if (property.mortgage % 1000000 > 1) {
      setMortgageMult('M');
      setMortgage(`${property.mortgage / 1000000}`);
    } else {
      setMortgageMult(undefined);
      setMortgage(`${property.mortgage}`);
    }
  }, [property]);

  const handleMultiplierChanged = (
    key: 'M' | 'K',
    field: 'mortgage' | 'rent'
  ) => {
    switch (field) {
      case 'mortgage':
        if (mortgageMult === key) setMortgageMult(undefined);
        else setMortgageMult(key);
        break;
      case 'rent':
        if (rentMult === key) setRentMult(undefined);
        else setRentMult(key);
        break;
    }
  };

  const handleUpdateProperty = () => {
    if (
      !user ||
      !rentInputRef.current ||
      !mortgageInputRef.current ||
      !property
    )
      return;

    let rentValue = rentInputRef.current.getRawValue();
    let mortgageValue = mortgageInputRef.current.getRawValue();

    if (name.trim().length === 0)
      return showSnackbar(strings.nameCantBeUndefined, theme.colors.error);
    if (rentValue === 0)
      return showSnackbar(strings.chargeValueCantBeZero, theme.colors.error);
    if (mortgageValue === 0)
      return showSnackbar(strings.mortgageCantBeZero, theme.colors.error);

    rentValue = handleMultiplier(rentMult, rentValue);
    mortgageValue = handleMultiplier(mortgageMult, mortgageValue);

    updateProperty({
      mortgage: mortgageValue,
      name,
      rent: rentValue,
      id: property!.id,
    });

    onClose();
  };

  const handleMultiplier = (multiplier: Multiplier, value: number) => {
    if (multiplier === 'M') return value * 1000000;
    if (multiplier === 'K') return value * 1000;
    return value;
  };

  const handleDelete = () => {
    if (!property) return;
    deleteProperty(property);
    onClose();
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.editItem}</Text>
          <IconButton name="close" onPress={onClose} size={24} />
        </View>
        <TextInput
          style={styles.nameInput}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <Spacer height={16} />
        <View style={styles.inputContainer}>
          <TextInputMask
            style={styles.input}
            type="money"
            value={rent}
            onChangeText={setRent}
            placeholder={strings.rent}
            keyboardType="number-pad"
            ref={rentInputRef}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: '',
              suffixUnit: '',
            }}
          />
          <Spacer width={8} />
          <SelectableChip
            label="M"
            selected={rentMult === 'M'}
            onPress={() => handleMultiplierChanged('M', 'rent')}
          />
          <Spacer width={8} />
          <SelectableChip
            label="K"
            selected={rentMult === 'K'}
            onPress={() => handleMultiplierChanged('K', 'rent')}
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <TextInputMask
            style={styles.input}
            type="money"
            value={mortgage}
            onChangeText={setMortgage}
            placeholder={strings.mortgage}
            keyboardType="number-pad"
            ref={mortgageInputRef}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: '',
              suffixUnit: '',
            }}
          />
          <Spacer width={8} />
          <SelectableChip
            label="M"
            selected={mortgageMult === 'M'}
            onPress={() => handleMultiplierChanged('M', 'mortgage')}
          />
          <Spacer width={8} />
          <SelectableChip
            label="K"
            selected={mortgageMult === 'K'}
            onPress={() => handleMultiplierChanged('K', 'mortgage')}
          />
        </View> */}
        <View style={styles.headerView}>
          <Button label={strings.remove} onPress={handleDelete} />
          <Button label={strings.confirm} onPress={handleUpdateProperty} />
        </View>
      </View>
      {loading && (
        <View style={styles.loadingView}>
          <Loading />
        </View>
      )}
    </ModalContainer>
  );
};

export default EditPropertyModal;

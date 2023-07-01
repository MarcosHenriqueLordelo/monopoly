import React, { useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import * as Crypto from "expo-crypto";

import ModalContainer from "../ModalContainer";

import getStyles from "./styles";

import SelectableChip from "../../components/SelectableChip";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";

import useUi from "../../contexts/ui/useUi";
import useSnackbar from "../../contexts/snackbar/useSnackbar";
import useUser from "../../contexts/user/useUser";
import useFirebase from "../../contexts/firebase/useFirebase";
import Loading from "../../components/Loading";

interface PropTypes {
  open?: boolean;
  onClose: () => void;
}

type Multiplier = "M" | "K" | undefined;

const CreatePropertyModal: React.FC<PropTypes> = ({ open, onClose }) => {
  const { theme, strings, loading } = useUi();
  const { showSnackbar } = useSnackbar();
  const { user } = useUser();
  const { addProperty } = useFirebase();

  const [name, setName] = useState<string>("");

  const [rent, setRent] = useState<string>("");
  const [rentMult, setRentMult] = useState<Multiplier>();

  const [mortgage, setMortgage] = useState<string>("");
  const [mortgageMult, setMortgageMult] = useState<Multiplier>();

  const rentInputRef = useRef<any>(null);
  const mortgageInputRef = useRef<any>(null);

  const styles = getStyles(theme);

  const handleMultiplierChanged = (
    key: "M" | "K",
    field: "mortgage" | "rent"
  ) => {
    switch (field) {
      case "mortgage":
        if (mortgageMult === key) setMortgageMult(undefined);
        else setMortgageMult(key);
        break;
      case "rent":
        if (rentMult === key) setRentMult(undefined);
        else setRentMult(key);
        break;
    }
  };

  const handleAddProperty = () => {
    if (!user || !rentInputRef.current || !mortgageInputRef.current) return;

    let rentValue = rentInputRef.current.getRawValue();
    let mortgageValue = mortgageInputRef.current.getRawValue();

    if (name.trim().length === 0)
      return showSnackbar(strings.nameCantBeUndefined, theme.colors.error);
    if (rentValue === 0)
      return showSnackbar(strings.rentCantBeZero, theme.colors.error);
    if (mortgageValue === 0)
      return showSnackbar(strings.mortgageCantBeZero, theme.colors.error);

    rentValue = handleMultiplier(rentMult, rentValue);
    mortgageValue = handleMultiplier(mortgageMult, mortgageValue);

    addProperty({
      mortgage: mortgageValue,
      name,
      rent: rentValue,
      id: Crypto.randomUUID(),
    });
    handleClose();
  };

  const handleMultiplier = (multiplier: Multiplier, value: number) => {
    if (multiplier === "M") return value * 1000000;
    if (multiplier === "K") return value * 1000;
    return value;
  };

  const handleClose = () => {
    setName("");
    setRent("");
    setMortgage("");
    setRentMult(undefined);
    setMortgageMult(undefined);
    onClose();
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.addProperty}</Text>
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
              separator: ",",
              delimiter: ".",
              unit: "",
              suffixUnit: "",
            }}
          />
          <Spacer width={8} />
          <SelectableChip
            label="M"
            selected={rentMult === "M"}
            onPress={() => handleMultiplierChanged("M", "rent")}
          />
          <Spacer width={8} />
          <SelectableChip
            label="K"
            selected={rentMult === "K"}
            onPress={() => handleMultiplierChanged("K", "rent")}
          />
        </View>
        <View style={styles.inputContainer}>
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
              separator: ",",
              delimiter: ".",
              unit: "",
              suffixUnit: "",
            }}
          />
          <Spacer width={8} />
          <SelectableChip
            label="M"
            selected={mortgageMult === "M"}
            onPress={() => handleMultiplierChanged("M", "mortgage")}
          />
          <Spacer width={8} />
          <SelectableChip
            label="K"
            selected={mortgageMult === "K"}
            onPress={() => handleMultiplierChanged("K", "mortgage")}
          />
        </View>
        <View style={styles.headerView}>
          <Button label={strings.cancel} onPress={handleClose} />
          <Button label={strings.confirm} onPress={handleAddProperty} />
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

export default CreatePropertyModal;

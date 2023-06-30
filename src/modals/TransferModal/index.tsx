import React, { ReactNode, useCallback, useRef, useState } from "react";
import { View, Text } from "react-native";
import { TextInputMask } from "react-native-masked-text";

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

const TransferModal: React.FC<PropTypes> = ({ open, onClose }) => {
  const { theme, strings, loading } = useUi();
  const { showSnackbar } = useSnackbar();
  const { user } = useUser();
  const { makeTransaction, game } = useFirebase();

  const [inputValue, setInputValue] = useState<string>("");
  const [multiplier, setMultiplier] = useState<"M" | "K" | undefined>();
  const [receiver, setReceiver] = useState<string>("bank");
  const textInputRef = useRef<any>(null);

  const styles = getStyles(theme);

  const handleMultiplierChanged = (key: "M" | "K") => {
    if (multiplier === key) setMultiplier(undefined);
    else setMultiplier(key);
  };

  const handleReceiverChanged = (key: string) => {
    if (receiver === key) setReceiver("bank");
    else setReceiver(key);
  };

  const handleMakeDeposit = useCallback(() => {
    if (textInputRef.current && user) {
      let value = textInputRef.current.getRawValue();
      if (value === 0 || !value) {
        showSnackbar(strings.valueCantBeZero, theme.colors.error);
      } else {
        if (multiplier === "M") value *= 1000000;
        if (multiplier === "K") value *= 1000;

        makeTransaction(user.id, receiver, value);
        handleClose();
      }
    }
  }, [textInputRef, multiplier]);

  const handleClose = () => {
    setInputValue("");
    setMultiplier(undefined);
    onClose();
  };

  const renderReceivers = useCallback((): ReactNode => {
    if (!game || !user) return <View />;

    const ids = Object.keys(game.players);

    return ids.map(
      (id) =>
        id !== user.id && (
          <SelectableChip
            key={id}
            label={game.players[id].name}
            selected={receiver === id}
            onPress={() => handleReceiverChanged(id)}
          />
        )
    );
  }, [game, user, receiver]);

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.makeTransfer}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInputMask
            style={styles.input}
            type="money"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={strings.digitValue}
            keyboardType="number-pad"
            ref={textInputRef}
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
            selected={multiplier === "M"}
            onPress={() => handleMultiplierChanged("M")}
          />
          <Spacer width={8} />
          <SelectableChip
            label="K"
            selected={multiplier === "K"}
            onPress={() => handleMultiplierChanged("K")}
          />
        </View>
        <Text style={styles.destiny}>{strings.destiny}:</Text>
        <View style={styles.receiversView}>
          <SelectableChip
            label={strings.bank}
            selected={receiver === "bank"}
            onPress={() => handleReceiverChanged("bank")}
          />
          {renderReceivers()}
        </View>
        <View style={styles.headerView}>
          <Button label={strings.cancel} onPress={handleClose} />
          <Button label={strings.confirm} onPress={handleMakeDeposit} />
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

export default TransferModal;

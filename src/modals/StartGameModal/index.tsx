import React, { useCallback, useMemo, useRef, useState } from "react";
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
import Loading from "../../components/Loading";

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  onStartGame: (startValue: number) => void;
}

const StartGameModal: React.FC<PropTypes> = ({
  open,
  onClose,
  onStartGame,
}) => {
  const { theme, strings, loading } = useUi();
  const { showSnackbar } = useSnackbar();
  const { user } = useUser();

  const [inputValue, setInputValue] = useState<string>("15,00");
  const [multiplier, setMultiplier] = useState<"M" | "K" | undefined>("M");
  const textInputRef = useRef<any>(null);

  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleMultiplierChanged = (key: "M" | "K") => {
    if (multiplier === key) setMultiplier(undefined);
    else setMultiplier(key);
  };

  const handleStartgame = useCallback(() => {
    if (textInputRef.current && user) {
      let value = textInputRef.current.getRawValue();
      if (value === 0 || !value) {
        showSnackbar(strings.valueCantBeZero, theme.colors.error);
      } else {
        if (multiplier === "M") value *= 1000000;
        if (multiplier === "K") value *= 1000;

        onStartGame(value);
        onClose();
      }
    }
  }, [textInputRef, multiplier, onStartGame]);

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.startGame}</Text>
        </View>
        <Text style={styles.hint}>{strings.starterValueHelp}</Text>
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
        <View style={styles.headerView}>
          <Button label={strings.cancel} onPress={onClose} />
          <Button label={strings.confirm} onPress={handleStartgame} />
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

export default StartGameModal;

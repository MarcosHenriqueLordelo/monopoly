import React, { ReactNode } from "react";
import { View, Text, ScrollView } from "react-native";
import ModalContainer from "../ModalContainer";

import getStyles from "./styles";

import useUi from "../../contexts/ui/useUi";
import IconButton from "../../components/IconButton";

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  scoreboard: Player[];
}

const ScoreboardModal: React.FC<PropTypes> = ({
  open,
  onClose,
  scoreboard,
}) => {
  const { theme, strings } = useUi();

  const styles = getStyles(theme);

  const renderList = (): ReactNode => {
    const format = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format;

    return scoreboard.map((score, index) => (
      <View style={styles.listItem} key={index}>
        <View>
          <Text style={styles.name}>{score.name}</Text>
          <Text style={styles.name}>{format(score.money)}</Text>
        </View>
        <Text style={styles.position}>{index + 1}</Text>
      </View>
    ));
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.scoreboard}</Text>
          <IconButton
            name="close"
            onPress={onClose}
            size={24}
            color={theme.colors.fontDark}
          />
        </View>
        {renderList()}
      </View>
    </ModalContainer>
  );
};

export default ScoreboardModal;

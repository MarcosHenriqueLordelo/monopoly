import React, { ReactNode } from "react";
import { View, Text, ScrollView } from "react-native";
import moment from "moment";

import ModalContainer from "../ModalContainer";

import getStyles from "./styles";

import useUi from "../../contexts/ui/useUi";
import useFirebase from "../../contexts/firebase/useFirebase";
import IconButton from "../../components/IconButton";

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  extract: Transaction[];
}

const ExtractModal: React.FC<PropTypes> = ({ open, onClose, extract }) => {
  const { theme, strings } = useUi();
  const { game } = useFirebase();

  const styles = getStyles(theme);

  const renderList = (): ReactNode => {
    const format = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format;

    return extract.map((transfer, index) => (
      <View style={styles.listItem} key={index}>
        <View style={styles.listTop}>
          <Text style={styles.name}>
            {transfer.receiver === "bank"
              ? strings.bank
              : game!.players[transfer.receiver].name}
          </Text>
          <Text style={styles.arrow}>{String.fromCharCode(10229)}</Text>
          <Text style={styles.name}>
            {transfer.payer === "bank"
              ? strings.bank
              : game!.players[transfer.payer].name}
          </Text>
        </View>
        <View style={styles.listTop}>
          <Text style={styles.name}>{format(transfer.value)}</Text>
          <Text style={styles.name}>
            {moment.unix(transfer.timestamp).format("hh:mm")}
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.extract}</Text>
          <IconButton
            name="close"
            onPress={onClose}
            size={24}
            color={theme.colors.fontDark}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderList()}
        </ScrollView>
      </View>
    </ModalContainer>
  );
};

export default ExtractModal;

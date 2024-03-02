import React, { useMemo } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import moment from 'moment';

import ModalContainer from '../ModalContainer';

import getStyles from './styles';

import useUi from '../../contexts/ui/useUi';
import useFirebase from '../../contexts/firebase/useFirebase';
import IconButton from '../../components/IconButton';

interface PropTypes {
  open?: boolean;
  onClose: () => void;
  extract: Transaction[];
}

const format = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format;

const ExtractModal: React.FC<PropTypes> = ({ open, onClose, extract }) => {
  const { theme, strings } = useUi();
  const { game } = useFirebase();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const renderItem = ({ item: transfer }: { item: Transaction }) => (
    <View style={styles.listItem}>
      <View style={styles.listTop}>
        <Text style={styles.name}>
          {transfer.receiver === 'bank'
            ? strings.bank
            : game!.players[transfer.receiver].name}
        </Text>
        <Text style={styles.arrow}>{String.fromCharCode(10229)}</Text>
        <Text style={styles.name}>
          {transfer.payer === 'bank'
            ? strings.bank
            : game!.players[transfer.payer].name}
        </Text>
      </View>
      <View style={styles.listTop}>
        <Text style={styles.name}>{format(transfer.value)}</Text>
        <Text style={styles.name}>
          {moment.unix(transfer.timestamp).format('HH:mm')}
        </Text>
      </View>
    </View>
  );

  return (
    <ModalContainer open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{strings.extract}</Text>
          <IconButton name="close" onPress={onClose} size={24} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {open && (
            <FlatList
              data={extract}
              renderItem={renderItem}
              keyExtractor={(_, index) => `${index}`}
            />
          )}
        </ScrollView>
      </View>
    </ModalContainer>
  );
};

export default ExtractModal;

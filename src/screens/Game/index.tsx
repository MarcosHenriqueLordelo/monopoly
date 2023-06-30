import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

import getStyles from "./styles";

import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import Spacer from "../../components/Spacer";
import QrCodeScanner from "../../components/QrCodeScanner";

import useFirebase from "../../contexts/firebase/useFirebase";
import useUser from "../../contexts/user/useUser";
import Loading from "../../components/Loading";
import useUi from "../../contexts/ui/useUi";
import useSnackbar from "../../contexts/snackbar/useSnackbar";

import DepositModal from "../../modals/DepositModal";
import TransferModal from "../../modals/TransferModal";
import ChargeModal from "../../modals/ChargeModal ";
import QrCodeModal from "../../modals/QrCodeModal";
import PaymentModal from "../../modals/PaymentModal";

const Game: React.FC = () => {
  const { theme, strings } = useUi();
  const { game } = useFirebase();
  const { user } = useUser();
  const { showSnackbar } = useSnackbar();

  const [player, setPlayer] = useState<Player>();
  const [transactions, setTransactions] = useState<Transactions>({});
  const [qrCodeData, setQrCodeData] = useState<ChargeQrCode>();

  const [depositModal, setDepositModal] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [chargeModal, setChargeModal] = useState(false);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [scanner, setScanner] = useState(false);

  const styles = getStyles(theme);

  useEffect(() => {
    if (!game || !user) return;

    if (game.players[user.id] !== player) {
      setPlayer(game.players[user.id]);
    }
  }, [game!.players[user!.id], user]);

  useEffect(() => {
    if (!game || !user) return;

    updateTransactions(game.transactions);
  }, [game!.transactions, user]);

  const updateTransactions = useCallback(
    (newTransactions: Transactions) => {
      const keys = Object.keys(newTransactions);
      const aux = transactions;
      const auxKeys = Object.keys(aux);

      const format = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format;

      keys.forEach((key) => {
        const transaction = newTransactions[key];

        if (!auxKeys.includes(key)) {
          if (transaction.payer === user!.id) {
            aux[key] = transaction;
          } else if (transaction.receiver === user!.id) {
            aux[key] = transaction;
            auxKeys.push(key);

            if (Date.now() - transaction.timestamp < 60000)
              showSnackbar(
                `${strings.transferReceived} ${format(transaction.value)}`,
                theme.colors.success
              );
          }
        }
      });

      setTransactions(aux);
    },
    [transactions, user]
  );

  const formater = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleQrCodeScanned = (code: string) => {
    if (code.includes("monopolyapp") && code.includes("charge")) {
      setQrCodeData({
        receiver: { id: code.split(":")[2], name: code.split(":")[3] },
        value: parseFloat(code.split(":")[4]),
      });
      setPaymentModal(true);
    } else {
      showSnackbar(strings.invalidQrCode, theme.colors.error);
    }
  };

  if (scanner)
    return (
      <QrCodeScanner
        onClose={() => setScanner(false)}
        onQrCodeScanned={handleQrCodeScanned}
      />
    );

  return (
    <View style={styles.container}>
      {!player ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Header onSettingsPress={() => console.log("settings pressed")} />
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>{strings.balance}</Text>
            <Text style={styles.ballanceValue}>
              {formater.format(player.money)}
            </Text>
            <ScrollView
              style={styles.buttonsView}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.buttonItem}>
                <IconButton
                  name="north"
                  onPress={() => setTransferModal(true)}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.transfer}</Text>
              </View>
              <View style={styles.buttonItem}>
                <IconButton
                  name="south"
                  onPress={() => setDepositModal(true)}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.deposit}</Text>
              </View>
              <View style={styles.buttonItem}>
                <IconButton
                  name="qr-code-scanner"
                  onPress={() => setScanner(true)}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.pay}</Text>
              </View>
              <View style={styles.buttonItem}>
                <IconButton
                  name="attach-money"
                  onPress={() => setChargeModal(true)}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.charge}</Text>
              </View>
              <View style={styles.buttonItem}>
                <IconButton
                  name="history"
                  onPress={() => console.log("settings pressed")}
                  size={32}
                  color={theme.colors.fontDark}
                  containerSize={70}
                  style={styles.buttonContainer}
                />
                <Text style={styles.buttonLabel}>{strings.history}</Text>
              </View>
              <Spacer width={16} />
            </ScrollView>
            <TouchableOpacity style={styles.scoreboardContainer}>
              <MaterialIcon
                name="leaderboard"
                size={24}
                color={theme.colors.fontDark}
              />
              <Text style={styles.scoreboardLabel}>{strings.scoreboard}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.rowView}>
              <Text style={styles.title}>{strings.myProperties}</Text>
              <IconButton
                name="add"
                onPress={() => console.log("settings pressed")}
                size={32}
                color={theme.colors.fontDark}
                style={{ marginRight: 16 }}
              />
            </View>
          </ScrollView>
        </View>
      )}
      <DepositModal
        open={depositModal}
        onClose={() => setDepositModal(false)}
      />
      <TransferModal
        open={transferModal}
        onClose={() => setTransferModal(false)}
      />
      <ChargeModal
        open={chargeModal}
        onClose={() => setChargeModal(false)}
        onCharge={(value, receiver) => {
          setQrCodeData({ value, receiver });
          setQrCodeModal(true);
        }}
      />
      <QrCodeModal
        open={qrCodeModal}
        onClose={() => setQrCodeModal(false)}
        qrCodeData={qrCodeData}
      />
      <PaymentModal
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        qrCodeData={qrCodeData}
      />
    </View>
  );
};

export default Game;

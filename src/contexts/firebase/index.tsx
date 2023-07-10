import React, { createContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  DataSnapshot,
  Database,
  Query,
  get,
  getDatabase,
  off,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

import firebaseConfig from "../../utils/firebaseConfig";

import useUser from "../user/useUser";
import useSnackbar from "../snackbar/useSnackbar";
import useUi from "../ui/useUi";

import { TOKEN_KEY } from "../../utils/keys";
import moment from "moment";

interface FirebaseContext {
  game?: Game;
  createGame: () => void;
  saveUser: (username: string, uid: string) => void;
  getPlayerData: (userId: string) => Promise<User | undefined>;
  leaveLobby: () => void;
  listenToGame: (gameId: string) => void;
  stopListening: () => void;
  clearGame: () => void;
  startGame: (lobbyData: User[], startValue: number) => void;
  makeTransaction: (
    payer: string | "bank",
    receiver: string | "bank",
    value: number
  ) => void;
  gameKey?: string;
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (property: Property) => void;
}

const FirebaseContext = createContext<FirebaseContext>({} as FirebaseContext);

export const FirebaseProvider: React.FC<DefaultProps> = ({ children }) => {
  const { user } = useUser();
  const { theme, strings, setLoading } = useUi();
  const { showSnackbar } = useSnackbar();

  const [app, setApp] = useState<FirebaseApp>();
  const [db, setDb] = useState<Database>();
  const [listener, setListener] = useState<Query>();
  const [game, setGame] = useState<Game>();
  const [gameKey, setGameKey] = useState<string>();

  useEffect(() => {
    const getGameKeyFromCache = async () => {
      const key = await AsyncStorage.getItem(`${TOKEN_KEY}:gameId`);

      if (key !== null && key !== "null") setGameKey(key);
    };
    getGameKeyFromCache();
  }, []);

  useEffect(() => {
    if (game && gameKey !== game.id) {
      saveGameKeyInCache(game.id);
      setGameKey(game.id);
    }
  }, [game]);

  useEffect(() => {
    if (getApps().length < 1) {
      const app = initializeApp(firebaseConfig);
      setApp(app);
    } else {
      const app = getApps()[0];
      setApp(app);
    }

    if (app) setDb(getDatabase(app));
  }, [app]);

  const createGame = useCallback(async () => {
    try {
      setLoading(true);
      if (!db || !user) return;

      const gameId = Crypto.randomUUID();
      const gameRef = ref(db, `Games/${gameId}`);

      const newGame: Game = {
        state: "lobby",
        id: gameId,
        lobby: [user.id],
        transactions: {},
        admin: user.id,
        players: {},
      };

      await set(gameRef, newGame);

      listenToGame(gameId);
    } catch {
      showSnackbar(strings.failedToRetriveGameData, theme.colors.error);
      setLoading(false);
    }
  }, [db, user]);

  const listenToGame = useCallback(
    async (gameId: string) => {
      try {
        if (!db || !user) return;
        setLoading(true);
        const gameRef = ref(db, `Games/${gameId}`);

        setListener(gameRef);

        onValue(gameRef, (snapshot: DataSnapshot) => {
          if (snapshot.val()) {
            const game: Game = snapshot.val();

            if (game.lobby.includes(user.id)) {
              setGame(game);
              setLoading(false);
            } else if (game.lobby.length < 6 && game.state === "lobby") {
              update(gameRef, { lobby: [...game.lobby, user.id] });
              setGame(game);
              stopListening();
              listenToGame(gameId);
            } else {
              setLoading(false);
              stopListening();
              showSnackbar(strings.gameIsFull, theme.colors.error);
            }
          } else {
            setLoading(false);
            stopListening();
            saveGameKeyInCache();
            setGameKey(undefined);
            showSnackbar(strings.gameNotFound, theme.colors.error);
          }
        });
      } catch {
        showSnackbar(strings.failedToRetriveGameData, theme.colors.error);
      }
    },
    [db, user]
  );

  const stopListening = useCallback(() => {
    if (!listener) return;
    off(listener);
    setGame(undefined);
  }, [listener]);

  const saveUser = useCallback(
    async (username: string, uid: string) => {
      try {
        if (!db) return;

        const userRef = ref(db, `Users/${uid}`);

        const user: User = {
          id: uid,
          name: username,
        };

        await set(userRef, user);
      } catch {
        showSnackbar(strings.failedToRetriveUserData, theme.colors.error);
      }
    },
    [db]
  );

  const getPlayerData = useCallback(
    async (userId: string): Promise<User | undefined> => {
      try {
        if (!db) return Promise.resolve(undefined);

        const userRef = ref(db, `Users/${userId}`);

        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
          const userData: User = userSnapshot.val();

          return Promise.resolve(userData);
        } else throw new Error();
      } catch {
        showSnackbar(strings.failedToRetriveUserData, theme.colors.error);
        return Promise.resolve(undefined);
      }
    },
    [db]
  );

  const leaveLobby = useCallback(async () => {
    try {
      if (!db || !user || !game) return;

      stopListening();

      if (game.lobby.includes(user.id)) {
        const aux = game.lobby.filter((id) => id !== user.id);

        const gameRef = ref(db, `Games/${game.id}`);

        if (game.admin !== user.id) {
          update(gameRef, { lobby: aux });
        } else if (game.admin === user.id && aux.length > 0) {
          update(gameRef, { admin: aux[0], lobby: aux });
        } else if (aux.length === 0) {
          remove(gameRef);
        }
      }
    } catch {
      showSnackbar(strings.failedToRetriveGameData, theme.colors.error);
    }
  }, [db, user, game]);

  const clearGame = () => setGame(undefined);

  const startGame = useCallback(
    (lobbyData: User[], startValue: number) => {
      try {
        setLoading(true);
        if (!game || !db || !user || lobbyData.length < 1)
          return setLoading(false);
        if (user.id !== game.admin) return setLoading(false);
        if (game.lobby.length < 2) return setLoading(false);

        const gameRef = ref(db, `Games/${game.id}`);

        const players: Players = {};
        const transactions: Transactions = {};

        lobbyData.forEach((playerData) => {
          players[playerData.id] = {
            ...playerData,
            money: startValue,
            properties: {},
            color: theme.colors.action,
          };

          transactions[Crypto.randomUUID()] = {
            payer: "bank",
            receiver: playerData.id,
            value: startValue,
            timestamp: moment().unix(),
          };
        });

        update(gameRef, { players, transactions, state: "in Game" });
      } catch (err) {
        setLoading(false);
        showSnackbar(strings.failedToStartGame, theme.colors.error);
      }
    },
    [game, db, user]
  );

  const makeTransaction = useCallback(
    async (
      payer: string | "bank",
      receiver: string | "bank",
      value: number
    ) => {
      try {
        if (!db || !game) return;

        setLoading(true);

        if (payer !== "bank" && game.players[payer].money - value < 0)
          throw new Error(strings.insuficientBalance);

        const transactionUid = Crypto.randomUUID();

        const newTransaction: Transaction = {
          payer,
          receiver,
          value,
          timestamp: moment().unix(),
        };

        const transactionRef = ref(
          db,
          `Games/${game.id}/transactions/${transactionUid}`
        );
        const payerRef = ref(db, `Games/${game.id}/players/${payer}`);
        const receiverRef = ref(db, `Games/${game.id}/players/${receiver}`);

        if (payer !== "bank")
          update(payerRef, { money: game.players[payer].money - value });
        if (receiver !== "bank")
          update(receiverRef, { money: game.players[receiver].money + value });

        await set(transactionRef, newTransaction);

        if (payer === "bank")
          showSnackbar(strings.depositSuccess, theme.colors.success);
        if (payer !== "bank")
          showSnackbar(strings.transferSuccess, theme.colors.success);
      } catch (err: any) {
        showSnackbar(
          err.mensage || strings.failedToTransferMoney,
          theme.colors.error
        );
      } finally {
        setLoading(false);
      }
    },
    [game, db]
  );

  const saveGameKeyInCache = async (gameId?: string) => {
    await AsyncStorage.setItem(`${TOKEN_KEY}:gameId`, gameId || "null");
  };

  const addProperty = useCallback(
    async (property: Property) => {
      if (!game || !user || !db) return;
      try {
        if (property.rent === 0) throw new Error(strings.rentCantBeZero);
        if (property.mortgage === 0)
          throw new Error(strings.mortgageCantBeZero);

        const propertyRef = ref(
          db,
          `Games/${game.id}/players/${user.id}/properties/${property.id}`
        );

        await set(propertyRef, property);
      } catch (err: any) {
        showSnackbar(
          err.mensage || strings.failedToAddProperty,
          theme.colors.error
        );
      }
    },
    [game, user, db]
  );

  const updateProperty = useCallback(
    async (property: Property) => {
      if (!game || !user || !db) return;
      try {
        if (property.rent === 0) throw new Error(strings.rentCantBeZero);
        if (property.mortgage === 0)
          throw new Error(strings.mortgageCantBeZero);

        const propertyRef = ref(
          db,
          `Games/${game.id}/players/${user.id}/properties/${property.id}`
        );

        await update(propertyRef, property);
      } catch (err: any) {
        showSnackbar(
          err.mensage || strings.failedToUpdateProperty,
          theme.colors.error
        );
      }
    },
    [game, user, db]
  );

  const deleteProperty = useCallback(
    async (property: Property) => {
      if (!game || !user || !db) return;
      try {
        const propertyRef = ref(
          db,
          `Games/${game.id}/players/${user.id}/properties/${property.id}`
        );

        await remove(propertyRef);
      } catch {
        showSnackbar(strings.failedToRemoveProperty, theme.colors.error);
      }
    },
    [game, user, db]
  );

  return (
    <FirebaseContext.Provider
      value={{
        game,
        createGame,
        saveUser,
        getPlayerData,
        leaveLobby,
        listenToGame,
        stopListening,
        clearGame,
        startGame,
        makeTransaction,
        gameKey,
        addProperty,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;

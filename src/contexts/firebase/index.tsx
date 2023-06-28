import React, { createContext, useEffect, useState, useCallback } from "react";
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

interface FirebaseContext {
  game?: Game;
  createGame: () => void;
  saveUser: (username: string, uid: string) => void;
  getPlayerData: (userId: string) => Promise<User | undefined>;
  leaveLobby: () => void;
  listenToGame: (gameId: string) => void;
  clearGame: () => void;
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
        transactions: [],
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
      } catch {}
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

  return (
    <FirebaseContext.Provider
      value={{
        game,
        createGame,
        saveUser,
        getPlayerData,
        leaveLobby,
        listenToGame,
        clearGame,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;

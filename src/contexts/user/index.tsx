import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TOKEN_KEY } from "../../utils/keys";

import useSnackbar from "../snackbar/useSnackbar";
import useUi from "../ui/useUi";

interface UserContext {
  user?: User;
  saveUserInCache: (username: string, uid: string) => void;
}

const UserContext = createContext<UserContext>({} as UserContext);

export const UserProvider: React.FC<DefaultProps> = ({ children }) => {
  const { showSnackbar } = useSnackbar();
  const { theme, strings } = useUi();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserFromCache();
  }, []);

  const getUserFromCache = async () => {
    try {
      const username = await AsyncStorage.getItem(`${TOKEN_KEY}:username`);
      const userUid = await AsyncStorage.getItem(`${TOKEN_KEY}:uid`);

      if (username !== null && userUid !== null) {
        setUser({ id: userUid, name: username });
      }
    } catch {
      showSnackbar(strings.retriveUserDataError, theme.colors.error);
    }
  };

  const saveUserInCache = async (username: string, uid: string) => {
    try {
      await AsyncStorage.setItem(`${TOKEN_KEY}:username`, username);
      await AsyncStorage.setItem(`${TOKEN_KEY}:uid`, uid);

      setUser({ id: uid, name: username });
    } catch {
      showSnackbar(strings.retriveUserDataError, theme.colors.error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        saveUserInCache,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

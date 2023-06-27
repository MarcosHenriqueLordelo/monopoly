import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { v4 as uuidv4 } from "uuid";

import useUi from "../../contexts/ui/useUi";
import useUser from "../../contexts/user/useUser";

import getStyles from "./styles";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";

const Login: React.FC = () => {
  const { user, saveUserInCache } = useUser();
  const { theme, strings } = useUi();

  const [userName, setUserName] = useState("");
  const [uid, setUid] = useState("");
  const [error, setError] = useState<string>();
  const styles = getStyles(theme);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUid(user.id);
    } else {
      const uid = uuidv4();
      const name = `user-${uid.substring(0, 3)}`;

      setUserName(name);
      setUid(uid);
    }
  }, [user]);

  const handleError = () => {
    let error: string | undefined;

    if (userName.trim().length < 1) {
      error = strings.fieldMustBeFilled;

      setError(error);
    }

    return error !== undefined;
  };

  const onNext = () => {
    if (handleError()) return;

    saveUserInCache(userName, uid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appLogo} />
      <Text style={styles.appName}>{strings.appName}</Text>
      <Text style={styles.introduction}>
        {strings.appIntro1}
        <Text style={styles.userName}>{userName}!</Text>
        {strings.appIntro2}
      </Text>
      <TextField
        label="Nome"
        value={userName}
        error={error}
        onValueChanged={setUserName}
      />
      <Spacer height={32} />
      <Button label={strings.continue} onPress={onNext} />
    </View>
  );
};

export default Login;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOpts from "../utils/defaultScreenOpts";

import useUser from "../contexts/user/useUser";
import useUi from "../contexts/ui/useUi";

import MainMenu from "../screens/MainMenu";
import Login from "../screens/Login";
import Game from "../screens/Game";

import Loading from "../components/Loading";

const RootStack = createStackNavigator();

const RootNav: React.FC = () => {
  const { user } = useUser();
  const { loadingUser } = useUi();

  if (loadingUser) return <Loading />;

  return (
    <RootStack.Navigator screenOptions={screenOpts}>
      {user ? (
        <RootStack.Screen name="MainNav" component={MainMenu} />
      ) : (
        <RootStack.Screen name="LoginNav" component={Login} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNav;

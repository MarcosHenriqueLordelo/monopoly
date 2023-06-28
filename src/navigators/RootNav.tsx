import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOpts from "../utils/defaultScreenOpts";

import useUser from "../contexts/user/useUser";
import useUi from "../contexts/ui/useUi";

import Loading from "../components/Loading";

import MainNav from "./MainNav";
import LoginNav from "./LoginNav";

const RootStack = createStackNavigator();

const RootNav: React.FC = () => {
  const { user } = useUser();
  const { loadingUser } = useUi();

  if (loadingUser) return <Loading />;

  return (
    <RootStack.Navigator screenOptions={screenOpts}>
      {user ? (
        <RootStack.Screen name="MainNav" component={MainNav} />
      ) : (
        <RootStack.Screen name="LoginNav" component={LoginNav} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNav;

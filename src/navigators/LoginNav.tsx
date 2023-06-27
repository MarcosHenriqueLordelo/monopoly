import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOpts from "../utils/defaultScreenOpts";

import Login from "../screens/Login";

const RootStack = createStackNavigator();

const LoginNav: React.FC = () => (
  <RootStack.Navigator screenOptions={screenOpts}>
    <RootStack.Screen name="Login" component={Login} />
  </RootStack.Navigator>
);

export default LoginNav;

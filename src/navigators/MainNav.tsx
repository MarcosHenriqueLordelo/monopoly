import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOpts from "../utils/defaultScreenOpts";

import MainMenu from "../screens/MainMenu";

const RootStack = createStackNavigator();

const MainNav: React.FC = () => (
  <RootStack.Navigator screenOptions={screenOpts}>
    <RootStack.Screen name="MainMenu" component={MainMenu} />
  </RootStack.Navigator>
);

export default MainNav;

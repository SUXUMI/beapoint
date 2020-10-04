import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInWelcomeScreen from "../screens/SignInWelcomeScreen";

function AppNavigator(props) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="SignInWelcome" component={SignInWelcomeScreen} options={{ title: "Welcome" }}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default AppNavigator;

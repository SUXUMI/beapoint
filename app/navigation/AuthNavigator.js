import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/SignInScreen";
import SignInWelcomeScreen from "../screens/SignInWelcomeScreen";

function AuthNavigator(props) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
      <Stack.Screen name="SignInWelcome" component={SignInWelcomeScreen}></Stack.Screen>
      {/* <Stack.Screen name="SignUp" component={}></Stack.Screen> */}
      {/* <Stack.Screen name="RequestNewPass" component={}></Stack.Screen> */}
      {/* <Stack.Screen name="SetNewPass" component={}></Stack.Screen> */}
    </Stack.Navigator>
  );
}

export default AuthNavigator;

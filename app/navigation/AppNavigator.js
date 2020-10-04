import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";

import SignInWelcomeScreen from "../screens/SignInWelcomeScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";

function AppNavigator(props) {
  const { logout } = useAuth();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInWelcome" component={SignInWelcomeScreen}></Stack.Screen>
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          title: "Profile",
          // headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.primary,
          headerShown: true,
          headerRight: () => <Button onPress={logout} title="logout" color={colors.primary} />,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default AppNavigator;

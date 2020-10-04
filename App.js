import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./app/config/eva-custom-theme.json";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthContext from "./app/auth/context";
import SignInScreen from "./app/screens/SignInScreen";
import SignInWelcomeScreen from "./app/screens/SignInWelcomeScreen";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{ headerShown: true }}
  >
    <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
    <Stack.Screen
      name="SignInWelcome"
      component={SignInWelcomeScreen}
    ></Stack.Screen>
  </Stack.Navigator>
);

export default function App() {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        {/* v1 */}
        {/* {user ? (
          <SignInWelcomeScreen></SignInWelcomeScreen>
        ) : (
          <SignInScreen style={styles.container}></SignInScreen>
        )} */}

        {/* v2 - via NavigationContainer*/}
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

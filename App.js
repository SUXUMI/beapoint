import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import AuthContext from "./app/auth/context";
import SignInScreen from "./app/screens/SignInScreen";
import { default as theme } from "./app/config/eva-custom-theme.json";
import Screen from "./app/components/Screen";

export default function App() {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        {user ? (
          <Screen>
            <Text>{JSON.stringify(user)}</Text>
          </Screen>
        ) : (
          <SignInScreen style={styles.container}></SignInScreen>
        )}
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

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./app/config/eva-custom-theme.json";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import authApi from "./app/api/auth";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/AuthNavigator";
import authStorage from "./app/auth/storage";

export default function App() {
  const [user, setUser] = useState();
  const [appLoaded, setAppLoaded] = useState(false);

  const restoreUser = async () => {
    // get token from storage
    const access_token = await authStorage.getToken();

    if (!access_token) return;

    // try to login with auth token
    const result = await authApi.loginWithAccessToken(access_token);

    if (!result.ok) {
      // delete stored old access_token
      await authStorage.deleteToken();
    }

    setUser(result.data);
  };

  if (!appLoaded) {
    return (
      <AppLoading
        // !if this is not defined, app stops on a splash screen!
        startAsync={restoreUser}
        onFinish={() => setAppLoaded(true)}
        onError={console.warn}
      />
    );
  }

  // not works within <AppLoading />
  // causes error: `Component Exception` >> `Rendered fewer hooks that expected.
  // This may be caused by an accidental early return statement.`
  // useEffect(() => { restoreUser();  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        {/* v1 */}
        {/* {user ? <SignInWelcomeScreen></SignInWelcomeScreen> : <SignInScreen style={styles.container}></SignInScreen>} */}

        {/* v2 - via NavigationContainer*/}
        <NavigationContainer>{user ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
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

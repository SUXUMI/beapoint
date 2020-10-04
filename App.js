import React, { useState } from "react";
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
import UserProfileScreen from "./app/screens/UserProfileScreen";

export default function App() {
  const [user, setUser] = useState();
  const [appLoaded, setAppLoaded] = useState(false);

  const restoreUser = async () => {
    const result = await authApi.restoreUser();
    if (!result || !result.ok) return;
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

  // return <UserProfileScreen />;

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

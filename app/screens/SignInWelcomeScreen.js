import { Text } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet } from "react-native";

import AuthScreen from "../components/AuthScreen";
import useAuth from "../auth/useAuth";

function SignInWelcomeScreen({ navigation, ...otherProps }) {
  const { user } = useAuth();

  // DEBUG
  //   const user = {
  //     email: "test1@admin.ge",
  //     email_verified: false,
  //     name: "test1@admin.ge",
  //     nickname: "test1",
  //     picture:
  //       "https://s.gravatar.com/avatar/91e1cfc22797c47853ed69e37d3da93f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
  //     sub: "auth0|5f72319c52cb55007845b296",
  //     updated_at: "2020-10-04T12:25:01.239Z",
  //   };

  setTimeout(function () {
    // navigation.navigate("UserProfile");
    navigation.replace("UserProfile");
  }, 500);

  return (
    <AuthScreen style={styles.container}>
      <Image style={styles.image} source={require("../assets/i/happy-guys.png")} />
      <Text style={styles.textGreetings} category="h4">
        Welcome {user && user["nickname"]}
      </Text>
      <Text style={styles.textInfo} appearance="hint">
        You'll be redirected to the main screen in a second..
      </Text>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    resizeMode: "contain",
    marginBottom: "20%",
  },
  textGreetings: { textAlign: "center", marginBottom: "10%" },
  textInfo: { textAlign: "center" },
});

export default SignInWelcomeScreen;

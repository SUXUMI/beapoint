import { Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { color } from "react-native-reanimated";
import AuthContext from "../auth/context";

import AuthScreen from "../components/AuthScreen";
import colors from "../config/colors";

function UserProfileScreen(props) {
  const { user, logout } = useContext(AuthContext);

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

  return (
    <AuthScreen>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: user.picture }} />
        {/* 
        <Text style={styles.textGreetings} category="h4">
          Welcome {user && user["nickname"]}
        </Text> */}
        <Text style={{ marginBottom: 10 }} category="h5">
          {user.nickname}
        </Text>
        <Text style={{ marginBottom: 10 }}>{user.email}</Text>
        <Text
          style={{
            color: user.email_verified ? colors.primary : "orange",
            marginBottom: 10,
          }}
        >
          {user.email_verified ? "Email verified" : "Email needs to be verified"}
        </Text>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: "dotted",
  },
});

export default UserProfileScreen;

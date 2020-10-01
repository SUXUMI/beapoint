import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Screen from "./Screen";
import colors from "../config/colors";

function AuthScreen({ children }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          source={require("../assets/logos/401x103-transp-padd.png")}
          style={styles.logo}
        ></Image>
      </View>
      <View style={styles.form_container}>
        <View style={styles.form_sub_container}>{children}</View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  form_container: {
    backgroundColor: colors.light,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 0.7,
    // @issue: DOES NOT WORK! ???
    // overflow: "hidden",

    // note: there is nox `box-sizing` alternative
  },
  form_sub_container: {
    paddingHorizontal: "4%",
    paddingVertical: "7%",
    flex: 1,
  },
  logo: { resizeMode: "contain", width: "45%", top: "15%" },
  logo_container: {
    alignItems: "center",
    flex: 0.3 /*justifyContent: "center"*/,
  },
});

export default AuthScreen;

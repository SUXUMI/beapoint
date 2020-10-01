import React from "react";
import Constants from "expo-constants";
import { ImageBackground, StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  // NOTE: 2020.09.30 / GR
  // there is an issue with horizontal padding,
  // inner `VIEW` needs to be used in case of `SafeAreaView` as a wrapper
  // Not to use `SafeAreaView` as:
  //   1) there is a padding on top and in bottom as well! (on bottom should be left)
  //   2) padding horizontal not works on iOS!!!
  return (
    <ImageBackground
      style={[styles.container, style]}
      source={
        style && !style.backgroundColor ? require("../assets/bg.png") : null
      }
      resizeMode="stretch"
    >
      <View style={[styles.view]}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
  },
  view: {
    flex: 1,
  },
});

export default Screen;

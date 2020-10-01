import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Text,
  Input,
  Icon,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const HomeScreen = () => {
  const [value, setValue] = useState("");

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      <Layout
        style={{
          flex: 1,
          backgroundColor: "red",
          width: "100%",
          height: "100%",
        }}
      >
        <Text category="h1">HOME</Text>

        <Layout style={styles.container} level="1">
          <Icon name="star" style={{ width: 50, height: 50, fill: "blue" }} />

          <Input
            style={styles.input}
            value={value}
            placeholder="Active"
            onChangeText={(nextValue) => setValue(nextValue)}
          />

          <Input style={styles.input} disabled={true} placeholder="Disabled" />

          <Text category="h5">sample text</Text>

          <Input
            value={value}
            label="Password"
            placeholder="Place your Text"
            caption="Should contain at least 8 symbols"
            accessoryRight={renderIcon}
            captionIcon={AlertIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setValue(nextValue)}
          />
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
        {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: "center",
  },
});

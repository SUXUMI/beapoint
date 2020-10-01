import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Divider, Icon, Input, Text } from "@ui-kitten/components";

import AuthScreen from "../components/AuthScreen";
import colors from "../config/colors";

function SignInScreen(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPasswordEntry, setShowPasswordEntry] = useState(false);

  const togglePasswordEntryVisibility = () => {
    setShowPasswordEntry(!showPasswordEntry);
  };

  const renderPasswordEntrySwitherIcon = (props) => (
    <TouchableOpacity onPress={togglePasswordEntryVisibility}>
      <Icon {...props} name={showPasswordEntry ? "eye" : "eye-off"} />
    </TouchableOpacity>
  );

  return (
    <AuthScreen style={styles.container}>
      <Text style={styles.header} category="h5">
        Sign in into your account
      </Text>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        // autoFocus={true}
        caption={(evaProps) => (
          <Text
            {...evaProps}
            style={[evaProps.style, { color: colors.danger }]}
          >
            {/* error message goes here */}
          </Text>
        )}
        keyboardType="email-address"
        onChangeText={(newValue) => setEmail(newValue)}
        placeholder="Email"
        size="large"
        style={styles.email}
        value={email}
      />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        accessoryRight={renderPasswordEntrySwitherIcon}
        // caption="Should contain at least 8 symbols"
        caption={(evaProps) => (
          <Text
            {...evaProps}
            style={[evaProps.style, { color: colors.danger }]}
          >
            {/* error message goes here */}
          </Text>
        )}
        // captionIcon={AlertIcon}
        // label="Password"
        onChangeText={(newValue) => setPassword(newValue)}
        placeholder="Password"
        secureTextEntry={!showPasswordEntry}
        size="large"
        style={styles.password}
        value={password}
      />

      <TouchableOpacity>
        <Text style={styles.textForgot} status="primary">
          Forgot password?
        </Text>
      </TouchableOpacity>

      <Button style={styles.submitButton} onPress={() => {}}>
        Sign In
      </Button>

      <Text style={styles.textSocialMedia} appearance="hint">
        Or using social media
      </Text>

      <View style={styles.socialButtonsContainer}>
        <Button
          onPress={() => {}}
          size="giant"
          style={styles.socialButton}
          appearance="outline"
        >
          <Icon
            name="facebook"
            style={styles.socialButtonIcon}
            fill={colors.primary}
          />
        </Button>
        <Divider style={styles.socialDivider} />
        <Button
          onPress={() => {}}
          size="giant"
          style={styles.socialButton}
          appearance="outline"
        >
          <Icon
            name="google"
            style={styles.socialButtonIcon}
            fill={colors.primary}
          />
        </Button>
      </View>

      <View style={styles.textRegistrationContainer}>
        <Text appearance="hint">Don't have an account? </Text>
        <TouchableOpacity>
          <Text status="primary">Sign up?</Text>
        </TouchableOpacity>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  email: { marginBottom: "3%" },
  header: { marginBottom: "5%" },
  password: { marginBottom: "3%" },
  socialButton: {
    borderRadius: 8,
    flex: 1,
    paddingVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonIcon: { width: 28, height: 28 },
  socialButtonsContainer: {
    flexDirection: "row",
    marginBottom: "5%",
  },
  socialDivider: { width: "3%" },
  submitButton: {
    borderRadius: 8,
    marginBottom: "5%",
    paddingVertical: "4%",
  },
  textForgot: { marginBottom: "5%", textAlign: "right" },
  textRegistrationContainer: { flexDirection: "row", justifyContent: "center" },
  textSocialMedia: { marginBottom: "5%", textAlign: "center" },
});

export default SignInScreen;

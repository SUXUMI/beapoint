import React, { useState } from "react";
import { Button, TouchableHighlight } from "react-native";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Auth0 from "react-native-auth0";
import { AuthSession } from "expo";
import jwtDecode from "jwt-decode";

const auth0Domain = "https://adminge.eu.auth0.com";
const auth0ClientId = "WOrwSlbjb4ZtmpFMisSRYUE9mjWlOQYx";

function toQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}

export default function App() {
  const [nsame, setName] = useState();

  console.clear();

  const login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);

    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: "id_token", // id_token will return a JWT token
      scope: "openid profile", // retrieve the user's profile
      nonce: "nonce", // ideally, this will be a random value
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log("Authentication response", response);

    if (response.type === "success") {
      handleResponse(response.params);
    }
  };

  const handleResponse = (response) => {
    if (response.error) {
      Alert(
        "Authentication error",
        response.error_description || "something went wrong"
      );
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);

    setName(decoded);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight>
        <Button
          title="Login"
          style={{ fontSize: 45 }}
          onPress={() => {
            console.log("creating account");
            login();
          }}
        />
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    alignItems: "center",
    // justifyContent: "center",
  },
});

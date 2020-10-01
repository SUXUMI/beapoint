import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import * as React from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { create } from "apisauce";

// const authEndpoint = "https://adminge.eu.auth0.com/authorize";
const clientId = "LcRnzz3IVpkZkJfHAxqgsNU3mAvacVLR";
const clientSecret =
  "a23BUDpu6ma8idXiXQrz6Q_orxD8aYw73eZaid_66Z_gM3SP5Anoe87jUAj55Csu";
const authEndpoint = "https://adminge.eu.auth0.com"; // /api/v2

const apiClient = create({
  baseURL: authEndpoint,
});

export default function App() {
  console.log("==================================\n\n\n\n\n");

  const [name, setName] = React.useState(null);

  const getUserInfo = async (access_token) => {
    // NOT WORKS!!!!!
    // await apiClient.addAsyncRequestTransform(async (request) => {
    //   request["authorization"] = "Bearer " + access_token;
    // });

    apiClient.setHeader("authorization", "Bearer " + access_token);

    apiClient
      .get("/userinfo", {
        client_id: clientId,
        // client_secret: clientSecret,
        // access_token,
      })
      .then((response) => {
        console.log("\n\n==\nUser Info:\n\n", response.data);
      });
  };

  const login = async () => {
    let authUrl = "/oauth/token";

    // authUrl = "/authorize";

    apiClient
      .post(authUrl, {
        grant_type: "password",
        username: "test4@admin.ge",
        password: "12345",
        audience: "beapoint-api",
        scope: "openid", // issue: https://community.auth0.com/t/get-user-info-returns-invalid-credentials/9336
        client_id: clientId,
        client_secret: clientSecret,
      })
      .then((response) => {
        console.log("response.ok:", response.ok);
        console.log("response.data:", response.data);

        if (response.ok) {
          console.log("OK");

          // get user info
          const access_token = response.data.access_token;

          // Alert.alert("Access token", access_token);

          getUserInfo(access_token);
        }
      });
  };

  const createAccount = async () => {
    apiClient
      .post("/dbconnections/signup", {
        client_id: clientId,
        client_secret: clientSecret,
        connection: "Username-Password-Authentication",
        email: "test4@admin.ge",
        password: "12345",
        name: "John Smith",
        user_metadata: {
          hobby: "surfing",
        },
        app_metadata: {
          plan: "full",
        },
        // audience: "beapoint-api",
        // scope: "read:users",
      })
      .then((response) => {
        console.log("response.ok:", response.ok);
        console.log("response.data:", response.data);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {name ? (
        <Text style={styles.title}>You are logged in, {name}!</Text>
      ) : (
        <TouchableOpacity
          // disabled={!request}
          onPress={() => login()}
          style={{ color: "white" }}
        >
          <Text style={styles.title}>Log-in with Auth0..</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={createAccount}
        style={{ borderRadius: 5, overflow: "hidden" }}
      >
        <Text
          style={[
            {
              fontSize: 20,
              color: "dodgerblue",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 5,
              marginTop: 50,
              borderColor: "silver",
              borderWidth: 1,
              padding: 10,
            },
          ]}
        >
          Create account
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8076fb",
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    // marginTop: 40,
    color: "#fff",
  },
});

import * as SecureStore from "expo-secure-store";

const auth_token_key = "app_auth_token";

const isAvailable = async () => {
  try {
    return await SecureStore.isAvailableAsync();
  } catch (error) {
    console.log("ERROR: ", arguments.callee.toString, ">>>", error);
  }
};

const setToken = async (auth_token) => {
  try {
    return await SecureStore.setItemAsync(auth_token_key, auth_token);
  } catch (error) {
    console.log("ERROR: ", arguments.callee.toString, ">>>", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(auth_token_key);
  } catch (error) {
    console.log("ERROR: ", arguments.callee.toString, ">>>", error);
  }
};

const deleteToken = async () => {
  try {
    return await SecureStore.deleteItemAsync(auth_token_key);
  } catch (error) {
    console.log("ERROR: ", arguments.callee.toString, ">>>", error);
  }
};

export default { isAvailable, getToken, setToken, deleteToken };

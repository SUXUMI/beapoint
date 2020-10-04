import apiClient from "./client";
import settings from "../config/settings";
import authStorage from "../auth/storage";

const endPoints = {
  authToken: "/oauth/token",
  // authorize: "/authorize",
};

const {
  auth0_api: { audience, client_id, client_secret, grant_type, scope }, //, baseURL
} = settings;

const getToken = (username, password) =>
  apiClient.post(endPoints.authToken, {
    audience,
    client_id,
    client_secret,
    grant_type,
    password, // 12345
    scope,
    username, // test4@admin.ge
  });

const login = async (username, password) => {
  let result = {};

  // get auth_token
  result = await getToken(username, password);

  if (!result.ok) return result;

  const access_token = result.data.access_token;

  // store user token
  if (authStorage.isAvailable()) {
    authStorage.setToken(access_token);
  }

  // get user info
  result = loginWithAccessToken(access_token);

  return result;
};

const loginWithAccessToken = async (access_token) => {
  const result = await getUserInfo(access_token);

  return result;
};

const getUserInfo = (access_token) => {
  // NOT WORKS!!!!!
  // await apiClient.addAsyncRequestTransform(async (request) => {
  //   request["authorization"] = "Bearer " + access_token;
  // });

  apiClient.setHeader("authorization", "Bearer " + access_token);

  return apiClient.get("/userinfo", {
    client_id,
    // client_secret: clientSecret,
    // access_token,
  });
};

const createUser = (username, password) => {};

export default { createUser, login, loginWithAccessToken };

import { create } from "apisauce";

import settings from "../config/settings";

const apiClient = create({
  baseURL: settings.auth0_api.baseURL,
});

export default apiClient;

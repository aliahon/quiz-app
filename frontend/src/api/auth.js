import axios from "../lib/axios";
/**
 * Logs in a user with the provided identity and password.
 *
 * @param {string} identity - The identity of the user (username or email).
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The response data from the login API.
 * @throws Will throw an error if the login request fails.
 */

export const loginApi = async (credentials, password) => {
  const response = await axios.post("auth/login", {
    credentials,
    password,
  });
  return response.data;
};

export const logoutApi = async () => {
  const response = await axios.post("auth/logout");
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get("auth/account");
  return response.data;
};

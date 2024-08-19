import axios from "../lib/axios";

export const getAllUsers = async () => {
  const response = await axios.get("/users/get-all-users");
  return response.data;
};

/**
 * Registers a new user with the provided details.
 *
 * @param {Object} user - The user details.
 * @param {string} user.username - The username of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} user.passwordConfirm - The confirmation of the user's password.
 * @param {string} user.email - The email of the user.
 * @param {string} user.name - The name of the user.
 * @returns {Promise<Object>} The response data from the registration API.
 * @throws Will throw an error if the registration request fails.
 */
export const addUser = async (user) => {
  const response = await axios.post("/users/add-user", user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/users/delete-user/${id}`);
  return response.data;
};

export const getUserMarks = async () => {
  const response = await axios.get(`/users/get-users-marks/`);
  return response.data;
};

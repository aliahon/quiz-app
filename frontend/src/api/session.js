import axios from "../lib/axios";

export const getUserSessoion = async (id) => {
  const response = await axios.get(`/session/get-user-session/${id}`);
  return response.data;
};

export const createSession = async (userId) => {
  const response = await axios.post("/session/create-session", { userId });
  return response.data;
};

export const startSession = async (id) => {
  const response = await axios.put(`/session/start-session`, { sessionId: id });
  return response.data;
};

export const finishSession = async (id) => {
  const response = await axios.put(`/session/finish-session`, {
    sessionId: id,
  });
  return response.data;
};

export const createAdminSession = async ({ startTime, endTime }) => {

    const response = await axios.post("/session/create-admin-session", {
      startTime,
      endTime,
    });
    
    return response.data;
  
};

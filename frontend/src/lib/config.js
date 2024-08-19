export const SERVER_URL =
  import.meta.env.VITE_ENV === "dev"
    ? import.meta.env.VITE_DEV_API_URL
    : import.meta.env.VITE_PROD_API_URL;

export const API_URL = SERVER_URL + "/api";

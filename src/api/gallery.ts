import axios from "axios";

const key = import.meta.env.VITE_KEY;
const BASE_URL = import.meta.env.VITE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPhotos = async (per_page: number, order_by: string) => {
  const apiConfig = {
    params: {
      client_id: key,
      per_page,
      order_by,
    },
  };
  return await instance.get(`${BASE_URL}photos`, apiConfig);
};

export default instance;

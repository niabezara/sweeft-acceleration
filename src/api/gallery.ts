import axios from "axios";
import { Photo } from "../interfaces/GalleryTypes";

const BASE_URL = import.meta.env.VITE_URL;
const key = import.meta.env.VITE_KEY;

// search photos
export const fetchSearchPhotos = async (query: string) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query: query },
    headers: {
      Authorization: "Client-ID wUHdcCf_x7v5FlSB5WpgsQ0uxK-lrU9-oa5RNpM-Fao",
    },
  });

  return response.data.results;
};

// popular photos
export const fetchPopularPhotos = async () => {
  const response = await axios.get("https://api.unsplash.com/photos", {
    params: {
      order_by: "popular",
      per_page: 20,
    },
    headers: {
      Authorization: "Client-ID wUHdcCf_x7v5FlSB5WpgsQ0uxK-lrU9-oa5RNpM-Fao",
    },
  });

  return response.data;
};

import axios from "axios";
import { Photo } from "../interfaces/GalleryTypes";

const BASE_URL = import.meta.env.VITE_URL;
const key = import.meta.env.VITE_KEY;

// fetch all photos
export const fetchPhotos = async (query: string) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/photos/`, {
      params: { query: query, page: 10 },
      headers: {
        Authorization: `Client-ID ${key}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error alll photo :", error);
    throw error;
  }
};

// search photos
export const fetchSearchPhotos = async (query: string) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query: query, per_page: 1500 },
    headers: {
      Authorization: `Client-ID ${key}`,
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
      Authorization: `Client-ID ${key}`,
    },
  });

  return response.data;
};

// statistic of the photos
export const getStatisticsForPhoto = async (photoId: string) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/${photoId}/statistics`,
      {
        headers: {
          Authorization: `Client-ID ${key}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching photo statistics:", error);
    throw error;
  }
};

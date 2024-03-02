import axios from "axios";
import { Photo } from "../interfaces/GalleryTypes";

const BASE_URL = import.meta.env.VITE_URL;
const key = import.meta.env.VITE_KEY;

// fetch all photos
export const fetchPhotos = async (query: string, page: number) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?${page}=1&query=${query}&per_page=20`,
      {
        headers: {
          Authorization: `Client-ID ${key}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error alll photo :", error);
    throw error;
  }
};

// search photos
// search photos
export const fetchSearchPhotos = async (query: string, page: number) => {
  let cancel;
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      page: page,
      query: query,
      per_page: 20,
    },
    cancelToken: new axios.CancelToken((c) => (cancel = c)),
    headers: {
      Authorization: `Client-ID ${key}`,
    },
  });

  return response.data.results;
};

// popular photos
export const fetchPopularPhotos = async (page: number) => {
  let cancel;
  const response = await axios.get(`https://api.unsplash.com/photos`, {
    params: {
      page: page,
      order_by: "popular",
      per_page: 20,
    },
    cancelToken: new axios.CancelToken((c) => (cancel = c)),
    headers: {
      Authorization: `Client-ID ${key}`,
    },
  });

  return response.data;
};

// statistic of the photos
export const getStatisticsForPhoto = async (photoId: string) => {
  let cancel;
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/${photoId}/statistics`,
      {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        headers: {
          Authorization: `Client-ID ${key}`,
        },
      }
    );

    return response.data;
  } catch (e) {
    if (axios.isCancel(e)) return;
    console.error("Error fetching photo statistics:", e);
  }
};

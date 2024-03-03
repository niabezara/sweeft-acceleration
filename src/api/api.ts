import axios, { CancelTokenSource } from "axios";

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
export const fetchSearchPhotos = async (query: string, page: number) => {
  let cancelTokenSource: CancelTokenSource | null = null;
  cancelTokenSource = axios.CancelToken.source();
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        page: page,
        query: query,
        per_page: 20,
      },
      cancelToken: cancelTokenSource.token,
      headers: {
        Authorization: `Client-ID ${key}`,
      },
    });
    return response.data.results;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else {
      throw error;
    }
  }
};

// popular photos
export const fetchPopularPhotos = async (page: number) => {
  const response = await axios.get(`https://api.unsplash.com/photos`, {
    params: {
      page: page,
      order_by: "popular",
      per_page: 20,
    },
    cancelToken: new axios.CancelToken((c) => c),
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
  } catch (e) {
    console.error(`Error fetching photo statistics `);
  }
};

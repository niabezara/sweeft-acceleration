import { createContext, useContext, useEffect, useState } from "react";
import { SearchContextProps } from "../interfaces/DataTypes";
import { fetchPopularPhotos, fetchSearchPhotos } from "../api/api";
import { Photo } from "../interfaces/GalleryTypes";
import { useQuery } from "react-query";
const SearchContext = createContext<SearchContextProps>(
  {} as SearchContextProps
);

export function UseSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [pictureSearchHistory, setPictureSearchHistory] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const {
    data,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery(
    ["photos", searchQuery, page],
    () => fetchSearchPhotos(searchQuery, page),
    {
      keepPreviousData: true,
      staleTime: 300000,
      cacheTime: 3600000,
    }
  );

  const {
    data: popularPhotos,
    isLoading: popularLoading,
    isError: popularError,
  } = useQuery(["popularPhotos"], () => fetchPopularPhotos(page), {
    staleTime: 300000,
    cacheTime: 3600000,
  });

  // Infinite scroll handler

  // ***********************************************************

  //   filter photos
  const searchQ = typeof searchQuery === "string" ? searchQuery : "";
  const filteredData = searchQ
    ? data?.filter((item: Photo | null | undefined) =>
        item?.description?.toLowerCase().includes(searchQ.toLowerCase())
      )
    : popularPhotos;

  // search history
  const updateSearchHistory = async (
    query: any,
    isPictureSearch: boolean = false
  ) => {
    setPage(1);
    if (query.trim() !== "") {
      let searchResults: any;
      if (isPictureSearch) {
        searchResults = await fetchSearchPhotos(query, 1);
      } else {
        setSearchHistory((prevHistory) => {
          if (!prevHistory.includes(query)) {
            return [query, ...prevHistory];
          }
          return prevHistory;
        });
      }
      if (searchResults) {
        setPictureSearchHistory((prevHistory) => {
          return [...searchResults, ...prevHistory];
        });
      }
    }
  };

  //   if the user press enter to save that history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateSearchHistory(searchQuery);
      updateSearchHistory(searchQuery, true);
    }
  };
  // if users clicks already search button
  const handleButtonClick = (query: string) => {
    setSearchQuery(query);
    updateSearchHistory(query);
    updateSearchHistory(query, true);
  };
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchHistory,
        handleKeyDown,
        setSearchQuery,
        pictureSearchHistory,
        filteredData,
        data,
        searchLoading,
        searchError,
        popularPhotos,
        popularLoading,
        popularError,
        handleButtonClick,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

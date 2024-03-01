import { createContext, useContext, useState } from "react";
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

  const { data, isLoading, isError } = useQuery(
    ["photos", searchQuery],
    () => fetchSearchPhotos(searchQuery),
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
  } = useQuery("popularPhotos", fetchPopularPhotos, {
    staleTime: 300000,
    cacheTime: 3600000,
  });

  //   filter photos
  const searchQ = typeof searchQuery === "string" ? searchQuery : "";
  const filteredData = searchQ
    ? data?.filter((item: Photo | null | undefined) =>
        item?.description?.toLowerCase().includes(searchQ.toLowerCase())
      )
    : popularPhotos;

  // search history
  const updateSearchHistory = (query: any) => {
    if (query.trim() !== "") {
      setSearchHistory((prevHistory) => {
        if (!prevHistory.includes(query)) {
          return [query, ...prevHistory];
        }
        return prevHistory;
      });
    }
    console.log(searchHistory);
  };

  //   if the user press enter to save that history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateSearchHistory(searchQuery);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchHistory,
        handleKeyDown,
        setSearchQuery,
        filteredData,
        data,
        isLoading,
        isError,
        popularPhotos,
        popularLoading,
        popularError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

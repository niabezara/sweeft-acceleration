import { createContext, useContext, useState } from "react";
import { SearchContextProps } from "../interfaces/DataTypes";
import { fetchPopularPhotos, fetchSearchPhotos } from "../api/gallery";
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

  const searchQ = typeof searchQuery === "string" ? searchQuery : "";
  const filteredData = searchQ
    ? data?.filter((item: Photo | null | undefined) =>
        item?.description?.toLowerCase().includes(searchQ.toLowerCase())
      )
    : popularPhotos;

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredData,
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

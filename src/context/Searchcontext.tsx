import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [pageNumber, setPageNumber] = useState(1);
  const [popularPageNumber, setPopularPageNumber] = useState(1);
  const [allPopularData, setAllPopularData] = useState<Photo[]>([]);
  const [allData, setAllData] = useState<Photo[]>([]);
  const {
    data,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery(
    ["photos", searchQuery, pageNumber],
    () => fetchSearchPhotos(searchQuery, pageNumber),
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
  } = useQuery(
    ["popularPhotos", popularPageNumber],
    () => fetchPopularPhotos(popularPageNumber),
    {
      staleTime: 300000,
      cacheTime: 3600000,
    }
  );
  // Update the "allData" state when new data is loaded
  useEffect(() => {
    if (data) {
      setAllData((prevData) => [...prevData, ...data]);
    }
  }, [data]);
  // Update the "allPopularData" state when new data is loaded for popular
  useEffect(() => {
    if (popularPhotos) {
      setAllPopularData((prevData) => [...prevData, ...popularPhotos]);
    }
  }, [popularPhotos]);

  // infinite scroll implementation*****************************************************************
  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;

    if (isAtBottom && !searchLoading && !searchError) {
      setPageNumber((prevPage) => prevPage + 1);
    }

    if (isAtBottom && !popularLoading && !popularError) {
      setPopularPageNumber((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchLoading, searchError, popularLoading, popularError]);

  // ***********************************************************************************************

  //   filter photos
  const searchQ = typeof searchQuery === "string" ? searchQuery : "";
  const filteredData = searchQ
    ? allData?.filter((item: Photo | null | undefined) =>
        item?.description?.toLowerCase().includes(searchQ.toLowerCase())
      )
    : allPopularData;

  // search history
  const updateSearchHistory = async (
    query: any,
    isPictureSearch: boolean = false
  ) => {
    if (query.trim() !== "") {
      let searchResults: any;
      if (isPictureSearch) {
        searchResults = await fetchSearchPhotos(query, pageNumber);
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
      setPageNumber(1);
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

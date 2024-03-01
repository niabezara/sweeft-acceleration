import { Dispatch, SetStateAction } from "react";
import { Photo } from "./GalleryTypes";

export interface Pagination {
  previousPage: number | null;
  current: number;
  nextPage: number | null;
  total: number;
  pageSize: number;
}

export interface SearchContextProps {
  searchQuery: string;
  searchHistory: string[];
  handleKeyDown: (e: any) => void;

  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredData: Photo[] | null;
  isLoading: boolean;
  isError: boolean;
  popularPhotos?: Photo[] | null;
  popularLoading: boolean;
  popularError: boolean;
}

import { Dispatch, SetStateAction } from "react";
import { ItemData, Photo } from "./GalleryTypes";

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
  data: Photo[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredData: Photo[] | null;
  isLoading: boolean;
  isError: boolean;
  popularPhotos?: Photo[] | null;
  popularLoading: boolean;
  popularError: boolean;
}

export interface GalleryContextProps {
  modalOpen: boolean;
  openModal: (id: string) => void;
  closeModal: () => void;
  selectedImage: string | null;
  dataStatistic: ItemData;
}

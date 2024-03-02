import { Dispatch, SetStateAction } from "react";
import { Data, Photo } from "./GalleryTypes";

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
  pictureSearchHistory: Photo[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredData: Photo[] | null;
  searchLoading: boolean;
  searchError: boolean;
  popularPhotos?: Photo[] | null;
  popularLoading: boolean;
  popularError: boolean;
  handleButtonClick: (query: string) => void;
}

export interface GalleryContextProps {
  modalOpen: boolean;
  openModal: (id: string, img: string) => void;
  closeModal: () => void;
  setSaveimg: Dispatch<SetStateAction<string | undefined>>;
  saveimg: string | undefined;
  selectedImage: string | null;
  dataStatistic: Data;
  isLoading: boolean;
  isError: boolean;
}

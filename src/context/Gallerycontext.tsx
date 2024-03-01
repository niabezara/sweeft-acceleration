import { createContext, useContext, useState } from "react";
import { GalleryContextProps } from "../interfaces/DataTypes";
import { getStatisticsForPhoto } from "../api/api";
import { Photo } from "../interfaces/GalleryTypes";
import { useQuery } from "react-query";

const GalleryContext = createContext<GalleryContextProps>(
  {} as GalleryContextProps
);

export function UseGallery() {
  return useContext(GalleryContext);
}

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {
    data: dataStatistic,
    isLoading,
    isError,
  } = useQuery(
    ["photoStatistics", selectedImage],
    () => getStatisticsForPhoto(selectedImage || ""),
    {
      keepPreviousData: true,
      staleTime: 300000,
      cacheTime: 3600000,
    }
  );

  const openModal = (id: string) => {
    setSelectedImage(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <GalleryContext.Provider
      value={{ modalOpen, openModal, closeModal, selectedImage, dataStatistic }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

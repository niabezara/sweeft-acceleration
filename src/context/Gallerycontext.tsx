import { createContext, useContext, useState } from "react";
import { GalleryContextProps } from "../interfaces/DataTypes";
import { getStatisticsForPhoto } from "../api/api";
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
  const [saveimg, setSaveimg] = useState<string>();
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

  const openModal = (id: string, img: string) => {
    setSelectedImage(id);
    setSaveimg(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <GalleryContext.Provider
      value={{
        modalOpen,
        saveimg,
        openModal,
        setSaveimg,
        closeModal,
        selectedImage,
        dataStatistic,
        isLoading,
        isError,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPopularPhotos, fetchSearchPhotos } from "../api/gallery";
import SearchBox from "../components/SearchBox";
import { Photo } from "../interfaces/GalleryTypes";

export default function HomePage() {
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
    <Container>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((photo: any) => (
            <img key={photo.id} src={photo.urls.small} alt="" />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

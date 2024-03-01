import styled from "styled-components";
import { UseSearch } from "../../context/Searchcontext";
import { Photo } from "../../interfaces/GalleryTypes";

export default function Gallery() {
  const { filteredData } = UseSearch();
  return (
    <Container>
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((photo: Photo) => (
          <img key={photo.id} src={photo.urls.small} alt="" />
        ))
      ) : (
        <NotFound>No results found.</NotFound>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 2rem;
`;

const NotFound = styled.p`
  color: #fff;
  font-size: 700;
  font-size: 2rem;
`;

import styled from "styled-components";
import { UseSearch } from "../../context/Searchcontext";
import { Photo } from "../../interfaces/GalleryTypes";
import { UseGallery } from "../../context/Gallerycontext";
import SliderModal from "../modal/SliderModal";
import Loader from "../shared/Loader";
import Error from "../shared/Error";

export default function Gallery() {
  const { filteredData } = UseSearch();
  const { openModal, modalOpen, saveimg, isError, isLoading } = UseGallery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <Container>
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((photo: Photo) => (
          <figure key={photo.id}>
            <Image
              src={photo.urls.small}
              alt=""
              onClick={() => openModal(photo.id, photo.urls.regular)}
            />
          </figure>
        ))
      ) : (
        <NotFound>No results found.</NotFound>
      )}
      <SliderModal children={undefined} Open={modalOpen} imageUrl={saveimg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  row-gap: 2rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2rem;
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 2rem;
  }
`;

const NotFound = styled.p`
  color: #fff;
  font-size: 700;
  font-size: 2rem;
`;

const Image = styled.img`
  opacity: 1;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

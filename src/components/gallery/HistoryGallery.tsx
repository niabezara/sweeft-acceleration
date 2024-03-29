import styled from "styled-components";
import { UseSearch } from "../../context/Searchcontext";
import Loader from "../shared/Loader";
import Error from "../shared/Error";

export default function HistoryGallery() {
  const { pictureSearchHistory, searchError, searchLoading } = UseSearch();
  if (searchLoading) {
    return <Loader />;
  }
  if (searchError) {
    return <Error />;
  }
  return (
    <Container>
      {pictureSearchHistory && pictureSearchHistory.length > 0 ? (
        pictureSearchHistory.map((imageUrl, index) => (
          <figure>
            <img key={index} src={imageUrl?.urls?.small} />
          </figure>
        ))
      ) : (
        <Warning>No history found!</Warning>
      )}
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
const Warning = styled.h2`
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

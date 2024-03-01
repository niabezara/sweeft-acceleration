import styled from "styled-components";
import SearchBox from "../components/SearchBox";
import Gallery from "../components/gallery/Gallery";

export default function HomePage() {
  return (
    <Container>
      <SearchBox />
      <Gallery />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

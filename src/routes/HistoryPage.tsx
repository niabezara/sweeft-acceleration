import styled from "styled-components";
import Gallery from "../components/gallery/Gallery";
import HistoryBtns from "../components/shared/HistoryBtns";

export default function HistoryPage() {
  return (
    <Container>
      <HistoryBtns />
      <Gallery />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  margin: 20px;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;
